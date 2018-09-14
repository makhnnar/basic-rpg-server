
var Player = function(){
	//id_posicion es el id del punto del player en la DB
  //pos es el objeto con los datos de la pos en el mapa
	this.data = {
        id_player:null,
        max_hp:null,
        cur_hp:null,
        reg_hp:null,
        max_mp:null,
        cur_mp:null,
        reg_mp:null,
        atk:null,
        def:null,
       	lvl:null,
        exp:null,
        atk_spd:null,
        nickname:null,
        stats:null,
        pos:null
    };

    this.init = function(info){
		for(var propiedad in this.data){
			if(this.propiedad!='undefined'){
				this.data[propiedad] = info[propiedad];
			}
		}
	};

	this.setStats = function(info){
		for(var propiedad in this.data.stats){
			if(this.propiedad!='undefined'){
				this.data.stats[propiedad] = info[propiedad];
			}
		}
	};

	this.getStats = function(){
		return this.data.stats;
	};

	this.getIdPosDb = function(){
		return this.data.id_posicion;
	};

	this.setPosObj = function(pos){
		this.data.pos = pos;
	};

    this.getPosObj = function(){
        return this.data.pos;
    };

    this.getId = function(){
        return this.data.id_player;
    };

}

module.exports = function(info){
	var instancia = new Player();
	instancia.init(info);
	return instancia;
};
