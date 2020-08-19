import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  TextInput,
  ScrollView,
} from 'react-native';

export default class Edit_unos_krv extends Component {
  constructor(props) {
    super(props);
    this.H = props.params.Helper;
    this.Con = props.params.Config;
    this.navigation = props.params.navigation;
    this.txt = props.params.txt;
    this.idUgovor = props.params.route.params.idUgovor;
    this.state = {};
    this.idKRV =
      props.params.route.params.idKRV != undefined
        ? props.params.route.params.idKRV
        : '';
    this.entitet = props.params.route.params.entitet;
    this.idRadnik = props.params.route.params.idRadnik;
    this.radnikIme = props.params.route.params.radnikIme;
    this.idUgovor = props.params.route.params.idUgovor;
    this.ugovorNaziv = props.params.route.params.ugovorNaziv;
  }

  ins_upd = () => {
    this.H.callFetch({
      url: this.Con.endpoint + 'korekcija_rv.cfc?method=ins_upd',
      data: {
        idKRV: this.idKRV,
        entitet: this.entitet,
        napomena: this.props.params.get.napomena,
        datum_od: this.props.params.get.datum_od,
        datum_do: this.props.params.get.datum_do,
        broj_sati: this.props.params.get.broj_sati,
      },
      func: res => {
        if (res) {
          this.H.callFetch({
            url: this.Con.endpoint + 'korekcija_rv.cfc?method=getAll',
            data: {idUgovor: this.idUgovor},
            func: res2 => {
              this.props.params.route.params.refresh(res2.DATA);
              Alert.alert(this.txt.obavestenje, this.txt.uspesno_sacuvano);
              this.props.params.navigation.navigate('Korekcija_rv_list', {
                entitet: this.entitet,
                idRadnik: this.idRadnik,
                radnikIme: this.radnikIme,
                idUgovor: this.idUgovor,
                ugovorNaziv: this.ugovorNaziv,
              });
            },
          });
        } else Alert.alert(this.txt.upozorenje, this.txt.ne_sme_da_smaji_rm);
      },
    });
  };

