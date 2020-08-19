import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Alert, FlatList} from 'react-native';
import {SearchBar} from 'react-native-elements';

export default class Korekcija_rm_home extends Component {
  constructor(props) {
    super(props);
    this.state = {data: []};
    this._arr = [];
    this.H = props.params.Helper;
    this.Con = props.params.Config;
    this.entitet = props.params.route.params.entitet;
    this.navigation = props.params.navigation;
  }

  componentDidMount() {
    this.H.callFetch({
      url: this.Con.endpoint + 'radnik.cfc?method=getAll',
      data: {entitet: this.entitet},
      func: res => {
        this._arr = res.DATA;
        this.setState({data: res.DATA});
      },
    });
  }

  searchFilterFunction = text => {
    this.setState({value: text});
    const newData = this._arr.filter(item => {
      const itemData = `${item[1].toUpperCase()} ${item[2].toUpperCase()}`;
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
            {txt.korekcija_rv}
          </Text>
        </View>
        <View style={{flex: 1}}>
          <SearchBar
            placeholder={txt.pretrazi_3}
            searchIcon={false}
            clearIcon={false}
            onChangeText={text => this.searchFilterFunction(text)}
            autoCorrect={false}
            containerStyle={{backgroundColor: '#8b0000'}}
            inputContainerStyle={{backgroundColor: '#fff'}}
            value={this.state.value}
          />
          <FlatList
            scrollEnabled={true}
            data={this.state.data}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  this.navigation.navigate('Korekcija_rv_odabir', {
                    idRadnik: item[0],
                    radnikIme: `${item[1]} ${item[2]}`,
                    entitet: this.entitet,
                    refresh: data => {
                      this.setState({data: data});
                    },
                  });
                }}>
                <View
                  style={this.H.ObjAss(
                    {height: 55, borderBottomWidth: 1},
                    style.flex_0,
                    style.padd_15,
                  )}>
                  <Text style={this.H.ObjAss({fontSize: 18}, style.txt_c)}>
                    {item[1]} {item[2]}
                  </Text>
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
