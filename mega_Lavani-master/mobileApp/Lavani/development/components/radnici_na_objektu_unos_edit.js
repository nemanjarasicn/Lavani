import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Alert, TextInput, ScrollView} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

export default  class Radnici_na_objektu_unos_edit extends Component{
	constructor(props){
		super(props)
		this.zaposleni 	 	= []
	    this.H 	   	 		= props.params.Helper
	    this.Con   	 		= props.params.Config
	    this.idRM 			= props.params.route.params.idRM
	    this.nazivRM  		= props.params.route.params.nazivRM
	    this.idObjekta  	= props.params.route.params.idObjekta
	    this.objekat_naziv  = props.params.route.params.objekat_naziv
	    this.entitet 		= props.params.route.params.entitet
	    this.style 			= props.params.style
	    this.txt 			= props.params.txt
	    this.navigation 	= props.params.navigation
	    //id zaposlenog i id ugovora
	    this.nazivZ         = props.params.route.params.nazivZ
	    this.idZ 			= (props.params.route.params.idZ != undefined)? props.params.route.params.idZ : '';
	    this.idU 			= (props.params.route.params.idU != undefined)? props.params.route.params.idU : '';
	}

	getInit = () => {
		this.H.callFetch({
			url: this.Con.endpoint + 'radnici_na_objektima.cfc?method=getInit',
			data:{
				idZ: this.idZ,
				idU: this.idU,
				idRM: this.idRM,
 				idObjekta: this.idObjekta
			},
			func:(res)=>{
				if(this.idZ == ''){
					let result = []
					res.DATA.forEach((el)=>{
	  				result.push({
	  						label: el[1],
	  						value: el[0]
	  					})
	  				})
	  				this.zaposleni  = result
	  				this.setState({load: 1})
				}else if(this.idU != ''){
					const data = res.DATA[0]
					this.props.params.set.dod_d(new Date(data[0]).getDate())
					this.props.params.set.dod_m(new Date(data[0]).getMonth()+1)
					this.props.params.set.dod_y(new Date(data[0]).getFullYear())
					if(data[1] != ''){
						this.props.params.set.ddo_d(new Date(data[1]).getDate())
						this.props.params.set.ddo_m(new Date(data[1]).getMonth()+1)
						this.props.params.set.ddo_y(new Date(data[1]).getFullYear())
					}else{
						this.props.params.set.ddo_d('')
						this.props.params.set.ddo_m('')
						this.props.params.set.ddo_y('')
					}
					this.props.params.set.brUgovora(data[2])
				}
			}
		})
	}

	componentDidMount(){
		if(this.idZ == '' || this.idU != '') this.getInit()
	}
	
