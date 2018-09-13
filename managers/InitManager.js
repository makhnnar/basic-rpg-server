var List = require('../modelos/List');

var InitManager = function(){
	
    this.initList = function(elementsLists){
        for(var i = 0;i < 9;i ++){
            elementsLists[i] = List();
        }
    };

}

module.exports = function(){
	var instancia = new InitManager();
	return instancia;
};