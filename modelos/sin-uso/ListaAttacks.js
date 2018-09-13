var attack = require('./Attack');


var listaAttacks = function(){
	
	this.data{
		listaAttacks: [],
		cantAttacks: 0
	};

	this.addAttack = function(data){
		var new_Attack = Attack(data);
		this.data.listaAttacks.push(new_Attack);
		this.data.cantAttacks++;
	};

	this.removeAttack = function(id_Attack){
		var pos_array = this.posInList(id_Attack);
		if(pos_array!=-1){
			this.data.listaAttacks.slice(0,pos_array).concat(this.data.listaAttacks.slice(pos_array+1));
			this.data.cantAttacks--;
		}
	};

	//este metodo podria resultar inutil igual
	this.updatePosAttack = function(data){
		var pos_array = this.posInList(data.id_Attack);
		if(pos_array!=-1){
			this.data.listaAttacks[pos_array].data.punto = data.punto;
		}
	};

	this.getPosAttack = function(data){
		var pos_array = this.posInList(data.id_Attack);
		if(pos_array!=-1){
			return this.data.listaAttacks[pos_array].data.punto;
		}
		return null;
	};

	this.getAttack = function(id_Attack){
		var pos_array = this.posInList(id_Attack);
		if(pos_array!=-1){
			return this.data.listaAttacks[pos_array];
		}
		return null;
	};

	//para que me serviria este metodo.aparentemente no es util
	this.setAttack = function(data){
		var pos_array = this.posInList(data.id_Attack);
		if(pos_array!=-1){
			this.data.listaAttacks[pos_array] = data.Attack;
		}
	};

	this.posInList = function(id_Attack){
		for(var i = 0;i<data.cantAttacks;i ++){
			if(data.listaAttacks[i].data.id_Attack===id_Attack){
				return i; 
			}
		}
		return -1;
	};

	this.numAttacks = function(){
		return this.data.cantAttacks;
	};

};

module.exports = function(){
	var instancia = listaAttacks();
	return instancia;
};