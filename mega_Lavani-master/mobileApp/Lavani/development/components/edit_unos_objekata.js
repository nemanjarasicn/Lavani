import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  TextInput,
  ScrollView,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

export default class Edit_unos_objekata extends Component {
  constructor(props) {
    super(props);
    this.H = props.params.Helper;
    this.Con = props.params.Config;
    this.navigation = props.params.navigation;
    this.txt = props.params.txt;

    this.state = {};
    this.idObjekat =
      props.params.route.params.id != undefined
        ? props.params.route.params.id
        : '';
    this.entitet = props.params.route.params.entitet;
    //sifarnici
    this.regioni = [];
    this.narucioci = [];
  }

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

  getObjekatData = () => {
    if (this.idObjekat != '') {
      this.H.callFetch({
        url: this.Con.endpoint + 'objekti.cfc?method=get',
        data: {id: this.idObjekat},
        func: res => {
          const data = res.DATA[0];
          this.props.params.set.naziv(data[1]);
          this.props.params.set.sifra(data[2]);
          this.props.params.set.sifNarucioci({value: data[3], label: data[12]});
          this.props.params.set.sifRegioni({value: data[4], label: data[13]});
          this.props.params.set.mesto(data[5]);
          this.props.params.set.ulica(data[6]);
          this.props.params.set.kucniBroj(String(data[7]));
          this.props.params.set.sprat(data[8]);
          this.props.params.set.ulaz(data[9]);
          this.props.params.set.stan(data[10]);
          this.props.params.set.brRadnihMesta(String(data[11]));
        },
      });
    }
  };

  ins_upd = () => {
    this.H.callFetch({
      url: this.Con.endpoint + 'objekti.cfc?method=ins_upd',
      data: {
        id: this.idObjekat,
        entitet: this.entitet,
        naziv: this.props.params.get.naziv,
        sifra: this.props.params.get.sifra,
        region: this.props.params.get.sifRegioni.value,
        narucioc: this.props.params.get.sifNarucioci.value,
        mesto: this.props.params.get.mesto,
        ulica: this.props.params.get.ulica,
        kucni_broj: this.props.params.get.kucniBroj,
        sprat: this.props.params.get.sprat,
        stan: this.props.params.get.stan,
        ulaz: this.props.params.get.ulaz,
        br_radnih_mesta: this.props.params.get.brRadnihMesta,
      },
      func: res => {
        if (res) {
          this.H.callFetch({
            url: this.Con.endpoint + 'objekti.cfc?method=getAll',
            data: {entitet: this.entitet},
            func: res => {
              this.props.params.route.params.refresh(res.DATA);
              Alert.alert(this.txt.obavestenje, this.txt.uspesno_sacuvano);
              this.props.params.navigation.navigate('Obj_odabir', {
                entitet: this.entitet,
                naziv: this.props.params.get.naziv,
              });
            },
          });
        } else Alert.alert(this.txt.upozorenje, this.txt.ne_sme_da_smaji_rm);
      },
    });
  };

