import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Alert} from 'react-native';

export default class Home extends Component {
  render() {
    const params = this.props.params;
    const style = params.style;
    const txt = params.txt;
    const H = params.Helper;
    const Con = params.Config;
    const routeParams = params.route.params;
    const Korisnik = params.Korisnik;

    const unosRadnika = Korisnik.imaPravo(909) ? (
      <TouchableOpacity
        onPress={() => {
          params.navigation.navigate('Unos_radnika_home', {
            entitet: routeParams.entitet,
          });
        }}>
        <View
          style={H.ObjAss(
            {height: 60, backgroundColor: '#ddd'},
            style.center,
            style.flex_0,
            style.mar_20,
          )}>
          <Text style={style.txt_c}>{txt.unos_radnika}</Text>
        </View>
      </TouchableOpacity>
    ) : null;
    const korekcijaRadnogVremena = Korisnik.imaPravo(909) ? (
      <TouchableOpacity
        onPress={() => {
          params.navigation.navigate('Korekcija_rv_home', {
            entitet: routeParams.entitet,
          });
        }}>
        <View
          style={H.ObjAss(
            {height: 60, backgroundColor: '#ddd'},
            style.center,
            style.flex_0,
            style.mar_20,
          )}>
          <Text style={style.txt_c}>{txt.korekcija_rv}</Text>
        </View>
      </TouchableOpacity>
    ) : null;
    const objekti = 1 /*(Korisnik.imaPravo(904))*/ ? (
      <TouchableOpacity
        onPress={() => {
          params.navigation.navigate('Unos_objekata_home', {
            entitet: routeParams.entitet,
            reg_id: Korisnik.region_id,
          });
        }}>
        <View
          style={H.ObjAss(
            {height: 60, backgroundColor: '#ddd'},
            style.center,
            style.flex_0,
            style.mar_20,
          )}>
          <Text style={style.txt_c}>{txt.objekti}</Text>
        </View>
      </TouchableOpacity>
    ) : null;
    const odmori = Korisnik.imaPravo(918) ? (
      <TouchableOpacity
        onPress={() => {
          params.navigation.navigate('Odmori_odsustva_home', {
            entitet: routeParams.entitet,
            odabir: 1,
          });
        }}>
        <View
          style={H.ObjAss(
            {height: 60, backgroundColor: '#ddd'},
            style.center,
            style.flex_0,
            style.mar_20,
          )}>
          <Text style={style.txt_c}>{txt.odmori}</Text>
        </View>
      </TouchableOpacity>
    ) : null;
    const odsustva = Korisnik.imaPravo(919) ? (
      <TouchableOpacity
        onPress={() => {
          params.navigation.navigate('Odmori_odsustva_home', {
            entitet: routeParams.entitet,
            odabir: 0,
          });
        }}>
        <View
          style={H.ObjAss(
            {height: 60, backgroundColor: '#ddd'},
            style.center,
            style.flex_0,
            style.mar_20,
          )}>
          <Text style={style.txt_c}>{txt.odsustva}</Text>
        </View>
      </TouchableOpacity>
    ) : null;

    return (
      <View style={H.ObjAss({}, style.column, style.flex_1, style.center)}>
        {unosRadnika}
        {korekcijaRadnogVremena}
        {objekti}
        {odsustva}
        {odmori}
      </View>
    );
  }
}
