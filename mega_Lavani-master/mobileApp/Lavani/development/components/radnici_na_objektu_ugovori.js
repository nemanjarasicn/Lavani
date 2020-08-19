import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Alert, FlatList} from 'react-native';
import {SearchBar} from 'react-native-elements';

export default class Radnici_na_objektu_ugovori extends Component {
  constructor(props) {
    super(props);
    this.state = {data: []};
    this._arr = [];
    this.H = props.params.Helper;
    this.Con = props.params.Config;
    this.idObjekta = props.params.route.params.idObjekta;
    this.objekat_naziv = props.params.route.params.objekat_naziv;
    this.idRM = props.params.route.params.idRM;
    this.nazivRM = props.params.route.params.nazivRM;
    this.idZ = props.params.route.params.idZ;
    this.nazivZ = props.params.route.params.nazivZ;
    this.entitet = props.params.route.params.entitet;
    this.navigation = props.params.navigation;
    this.preostaloMesta = null;
  }

  componentDidMount() {
    this.H.callFetch({
      url: this.Con.endpoint + 'radnici_na_objektima.cfc?method=ugovori',
      data: {
        idObjekta: this.idObjekta,
        idRM: this.idRM,
        idZ: this.idZ,
      },
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
        <View
          style={this.H.ObjAss(
            {height: 50, borderBottomWidth: 1},
            style.center,
            style.flex_0,
          )}>
          <Text style={this.H.ObjAss({fontSize: 16}, style.txt_c)}>
            {txt.objekat}: {this.objekat_naziv}
          </Text>
        </View>
        <View
          style={this.H.ObjAss(
            {height: 50, borderBottomWidth: 1},
            style.center,
            style.flex_0,
          )}>
          <Text style={this.H.ObjAss({fontSize: 16}, style.txt_c)}>
            {txt.radno_mesto}: {this.nazivRM}
          </Text>
        </View>
        <View
          style={this.H.ObjAss(
            {height: 50, borderBottomWidth: 1},
            style.center,
            style.flex_0,
          )}>
          <Text style={this.H.ObjAss({fontSize: 16}, style.txt_c)}>
            {txt.radnik}: {this.nazivZ}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            params.navigation.navigate('Radnici_na_objektu_unos_edit', {
              idZ: this.idZ,
              nazivZ: this.nazivZ,
              idRM: this.idRM,
              nazivRM: this.nazivRM,
              entitet: this.entitet,
              idObjekta: this.idObjekta,
              objekat_naziv: this.objekat_naziv,
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
              {txt.novi_ugovor} +
            </Text>
          </View>
        </TouchableOpacity>
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
                  this.navigation.navigate('Radnici_na_objektu_unos_edit', {
                    idU: item[0],
                    idZ: this.idZ,
                    nazivZ: this.nazivZ,
                    idRM: this.idRM,
                    nazivRM: this.nazivRM,
                    entitet: this.entitet,
                    idObjekta: this.idObjekta,
                    objekat_naziv: this.objekat_naziv,
                    refresh: data => {
                      if (!data) {
                        this.H.callFetch({
                          url:
                            this.Con.endpoint +
                            'radnici_na_objektima.cfc?method=zaposleni',
                          data: {
                            idObjekta: this.idObjekta,
                            idRM: this.idRM,
                            entitet: this.entitet,
                          },
                          func: res => {
                            params.route.params.refresh(res[0].DATA);
                            params.navigation.navigate(
                              'Radnici_na_objektu_zaposleni',
                              {
                                idRM: this.idRM,
                                nazivRM: this.nazivRM,
                                entitet: this.entitet,
                                idObjekta: this.idObjekta,
                                objekat_naziv: this.objekat_naziv,
                              },
                            );
                          },
                        });
                      } else this.setState({data: data});
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
