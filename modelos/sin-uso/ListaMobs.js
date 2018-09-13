/*
	TODO: hacer un arreglo de objetos de este tipo para los mobs x area
*/
var listaMobs = function(){
	
	this.data{
		listaMobs: null,
		areaMobs: null
	};

	this.init = function(info){
		for(var propiedad in this.data){
			if(this.propiedad!='undefined'){
				this.data[propiedad] = info[propiedad];
			}
		}
	}

	this.setListaMobs = function(listaMobs){
		this.data.listaMobs = listaMobs;
	};

	this.getListaMobs = function(){
		this.data.listaMobs;
	};

	this.getAreaMobs = function(){
		this.data.areaMobs;
	};
};

module.exports = function(info){
	var instancia = listaMobs();
	instancia.init(info);
	return instancia;
};