import 'react-native-gesture-handler';
import React, {Component, useState} from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

//my components
import Login from './development/components/login';
import Odabir from './development/components/odabir';
import Home from './development/components/home';
import Unos_radnika_home from './development/components/unos_radnika_home';
import Korekcija_rv_home from './development/components/korekcija_rv_home';
import Edit_unos_radnika from './development/components/edit_unos_radnika';
import Edit_unos_krv from './development/components/edit_unos_krv';
import Unos_objekata_home from './development/components/unos_objekata_home';
import Obj_odabir from './development/components/obj_odabir';
import Edit_unos_objekata from './development/components/edit_unos_objekata';
import Radnici_na_objektu from './development/components/radnici_na_objektu';
import Odmori_odsustva_home from './development/components/odmori_odsustva_home';
import Odmor_unos_edit from './development/components/odmor_unos_edit';
import Odsustvo_unos_edit from './development/components/odsustvo_unos_edit';
import Novi_odmor from './development/components/novi_odmor';
import Novo_odsustvo from './development/components/novo_odsustvo';
import Radna_mesta from './development/components/radna_mesta';
import Radno_mesto_unos_edit from './development/components/radno_mesto_unos_edit';
import Radnici_na_objektu_home from './development/components/radnici_na_objektu_home';
import Radnici_na_objektu_zaposleni from './development/components/radnici_na_objektu_zaposleni';
import Radnici_na_objektu_unos_edit from './development/components/radnici_na_objektu_unos_edit';
import Radnici_na_objektu_ugovori from './development/components/radnici_na_objektu_ugovori';
import Korekcija_rv_odabir from './development/components/korekcija_rv_odabir';
import Korekcija_rv_list from './development/components/korekcija_rv_list';

