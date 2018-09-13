
var Attack = function(){
	
    /**
    * Este objeto deberia tener su propia logica embebida para la manipulacion
    * de cada ataque por individual
    */

	this.data = {
        id_player:null,
        vel:null,
        distance:null,
        pto_ini:null,
        pto_fin:null,
        pos:null,
        direccion:null,
        id_attack:null,
        base_dmg:null,
        enable:true
    };

    //TODO: hacer un metodo para inicializar la posicion final del ataque

    this.init = function(info){
		for(var propiedad in this.data){
			if(this.propiedad!='undefined'){
				this.data[propiedad] = info[propiedad];
			}
		}
	};

    this.updatePos = function(){
        //actualiza la posicion del ataque
    }

    this.isEnable = function(){
        return this.data.enable;
    }
}

module.exports = function(info){
	var instancia = new Attack();
	instancia.init(info);
	return instancia;
};
