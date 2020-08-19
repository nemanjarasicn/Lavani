import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert, ScrollView  } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

export default  class Radno_mesto_unos_edit extends Component{
	constructor(props){
		super(props);
		this.H 	   	 	= props.params.Helper
	    this.Con   	 	= props.params.Config
	    this.navigation = props.params.navigation
	    this.idVEZE 	= ''
	    this.state 		= {}
	    this.idRM  = (props.params.route.params.idRM != undefined)? props.params.route.params.idRM : '' ;
	    this.entitet	= props.params.route.params.entitet
	    this.idObjekta  = props.params.route.params.idObjekta
	    this.objekat_naziv = props.params.route.params.objekat_naziv
	    
	    //sifarnici
	    this.sif = []
	}

	getRadnoMestoData = ()=>{
		if(this.idRM != ''){
			this.H.callFetch({
				url: this.Con.endpoint + 'radna_mesta.cfc?method=get',
				data: {
					idRM: this.idRM,
					idObjekta: this.idObjekta
				},
				func: (res)=>{
					const data = res.DATA[0]
					this.idVEZE = data[0]
					this.props.params.set.sif({value:data[1], label: data[2]})
					this.props.params.set.dod_d(new Date(data[3]).getDate())
					this.props.params.set.dod_m(new Date(data[3]).getMonth()+1)
					this.props.params.set.dod_y(new Date(data[3]).getFullYear())
					if(data[4] != ''){
						this.props.params.set.ddo_d(new Date(data[4]).getDate())
						this.props.params.set.ddo_m(new Date(data[4]).getMonth()+1)
						this.props.params.set.ddo_y(new Date(data[4]).getFullYear())
					}else{
						this.props.params.set.ddo_d('')
						this.props.params.set.ddo_m('')
						this.props.params.set.ddo_y('')
					}
					this.props.params.set.neto(data[5])
					this.props.params.set.doprinosi(data[6])
					this.props.params.set.prevoz(data[7])
					this.props.params.set.topliObrok(data[8])
					this.props.params.set.regres(data[9])
					this.props.params.set.predvidjeniSati(data[10])
					this.props.params.set.brojZaposlenih(data[11])
				}
			})
		}
	}

	getSif = (sif, sifarnik)=>{
		this.H.callFetch({
			url: this.Con.endpoint + 'sifarnici.cfc?method=get',
			data:{
				sifarnik: sifarnik,
				entitet: this.entitet
			},
			func: (res)=>{
				let result = []
				res.DATA.forEach((el)=>{
  					result.push({
  						label: el[1],
  						value: el[0]
  					})
  				})
  				this[sif] = result
				this.setState({sif: sifarnik})
			}
		})
	}

	componentDidMount(){
		this.getSif('sif', 'EZ_SIF_RADNA_MESTA')
		this.getRadnoMestoData()
	}

