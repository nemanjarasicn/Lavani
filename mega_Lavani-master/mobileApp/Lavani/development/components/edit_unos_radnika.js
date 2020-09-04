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
//import FilePickerManager from 'react-native-file-picker';
import DocumentPicker from 'react-native-document-picker';

export default class Edit_unos_radnika extends Component {
  constructor(props) {
    super(props);
    this.H = props.params.Helper;
    this.Con = props.params.Config;
    this.navigation = props.params.navigation;

    this.state = {};
    this.idRadnik =
      props.params.route.params.idRadnik != undefined
        ? props.params.route.params.idRadnik
        : '';
    this.entitet = props.params.route.params.entitet;

    //sifarnici
    this.firma = [];
    this.strucnaSprema = [];
    this.vrstaZaposlenja = [];
  }

  izracunajUkupniStaz = (d_u = 0, m_u = 0, y_u = 0) => {
    const xx = d_u / 30;
    const zz = xx.toString();
    const yy = zz.indexOf('.');
    const hh = zz.substring(0, yy);
    if (m_u >= 12) {
      y_u = y_u + 1;
      m_u = m_u - 12;
    }
    if (d_u > 30) {
      m_u = m_u + parseInt(hh);
      d_u = d_u - 30 * parseInt(hh);
      if (m_u >= 12) {
        y_u = y_u + 1;
        m_u = m_u - 12;
      }
    }
    this.props.params.set.stazDan_u(d_u);
    this.props.params.set.stazMesec_u(m_u);
    this.props.params.set.stazGodina_u(y_u);
  };

