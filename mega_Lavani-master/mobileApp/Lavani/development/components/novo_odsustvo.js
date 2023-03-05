import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

export default class Novo_odsustvo extends Component {
  constructor(props) {
    super(props);
    this.H = props.params.Helper;
    this.Con = props.params.Config;
    this.navigation = props.params.navigation;
    this.txt = props.params.txt;

    this.state = {};
    this.godina = props.params.route.params.godina;
    this.idRadnik = props.params.route.params.idRadnik;
    this.radnik_ime = props.params.route.params.radnik_ime;
    this.idOdsustvo =
      props.params.route.params.idOdsustvo != undefined
        ? props.params.route.params.idOdsustvo
        : '';
    this.entitet = props.params.route.params.entitet;
    //sifarnici
    this.sifVrstaOdsustva = [];
  }

  getOdsustvoData = () => {
    if (this.idOdsustvo != '') {
      this.H.callFetch({
        url: this.Con.endpoint + 'odsustva.cfc?method=get',
        data: {
          id: this.idOdsustvo,
          entitet: this.entitet,
          godina: this.godina,
        },
        func: res => {
          const data = res.DATA[0];
          this.props.params.set.sifVrstaOdsustva({
            value: data[2],
            label: data[7],
          });
          this.props.params.set.dod_d(new Date(data[3]).getDate());
          this.props.params.set.dod_m(new Date(data[3]).getMonth() + 1);
          this.props.params.set.dod_y(new Date(data[3]).getFullYear());
          if(data[4]) {
			  this.props.params.set.ddo_d(new Date(data[4]).getDate());
			  this.props.params.set.ddo_m(new Date(data[4]).getMonth() + 1);
			  this.props.params.set.ddo_y(new Date(data[4]).getFullYear());
		  }
		  else {
			   this.props.params.set.ddo_d('');
			   this.props.params.set.ddo_m('');
			   this.props.params.set.ddo_y('');
		  }
          //this.props.params.set.ddo_m(new Date(data[4]).getMonth() + 1);
          //this.props.params.set.ddo_y(new Date(data[4]).getFullYear());
          //this.props.params.set.brojDana(data[5]);
          this.props.params.set.napomena(data[6]);
        },
      });
    }
  };

  getSif = (sif, sifarnik) => {
    this.H.callFetch({
      url: this.Con.endpoint + 'sifarnici.cfc?method=get',
      data: {
        sifarnik: sifarnik,
        entitet: this.entitet,
      },
      func: res => {
        let result = [];
        res.DATA.forEach(el => {
          result.push({
            label: el[1],
            value: el[0],
          });
        });
        this[sif] = result;
        this.setState({sif: sifarnik});
      },
    });
  };

  izracunajBrDana = () => {
    let dan1, mesec1, dan2, mesec2;
    dan1 =
      String(this.props.params.get.dod_d).length < 2
        ? '0' + this.props.params.get.dod_d
        : this.props.params.get.dod_d;
    mesec1 =
      String(this.props.params.get.dod_m).length < 2
        ? '0' + this.props.params.get.dod_m
        : this.props.params.get.dod_m;
    const datum_od = new Date(
      `${this.props.params.get.dod_y}-${mesec1}-${dan1}`,
    ).getTime();
    dan2 =
      String(this.props.params.get.ddo_d).length < 2
        ? '0' + this.props.params.get.ddo_d
        : this.props.params.get.ddo_d;
    mesec2 =
      String(this.props.params.get.ddo_m).length < 2
        ? '0' + this.props.params.get.ddo_m
        : this.props.params.get.ddo_m;
    const datum_do = new Date(
      `${this.props.params.get.ddo_y}-${mesec2}-${dan2}`,
    ).getTime();
    if (datum_do) {
      if (datum_od > datum_do)
        Alert.alert(this.txt.upozorenje, this.txt.datum_manji);
      else {
        this.H.callFetch({
          url: this.Con.endpoint + 'odsustva.cfc?method=getBrojDana',
          data: {
            datum_od: `${dan1}/${mesec1}/${this.props.params.get.dod_y}`,
            datum_do: `${dan2}/${mesec2}/${this.props.params.get.ddo_y}`,
            entitet: this.entitet,
          },
          func: data => {
            this.props.params.set.brojDana(data);
          },
        });
      }
    } else {
      this.props.params.set.brojDana('');
      Alert.alert(this.txt.upozorenje, 'Nije unet datum do');
    }
  };

