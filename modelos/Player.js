
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
        m_atk:null,
        m_def:null,
        m_evasion:null,
        m_accuracy:null,
        m_sh_def:null,
        m_sh_rte:null,
        p_atk:null,
        p_def:null,
        p_evasion:null,
        p_accuracy:null,
        p_sh_def:null,
        p_sh_rte:null,
        canMove:null,
        canMAtk:null,
        canPAtk:null,
        canUseSh:null,
        canUseWp:null,
        canUseAr:null,
        canUseJw:null,
        canUseMnt:null,
        canMDef:null,
        canPDef:null,
        canBeRess:null,
        canBeDmg:null,
        canBeHeal:null,
        canRegMp:null,
        canRegHp:null,
        run_spd:null,
        reUseSkMg:null,
        reUseSkPh:null,
       	id_cur_class:null,
        id_posicion:null,
        id_apariencia:null,
       	lvl:null,
        exp:null,
        sp:null,
        atk_spd:null,
        cast_spd:null,
        p_ctr_rte:null,
        m_ctr_rte:null,
        p_ctr_atk:null,
        m_ctr_atk:null,
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