  componentDidMount() {
    this.getSif('narucioci', 'EZ_SIF_NARUCIOCI');
    this.getSif('regioni', 'EZ_SIF_REGIONI');
    this.getObjekatData();
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
              <Text>{txt.narucioci}:</Text>
              <View
                style={this.H.ObjAss(
                  {height: 50, borderWidth: 1},
                  style.txt_c,
                )}>
                <RNPickerSelect
                  onValueChange={(value, index) => {
                    params.set.sifNarucioci({
                      value: value,
                      label: this.narucioci[index - 1].label,
                    });
                  }}
                  items={this.narucioci}
                  value={params.get.sifNarucioci.value}
                  useNativeAndroidPickerStyle={false}
                  placeholder={{label: txt.narucioci}}
                />
              </View>
            </View>
            <View style={this.H.ObjAss({}, style.mar_15, style.column)}>
              <Text>{txt.sifra}:</Text>
              <TextInput
                style={H.ObjAss({height: 50, borderWidth: 1}, style.txt_c)}
                placeholder={txt.sifra}
                onChangeText={value => {
                  params.set.sifra(value);
                }}
                value={params.get.sifra}
                keyboardType="phone-pad"
              />
            </View>
            <View style={this.H.ObjAss({}, style.mar_15, style.column)}>
              <Text>{txt.naziv_obj}:</Text>
              <TextInput
                style={H.ObjAss({height: 50, borderWidth: 1}, style.txt_c)}
                placeholder={txt.naziv_obj}
                onChangeText={value => {
                  params.set.naziv(value);
                }}
                value={params.get.naziv}
              />
            </View>
            <View style={this.H.ObjAss({}, style.mar_15, style.column)}>
              <Text>{txt.regioni}:</Text>
              <View
                style={this.H.ObjAss(
                  {height: 50, borderWidth: 1},
                  style.txt_c,
                )}>
                <RNPickerSelect
                  onValueChange={(value, index) => {
                    params.set.sifRegioni({
                      value: value,
                      label: this.regioni[index - 1].label,
                    });
                  }}
                  items={this.regioni}
                  value={params.get.sifRegioni.value}
                  useNativeAndroidPickerStyle={false}
                  placeholder={{label: txt.regioni}}
                />
              </View>
            </View>
            <View style={this.H.ObjAss({}, style.mar_15, style.column)}>
              <Text>{txt.mesto}:</Text>
              <TextInput
                style={H.ObjAss({height: 50, borderWidth: 1}, style.txt_c)}
                placeholder={txt.mesto}
                onChangeText={value => {
                  params.set.mesto(value);
                }}
                value={params.get.mesto}
              />
            </View>
            <View style={this.H.ObjAss({}, style.mar_15, style.column)}>
              <Text>{txt.ulica}:</Text>
              <TextInput
                style={H.ObjAss({height: 50, borderWidth: 1}, style.txt_c)}
                placeholder={txt.ulica}
                onChangeText={value => {
                  params.set.ulica(value);
                }}
                value={params.get.ulica}
              />
            </View>
            <View style={this.H.ObjAss({}, style.mar_15, style.column)}>
              <Text>{txt.kucni_broj}:</Text>
              <TextInput
                style={H.ObjAss({height: 50, borderWidth: 1}, style.txt_c)}
                placeholder={txt.kucni_broj}
                onChangeText={value => {
                  params.set.kucniBroj(value);
                }}
                value={params.get.kucniBroj}
                keyboardType="phone-pad"
              />
            </View>
            <View style={this.H.ObjAss({}, style.mar_15, style.column)}>
              <Text>{txt.sprat}:</Text>
              <TextInput
                style={H.ObjAss({height: 50, borderWidth: 1}, style.txt_c)}
                placeholder={txt.sprat}
                onChangeText={value => {
                  params.set.sprat(value);
                }}
                value={params.get.sprat}
              />
            </View>
            <View style={this.H.ObjAss({}, style.mar_15, style.column)}>
              <Text>{txt.ulaz}:</Text>
              <TextInput
                style={H.ObjAss({height: 50, borderWidth: 1}, style.txt_c)}
                placeholder={txt.ulaz}
                onChangeText={value => {
                  params.set.ulaz(value);
                }}
                value={params.get.ulaz}
              />
            </View>
            <View style={this.H.ObjAss({}, style.mar_15, style.column)}>
              <Text>{txt.stan}:</Text>
              <TextInput
                style={H.ObjAss({height: 50, borderWidth: 1}, style.txt_c)}
                placeholder={txt.stan}
                onChangeText={value => {
                  params.set.stan(value);
                }}
                value={params.get.stan}
              />
            </View>
            <View style={this.H.ObjAss({}, style.mar_15, style.column)}>
              <Text>{txt.br_radnih_mesta}:</Text>
              <TextInput
                style={H.ObjAss({height: 50, borderWidth: 1}, style.txt_c)}
                placeholder={txt.br_radnih_mesta}
                onChangeText={value => {
                  params.set.brRadnihMesta(value);
                }}
                value={params.get.brRadnihMesta}
                keyboardType="phone-pad"
              />
            </View>
          </ScrollView>
        </View>
        {/*<TouchableOpacity onPress={()=>{
	  				if(
						params.get.sifra == '' ||
						params.get.naziv == '' ||
						params.get.sifNarucioci.value == '' ||
						params.get.brRadnihMesta == ''
					) Alert.alert(txt.upozorenje, txt.popunite_sva_polja_za_obj)
					else if(this.idObjekat == ''){
						//check sifra
						this.H.callFetch({
							url: this.Con.endpoint + 'objekti.cfc?method=checkSifra',
							data:{sifra: params.get.sifra},
							func: (res)=>{
								if(res){
									//insert
									this.ins_upd()
								}else Alert.alert(txt.upozorenje, txt.obj_sifra_postoji)
							}
						})						
					}else{
						//check sifra_saId
						this.H.callFetch({
							url: this.Con.endpoint + 'objekti.cfc?method=checkSifra_saId',
							data:{
								sifra: params.get.sifra,
								id: this.idObjekat
							},
							func: (res)=>{
								if(res){
									//update
									this.ins_upd()
								}else Alert.alert(txt.upozorenje, txt.obj_sifra_postoji)
							}
						})						
					} 				
	  			}}>
		  			<View style={this.H.ObjAss({height:50, backgroundColor: '#ddd'}, style.center, style.flex_0)}>
		  				<Text style={style.txt_c}>{txt.sacuvaj}</Text>
		  			</View>
	  			</TouchableOpacity>*/}
      </View>
    );
  }
}