	render(){
		const params 		= this.props.params
		const style 		= this.style
		const txt 			= this.txt
		const routeParams 	= params.route.params
		const com_radnik = (this.idZ == '')?
					<View style={this.H.ObjAss({}, this.style.mar_15, this.style.column)}>
		  				<Text>{this.txt.radnici}:</Text>
		  				<View style={this.H.ObjAss({height:50, borderWidth:1}, this.style.txt_c)}>
			  				<RNPickerSelect
					            onValueChange={(value, index) => {this.props.params.set.zaposleni({value: value, label: this.zaposleni[index-1].label})}}
					            items={this.zaposleni}
					            value={this.props.params.get.zaposleni.value}
					            useNativeAndroidPickerStyle={false}	
					            placeholder={{label:this.txt.radnici}}
					        />
					    </View>
					</View>
					:
					<View style={this.H.ObjAss({}, this.style.mar_15, this.style.column)}>
	  					<Text>{this.txt.radnik}:</Text>
		  				<TextInput style={this.H.ObjAss({height:50, borderWidth:1}, style.txt_c)} placeholder={this.txt.radnik}
		  					value={this.nazivZ}
		  					editable = {false}
		  				/>
	  				</View>;
	  	const del = (this.idU != '')?
	  	<TouchableOpacity onPress={()=>{
  				this.H.callFetch({
  					url: this.Con.endpoint + 'sifarnici.cfc?method=del',
  					data:{
  						id:this.idU,
  						tb: 'EZ_ZAPOSLENJA_PO_OBJEKTIMA',
  						idObjekta: this.idObjekta,
						idRM: this.idRM,
						idZ: this.idZ
  					},
  					func: (res)=>{  						
  						this.H.callFetch({
							url: this.Con.endpoint + 'radnici_na_objektima.cfc?method=ugovori',
							data:{
								idObjekta: this.idObjekta,
								idRM: this.idRM,
								idZ: this.idZ
							},
							func:(res)=>{
								if(res.DATA.length < 1) params.route.params.refresh(0)
								else params.route.params.refresh(res.DATA)
								Alert.alert(txt.obavestenje, txt.uspesno_obrisano)
		  						params.navigation.navigate('Radnici_na_objektu_ugovori', {
									idZ:this.idZ,
					    			nazivZ:this.nazivZ,
					    			idRM: this.idRM,
					    			nazivRM: this.nazivRM,
					    			entitet: this.entitet,
					    			idObjekta: this.idObjekta,
					    			objekat_naziv: this.objekat_naziv
								})
							}
						})
					}
  				})
  			}}>
	  			<View style={this.H.ObjAss({height:50, backgroundColor: '#ddd', marginTop: 15}, style.center, style.flex_0)}>
		  			<Text style={style.txt_c}>{txt.obrisi}</Text>
		  		</View>
  			</TouchableOpacity>
	  	: null;

		return (
	  		<View style={this.H.ObjAss({}, style.column, style.flex_1)}>
	  			<View style={{flex:1}}>
	  				<ScrollView>
		  				<View style={this.H.ObjAss({}, style.mar_15, style.column)}>
		  					<Text>{txt.objekat}:</Text>
			  				<TextInput style={this.H.ObjAss({height:50, borderWidth:1}, style.txt_c)} placeholder={txt.objekat}
			  					value={this.objekat_naziv}
			  					editable = {false}
			  				/>
		  				</View>
		  				<View style={this.H.ObjAss({}, style.mar_15, style.column)}>
		  					<Text>{txt.radno_mesto}:</Text>
			  				<TextInput style={this.H.ObjAss({height:50, borderWidth:1}, style.txt_c)} placeholder={txt.radno_mesto}
			  					value={this.nazivRM}
			  					editable = {false}
			  				/>
		  				</View>
	  					{com_radnik}
	  					<View style={this.H.ObjAss({}, style.column)}>
			  				<Text style={style.padd_15}>{txt.datum_z_od}:</Text>
			  				<View style={this.H.ObjAss({}, style.row, style.center)}>
			  					<View>
				  					<Text style={style.txt_c}>{txt.dan}</Text>
				  					<TextInput style={this.H.ObjAss({height:50, width:50, borderWidth:1}, style.mar_15, style.txt_c)} placeholder={txt.staz_dan}
				  						onChangeText={(value)=>{params.set.dod_d(value)}}
				  						value={params.get.dod_d.toString()}
				  						maxLength={2}
			  							keyboardType='phone-pad'
				  					/>
				  				</View>
				  				<View>
				  					<Text style={style.txt_c}>{txt.mesec}</Text>
				  					<TextInput style={this.H.ObjAss({height:50, width:50, borderWidth:1}, style.mar_15, style.txt_c)} placeholder={txt.staz_mesec}
				  						onChangeText={(value)=>{params.set.dod_m(value)}}
				  						value={params.get.dod_m.toString()}
				  						maxLength={2}
			  							keyboardType='phone-pad'
				  					/>
			  					</View>
			  					<View>
				  					<Text style={style.txt_c}>{txt.godina}</Text>
				  					<TextInput style={this.H.ObjAss({height:50, width:100, borderWidth:1}, style.mar_15, style.txt_c)} placeholder={txt.staz_godina}
				  						onChangeText={(value)=>{params.set.dod_y(value)}}
				  						value={params.get.dod_y.toString()}
				  						maxLength={4}
			  							keyboardType='phone-pad'
				  					/>
			  					</View>
			  				</View>
		  				</View>
		  				<View style={this.H.ObjAss({}, style.column)}>
			  				<Text style={style.padd_15}>{txt.datum_z_do}:</Text>
			  				<View style={this.H.ObjAss({}, style.row, style.center)}>
			  					<View>
				  					<Text style={style.txt_c}>{txt.dan}</Text>
				  					<TextInput style={this.H.ObjAss({height:50, width:50, borderWidth:1}, style.mar_15, style.txt_c)} placeholder={txt.staz_dan}
				  						onChangeText={(value)=>{params.set.ddo_d(value)}}
				  						value={params.get.ddo_d.toString()}
				  						maxLength={2}
			  							keyboardType='phone-pad'
				  					/>
				  				</View>
				  				<View>
				  					<Text style={style.txt_c}>{txt.mesec}</Text>
				  					<TextInput style={this.H.ObjAss({height:50, width:50, borderWidth:1}, style.mar_15, style.txt_c)} placeholder={txt.staz_mesec}
				  						onChangeText={(value)=>{params.set.ddo_m(value)}}
				  						value={params.get.ddo_m.toString()}
				  						maxLength={2}
			  							keyboardType='phone-pad'
				  					/>
			  					</View>
			  					<View>
				  					<Text style={style.txt_c}>{txt.godina}</Text>
				  					<TextInput style={this.H.ObjAss({height:50, width:100, borderWidth:1}, style.mar_15, style.txt_c)} placeholder={txt.staz_godina}
				  						onChangeText={(value)=>{params.set.ddo_y(value)}}
				  						value={params.get.ddo_y.toString()}
				  						maxLength={4}
			  							keyboardType='phone-pad'
				  					/>
			  					</View>
			  				</View>
		  				</View>
		  				<View style={this.H.ObjAss({}, style.mar_15, style.column)}>
		  					<Text>{txt.broj_ugovora}:</Text>
			  				<TextInput style={this.H.ObjAss({height:50, borderWidth:1}, style.txt_c)} placeholder={txt.broj_ugovora}
			  					onChangeText={(value)=>{params.set.brUgovora(value)}}
			  					value={params.get.brUgovora.toString()}
			  				/>
		  				</View>
	  				</ScrollView>
				</View>
  				<TouchableOpacity onPress={()=>{
  				if(
					params.get.brUgovora == '' ||
					params.get.dod_d == '' ||
					params.get.dod_m == '' ||
					params.get.dod_y == '' 
				) Alert.alert(txt.upozorenje, txt.popunite_sva_polja)
				else{
					if(this.idZ == '' && params.get.zaposleni.value == '') Alert.alert(txt.upozorenje, txt.popunite_sva_polja)
					else{
						const idRadnik = (this.idZ == '')? params.get.zaposleni.value : this.idZ;
						const datum_do = (params.get.ddo_d == '' || params.get.ddo_m == '' || params.get.ddo_y == '' )? ''
						: `${params.get.ddo_y}-${params.get.ddo_m}-${params.get.ddo_d}`;
						this.H.callFetch({
							url: this.Con.endpoint + 'radnici_na_objektima.cfc?method=ins_upd',
							data: {
								idU: this.idU,
								idZ: idRadnik,
								idRM: this.idRM,
								idObjekta: this.idObjekta,
								entitet: this.entitet,
								datum_od: `${params.get.dod_y}-${params.get.dod_m}-${params.get.dod_d}`,
								datum_do: datum_do,
								brUgovora: params.get.brUgovora
							},
							func: (res)=>{
								if(res){
									if(this.idZ == ''){
										this.H.callFetch({
											url: this.Con.endpoint + 'radnici_na_objektima.cfc?method=zaposleni',
											data:{
												idObjekta: this.idObjekta,
												idRM: this.idRM,
												entitet: this.entitet
											},
											func:(res)=>{
												params.route.params.refresh(res[0].DATA)
												Alert.alert(txt.obavestenje, txt.uspesno_sacuvano)
												params.navigation.navigate('Radnici_na_objektu_zaposleni', {
													idRM: this.idRM,
									    			nazivRM: this.nazivRM,
									    			entitet: this.entitet,
									    			idObjekta: this.idObjekta,
									    			objekat_naziv: this.objekat_naziv
												})
											}
										})
									}else{
										this.H.callFetch({
											url: this.Con.endpoint + 'radnici_na_objektima.cfc?method=ugovori',
											data:{
												idObjekta: this.idObjekta,
												idRM: this.idRM,
												idZ: this.idZ
											},
											func:(res)=>{
												params.route.params.refresh(res.DATA)
												Alert.alert(txt.obavestenje, txt.uspesno_sacuvano)
												params.navigation.navigate('Radnici_na_objektu_ugovori', {
													idZ:this.idZ,
									    			nazivZ:this.nazivZ,
									    			idRM: this.idRM,
									    			nazivRM: this.nazivRM,
									    			entitet: this.entitet,
									    			idObjekta: this.idObjekta,
									    			objekat_naziv: this.objekat_naziv
												})
											}
										})
									}
								}else Alert.alert(txt.upozorenje, txt.nema_mesta)
							}
						})
					}
				}	  				
  			}}>
	  			<View style={this.H.ObjAss({height:50, backgroundColor: '#ddd'}, style.center, style.flex_0)}>
	  				<Text style={style.txt_c}>{txt.sacuvaj}</Text>
	  			</View>
  			</TouchableOpacity>
  			{del}
  		</View>
		);
	}
}