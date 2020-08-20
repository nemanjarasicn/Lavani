import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Alert, FlatList} from 'react-native';
import {SearchBar} from 'react-native-elements';

export default class Korekcija_rv_list extends Component {
  constructor(props) {
    super(props);
    this.state = {data: []};
    this._arr = [];
    this.H = props.params.Helper;
    this.Con = props.params.Config;
    this.entitet = props.params.route.params.entitet;
    this.idRadnik = props.params.route.params.idRadnik;
    this.radnikIme = props.params.route.params.radnikIme;
    this.idUgovor = props.params.route.params.idUgovor;
    this.ugovorNaziv = props.params.route.params.ugovorNaziv;
    this.navigation = props.params.navigation;
  }

  secondDate = item => {
    if (item != '')
      return `${new Date(item).getDate()}/${new Date(item).getMonth() +
        1}/${new Date(item).getFullYear()}`;
    else return null;
  };

  componentDidMount() {
    this.H.callFetch({
      url: this.Con.endpoint + 'korekcija_rv.cfc?method=getAll',
      data: {idUgovor: this.idUgovor},
      func: res => {
        this._arr = res.DATA;
        this.setState({data: res.DATA});
      },
    });
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
        <View style={this.H.ObjAss({height: 60}, style.center, style.flex_0)}>
          <Text style={this.H.ObjAss({fontSize: 18}, style.txt_c)}>
            {txt.radnik}: {this.radnikIme}
          </Text>
        </View>
        <View style={this.H.ObjAss({height: 60}, style.center, style.flex_0)}>
          <Text style={this.H.ObjAss({fontSize: 18}, style.txt_c)}>
            {txt.ugovor}: {this.ugovorNaziv}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            params.navigation.navigate('Edit_unos_krv', {
              entitet: routeParams.entitet,
              idRadnik: this.idRadnik,
              radnikIme: this.radnikIme,
              idUgovor: this.idUgovor,
              ugovorNaziv: this.ugovorNaziv,
              refresh: data => {
                this.setState({data: data});
              },
            });
          }}>
          <View
            style={this.H.ObjAss(
              {height: 50, backgroundColor: '#ddd'},
              style.center,
              style.flex_0,
              style.mar_15,
            )}>
            <Text style={this.H.ObjAss({fontSize: 16}, style.txt_c)}>
              {txt.nova_korekcija} +
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{flex: 1}}>
          <SearchBar
            placeholder={txt.pretrazi_3_sata}
            searchIcon={false}
            clearIcon={false}
            onChangeText={text => this.searchFilterFunction(text)}
            autoCorrect={false}
            containerStyle={{backgroundColor: '#8b0000'}}
            inputContainerStyle={{backgroundColor: '#fff'}}
            value={this.state.value}
          />
          <View
            style={this.H.ObjAss(
              {height: 40, borderBottomWidth: 1},
              style.row,
              style.flex_0,
              style.center,
            )}>
            <View
              style={this.H.ObjAss(
                {},
                style.column,
                style.flex_1,
                style.center,
              )}>
              <Text style={style.txt_c}>{txt.broj_sati}</Text>
              <Text style={style.txt_c}>
                {txt.od} - {txt.do}
              </Text>
            </View>
          </View>
          <FlatList
            scrollEnabled={true}
            data={this.state.data}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  this.navigation.navigate('Edit_unos_krv', {
                    idKRV: item[0],
                    idRadnik: this.idRadnik,
                    radnikIme: this.radnikIme,
                    idUgovor: this.idUgovor,
                    ugovorNaziv: this.ugovorNaziv,
                    entitet: this.entitet,
                    refresh: data => {
                      this.setState({data: data});
                    },
                  });
                }}>
                <View
                  style={this.H.ObjAss(
                    {height: 60, borderBottomWidth: 1},
                    style.row,
                    style.flex_0,
                    style.center,
                  )}>
                  <View
                    style={this.H.ObjAss(
                      {},
                      style.column,
                      style.flex_1,
                      style.center,
                    )}>
                    <Text style={this.H.ObjAss({fontSize: 18}, style.txt_c)}>
                      {item[1]}
                    </Text>
                    <Text style={style.txt_c}>
                      {`${new Date(item[2]).getDate()}/${new Date(
                        item[2],
                      ).getMonth() + 1}/${new Date(
                        item[2],
                      ).getFullYear()}`}{' '}
                      - {this.secondDate(item[3])}
                    </Text>
                  </View>
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
