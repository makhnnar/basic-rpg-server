var IOSocketManager = function(){

	// send a private message to the socket with the given id
	this.sendPmMsg = function(socket,id_user,evento,msg){
		socket.to(id_user).emit(evento, msg);
	};

	// send a message to the socket room with the given id
	this.sendRoomMsg = function(io,id_room,evento,msg){
		//var id_room = this.getValidRoom(id_room);
		io.sockets.in(id_room).emit(evento,msg);
	};

	this.sendEveryOne = function(io,evento,msg){
		io.sockets.emit(evento,msg);
	};

	this.sendWarning = function(io,msg){
		io.sockets.emit("advertencia",msg);
	};

	this.joinRoom = function(socket,id_room) {
		var id_room = this.getValidRoom(id_room);
		socket.join(id_room, () => {
			let rooms = Object.keys(socket.rooms);
			console.log(rooms); // [ <socket.id>, 'room 237' ]
		});
	};

	this.leaveRoom = function(socket,id_room) {
		var id_room = this.getValidRoom(id_room);
		socket.leave(id_room, () => {
			let rooms = Object.keys(socket.rooms);
			console.log(rooms); // [ <socket.id>, 'room 237' ]
		});
	};

	this.getValidRoom = function(room_name) {
		var nombre = "null";
		if(room_name>=0&&room_name<=9){
			nombre = "cuarto_"+room_name;
		}
		console.log('ROOM: '+nombre);
		return room_name;
	};

};

module.exports = function(){
	var instancia = new IOSocketManager();
	return instancia;
};