	render(){
		const params 	= this.props.params
		const style 	= params.style
		const txt 		= params.txt
		return (
	  		<View style={this.H.ObjAss({}, style.column, style.flex_1)}>
	  			<View style={this.H.ObjAss({height:50}, style.center, style.flex_0)}>
	  				<Text style={this.H.ObjAss({fontSize:16}, style.txt_c)}>{txt.objekat}: {this.objekat_naziv}</Text>
	  			</View>
	  			<View  style={style.flex_1}>
		  			<ScrollView >
		  				<View style={this.H.ObjAss({}, style.mar_15, style.column)}>
			  				<Text>{txt.naziv_radnog_mesta}:</Text>
			  				<View style={this.H.ObjAss({height:50, borderWidth:1}, style.txt_c)}>
				  				<RNPickerSelect
						            onValueChange={(value, index) => {params.set.sif({value: value, label: this.sif[index-1].label})}}
						            items={this.sif}
						            value={params.get.sif.value}
						            useNativeAndroidPickerStyle={false}	
						            placeholder={{label:txt.naziv_radnog_mesta}}
						        />
						    </View>
						</View>
		  				<View style={this.H.ObjAss({}, style.mar_15, style.column)}>
		  					<Text>{txt.raspoloziv_neto}:</Text>
			  				<TextInput style={this.H.ObjAss({height:50, borderWidth:1}, style.txt_c)} placeholder={txt.raspoloziv_neto}
			  					onChangeText={(value)=>{params.set.neto(value)}}
			  					value={params.get.neto.toString()}
			  					keyboardType='phone-pad'
			  				/>
		  				</View>
		  				<View style={this.H.ObjAss({}, style.mar_15, style.column)}>
		  					<Text>{txt.raspoloziv_doprinos}:</Text>
			  				<TextInput style={this.H.ObjAss({height:50, borderWidth:1}, style.txt_c)} placeholder={txt.raspoloziv_doprinos}
			  					onChangeText={(value)=>{params.set.doprinosi(value)}}
			  					value={params.get.doprinosi.toString()}
			  					keyboardType='phone-pad'
			  				/>
		  				</View>
		  				<View style={this.H.ObjAss({}, style.mar_15, style.column)}>
		  					<Text>{txt.raspoloziv_za_porez}:</Text>
			  				<TextInput style={this.H.ObjAss({height:50, borderWidth:1}, style.txt_c)} placeholder={txt.raspoloziv_za_porez}
			  					onChangeText={(value)=>{params.set.prevoz(value)}}
			  					value={params.get.prevoz.toString()}
			  					keyboardType='phone-pad'
			  				/>
		  				</View>
		  				<View style={this.H.ObjAss({}, style.mar_15, style.column)}>
		  					<Text>{txt.raspoloziv_za_topli}:</Text>
			  				<TextInput style={this.H.ObjAss({height:50, borderWidth:1}, style.txt_c)} placeholder={txt.raspoloziv_za_topli}
			  					onChangeText={(value)=>{params.set.topliObrok(value)}}
			  					value={params.get.topliObrok.toString()}
			  					keyboardType='phone-pad'
			  				/>
		  				</View>
		  				<View style={this.H.ObjAss({}, style.mar_15, style.column)}>
		  					<Text>{txt.raspoloziv_za_regres}:</Text>
			  				<TextInput style={this.H.ObjAss({height:50, borderWidth:1}, style.txt_c)} placeholder={txt.raspoloziv_za_regres}
			  					onChangeText={(value)=>{params.set.regres(value)}}
			  					value={params.get.regres.toString()}
			  					keyboardType='phone-pad'
			  				/>
		  				</View>
		  				<View style={this.H.ObjAss({}, style.mar_15, style.column)}>
		  					<Text>{txt.predvidjeni_sati}:</Text>
			  				<TextInput style={this.H.ObjAss({height:50, borderWidth:1}, style.txt_c)} placeholder={txt.predvidjeni_sati}
			  					onChangeText={(value)=>{params.set.predvidjeniSati(value)}}
			  					value={params.get.predvidjeniSati.toString()}
			  					keyboardType='phone-pad'
			  				/>
		  				</View>
		  				<View style={this.H.ObjAss({}, style.column)}>
			  				<Text style={style.padd_15}>{txt.datum_od_vazenja}:</Text>
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
		  				</View><View style={this.H.ObjAss({}, style.column)}>
			  				<Text style={style.padd_15}>{txt.datum_do_vazenja}:</Text>
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
		  					<Text>{txt.broj_zaposlenih}:</Text>
			  				<TextInput style={this.H.ObjAss({height:50, borderWidth:1}, style.txt_c)} placeholder={txt.broj_zaposlenih}
			  					onChangeText={(value)=>{params.set.brojZaposlenih(value)}}
			  					value={params.get.brojZaposlenih.toString()}
			  					keyboardType='phone-pad'
			  				/>
		  				</View>				
		  			</ScrollView >	
		  		</View>
	  			{/*<TouchableOpacity onPress={()=>{
	  				if(
						params.get.sif.value == '' ||
						params.get.doprinosi == '' ||
						params.get.prevoz == '' ||
						params.get.topliObrok == '' ||
						params.get.regres == '' ||
						params.get.predvidjeniSati == '' ||
						params.get.dod_d == '' ||
						params.get.dod_m == '' ||
						params.get.dod_y == '' ||
						params.get.brojZaposlenih == ''
					) Alert.alert(txt.upozorenje, txt.popunite_sva_polja)
					else{
						const datum_do = (params.get.ddo_d == '' || params.get.ddo_m == '' || params.get.ddo_y == '')? '' 
						: `${params.get.ddo_y}-${params.get.ddo_m}-${params.get.ddo_d}`;
						this.H.callFetch({
							url: this.Con.endpoint + 'radna_mesta.cfc?method=ins_upd',
							data: {
								id: this.idVEZE,
								idRM: params.get.sif.value,
								entitet: this.entitet,
								idObjekta: this.idObjekta,
								neto: params.get.neto,
								doprinosi: params.get.doprinosi,
								prevoz: params.get.prevoz,
								topliObrok: params.get.topliObrok,
								regres: params.get.regres,
								predvidjeniSati: params.get.predvidjeniSati,
								brojZaposlenih: params.get.brojZaposlenih,
								datum_od: `${params.get.dod_y}-${params.get.dod_m}-${params.get.dod_d}`,
								datum_do: datum_do
							},
							func: (res)=>{
								if(Number(res[0]) === 1){
									this.H.callFetch({
										url: this.Con.endpoint + 'radna_mesta.cfc?method=getAll',
										data:{
											idObjekta: this.idObjekta,
											entitet: this.entitet
										},
										func:(res)=>{
											params.route.params.refresh(res.DATA)
											Alert.alert(txt.obavestenje, txt.uspesno_sacuvano)
											params.navigation.navigate('Radna_mesta', {
												entitet: this.entitet,
												id: this.idObjekta,
			  									objekat_naziv: this.objekat_naziv
											})
										}
									})	
								}
								else if(Number(res[0]) === 2){
									if(res[1] < 0) Alert.alert(txt.upozorenje, txt.br_zaposlenih_smanjiti_za + ': ' + Math.abs(res[1]) + ' ' + txt.radnih_mesta)	
									else Alert.alert(txt.upozorenje, txt.br_zaposlenih_premasuje + ': ' + res[1] + ' ' + txt.radnih_mesta)	
								} 
								else if(Number(res[0]) === 3) Alert.alert(txt.upozorenje, txt.vec_dodeljeno_radniku)
								else Alert.alert(txt.upozorenje, txt.radno_mesto_vec_postoji_na_objektu)
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
