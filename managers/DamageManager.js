var DamageManager = function(){
	
	this.data = {
        
    };

    this.updatedAttackList = function(attackList){
        for(var i = 0;i<attackList.Length();i ++){
            if(attackList.getAttack(i).isEnable()===false){
                attackList.removeAttack(i);
            }
        }
    };
}

module.exports = function(){
	var instancia = new DamageManager();
	return instancia;
};