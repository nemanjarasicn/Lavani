import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Alert} from 'react-native';

export default class Odabir extends Component {
  render() {
    const params = this.props.params;
    const style = params.style;
    const txt = params.txt;
    const H = params.Helper;
    const Con = params.Config;

    return (
      <View style={H.ObjAss({}, style.column, style.flex_1)}>
        <View
          style={H.ObjAss(
            {height: 60, marginBottom: 20, borderBottomWidth: 2},
            style.center,
            style.flex_0,
          )}>
          <Text style={H.ObjAss({fontSize: 22}, style.txt_c)}>
            {params.Korisnik.getFullName()}
          </Text>
        </View>
        <View
          style={H.ObjAss(
            {height: 50, marginBottom: 20},
            style.center,
            style.flex_0,
          )}>
          <Text style={H.ObjAss({fontSize: 18}, style.txt_c)}>
            {txt.odabir_entiteta}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            if (params.Korisnik.entiteti.includes(35))
              params.navigation.navigate('Home', {
                entitet: 35,
                Korisnik: params.Korisnik,
              });
            else Alert.alert(txt.upozorenje, txt.nemate_pravo);
          }}>
          <View
            style={H.ObjAss(
              {height: 60, backgroundColor: '#ddd'},
              style.center,
              style.flex_0,
              style.mar_20,
            )}>
            <Text style={H.ObjAss({fontSize: 20}, style.txt_c)}>
              {txt.lavani}
            </Text>
            {/*zakucano 35 za lavani*/}
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (params.Korisnik.entiteti.includes(34))
              params.navigation.navigate('Home', {
                entitet: 34,
                Korisnik: params.Korisnik,
              });
            else Alert.alert(txt.upozorenje, txt.nemate_pravo);
          }}>
          <View
            style={H.ObjAss(
              {height: 60, backgroundColor: '#ddd'},
              style.center,
              style.flex_0,
              style.mar_20,
            )}>
            <Text style={H.ObjAss({fontSize: 20}, style.txt_c)}>
              {txt.laniva}
            </Text>
            {/*zakucano 34 za laniva*/}
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
