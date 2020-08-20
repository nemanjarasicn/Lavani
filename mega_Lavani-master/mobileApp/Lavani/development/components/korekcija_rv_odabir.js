import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Alert, FlatList} from 'react-native';
import {SearchBar} from 'react-native-elements';

export default class Korekcija_rv_odabir extends Component {
  constructor(props) {
    super(props);
    this.state = {data: []};
    this._arr = [];
    this.H = props.params.Helper;
    this.Con = props.params.Config;
    this.idRadnik = props.params.route.params.idRadnik;
    this.radnikIme = props.params.route.params.radnikIme;
    this.entitet = props.params.route.params.entitet;
    this.navigation = props.params.navigation;
  }

  componentDidMount() {
    this.H.callFetch({
      url: this.Con.endpoint + 'radnici_na_objektima.cfc?method=ugovoriVI',
      data: {idZ: this.idRadnik},
      func: res => {
        this._arr = res.DATA;
        this.setState({data: res.DATA});
      },
    });
  }

  secondDate = item => {
    if (item != '')
      return `${new Date(item).getDate()}/${new Date(item).getMonth() +
        1}/${new Date(item).getFullYear()}`;
    else return null;
  };

  searchFilterFunction = text => {
    this.setState({value: text});
    const newData = this._arr.filter(item => {
      const itemData = `${item[3].toUpperCase()}`;
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
        <View
          style={{
            flex: 0,
            borderTopWidth: 1,
            height: 50,
            justifyContent: 'center',
          }}>
          <Text style={{textAlign: 'center'}}>{txt.izaberite_ugovor}</Text>
        </View>
        <View style={{flex: 1}}>
          <SearchBar
            placeholder={txt.pretrazi_3_ugovoru}
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
              <Text style={style.txt_c}>{txt.broj_ugovora}</Text>
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
                  this.navigation.navigate('Korekcija_rv_list', {
                    idRadnik: this.idRadnik,
                    radnikIme: this.radnikIme,
                    idUgovor: item[0],
                    ugovorNaziv: item[3],
                    entitet: this.entitet,
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
                      {item[3]}
                    </Text>
                    <Text style={style.txt_c}>
                      {`${new Date(item[1]).getDate()}/${new Date(
                        item[1],
                      ).getMonth() + 1}/${new Date(
                        item[1],
                      ).getFullYear()}`}{' '}
                      - {this.secondDate(item[2])}
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
