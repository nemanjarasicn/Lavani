import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Alert, FlatList} from 'react-native';
import {SearchBar} from 'react-native-elements';

export default class Radnici_na_objektu_zaposleni extends Component {
  constructor(props) {
    super(props);
    this.state = {data: []};
    this._arr = [];
    this.H = props.params.Helper;
    this.Con = props.params.Config;
    this.idObjekta = props.params.route.params.idObjekta;
    this.objekat_naziv = props.params.route.params.objekat_naziv;
    this.idRM = props.params.route.params.idRM;
    this.idRMObj = props.params.route.params.idRMObj;
    this.nazivRM = props.params.route.params.nazivRM;
    this.entitet = props.params.route.params.entitet;
    this.navigation = props.params.navigation;
    this.preostaloMesta = null;
  }

  init = () => {
    this.H.callFetch({
      url: this.Con.endpoint + 'radnici_na_objektima.cfc?method=zaposleni',
      data: {
        idObjekta: this.idObjekta,
        idRM: this.idRM,
        entitet: this.entitet,
      },
      func: res => {
        this._arr = res[0].DATA;
        this.preostaloMesta = Number(res[1]);
        this.setState({data: res[0].DATA});
      },
    });
  };

  componentDidMount() {
    this.init();
  }

  searchFilterFunction = text => {
    this.setState({value: text});
    const newData = this._arr.filter(item => {
      const itemData = `${item[1].toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({data: newData});
  };

  render() {
    const params = this.props.params;
    const style = params.style;
    const txt = params.txt;
    const routeParams = params.route.params;

    return (
      <View style={this.H.ObjAss({}, style.column, style.flex_1)}>
        <View
          style={this.H.ObjAss(
            {height: 50, borderBottomWidth: 1},
            style.center,
            style.flex_0,
          )}>
          <Text style={this.H.ObjAss({fontSize: 16}, style.txt_c)}>
            {txt.objekat}: {this.objekat_naziv}
          </Text>
        </View>
        <View
          style={this.H.ObjAss(
            {height: 50, borderBottomWidth: 1},
            style.center,
            style.flex_0,
          )}>
          <Text style={this.H.ObjAss({fontSize: 16}, style.txt_c)}>
            {txt.radno_mesto}: {this.nazivRM}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            if (this.preostaloMesta != null && this.preostaloMesta > 0) {
              params.navigation.navigate('Radnici_na_objektu_unos_edit', {
                idRMObj: this.idRMObj,
                idRM: this.idRM,
                nazivRM: this.nazivRM,
                entitet: this.entitet,
                idObjekta: this.idObjekta,
                objekat_naziv: this.objekat_naziv,
                refresh: data => {
                  this.setState({data: data});
                },
              });
            } else Alert.alert(txt.upozorenje, txt.nema_mesta);
          }}>
          <View
            style={this.H.ObjAss(
              {height: 50, backgroundColor: '#ddd'},
              style.center,
              style.flex_0,
              style.mar_15,
            )}>
            <Text style={this.H.ObjAss({fontSize: 16}, style.txt_c)}>
              {txt.novi_zaposleni} +
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{flex: 1}}>
          <SearchBar
            placeholder={txt.pretrazi_3}
            searchIcon={false}
            clearIcon={false}
            onChangeText={text => this.searchFilterFunction(text)}
            autoCorrect={false}
            containerStyle={{backgroundColor: '#8b0000'}}
            inputContainerStyle={{backgroundColor: '#fff'}}
            value={this.state.value}
          />
          <FlatList
            scrollEnabled={true}
            data={this.state.data}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  this.navigation.navigate('Radnici_na_objektu_ugovori', {
                    idRMObj: this.idRMObj,
                    idZ: item[0],
                    nazivZ: item[1],
                    idRM: this.idRM,
                    nazivRM: this.nazivRM,
                    entitet: this.entitet,
                    idObjekta: this.idObjekta,
                    objekat_naziv: this.objekat_naziv,
                    refresh: data => {
                      this.setState({data: data});
                    },
                  });
                }}>
                <View
                  style={
                    item[5] === 0
                      ? this.H.ObjAss(
                          {
                            height: 77,
                            borderBottomWidth: 1,
                            backgroundColor: '#ef9a9a',
                          },
                          style.flex_0,
                          style.padd_15,
                        )
                      : this.H.ObjAss(
                          {
                            height: 77,
                            borderBottomWidth: 1,
                            backgroundColor: '#1de9b6',
                          },
                          style.flex_0,
                          style.padd_15,
                        )
                  }>
                  <Text style={this.H.ObjAss({fontSize: 18}, style.txt_c)}>
                    {item[1]}
                  </Text>
                  {item[2] ? (
                    <View style={{backgroundColor: '#4fc3f7', marginTop: 10}}>
                      <Text style={{textAlign: 'center', color: '#000'}}>
                        {txt.zamena}: {item[4] != '' ? item[4] : txt.nema}
                      </Text>
                    </View>
                  ) : null}
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => item[0].toString()}
          />
        </View>
      </View>
    );
  }
}
