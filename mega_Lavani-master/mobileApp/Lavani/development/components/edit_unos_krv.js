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

  ins_upd = params => {
    this.H.callFetch({
      url: this.Con.endpoint + 'korekcija_rv.cfc?method=ins_upd',
      data: {
        entitet: this.entitet,
        idKRV: this.idKRV,
        idUgovor: this.idUgovor,
        brSati: params.get.broj_sati,
        napomena: params.get.napomena,
        datum_od: `${params.get.godinaOd}-${params.get.mesecOd}-${
          params.get.danOd
        }`,
        datum_do: `${params.get.godinaDo}-${params.get.mesecDo}-${
          params.get.danDo
        }`,
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

  getKorekcijaByID() {
    this.H.callFetch({
      url: this.Con.endpoint + 'korekcija_rv.cfc?method=getByID',
      data: {idKRV: this.idKRV},
      func: res => {
        const result = res.DATA[0];
        this.props.params.set.broj_sati(result[0]);
        console.log(result[0]);
        this.props.params.set.napomena(result[3]);
        this.props.params.set.godinaOd(new Date(result[1]).getFullYear());
        this.props.params.set.mesecOd(new Date(result[1]).getMonth() + 1);
        this.props.params.set.danOd(new Date(result[1]).getDate());
        this.props.params.set.godinaDo(new Date(result[2]).getFullYear());
        this.props.params.set.mesecDo(new Date(result[2]).getMonth() + 1);
        this.props.params.set.danDo(new Date(result[2]).getDate());
      },
    });
  }

  componentDidMount() {
    if (this.idKRV != '') this.getKorekcijaByID();
  }

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
                value={params.get.broj_sati.toString()}
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
                    keyboardType="phone-pad"
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
                    keyboardType="phone-pad"
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
                    keyboardType="phone-pad"
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
                    keyboardType="phone-pad"
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
                    keyboardType="phone-pad"
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
                    keyboardType="phone-pad"
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
              this.ins_upd(params);
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