  componentDidMount() {
    this.getSif('sifVrstaOdsustva', 'EZ_SIF_VRSTA_ODSUSTVA');
    this.getOdsustvoData();
  }

  render() {
    const params = this.props.params;
    const style = params.style;
    const txt = this.txt;
    return (
      <View style={this.H.ObjAss({}, style.column, style.flex_1)}>
        <View
          style={this.H.ObjAss(
            {height: 50, borderBottomWidth: 1},
            style.center,
            style.flex_0,
          )}>
          <Text style={this.H.ObjAss({fontSize: 16}, style.txt_c)}>
            {txt.radnik}: {this.radnik_ime}
          </Text>
        </View>
        <View style={style.flex_1}>
          <ScrollView>
            <View style={this.H.ObjAss({}, style.mar_15, style.column)}>
              <Text>{txt.godina}:</Text>
              <TextInput
                style={this.H.ObjAss({height: 50, borderWidth: 1}, style.txt_c)}
                placeholder={txt.godina}
                value={this.godina}
                editable={false}
              />
            </View>
            <View style={this.H.ObjAss({}, style.mar_15, style.column)}>
              <Text>{txt.vrsta_odsustva}:</Text>
              <View
                style={this.H.ObjAss(
                  {height: 50, borderWidth: 1},
                  style.txt_c,
                )}>
                <RNPickerSelect
                  onValueChange={(value, index) => {
                    params.set.sifVrstaOdsustva({
                      value: value,
                      label: this.sifVrstaOdsustva[index - 1].label,
                    });
                  }}
                  items={this.sifVrstaOdsustva}
                  value={params.get.sifVrstaOdsustva.value}
                  useNativeAndroidPickerStyle={false}
                  placeholder={{label: txt.vrsta_odsustva}}
                />
              </View>
            </View>
            <View style={this.H.ObjAss({}, style.column)}>
              <Text style={style.padd_15}>{txt.datum_od}:</Text>
              <View style={this.H.ObjAss({}, style.row, style.center)}>
                <View>
                  <Text style={style.txt_c}>{txt.dan}</Text>
                  <TextInput
                    style={this.H.ObjAss(
                      {height: 50, width: 50, borderWidth: 1},
                      style.mar_15,
                      style.txt_c,
                    )}
                    placeholder={txt.staz_dan}
                    onChangeText={value => {
                      params.set.dod_d(value);
                    }}
                    value={params.get.dod_d.toString()}
                    maxLength={2}
                    keyboardType="phone-pad"
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
                    placeholder={txt.staz_mesec}
                    onChangeText={value => {
                      params.set.dod_m(value);
                    }}
                    value={params.get.dod_m.toString()}
                    maxLength={2}
                    keyboardType="phone-pad"
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
                    placeholder={txt.staz_godina}
                    onChangeText={value => {
                      params.set.dod_y(value);
                    }}
                    value={params.get.dod_y.toString()}
                    maxLength={4}
                    keyboardType="phone-pad"
                  />
                </View>
              </View>
            </View>
            <View style={this.H.ObjAss({}, style.column)}>
              <Text style={style.padd_15}>{txt.datum_do}:</Text>
              <View style={this.H.ObjAss({}, style.row, style.center)}>
                <View>
                  <Text style={style.txt_c}>{txt.dan}</Text>
                  <TextInput
                    style={this.H.ObjAss(
                      {height: 50, width: 50, borderWidth: 1},
                      style.mar_15,
                      style.txt_c,
                    )}
                    placeholder={txt.staz_dan}
                    onChangeText={value => {
                      params.set.ddo_d(value);
                    }}
                    value={params.get.ddo_d.toString()}
                    maxLength={2}
                    keyboardType="phone-pad"
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
                    placeholder={txt.staz_mesec}
                    onChangeText={value => {
                      params.set.ddo_m(value);
                    }}
                    value={params.get.ddo_m.toString()}
                    maxLength={2}
                    keyboardType="phone-pad"
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
                    placeholder={txt.staz_godina}
                    onChangeText={value => {
                      params.set.ddo_y(value);
                    }}
                    value={params.get.ddo_y.toString()}
                    maxLength={4}
                    keyboardType="phone-pad"
                  />
                </View>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                this.izracunajBrDana();
              }}>
              <View
                style={this.H.ObjAss(
                  {height: 50, backgroundColor: '#ddd'},
                  style.mar_15,
                  style.center,
                )}>
                <Text style={style.txt_c}>{txt.izracunaj_broj_dana}</Text>
              </View>
            </TouchableOpacity>
            <View style={this.H.ObjAss({}, style.mar_15, style.column)}>
              <Text>{txt.broj_dana}:</Text>
              <TextInput
                style={this.H.ObjAss({height: 50, borderWidth: 1}, style.txt_c)}
                placeholder={txt.broj_dana}
                onChangeText={value => {
                  params.set.brojDana(value);
                }}
                value={String(params.get.brojDana)}
                editable={false}
              />
            </View>
            <View style={this.H.ObjAss({}, style.mar_15, style.column)}>
              <Text>{txt.napomena}:</Text>
              <TextInput
                style={this.H.ObjAss(
                  {height: 180, borderWidth: 1},
                  style.padd_15,
                )}
                placeholder={txt.napomena}
                onChangeText={value => {
                  params.set.napomena(value);
                }}
                value={String(params.get.napomena)}
                multiline={true}
                numberOfLines={15}
              />
            </View>
          </ScrollView>
        </View>
        <TouchableOpacity
          onPress={() => {
            if (
              params.get.sifVrstaOdsustva.value == '' ||
              params.get.dod_d == '' ||
              params.get.dod_m == '' ||
              params.get.dod_y == ''
              //params.get.ddo_d == '' ||
              //params.get.ddo_m == '' ||
              //params.get.ddo_y == ''
            )
              Alert.alert(txt.upozorenje, txt.popunite_sva_polja);
            else {
              let dan1, mesec1, dan2, mesec2;
              dan1 =
                String(this.props.params.get.dod_d).length < 2
                  ? '0' + this.props.params.get.dod_d
                  : this.props.params.get.dod_d;
              mesec1 =
                String(this.props.params.get.dod_m).length < 2
                  ? '0' + this.props.params.get.dod_m
                  : this.props.params.get.dod_m;

              dan2 =
                (String(this.props.params.get.ddo_d).length < 2   &&    String(this.props.params.get.ddo_d).length   >  0   )    
                  ? '0' + this.props.params.get.ddo_d
                  : this.props.params.get.ddo_d;

              mesec2 =
                (String(this.props.params.get.ddo_m).length < 2   &&   String(this.props.params.get.ddo_m).length  >  0    )
                  ? '0' + this.props.params.get.ddo_m
                  : this.props.params.get.ddo_m;
              if (dan2 !== '0') {
                this.izracunajBrDana();
              }
              this.H.callFetch({
                url: this.Con.endpoint + 'odsustva.cfc?method=ins_upd',
                data: {
                  id: this.idOdsustvo,
                  idRadnik: this.idRadnik,
                  entitet: this.entitet,
                  godina: this.godina,
                  brojDana: params.get.brojDana,
                  datum_od: `${dan1}/${mesec1}/${params.get.dod_y}`,
                  datum_do: `${dan2}/${mesec2}/${params.get.ddo_y}`,
                  sifVrstaOdsustva: params.get.sifVrstaOdsustva.value,
                  napomena: params.get.napomena,
                },
                func: res => {
                  if (res) {
                    this.H.callFetch({
                      url: this.Con.endpoint + 'odsustva.cfc?method=getAll',
                      data: {idRadnik: this.idRadnik},
                      func: res => {
                        params.route.params.refresh(res.DATA);
                        Alert.alert(txt.obavestenje, txt.uspesno_sacuvano);
                        params.navigation.navigate('Odsustvo_unos_edit', {
                          entitet: this.entitet,
                        });
                      },
                    });
                  } else Alert.alert(txt.upozorenje, txt.postoji_godisnji);
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
