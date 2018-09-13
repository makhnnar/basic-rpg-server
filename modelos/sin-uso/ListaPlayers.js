var player = require('./Player');


var ListaPlayers = function(){
	
	this.data{
		listaPlayers: [],
		cantPlayers: 0
	};

	this.addPlayer = function(data){
		var new_player = player(data);
		this.data.listaPlayers.push(new_player);
		this.data.cantPlayers++;
	};

	this.removePlayer = function(id_player){
		var pos_array = this.posInList(id_player);
		if(pos_array!=-1){
			this.data.listaPlayers.slice(0,pos_array).concat(this.data.listaPlayers.slice(pos_array+1));
			this.data.cantPlayers--;
		}
	};

	this.updatePosPlayer = function(data){
		var pos_array = this.posInList(data.id_player);
		if(pos_array!=-1){
			this.data.listaPlayers[pos_array].data.punto = data.punto;
		}
	};

	this.getPosPlayer = function(data){
		var pos_array = this.posInList(data.id_player);
		if(pos_array!=-1){
			return this.data.listaPlayers[pos_array].data.punto;
		}
		return null;
	};

	this.getPlayer = function(id_player){
		var pos_array = this.posInList(id_player);
		if(pos_array!=-1){
			return this.data.listaPlayers[pos_array];
		}
		return null;
	};

	this.setPlayer = function(data){
		var pos_array = this.posInList(data.id_player);
		if(pos_array!=-1){
			this.data.listaPlayers[pos_array] = data.player;
		}
	};

	this.posInList = function(id_player){
		for(var i = 0;i<data.cantPlayers;i ++){
			if(data.listaPlayers[i].data.id_player===id_player){
				return i; 
			}
		}
		return -1;
	};

};

module.exports = function(){
	var instancia = ListaPlayers();
	return instancia;
};