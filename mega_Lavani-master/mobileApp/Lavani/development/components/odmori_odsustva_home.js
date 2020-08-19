import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';

//my components
import RadnikList from './radnik_list';
export default  class Odmori_odsustva_home extends Component{
	constructor(props){
		super(props)
		this.txt    = props.params.txt
		this.Con 	= props.params.Config
		this.Help   = props.params.Helper
		this.odabir = props.params.route.params.odabir
		this.naslov = (this.odabir)? this.txt.odmori : this.txt.odsustva ;
		this.novi 	= (this.odabir)? this.txt.odmori_novi : this.txt.odsustva_novi ;
		this.nav 	= (this.odabir)? 'Odmor_unos_edit' : 'Odsustvo_unos_edit' ;
	}

	render(){
		const params 		= this.props.params
		const routeParams	= params.route.params
		const style 		= params.style
		const txt 			= this.txt
		const H 			= this.Help		

		return (
	  		<View style={H.ObjAss({}, style.column, style.flex_1)}>
	  			<View style={H.ObjAss({height:60}, style.center, style.flex_0)}>
	  				<Text style={H.ObjAss({fontSize:18}, style.txt_c)}>{this.naslov}</Text>
	  			</View>
	  			<RadnikList params={
	  				{
				        navigation:params.navigation,
				        Config: this.Con,
				        Helper: H,
				        txt: txt,
				        style: style,
				        entitet: routeParams.entitet,
				        nav: this.nav
	  				}
	  			} />
	  		</View>
		);
	}
}
