import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Alert, FlatList} from 'react-native';
import {SearchBar} from 'react-native-elements';

export default class Unos_objekata_home extends Component {
  constructor(props) {
    super(props);
    this.state = {data: []};
    this._arr = [];
    this.H = props.params.Helper;
    this.Con = props.params.Config;
    this.entitet = props.params.route.params.entitet;
    this.reg_id = props.params.route.params.reg_id;
    this.navigation = props.params.navigation;
  }

  componentDidMount() {
    console.log(this.reg_id);
    this.H.callFetch({
      url: this.Con.endpoint + 'objekti.cfc?method=getAll',
      data: {entitet: this.entitet, reg_id: this.reg_id},
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
            {txt.objekti}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            params.navigation.navigate('Obj_odabir', {
              entitet: routeParams.entitet,
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
              {txt.novi_objekat} +
            </Text>
          </View>
        </TouchableOpacity>
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
                  this.navigation.navigate('Obj_odabir', {
                    id: item[0],
                    naziv: item[1],
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
                    {item[1]}
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
