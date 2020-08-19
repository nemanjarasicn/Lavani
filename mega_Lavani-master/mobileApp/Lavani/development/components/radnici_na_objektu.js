import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Alert, TextInput } from 'react-native';
import InputScrollView from 'react-native-input-scroll-view';

export default  class Radnici_na_objektu extends Component{
	
	render(){
		const params 		= this.props.params
		const style 		= params.style
		const txt 			= params.txt
		const H 			= params.Helper
		const Con 			= params.Config
		const routeParams 	= params.route.params
		return (
			<View  style={H.ObjAss({}, style.flex_1, style.padd_15)}>
	  			<InputScrollView>
	  				<TextInput style={H.ObjAss({height:50, borderWidth:1}, style.mar_15, style.txt_c)} placeholder={txt.naziv_obj}/>
	  				<TextInput style={H.ObjAss({height:50, borderWidth:1}, style.mar_15, style.txt_c)} placeholder={txt.raspoloziv_neto}/>
	  				<TextInput style={H.ObjAss({height:50, borderWidth:1}, style.mar_15, style.txt_c)} placeholder={txt.raspoloziv_doprinos}/>
	  				<TextInput style={H.ObjAss({height:50, borderWidth:1}, style.mar_15, style.txt_c)} placeholder={txt.raspoloziv_za_porez}/>
	  				<TextInput style={H.ObjAss({height:50, borderWidth:1}, style.mar_15, style.txt_c)} placeholder={txt.raspoloziv_za_topli}/>
	  				<TextInput style={H.ObjAss({height:50, borderWidth:1}, style.mar_15, style.txt_c)} placeholder={txt.raspoloziv_za_regres}/>
	  				<TextInput style={H.ObjAss({height:50, borderWidth:1}, style.mar_15, style.txt_c)} placeholder={txt.naziv_radnog_mesta}/>
	  				<TextInput style={H.ObjAss({height:50, borderWidth:1}, style.mar_15, style.txt_c)} placeholder={txt.predvidjeni_sati}/>
	  			</InputScrollView>	
	  		</View>
		);
	}
}
