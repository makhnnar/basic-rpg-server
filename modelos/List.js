var List = function(){
	
	this.data = {
		list: [],
		length: 0
	};

	this.add = function(element){
		this.data.list.push(element);
		this.data.length++;
	};

	this.remove = function(pos){
		if(pos>=0){
			this.data.list.slice(0,pos).concat(this.data.list.slice(pos+1));
			this.data.length--;
		}
	};

	this.get = function(pos){
		if(pos>=0){
			return this.data.list[pos];
		}
		return null;
	};

	this.setInPos = function(element,pos){
		if(pos>=0){
			this.data.list[pos].init(element);
		}
	};

	this.posInList = function(element){
		for(var i = 0;i<this.data.length;i ++){
			var band = true;
			for(var propiedad in element.data){
				if(this.data.list[i].data[propiedad] != element.data[propiedad]){
					band = false;
				}
			}
			if(band===true){
				return i; 
			}
		}
		return null;
	};

	this.getAllElements = function(){
		return this.data.list;
	};

	this.Length = function(){
		return this.data.length;
	};

};

module.exports = function(){
	var instancia = new List();
	return instancia;
};