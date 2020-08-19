import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Alert, FlatList } from 'react-native';
import { SearchBar} from 'react-native-elements';

export default  class Odsustvo_unos_edit extends Component{
	constructor(props){
		super(props)
		this.txt    = props.params.txt
		this.Con 	= props.params.Config
		this.H  	= props.params.Helper
		this.state 	 	= {data: []};
	    this._arr  	 	= []
	    this.idRadnik 	= props.params.route.params.idRadnik
	    this.radnik_ime = props.params.route.params.radnik_ime
	    this.entitet 	= props.params.route.params.entitet
	    this.navigation = props.params.navigation
	}

	componentDidMount(){
		this.H.callFetch({
			url: this.Con.endpoint + 'odsustva.cfc?method=getAll',
			data:{idRadnik: this.idRadnik},
			func:(res)=>{
				this._arr = res.DATA
				this.setState({data:res.DATA})
			}
		})
	}

	searchFilterFunction = (text) => {
		this.setState({value: text})
		const newData = this._arr.filter(item => {      
		    const itemData = `${String(item[1]).toUpperCase()}`		    
		    const textData = text.toUpperCase()		      
		    return itemData.indexOf(textData) > -1    
	  	})	  
	  	this.setState({data: newData})
	}

	render(){
		const params 		= this.props.params
		const txt 			= this.txt
		const style 		= params.style
		const routeParams	= params.route.params

		return (
	  		<View style={this.H.ObjAss({}, style.column, style.flex_1)}>
	  			<View style={this.H.ObjAss({height:50, borderBottomWidth:1}, style.center, style.flex_0)}>
	  				<Text style={this.H.ObjAss({fontSize:16}, style.txt_c)}>{txt.radnik}: {this.radnik_ime}</Text>
	  			</View>
	  			<TouchableOpacity onPress={()=>{params.navigation.navigate('Novo_odsustvo', {
	  				godina: String(new Date().getFullYear()),
	    			idRadnik: this.idRadnik,
	    			radnik_ime: this.radnik_ime,
	    			entitet: this.entitet,
	    			refresh: (data)=>{this.setState({data:data})}
	  			})}}>
		  			<View style={this.H.ObjAss({height:50, backgroundColor:'#ddd'}, style.center, style.flex_0, style.mar_15)}>
		  				<Text style={this.H.ObjAss({fontSize:16}, style.txt_c)}>{txt.odsustva_novi} +</Text>
		  			</View>
		  		</TouchableOpacity>
	  			<View style={{flex:1}}>
					<SearchBar        
				      placeholder={txt.pretrazi_po_godini}        
				      searchIcon={false}
				      clearIcon={false}
				      onChangeText={text => this.searchFilterFunction(text)}
				      autoCorrect={false}
				      containerStyle={{backgroundColor:'#8b0000'}}
				      inputContainerStyle={{backgroundColor:'#fff'}}
				      value={this.state.value}
					/>
					<View style={this.H.ObjAss({height:40, borderBottomWidth: 1}, style.row, style.flex_0, style.center)}>
						<View style={this.H.ObjAss({width: 65}, style.flex_0, style.center)}>
							<Text style={style.txt_c}>{txt.godina}</Text>
						</View>
						<View style={this.H.ObjAss({}, style.column, style.flex_1, style.center)}>
							<Text style={style.txt_c}>{txt.vrsta_odsustva}</Text>
							<Text style={style.txt_c}>{txt.od} - {txt.do}</Text>
						</View>
						<View style={this.H.ObjAss({width: 65}, style.flex_0, style.center)}>
							<Text style={style.txt_c}>{txt.broj_dana}</Text>
						</View>
					</View>
					<FlatList          
						scrollEnabled={true}
					    data={this.state.data}          
					    renderItem={({ item }) => ( 
					    	<TouchableOpacity onPress={()=>{						
					    		this.navigation.navigate('Novo_odsustvo', {
					    			idOdsustvo: item[0],
					    			godina: item[1],
					    			idRadnik: this.idRadnik,
					    			radnik_ime: this.radnik_ime,
					    			entitet: this.entitet,
					    			refresh: (data)=>{this.setState({data:data})}
					    		})
					    	}}>
						    	<View style={this.H.ObjAss({height:70, borderBottomWidth: 1}, style.row, style.flex_0, style.center)}>
									<View style={this.H.ObjAss({width: 65}, style.flex_0, style.center)}>
										<Text style={style.txt_c}>{item[1]}</Text>
									</View>
									<View style={this.H.ObjAss({}, style.column, style.flex_1, style.center)}>
										<Text style={style.txt_c}>{item[2]}</Text>
										<Text style={style.txt_c}>
											{`${new Date(item[3]).getDate()}/${new Date(item[3]).getMonth()+1}/${new Date(item[3]).getFullYear()}`} - {`${new Date(item[4]).getDate()}/${new Date(item[4]).getMonth()+1}/${new Date(item[4]).getFullYear()}`}
										</Text>
									</View>
									<View style={this.H.ObjAss({width: 65}, style.flex_0, style.center)}>
										<Text style={style.txt_c}>{item[5]}</Text>
									</View>
								</View>
					      	</TouchableOpacity>
					    )}
					    keyExtractor={(item,index) => item[0].toString()}               
					 />           
				</View>
	  		</View>
		);
	}
}