import React, {Component, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Linking,
} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
//my classes
import Helper from '../classes/Helper'; //helper
import Config from '../config/Config'; //config

export default class Login extends Component {
  render() {
    const params = this.props.params;
    const style = params.style;
    const txt = params.txt;
    const H = new Helper();
    const Con = new Config();
    const supportedURL = 'http://mega.rs';
    const OpenURLButton = ({url, children}) => {
      const handlePress = useCallback(async () => {
        const supported = await Linking.canOpenURL(url);
        if (supported) await Linking.openURL(url);
        else Alert.alert(`Don't know how to open this URL: ${url}`);
      }, [url]);
      return (
        <View
          style={H.ObjAss(
            {marginBottom: 10},
            style.center,
            style.row,
            style.flex_1,
          )}>
          <TouchableOpacity onPress={handlePress}>
            <Text style={{color: '#5A738E', fontSize: 22, textAlign: 'center'}}>
              MEGA Computer Engineering
            </Text>
          </TouchableOpacity>
        </View>
      );
    };

    return (
      <View style={H.ObjAss({}, style.flex_1, style.column)}>
        <ScrollView scrollEnabled={false} style={{flex: 0}}>
          <View style={H.ObjAss({height: 200}, style.center, style.flex_0)}>
            <View style={H.ObjAss({}, style.flex_1, style.center)}>
              <Image
                style={{width: '100%', height: 100}}
                source={require('../assets/images/grb_lavani_logo.png')}
              />
            </View>
          </View>
          {/*
			  		<View style={H.ObjAss({height:60}, style.flex_0, style.column, style.center)}>
		    			<View style={H.ObjAss({marginTop: 15,justifyContent: 'space-around',width:'100%'}, style.flex_1, style.row)}>
		    				<TouchableOpacity 
								onPress={ () => {params.promeniPismo(1)} }> 
								<Text style={{color: '#5A738E',fontSize: 14}}>{txt.latinica}</Text>  
							</TouchableOpacity>  
		    				<Text style={{color: '#5A738E',fontSize: 14}}>|</Text>
		    				<TouchableOpacity 
								onPress={ () => {params.promeniPismo(0)} }> 
								<Text style={{color: '#5A738E',fontSize: 14}}>{txt.cirilica}</Text>  
							</TouchableOpacity>  
		    			</View>
		    		</View>
		    		*/}
          <View style={H.ObjAss({height: 200}, style.flex_1, style.center)}>
            <View
              style={(H.ObjAss({}, style.flex_0, style.center), style.mar_20)}>
              <TextInput
                placeholder={txt.username}
                style={H.ObjAss({borderWidth: 1, height: 50}, style.txt_c)}
                onChangeText={username => {
                  params.setUsername(username);
                }}
                value={params.username}
              />
            </View>
            <View
              style={H.ObjAss({}, style.flex_0, style.center, style.mar_20)}>
              <TextInput
                placeholder={txt.password}
                style={H.ObjAss({borderWidth: 1, height: 50}, style.txt_c)}
                onChangeText={password => {
                  params.setPassword(password);
                }}
                value={params.password}
                secureTextEntry
              />
            </View>
          </View>
          <View style={H.ObjAss({}, style.flex_1, style.center, style.padd_30)}>
            <TouchableOpacity
              onPress={() => {
                //params.navigation.navigate('Odabir') //dok se ne rese tabele
                if (params.username != '' && params.password != '') {
                  H.callFetch({
                    url: Con.endpoint + 'login.cfc?method=login',
                    data: {
                      username: params.username,
                      password: params.password,
                    },
                    func: res => {
                      //console.log(res[3].DATA)
                      if (!Number(res[0])) {
                        if (typeof res[1] !== 'object')
                          Alert.alert(txt.upozorenje, txt.nemate_pravo);
                        else {
                          const data1 = res[1].DATA[0]; //lice info (ID, IME, PREZIME, REGION_ID)
                          const data2 = res[2].DATA; //entiteti
                          const data3 = res[3].DATA; //prava na opcije
                          let entiteti = [],
                            prava = [];
                          data2.forEach(el => {
                            entiteti.push(Number(el));
                          });
                          data3.forEach(el => {
                            prava.push(Number(el));
                          });
                          params.newKorisnik(
                            data1[0],
                            data1[1],
                            data1[2],
                            entiteti,
                            prava,
                            data1[3],
                          );
                          params.navigation.navigate('Odabir'); //proveriti iz baze usera
                        }
                      } else Alert.alert(txt.upozorenje, txt.los_login);
                    },
                  });
                } else Alert.alert(txt.upozorenje, txt.popunite_sva_polja);
              }}>
              <View
                style={H.ObjAss(
                  {height: 50, backgroundColor: '#ddd'},
                  style.center,
                )}>
                <Text style={style.txt_c}>{txt.login}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <KeyboardSpacer />
        </ScrollView>
        {/*<View style={H.ObjAss({}, style.center, style.row, style.flex_1)}>
		    			<Image source={require('../assets/images/mega.png')} style={{height:40, width:80, marginBottom:10}} />
		    		</View>*/}
        <OpenURLButton url={supportedURL} />
      </View>
    );
  }
}
