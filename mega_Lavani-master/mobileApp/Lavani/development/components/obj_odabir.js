import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';

export default class Obj_odabir extends Component {
  render() {
    const params = this.props.params;
    const style = params.style;
    const txt = params.txt;
    const H = params.Helper;
    const Con = params.Config;
    const routeParams = params.route.params;
    const radnaMesta = 901 ? (
      <TouchableOpacity
        onPress={() => {
          params.navigation.navigate('Radna_mesta', {
            entitet: routeParams.entitet,
            id: routeParams.id,
            objekat_naziv: routeParams.naziv,
          });
        }}>
        <View
          style={H.ObjAss(
            {height: 60, backgroundColor: '#ddd'},
            style.center,
            style.flex_0,
            style.mar_20,
          )}>
          <Text style={H.ObjAss({fontSize: 20}, style.txt_c)}>
            {txt.radna_mesta}
          </Text>
        </View>
      </TouchableOpacity>
    ) : null;

    return (
      <View style={H.ObjAss({}, style.column, style.flex_1)}>
        <View
          style={H.ObjAss(
            {height: 60, marginBottom: 20, borderBottomWidth: 2},
            style.center,
            style.flex_0,
          )}>
          <Text style={H.ObjAss({fontSize: 22}, style.txt_c)}>
            {routeParams.naziv}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            params.navigation.navigate('Edit_unos_objekata', {
              entitet: routeParams.entitet,
              id: routeParams.id,
              refresh: routeParams.refresh,
            });
          }}>
          <View
            style={H.ObjAss(
              {height: 60, backgroundColor: '#ddd'},
              style.center,
              style.flex_0,
              style.mar_20,
            )}>
            <Text style={H.ObjAss({fontSize: 20}, style.txt_c)}>
              {txt.podaci_o_objektu}
            </Text>
          </View>
        </TouchableOpacity>
        {radnaMesta}
        <TouchableOpacity
          onPress={() => {
            params.navigation.navigate('Radnici_na_objektu_home', {
              entitet: routeParams.entitet,
              id: routeParams.id,
              objekat_naziv: routeParams.naziv,
            });
          }}>
          <View
            style={H.ObjAss(
              {height: 60, backgroundColor: '#ddd'},
              style.center,
              style.flex_0,
              style.mar_20,
            )}>
            <Text style={H.ObjAss({fontSize: 20}, style.txt_c)}>
              {txt.radnici_na_objektu}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