//classes
import Config from './development/config/Config';
import Helper from './development/classes/Helper';
import Korisnik from './development/classes/Korisnik';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {_pismo: 1};

    this._txt = require('./development/txt.json');
    this._style = StyleSheet.create(
      require('./development/assets/style/style.json'),
    );
    this.pismoState = {
      val: this.state._pismo,
      func: pismo => this.setState({_pismo: pismo}),
    };
    this.Con = new Config();
    this.Help = new Helper();
    this._korisnik = {};
  }

  LoginScreen = ({route, navigation}) => {
    //states
    const [_username, _setUsername] = useState('');
    const [_password, _setPassword] = useState('');

    return (
      <Login
        params={{
          route: route,
          navigation: navigation,
          Config: this.Con,
          Helper: this.Help,
          txt: this._txt[this.pismoState.val],
          style: this._style,
          username: _username,
          setUsername: _setUsername,
          password: _password,
          setPassword: _setPassword,
          newKorisnik: (...arr) => (this._korisnik = new Korisnik(...arr)),
          promeniPismo: this.pismoState.func,
        }}
      />
    );
  };

  OdabirScreen = ({route, navigation}) => {
    return (
      <Odabir
        params={{
          route: route,
          navigation: navigation,
          Config: this.Con,
          Helper: this.Help,
          txt: this._txt[this.pismoState.val],
          style: this._style,
          Korisnik: this._korisnik,
        }}
      />
    );
  };

  HomeScreen = ({route, navigation}) => {
    return (
      <Home
        params={{
          route: route,
          navigation: navigation,
          Config: this.Con,
          Helper: this.Help,
          txt: this._txt[this.pismoState.val],
          style: this._style,
        }}
      />
    );
  };

  Unos_radnika_homeScreen = ({route, navigation}) => {
    return (
      <Unos_radnika_home
        params={{
          route: route,
          navigation: navigation,
          Config: this.Con,
          Helper: this.Help,
          txt: this._txt[this.pismoState.val],
          style: this._style,
        }}
      />
    );
  };

  Edit_unos_radnikaScreen = ({route, navigation}) => {
    const [_idR, _setIdR] = useState('');
    const [_imeR, _setImeR] = useState('');
    const [_prezimeR, _setPrezimeR] = useState('');
    const [_jmbgR, _setJmbgR] = useState('');
    const [_lkR, _setLkR] = useState('');
    const [_DR_d_R, _setDR_d_R] = useState('');
    const [_DR_m_R, _setDR_m_R] = useState('');
    const [_DR_y_R, _setDR_y_R] = useState('');
    const [_DP_d_R, _setDP_d_R] = useState('');
    const [_DP_m_R, _setDP_m_R] = useState('');
    const [_DP_y_R, _setDP_y_R] = useState('');
    const [_DPR_d_R, _setDPR_d_R] = useState('');
    const [_DPR_m_R, _setDPR_m_R] = useState('');
    const [_DPR_y_R, _setDPR_y_R] = useState('');
    const [_strucnaSpremaR, _setStrucnaSpremaR] = useState({
      value: '',
      label: '',
    });
    const [_radnoMestoR, _setRadnoMestoR] = useState({value: '', label: ''});
    const [_vrstaZaposlenjaR, _setVrstaZaposlenjaR] = useState({
      value: '',
      label: '',
    });
    const [_stazDanR, _setStazDanR] = useState('');
    const [_stazMesecR, _setStazMesecR] = useState('');
    const [_stazGodinaR, _setStazGodinaR] = useState('');
    const [_stazDan_tR, _setStazDan_tR] = useState('');
    const [_stazMesec_tR, _setStazMesec_tR] = useState('');
    const [_stazGodina_tR, _setStazGodina_tR] = useState('');
    const [_stazDan_uR, _setStazDan_uR] = useState('');
    const [_stazMesec_uR, _setStazMesec_uR] = useState('');
    const [_stazGodina_uR, _setStazGodina_uR] = useState('');
    const [_dokument, _setDokument] = useState('');
    const [_dokumentList, _setDokumentList] = useState('');

    //stampa ugovora
    //stampa licne karte

    return (
      <Edit_unos_radnika
        params={{
          route: route,
          navigation: navigation,
          Config: this.Con,
          Helper: this.Help,
          txt: this._txt[this.pismoState.val],
          style: this._style,
          get: {
            id: _idR,
            ime: _imeR,
            prezime: _prezimeR,
            jmbg: _jmbgR,
            lk: _lkR,
            dr_d: _DR_d_R,
            dr_m: _DR_m_R,
            dr_y: _DR_y_R,
            dp_d: _DP_d_R,
            dp_m: _DP_m_R,
            dp_y: _DP_y_R,
            dpr_d: _DPR_d_R,
            dpr_m: _DPR_m_R,
            dpr_y: _DPR_y_R,
            strucnaSprema: _strucnaSpremaR,
            radnoMesto: _radnoMestoR,
            vrstaZaposlenja: _vrstaZaposlenjaR,
            stazDan: _stazDanR,
            stazMesec: _stazMesecR,
            stazGodina: _stazGodinaR,
            stazDan_t: _stazDan_tR,
            stazMesec_t: _stazMesec_tR,
            stazGodina_t: _stazGodina_tR,
            stazDan_u: _stazDan_uR,
            stazMesec_u: _stazMesec_uR,
            stazGodina_u: _stazGodina_uR,
            dokument: _dokument,
            dokumentList: _dokumentList,
          },
          set: {
            id: _setIdR,
            ime: _setImeR,
            prezime: _setPrezimeR,
            jmbg: _setJmbgR,
            lk: _setLkR,
            dr_d: _setDR_d_R,
            dr_m: _setDR_m_R,
            dr_y: _setDR_y_R,
            dp_d: _setDP_d_R,
            dp_m: _setDP_m_R,
            dp_y: _setDP_y_R,
            dpr_d: _setDPR_d_R,
            dpr_m: _setDPR_m_R,
            dpr_y: _setDPR_y_R,
            strucnaSprema: _setStrucnaSpremaR,
            radnoMesto: _setRadnoMestoR,
            vrstaZaposlenja: _setVrstaZaposlenjaR,
            stazDan: _setStazDanR,
            stazMesec: _setStazMesecR,
            stazGodina: _setStazGodinaR,
            stazDan_t: _setStazDan_tR,
            stazMesec_t: _setStazMesec_tR,
            stazGodina_t: _setStazGodina_tR,
            stazDan_u: _setStazDan_uR,
            stazMesec_u: _setStazMesec_uR,
            stazGodina_u: _setStazGodina_uR,
            dokument: _setDokument,
            dokumentList: _setDokumentList,
          },
        }}
      />
    );
  };

  Edit_unos_krvScreen = ({route, navigation}) => {
    const [_danOd, _setDanOd] = useState('');
    const [_mesecOd, _setMesecOd] = useState('');
    const [_godinaOd, _setGodinaOd] = useState('');
    const [_danDo, _setDanDo] = useState('');
    const [_mesecDo, _setMesecDo] = useState('');
    const [_godinaDo, _setGodinaDo] = useState('');
    const [_broj_sati, _setBroj_sati] = useState('');
    const [_napomena, _setNapomena] = useState('');

    return (
      <Edit_unos_krv
        params={{
          route: route,
          navigation: navigation,
          Config: this.Con,
          Helper: this.Help,
          txt: this._txt[this.pismoState.val],
          style: this._style,
          set: {
            danOd: _setDanOd,
            mesecOd: _setMesecOd,
            godinaOd: _setGodinaOd,
            danDo: _setDanDo,
            mesecDo: _setMesecDo,
            godinaDo: _setGodinaDo,
            broj_sati: _setBroj_sati,
            napomena: _setNapomena,
          },
          get: {
            danOd: _danOd,
            mesecOd: _mesecOd,
            godinaOd: _godinaOd,
            danDo: _danDo,
            mesecDo: _mesecDo,
            godinaDo: _godinaDo,
            broj_sati: _broj_sati,
            napomena: _napomena,
          },
        }}
      />
    );
  };

  Unos_objekata_homeScreen = ({route, navigation}) => {
    return (
      <Unos_objekata_home
        params={{
          route: route,
          navigation: navigation,
          Config: this.Con,
          Helper: this.Help,
          txt: this._txt[this.pismoState.val],
          style: this._style,
        }}
      />
    );
  };

  Obj_odabirScreen = ({route, navigation}) => {
    return (
      <Obj_odabir
        params={{
          route: route,
          navigation: navigation,
          Config: this.Con,
          Helper: this.Help,
          txt: this._txt[this.pismoState.val],
          style: this._style,
        }}
      />
    );
  };

  Edit_unos_objekataScreen = ({route, navigation}) => {
    const [_naziv, _setNaziv] = useState('');
    const [_sifra, _setSifra] = useState('');
    const [_sifNarucioci, _setSifNarucioci] = useState({value: '', label: ''});
    const [_sifRegioni, _setSifRegioni] = useState({value: '', label: ''});
    const [_mesto, _setMesto] = useState('');
    const [_ulica, _setUlica] = useState('');
    const [_kucniBroj, _setKucniBroj] = useState('');
    const [_sprat, _setSprat] = useState('');
    const [_ulaz, _setUlaz] = useState('');
    const [_stan, _setStan] = useState('');
    const [_brRadnihMesta, _setBrRadnihMesta] = useState('');

    return (
      <Edit_unos_objekata
        params={{
          route: route,
          navigation: navigation,
          Config: this.Con,
          Helper: this.Help,
          txt: this._txt[this.pismoState.val],
          style: this._style,
          set: {
            naziv: _setNaziv,
            sifra: _setSifra,
            sifNarucioci: _setSifNarucioci,
            sifRegioni: _setSifRegioni,
            mesto: _setMesto,
            ulica: _setUlica,
            kucniBroj: _setKucniBroj,
            sprat: _setSprat,
            ulaz: _setUlaz,
            stan: _setStan,
            brRadnihMesta: _setBrRadnihMesta,
          },
          get: {
            naziv: _naziv,
            sifra: _sifra,
            sifNarucioci: _sifNarucioci,
            sifRegioni: _sifRegioni,
            mesto: _mesto,
            ulica: _ulica,
            kucniBroj: _kucniBroj,
            sprat: _sprat,
            ulaz: _ulaz,
            stan: _stan,
            brRadnihMesta: _brRadnihMesta,
          },
        }}
      />
    );
  };

  Radnici_na_objektuScreen = ({route, navigation}) => {
    return (
      <Radnici_na_objektu
        params={{
          route: route,
          navigation: navigation,
          Config: this.Con,
          Helper: this.Help,
          txt: this._txt[this.pismoState.val],
          style: this._style,
        }}
      />
    );
  };

  Odmori_odsustva_homeScreen = ({route, navigation}) => {
    return (
      <Odmori_odsustva_home
        params={{
          route: route,
          navigation: navigation,
          Config: this.Con,
          Helper: this.Help,
          txt: this._txt[this.pismoState.val],
          style: this._style,
        }}
      />
    );
  };

  Odmor_unos_editScreen = ({route, navigation}) => {
    return (
      <Odmor_unos_edit
        params={{
          route: route,
          navigation: navigation,
          Config: this.Con,
          Helper: this.Help,
          txt: this._txt[this.pismoState.val],
          style: this._style,
        }}
      />
    );
  };

  Odsustvo_unos_editScreen = ({route, navigation}) => {
    return (
      <Odsustvo_unos_edit
        params={{
          route: route,
          navigation: navigation,
          Config: this.Con,
          Helper: this.Help,
          txt: this._txt[this.pismoState.val],
          style: this._style,
        }}
      />
    );
  };

  Novi_odmorScreen = ({route, navigation}) => {
    const [_godina, _setGodina] = useState('');
    const [_sifDeoGodOdmora, _setSifDeoGodOdmora] = useState({
      value: '',
      label: '',
    });
    const [_dod_d, _setDod_d] = useState('');
    const [_dod_m, _setDod_m] = useState('');
    const [_dod_y, _setDod_y] = useState('');
    const [_ddo_d, _setDdo_d] = useState('');
    const [_ddo_m, _setDdo_m] = useState('');
    const [_ddo_y, _setDdo_y] = useState('');
    const [_trajanje, _setTrajanje] = useState('');
    const [_preostaliDani, _setPreostaliDani] = useState('');
    const [_ukupnoDana, _setUkupnoDana] = useState('');

    return (
      <Novi_odmor
        params={{
          route: route,
          navigation: navigation,
          Config: this.Con,
          Helper: this.Help,
          txt: this._txt[this.pismoState.val],
          style: this._style,
          set: {
            godina: _setGodina,
            sifDeoGodOdmora: _setSifDeoGodOdmora,
            dod_d: _setDod_d,
            dod_m: _setDod_m,
            dod_y: _setDod_y,
            ddo_d: _setDdo_d,
            ddo_m: _setDdo_m,
            ddo_y: _setDdo_y,
            trajanje: _setTrajanje,
            preostaliDani: _setPreostaliDani,
            ukupnoDana: _setUkupnoDana,
          },
          get: {
            godina: _godina,
            sifDeoGodOdmora: _sifDeoGodOdmora,
            dod_d: _dod_d,
            dod_m: _dod_m,
            dod_y: _dod_y,
            ddo_d: _ddo_d,
            ddo_m: _ddo_m,
            ddo_y: _ddo_y,
            trajanje: _trajanje,
            preostaliDani: _preostaliDani,
            ukupnoDana: _ukupnoDana,
          },
        }}
      />
    );
  };

  Novo_odsustvoScreen = ({route, navigation}) => {
    const [_sifVrstaOdsustva, _setSifVrstaOdsustva] = useState({
      value: '',
      label: '',
    });
    const [_dod_d, _setDod_d] = useState('');
    const [_dod_m, _setDod_m] = useState('');
    const [_dod_y, _setDod_y] = useState('');
    const [_ddo_d, _setDdo_d] = useState('');
    const [_ddo_m, _setDdo_m] = useState('');
    const [_ddo_y, _setDdo_y] = useState('');
    const [_brojDana, _setBrojDana] = useState('');
    const [_napomena, _setNapomena] = useState('');

    return (
      <Novo_odsustvo
        params={{
          route: route,
          navigation: navigation,
          Config: this.Con,
          Helper: this.Help,
          txt: this._txt[this.pismoState.val],
          style: this._style,
          set: {
            sifVrstaOdsustva: _setSifVrstaOdsustva,
            dod_d: _setDod_d,
            dod_m: _setDod_m,
            dod_y: _setDod_y,
            ddo_d: _setDdo_d,
            ddo_m: _setDdo_m,
            ddo_y: _setDdo_y,
            brojDana: _setBrojDana,
            napomena: _setNapomena,
          },
          get: {
            sifVrstaOdsustva: _sifVrstaOdsustva,
            dod_d: _dod_d,
            dod_m: _dod_m,
            dod_y: _dod_y,
            ddo_d: _ddo_d,
            ddo_m: _ddo_m,
            ddo_y: _ddo_y,
            brojDana: _brojDana,
            napomena: _napomena,
          },
        }}
      />
    );
  };

  Radna_mestaScreen = ({route, navigation}) => {
    return (
      <Radna_mesta
        params={{
          route: route,
          navigation: navigation,
          Config: this.Con,
          Helper: this.Help,
          txt: this._txt[this.pismoState.val],
          style: this._style,
        }}
      />
    );
  };

  Radno_mesto_unos_editScreen = ({route, navigation}) => {
    const [_sif, _setSif] = useState({value: '', label: ''});
    const [_neto, _setNeto] = useState('');
    const [_doprinosi, _setDoprinosi] = useState('');
    const [_prevoz, _setPrevoz] = useState('');
    const [_topliObrok, _setTopliObrok] = useState('');
    const [_regres, _setRegres] = useState('');
    const [_predvidjeniSati, _setPredvidjeniSati] = useState('');
    const [_brojZaposlenih, _setBrojZaposlenih] = useState('');
    const [_dod_d, _setDod_d] = useState('');
    const [_dod_m, _setDod_m] = useState('');
    const [_dod_y, _setDod_y] = useState('');
    const [_ddo_d, _setDdo_d] = useState('');
    const [_ddo_m, _setDdo_m] = useState('');
    const [_ddo_y, _setDdo_y] = useState('');

    return (
      <Radno_mesto_unos_edit
        params={{
          route: route,
          navigation: navigation,
          Config: this.Con,
          Helper: this.Help,
          txt: this._txt[this.pismoState.val],
          style: this._style,
          set: {
            sif: _setSif,
            dod_d: _setDod_d,
            dod_m: _setDod_m,
            dod_y: _setDod_y,
            ddo_d: _setDdo_d,
            ddo_m: _setDdo_m,
            ddo_y: _setDdo_y,
            neto: _setNeto,
            doprinosi: _setDoprinosi,
            prevoz: _setPrevoz,
            topliObrok: _setTopliObrok,
            regres: _setRegres,
            predvidjeniSati: _setPredvidjeniSati,
            brojZaposlenih: _setBrojZaposlenih,
          },
          get: {
            sif: _sif,
            dod_d: _dod_d,
            dod_m: _dod_m,
            dod_y: _dod_y,
            ddo_d: _ddo_d,
            ddo_m: _ddo_m,
            ddo_y: _ddo_y,
            neto: _neto,
            doprinosi: _doprinosi,
            prevoz: _prevoz,
            topliObrok: _topliObrok,
            regres: _regres,
            predvidjeniSati: _predvidjeniSati,
            brojZaposlenih: _brojZaposlenih,
          },
        }}
      />
    );
  };

  Radnici_na_objektu_homeScreen = ({route, navigation}) => {
    return (
      <Radnici_na_objektu_home
        params={{
          route: route,
          navigation: navigation,
          Config: this.Con,
          Helper: this.Help,
          txt: this._txt[this.pismoState.val],
          style: this._style,
        }}
      />
    );
  };

  Radnici_na_objektu_zaposleniScreen = ({route, navigation}) => {
    return (
      <Radnici_na_objektu_zaposleni
        params={{
          route: route,
          navigation: navigation,
          Config: this.Con,
          Helper: this.Help,
          txt: this._txt[this.pismoState.val],
          style: this._style,
        }}
      />
    );
  };

  Radnici_na_objektu_unos_editScreen = ({route, navigation}) => {
    const [_dod_d, _setDod_d] = useState('');
    const [_dod_m, _setDod_m] = useState('');
    const [_dod_y, _setDod_y] = useState('');
    const [_ddo_d, _setDdo_d] = useState('');
    const [_ddo_m, _setDdo_m] = useState('');
    const [_ddo_y, _setDdo_y] = useState('');
    const [_brUgovora, _setBrUgovora] = useState('');
    const [_zaposleni, _setZaposleni] = useState({value: '', label: ''});

    return (
      <Radnici_na_objektu_unos_edit
        params={{
          route: route,
          navigation: navigation,
          Config: this.Con,
          Helper: this.Help,
          txt: this._txt[this.pismoState.val],
          style: this._style,
          set: {
            dod_d: _setDod_d,
            dod_m: _setDod_m,
            dod_y: _setDod_y,
            ddo_d: _setDdo_d,
            ddo_m: _setDdo_m,
            ddo_y: _setDdo_y,
            brUgovora: _setBrUgovora,
            zaposleni: _setZaposleni,
          },
          get: {
            dod_d: _dod_d,
            dod_m: _dod_m,
            dod_y: _dod_y,
            ddo_d: _ddo_d,
            ddo_m: _ddo_m,
            ddo_y: _ddo_y,
            brUgovora: _brUgovora,
            zaposleni: _zaposleni,
          },
        }}
      />
    );
  };

  Radnici_na_objektu_ugovoriScreen = ({route, navigation}) => {
    return (
      <Radnici_na_objektu_ugovori
        params={{
          route: route,
          navigation: navigation,
          Config: this.Con,
          Helper: this.Help,
          txt: this._txt[this.pismoState.val],
          style: this._style,
        }}
      />
    );
  };

  Korekcija_rv_homeScreen = ({route, navigation}) => {
    return (
      <Korekcija_rv_home
        params={{
          route: route,
          navigation: navigation,
          Config: this.Con,
          Helper: this.Help,
          txt: this._txt[this.pismoState.val],
          style: this._style,
        }}
      />
    );
  };

  Korekcija_rv_odabirScreen = ({route, navigation}) => {
    return (
      <Korekcija_rv_odabir
        params={{
          route: route,
          navigation: navigation,
          Config: this.Con,
          Helper: this.Help,
          txt: this._txt[this.pismoState.val],
          style: this._style,
        }}
      />
    );
  };

  Korekcija_rv_listScreen = ({route, navigation}) => {
    return (
      <Korekcija_rv_list
        params={{
          route: route,
          navigation: navigation,
          Config: this.Con,
          Helper: this.Help,
          txt: this._txt[this.pismoState.val],
          style: this._style,
        }}
      />
    );
  };

  render() {
    const Stack = createStackNavigator();
    return (
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          <Stack.Screen
            name="Login"
            component={this.LoginScreen} /*initialParams={{param1:''}}*/
          />
          <Stack.Screen name="Odabir" component={this.OdabirScreen} />
          <Stack.Screen name="Home" component={this.HomeScreen} />
          <Stack.Screen
            name="Unos_radnika_home"
            component={this.Unos_radnika_homeScreen}
          />
          <Stack.Screen
            name="Edit_unos_radnika"
            component={this.Edit_unos_radnikaScreen}
          />
          <Stack.Screen
            name="Edit_unos_krv"
            component={this.Edit_unos_krvScreen}
          />
          <Stack.Screen
            name="Unos_objekata_home"
            component={this.Unos_objekata_homeScreen}
          />
          <Stack.Screen name="Obj_odabir" component={this.Obj_odabirScreen} />
          <Stack.Screen
            name="Edit_unos_objekata"
            component={this.Edit_unos_objekataScreen}
          />
          <Stack.Screen
            name="Radnici_na_objektu"
            component={this.Radnici_na_objektuScreen}
          />
          <Stack.Screen
            name="Odmori_odsustva_home"
            component={this.Odmori_odsustva_homeScreen}
          />
          <Stack.Screen
            name="Odmor_unos_edit"
            component={this.Odmor_unos_editScreen}
          />
          <Stack.Screen
            name="Odsustvo_unos_edit"
            component={this.Odsustvo_unos_editScreen}
          />
          <Stack.Screen name="Novi_odmor" component={this.Novi_odmorScreen} />
          <Stack.Screen
            name="Novo_odsustvo"
            component={this.Novo_odsustvoScreen}
          />
          <Stack.Screen name="Radna_mesta" component={this.Radna_mestaScreen} />
          <Stack.Screen
            name="Radno_mesto_unos_edit"
            component={this.Radno_mesto_unos_editScreen}
          />
          <Stack.Screen
            name="Radnici_na_objektu_home"
            component={this.Radnici_na_objektu_homeScreen}
          />
          <Stack.Screen
            name="Radnici_na_objektu_zaposleni"
            component={this.Radnici_na_objektu_zaposleniScreen}
          />
          <Stack.Screen
            name="Radnici_na_objektu_unos_edit"
            component={this.Radnici_na_objektu_unos_editScreen}
          />
          <Stack.Screen
            name="Radnici_na_objektu_ugovori"
            component={this.Radnici_na_objektu_ugovoriScreen}
          />
          <Stack.Screen
            name="Korekcija_rv_home"
            component={this.Korekcija_rv_homeScreen}
          />
          <Stack.Screen
            name="Korekcija_rv_odabir"
            component={this.Korekcija_rv_odabirScreen}
          />
          <Stack.Screen
            name="Korekcija_rv_list"
            component={this.Korekcija_rv_listScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
