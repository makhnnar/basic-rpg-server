
var Punto = function(){
	
	this.data = {
		x : null,
		y : null,
		area : null
	};

	this.init = function(info){
		for(var propiedad in this.data){
			if(this.propiedad!='undefined'){
				this.data[propiedad] = info[propiedad];
			}
		}
	};

	this.getX = function(){
		return this.data.x;
	};

	this.getY = function(){
		return this.data.y;
	};

	this.getArea = function(){
		return this.data.area;
	};
};

module.exports = function(info){
	var instancia = new Punto();
	instancia.init(info);
	return instancia;
};