  render() {
    const params = this.props.params;
    const style = params.style;
    const txt = this.txt;
    const H = params.Helper;
    const Con = params.Config;
    const routeParams = params.route.params;
    return (
      <View style={H.ObjAss({}, style.flex_1, style.padd_15)}>
        <View style={style.flex_1}>
          <ScrollView>
            <View style={this.H.ObjAss({}, style.mar_15, style.column)}>
              <Text>* {txt.broj_sati}:</Text>
              <TextInput
                style={H.ObjAss({height: 50, borderWidth: 1}, style.txt_c)}
                placeholder={txt.broj_sati}
                onChangeText={value => {
                  params.set.broj_sati(value);
                }}
                value={params.get.broj_sati}
                keyboardType="phone-pad"
              />
            </View>
            <View style={this.H.ObjAss({}, style.column)}>
              <Text style={style.padd_15}>* {txt.datum_od}:</Text>
              <View style={this.H.ObjAss({}, style.row, style.center)}>
                <View>
                  <Text style={style.txt_c}>{txt.dan}</Text>
                  <TextInput
                    style={this.H.ObjAss(
                      {height: 50, width: 50, borderWidth: 1},
                      style.mar_15,
                      style.txt_c,
                    )}
                    placeholder={txt.dan}
                    onChangeText={value => {
                      params.set.danOd(value);
                    }}
                    value={params.get.danOd.toString()}
                    maxLength={2}
                  />
                </View>
                <View>
                  <Text style={style.txt_c}>{txt.mesec}</Text>
                  <TextInput
                    style={this.H.ObjAss(
                      {height: 50, width: 50, borderWidth: 1},
                      style.mar_15,
                      style.txt_c,
                    )}
                    placeholder={txt.mesec}
                    onChangeText={value => {
                      params.set.mesecOd(value);
                    }}
                    value={params.get.mesecOd.toString()}
                    maxLength={2}
                  />
                </View>
                <View>
                  <Text style={style.txt_c}>{txt.godina}</Text>
                  <TextInput
                    style={this.H.ObjAss(
                      {height: 50, width: 100, borderWidth: 1},
                      style.mar_15,
                      style.txt_c,
                    )}
                    placeholder={txt.godina}
                    onChangeText={value => {
                      params.set.godinaOd(value);
                    }}
                    value={params.get.godinaOd.toString()}
                    maxLength={4}
                  />
                </View>
              </View>
            </View>
            <View style={this.H.ObjAss({}, style.column)}>
              <Text style={style.padd_15}>* {txt.datum_do}:</Text>
              <View style={this.H.ObjAss({}, style.row, style.center)}>
                <View>
                  <Text style={style.txt_c}>{txt.dan}</Text>
                  <TextInput
                    style={this.H.ObjAss(
                      {height: 50, width: 50, borderWidth: 1},
                      style.mar_15,
                      style.txt_c,
                    )}
                    placeholder={txt.dan}
                    onChangeText={value => {
                      params.set.danDo(value);
                    }}
                    value={params.get.danDo.toString()}
                    maxLength={2}
                  />
                </View>
                <View>
                  <Text style={style.txt_c}>{txt.mesec}</Text>
                  <TextInput
                    style={this.H.ObjAss(
                      {height: 50, width: 50, borderWidth: 1},
                      style.mar_15,
                      style.txt_c,
                    )}
                    placeholder={txt.mesec}
                    onChangeText={value => {
                      params.set.mesecDo(value);
                    }}
                    value={params.get.mesecDo.toString()}
                    maxLength={2}
                  />
                </View>
                <View>
                  <Text style={style.txt_c}>{txt.godina}</Text>
                  <TextInput
                    style={this.H.ObjAss(
                      {height: 50, width: 100, borderWidth: 1},
                      style.mar_15,
                      style.txt_c,
                    )}
                    placeholder={txt.godina}
                    onChangeText={value => {
                      params.set.godinaDo(value);
                    }}
                    value={params.get.godinaDo.toString()}
                    maxLength={4}
                  />
                </View>
              </View>
            </View>
            <View style={this.H.ObjAss({}, style.mar_15, style.column)}>
              <Text>{txt.napomena}:</Text>
              <TextInput
                style={H.ObjAss({height: 50, borderWidth: 1}, style.txt_c)}
                placeholder={txt.napomena}
                onChangeText={value => {
                  params.set.napomena(value);
                }}
                value={params.get.napomena}
              />
            </View>
          </ScrollView>
        </View>
        <TouchableOpacity
          onPress={() => {
            if (
              params.get.broj_sati == '' ||
              params.get.danOd == '' ||
              params.get.mesecOd == '' ||
              params.get.godinaOd == '' ||
              params.get.danDo == '' ||
              params.get.mesecDo == '' ||
              params.get.godinaDo == ''
            )
              Alert.alert(txt.upozorenje, txt.popunite_sva_polja);
            else {
              this.H.callFetch({
                url: this.Con.endpoint + 'korekcija_rv.cfc?method=ins_upd',
                data: {
                  idKRV: this.idKRV,
                  brSati: params.get.broj_sati,
                  napomna: params.get.napomena,
                  datum_od: `${params.get.godinaOd}-${params.get.mesecOd}-${
                    params.get.danOd
                  }`,
                  datum_do: `${params.get.godinaDo}-${params.get.mesecDo}-${
                    params.get.danDo
                  }`,
                  entitet: this.entitet,
                },
                func: res => {
                  Alert.alert(txt.obavestenje, txt.molim_sacekajte);
                  this.ins_upd();
                },
              });
            }
          }}>
          <View
            style={this.H.ObjAss(
              {height: 50, backgroundColor: '#ddd'},
              style.center,
              style.flex_0,
            )}>
            <Text style={style.txt_c}>{txt.sacuvaj}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