  getKorisnikData = () => {
    if (this.idRadnik != '') {
      this.H.callFetch({
        url: this.Con.endpoint + 'radnik.cfc?method=get',
        data: {id: this.idRadnik},
        func: res => {
          const data = res[0].DATA[0];
          this.props.params.set.ime(data[1]);
          this.props.params.set.prezime(data[2]);
          this.props.params.set.jmbg(data[3]);
          this.props.params.set.lk(data[4]);
          this.props.params.set.dokumentList(res[2]);
          if (data[5] != '') {
            this.props.params.set.dr_d(`${new Date(data[5]).getDate()}`);
            this.props.params.set.dr_m(`${new Date(data[5]).getMonth() + 1}`);
            this.props.params.set.dr_y(`${new Date(data[5]).getFullYear()}`);
          } else {
            this.props.params.set.dr_d('');
            this.props.params.set.dr_m('');
            this.props.params.set.dr_y('');
          }
          if (data[6] != '') {
            this.props.params.set.dp_d(`${new Date(data[6]).getDate()}`);
            this.props.params.set.dp_m(`${new Date(data[6]).getMonth() + 1}`);
            this.props.params.set.dp_y(`${new Date(data[6]).getFullYear()}`);
          } else {
            this.props.params.set.dp_d('');
            this.props.params.set.dp_m('');
            this.props.params.set.dp_y('');
          }
          if (data[7] != '') {
            this.props.params.set.dpr_d(`${new Date(data[7]).getDate()}`);
            this.props.params.set.dpr_m(`${new Date(data[7]).getMonth() + 1}`);
            this.props.params.set.dpr_y(`${new Date(data[7]).getFullYear()}`);
          } else {
            this.props.params.set.dpr_d('');
            this.props.params.set.dpr_m('');
            this.props.params.set.dpr_y('');
          }
          this.props.params.set.strucnaSprema({value: data[8], label: ''});
          this.props.params.set.firma({value: data[17], label: ''});
          this.props.params.set.vrstaZaposlenja({value: data[10], label: ''});
          //staz
          //prethodni
          if (res[1][0] != '') this.props.params.set.stazDan(res[1][0]);
          else this.props.params.set.stazDan(0);
          if (res[1][1] != '') this.props.params.set.stazMesec(res[1][1]);
          else this.props.params.set.stazMesec(0);
          if (res[1][2] != '') this.props.params.set.stazGodina(res[1][2]);
          else this.props.params.set.stazGodina(0);
          //tekuci
          this.props.params.set.stazDan_t(res[1][3]);
          this.props.params.set.stazMesec_t(res[1][4]);
          this.props.params.set.stazGodina_t(res[1][5]);
          //ukupno
          this.izracunajUkupniStaz(res[1][6], res[1][7], res[1][8]);
        },
      });
    } else {
      this.props.params.set.stazDan(0);
      this.props.params.set.stazMesec(0);
      this.props.params.set.stazGodina(0);
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

  izracunajStaz = (d = 0, m = 0, y = 0) => {
    const kraj =
      this.props.params.get.dpr_d != '' &&
      this.props.params.get.dpr_m != '' &&
      this.props.params.get.dpr_y != ''
        ? `${this.props.params.get.dpr_d}-${this.props.params.get.dpr_m}-${
            this.props.params.get.dpr_y
          }`
        : '';
    //tekuci
    this.H.callFetch({
      url: this.Con.endpoint + 'radnik.cfc?method=tekuciStaz',
      data: {
        pocetak: `${this.props.params.get.dp_d}-${this.props.params.get.dp_m}-${
          this.props.params.get.dp_y
        }`,
        kraj: kraj,
      },
      func: res => {
        this.props.params.set.stazDan_t(res[0]);
        this.props.params.set.stazMesec_t(res[1]);
        this.props.params.set.stazGodina_t(res[2]);
        //ukupno
        this.izracunajUkupniStaz(
          parseInt(d) + parseInt(res[0]),
          parseInt(m) + parseInt(res[1]),
          parseInt(y) + parseInt(res[2]),
        );
      },
    });
  };

  componentDidMount() {
    this.getSif('strucnaSprema', 'EZ_SIF_STRUCNA_SPREMA');
    this.getSif('firma', 'EZ_FIRME');
    this.getSif('vrstaZaposlenja', 'EZ_SIF_VRSTE_ZAPOSLENJA');
    this.getKorisnikData();
  }

  render() {
    const params = this.props.params;
    const style = params.style;
    const txt = params.txt;
    return (
      <View style={this.H.ObjAss({}, style.column, style.flex_1)}>
        <View style={this.H.ObjAss({height: 50}, style.center, style.flex_0)}>
          <Text style={this.H.ObjAss({fontSize: 16}, style.txt_c)}>
            {txt.radnik}: {params.get.ime} {params.get.prezime}
          </Text>
        </View>
        <View style={style.flex_1}>
          <ScrollView>
            <View style={this.H.ObjAss({}, style.mar_15, style.column)}>
              <Text>{txt.ime}:</Text>
              <TextInput
                style={this.H.ObjAss({height: 50, borderWidth: 1}, style.txt_c)}
                placeholder={txt.ime}
                onChangeText={value => {
                  params.set.ime(value);
                }}
                value={params.get.ime}
              />
            </View>
            <View style={this.H.ObjAss({}, style.mar_15, style.column)}>
              <Text>{txt.prezime}:</Text>
              <TextInput
                style={this.H.ObjAss({height: 50, borderWidth: 1}, style.txt_c)}
                placeholder={txt.prezime}
                onChangeText={value => {
                  params.set.prezime(value);
                }}
                value={params.get.prezime}
              />
            </View>
            <View style={this.H.ObjAss({}, style.column)}>
              <Text style={style.padd_15}>{txt.datum_rodjenja}:</Text>
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
                      params.set.dr_d(value);
                    }}
                    value={params.get.dr_d.toString()}
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
                      params.set.dr_m(value);
                    }}
                    value={params.get.dr_m.toString()}
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
                      params.set.dr_y(value);
                    }}
                    value={params.get.dr_y.toString()}
                    maxLength={4}
                    keyboardType="phone-pad"
                  />
                </View>
              </View>
            </View>
            <View style={this.H.ObjAss({}, style.mar_15, style.column)}>
              <Text>{txt.jmbg}:</Text>
              <TextInput
                style={this.H.ObjAss({height: 50, borderWidth: 1}, style.txt_c)}
                placeholder={txt.jmbg}
                onChangeText={value => {
                  params.set.jmbg(value);
                }}
                value={params.get.jmbg}
              />
            </View>
            <View style={this.H.ObjAss({}, style.mar_15, style.column)}>
              <Text>{txt.lk}:</Text>
              <TextInput
                style={this.H.ObjAss({height: 50, borderWidth: 1}, style.txt_c)}
                placeholder={txt.lk}
                onChangeText={value => {
                  params.set.lk(value);
                }}
                value={params.get.lk}
              />
            </View>
            <View style={this.H.ObjAss({}, style.mar_15, style.column)}>
              <Text>{txt.strucna_sprema}:</Text>
              <View
                style={this.H.ObjAss(
                  {height: 50, borderWidth: 1},
                  style.txt_c,
                )}>
                <RNPickerSelect
                  onValueChange={(value, index) => {
                    params.set.strucnaSprema({
                      value: value,
                      label:
                        index !== 0 ? this.strucnaSprema[index - 1].label : '',
                    });
                  }}
                  items={this.strucnaSprema}
                  value={params.get.strucnaSprema.value}
                  useNativeAndroidPickerStyle={false}
                  placeholder={{label: txt.strucna_sprema}}
                />
              </View>
            </View>
            <View style={this.H.ObjAss({}, style.mar_15, style.column)}>
              <Text>{txt.firma}:</Text>
              <View
                style={this.H.ObjAss(
                  {height: 50, borderWidth: 1},
                  style.txt_c,
                )}>
                <RNPickerSelect
                  onValueChange={(value, index) => {
                    params.set.firma({
                      value: value,
                      label: index !== 0 ? this.firma[index - 1].label : '',
                    });
                  }}
                  items={this.firma}
                  value={params.get.firma.value}
                  useNativeAndroidPickerStyle={false}
                />
              </View>
            </View>
            <View style={this.H.ObjAss({}, style.mar_15, style.column)}>
              <Text>{txt.vrsta_zaposlenja}:</Text>
              <View
                style={this.H.ObjAss(
                  {height: 50, borderWidth: 1},
                  style.txt_c,
                )}>
                <RNPickerSelect
                  onValueChange={(value, index) => {
                    params.set.vrstaZaposlenja({
                      value: value,
                      label:
                        index !== 0
                          ? this.vrstaZaposlenja[index - 1].label
                          : '',
                    });
                  }}
                  items={this.vrstaZaposlenja}
                  value={params.get.vrstaZaposlenja.value}
                  useNativeAndroidPickerStyle={false}
                  placeholder={{label: txt.vrsta_zaposlenja}}
                />
              </View>
            </View>
            <View style={this.H.ObjAss({}, style.column)}>
              <Text style={style.padd_15}>{txt.datum_pocetka_rada}:</Text>
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
                      params.set.dp_d(value);
                    }}
                    value={params.get.dp_d.toString()}
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
                      params.set.dp_m(value);
                    }}
                    value={params.get.dp_m.toString()}
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
                      params.set.dp_y(value);
                    }}
                    value={params.get.dp_y.toString()}
                    maxLength={4}
                    keyboardType="phone-pad"
                  />
                </View>
              </View>
            </View>
            <View style={this.H.ObjAss({}, style.column)}>
              <Text style={style.padd_15}>{txt.datum_prestanka_rada}:</Text>
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
                      params.set.dpr_d(value);
                    }}
                    value={params.get.dpr_d.toString()}
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
                      params.set.dpr_m(value);
                    }}
                    value={params.get.dpr_m.toString()}
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
                      params.set.dpr_y(value);
                    }}
                    value={params.get.dpr_y.toString()}
                    maxLength={4}
                    keyboardType="phone-pad"
                  />
                </View>
              </View>
            </View>
            <View style={this.H.ObjAss({}, style.column)}>
              <Text style={style.padd_15}>{txt.prethodni_staz}:</Text>
              <View style={this.H.ObjAss({}, style.row, style.center)}>
                <View>
                  <Text style={style.txt_c}>{txt.staz_dan}</Text>
                  <TextInput
                    style={this.H.ObjAss(
                      {height: 50, width: 50, borderWidth: 1},
                      style.mar_15,
                      style.txt_c,
                    )}
                    placeholder={txt.staz_dan}
                    onChangeText={value => {
                      params.set.stazDan(value);
                    }}
                    value={params.get.stazDan.toString()}
                    maxLength={2}
                    keyboardType="phone-pad"
                  />
                </View>
                <View>
                  <Text style={style.txt_c}>{txt.staz_mesec}</Text>
                  <TextInput
                    style={this.H.ObjAss(
                      {height: 50, width: 50, borderWidth: 1},
                      style.mar_15,
                      style.txt_c,
                    )}
                    placeholder={txt.staz_mesec}
                    onChangeText={value => {
                      params.set.stazMesec(value);
                    }}
                    value={params.get.stazMesec.toString()}
                    maxLength={2}
                    keyboardType="phone-pad"
                  />
                </View>
                <View>
                  <Text style={style.txt_c}>{txt.staz_godina}</Text>
                  <TextInput
                    style={this.H.ObjAss(
                      {height: 50, width: 100, borderWidth: 1},
                      style.mar_15,
                      style.txt_c,
                    )}
                    placeholder={txt.staz_godina}
                    onChangeText={value => {
                      params.set.stazGodina(value);
                    }}
                    value={params.get.stazGodina.toString()}
                    maxLength={4}
                    keyboardType="phone-pad"
                  />
                </View>
              </View>
              <TouchableOpacity
                onPress={() => {
                  this.izracunajStaz(
                    params.get.stazDan,
                    params.get.stazMesec,
                    params.get.stazGodina,
                  );
                }}>
                <View
                  style={this.H.ObjAss(
                    {height: 50, backgroundColor: '#ddd'},
                    style.mar_15,
                    style.center,
                  )}>
                  <Text style={style.txt_c}>{txt.izracunaj_staz}</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={this.H.ObjAss({}, style.column)}>
              <Text style={style.padd_15}>{txt.tekuci_staz}:</Text>
              <View style={this.H.ObjAss({}, style.row, style.center)}>
                <View>
                  <Text style={style.txt_c}>{txt.staz_dan}</Text>
                  <TextInput
                    style={this.H.ObjAss(
                      {height: 50, width: 50, borderWidth: 1},
                      style.mar_15,
                      style.txt_c,
                    )}
                    placeholder={txt.staz_dan}
                    onChangeText={value => {
                      params.set.stazDan_t(value);
                    }}
                    value={params.get.stazDan_t.toString()}
                    maxLength={2}
                    editable={false}
                  />
                </View>
                <View>
                  <Text style={style.txt_c}>{txt.staz_mesec}</Text>
                  <TextInput
                    style={this.H.ObjAss(
                      {height: 50, width: 50, borderWidth: 1},
                      style.mar_15,
                      style.txt_c,
                    )}
                    placeholder={txt.staz_mesec}
                    onChangeText={value => {
                      params.set.stazMesec_t(value);
                    }}
                    value={params.get.stazMesec_t.toString()}
                    maxLength={2}
                    editable={false}
                  />
                </View>
                <View>
                  <Text style={style.txt_c}>{txt.staz_godina}</Text>
                  <TextInput
                    style={this.H.ObjAss(
                      {height: 50, width: 100, borderWidth: 1},
                      style.mar_15,
                      style.txt_c,
                    )}
                    placeholder={txt.staz_godina}
                    onChangeText={value => {
                      params.set.stazGodina_t(value);
                    }}
                    value={params.get.stazGodina_t.toString()}
                    maxLength={4}
                    editable={false}
                  />
                </View>
              </View>
            </View>
            <View style={this.H.ObjAss({}, style.column)}>
              <Text style={style.padd_15}>{txt.ukupni_staz}:</Text>
              <View style={this.H.ObjAss({}, style.row, style.center)}>
                <View>
                  <Text style={style.txt_c}>{txt.staz_dan}</Text>
                  <TextInput
                    style={this.H.ObjAss(
                      {height: 50, width: 50, borderWidth: 1},
                      style.mar_15,
                      style.txt_c,
                    )}
                    placeholder={txt.staz_dan}
                    onChangeText={value => {
                      params.set.stazDan_u(value);
                    }}
                    value={params.get.stazDan_u.toString()}
                    maxLength={2}
                    keyboardType="phone-pad"
                    editable={false}
                  />
                </View>
                <View>
                  <Text style={style.txt_c}>{txt.staz_mesec}</Text>
                  <TextInput
                    style={this.H.ObjAss(
                      {height: 50, width: 50, borderWidth: 1},
                      style.mar_15,
                      style.txt_c,
                    )}
                    placeholder={txt.staz_mesec}
                    onChangeText={value => {
                      params.set.stazMesec_u(value);
                    }}
                    value={params.get.stazMesec_u.toString()}
                    maxLength={2}
                    keyboardType="phone-pad"
                    editable={false}
                  />
                </View>
                <View>
                  <Text style={style.txt_c}>{txt.staz_godina}</Text>
                  <TextInput
                    style={this.H.ObjAss(
                      {height: 50, width: 100, borderWidth: 1},
                      style.mar_15,
                      style.txt_c,
                    )}
                    placeholder={txt.staz_godina}
                    onChangeText={value => {
                      params.set.stazGodina_u(value);
                    }}
                    value={params.get.stazGodina_u.toString()}
                    maxLength={4}
                    keyboardType="phone-pad"
                    editable={false}
                  />
                </View>
              </View>
              <View style={this.H.ObjAss({}, style.mar_30, style.column)}>
                <Text style={{marginBottom: 10}}>{txt.dokument}</Text>
                <TouchableOpacity
                  onPress={async () => {
                    /*FilePickerManager.showFilePicker(null, (response) => {
										console.log('Response = ', response)
										if (response.didCancel) console.log('User cancelled file picker')
										else if (response.error){
											console.log('FilePickerManager Error: ', response.error)
											params.set.dokument('')		
										} 
										else params.set.dokument(response)
									})*/

                    try {
                      const results = await DocumentPicker.pickMultiple({
                        type: [DocumentPicker.types.allFiles],
                      });
                      let tmpArr = [];
                      let tmpList = '';
                      for (const res of results) {
                        console.log(
                          res.uri,
                          res.type, // mime type
                          res.name,
                          res.size,
                        );
                        const dok = new FormData();
                        dok.append('dokument', res);
                        tmpArr.push(dok);
                        tmpList += `${res.name} \n\n`;
                      }
                      params.set.dokument(tmpArr);
                      params.set.dokumentList(
                        params.get.dokumentList + tmpList,
                      );
                    } catch (err) {
                      if (DocumentPicker.isCancel(err)) {
                        // User cancelled the picker, exit any dialogs or menus and move on
                      } else {
                        throw err;
                        params.set.dokument('');
                      }
                    }
                  }}>
                  <View
                    style={this.H.ObjAss(
                      {height: 50, backgroundColor: '#ddd'},
                      style.center,
                      style.flex_0,
                    )}>
                    <Text style={style.txt_c}>{txt.dodaj}</Text>
                  </View>
                </TouchableOpacity>
                <Text style={{marginTop: 10}}>{params.get.dokumentList}</Text>
              </View>
            </View>
          </ScrollView>
        </View>
        <TouchableOpacity
          onPress={() => {
            if (
              params.get.ime == '' ||
              params.get.prezime == '' ||
              params.get.dr_d == '' ||
              params.get.dr_m == '' ||
              params.get.dr_y == '' ||
              params.get.lk == '' ||
              params.get.jmbg == '' ||
              params.get.vrstaZaposlenja.value == '' ||
              params.get.strucnaSprema.value == '' ||
              params.get.firma.value == '' ||
              params.get.dp_d == '' ||
              params.get.dp_m == '' ||
              params.get.dp_y == '' //||
              /*params.get.datumPrestanka() == '' ||*/
              /*params.get.stazDan == '' ||
						params.get.stazMesec == '' ||
						params.get.stazGodina == ''*/
            )
              Alert.alert(txt.upozorenje, txt.popunite_sva_polja);
            else if (params.get.jmbg.length != 13)
              Alert.alert(txt.upozorenje, txt.jmbg_mora_13);
            else {
              this.izracunajStaz(
                params.get.stazDan,
                params.get.stazMesec,
                params.get.stazGodina,
              );
              const kraj =
                params.get.dpr_d != '' &&
                params.get.dpr_m != '' &&
                params.get.dpr_y != ''
                  ? `${params.get.dpr_d}-${params.get.dpr_m}-${
                      params.get.dpr_y
                    }`
                  : '';
              this.H.callFetch({
                url: this.Con.endpoint + 'radnik.cfc?method=ins_upd',
                data: {
                  id: this.idRadnik,
                  entitet: this.entitet,
                  ime: params.get.ime,
                  prezime: params.get.prezime,
                  lk: params.get.lk,
                  jmbg: params.get.jmbg,
                  sifVZ: params.get.vrstaZaposlenja.value,
                  sifSS: params.get.strucnaSprema.value,
                  sifFirma: params.get.firma.value,
                  pD_s: params.get.stazDan,
                  pM_s: params.get.stazMesec,
                  pY_s: params.get.stazGodina,
                  tD_s: params.get.stazDan_t,
                  tM_s: params.get.stazMesec_t,
                  tY_s: params.get.stazGodina_t,
                  datum_rodjenja: `${params.get.dr_y}-${params.get.dr_m}-${
                    params.get.dr_d
                  }`,
                  pocetak: `${params.get.dp_y}-${params.get.dp_m}-${
                    params.get.dp_d
                  }`,
                  kraj: kraj,
                },
                func: res => {
                  console.log(res);
                  if (params.get.dokument.length > 0) {
                    Alert.alert(txt.obavestenje, txt.molim_sacekajte);
                    params.get.dokument.forEach(el => {
                      this.H.callFetch({
                        url:
                          this.Con.endpoint +
                          'radnik.cfc?method=ins_upd_dok&entitet=' +
                          this.entitet +
                          '&id=' +
                          res,
                        data: el,
                        func: res => {
                          console.log(res);
                        },
                        isFile: true,
                      });
                    });
                  }
                  this.H.callFetch({
                    url: this.Con.endpoint + 'radnik.cfc?method=getAll',
                    data: {entitet: this.entitet},
                    func: res => {
                      params.route.params.refresh(res.DATA);
                      Alert.alert(txt.obavestenje, txt.uspesno_sacuvano);
                      params.navigation.navigate('Unos_radnika_home', {
                        entitet: this.entitet,
                      });
                    },
                  });
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
