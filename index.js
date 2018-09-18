//node libraries
var express = require('express');
var socket = require('socket.io');

var List = require('../modelos/List');

var Player = require('./modelos/Player');

var IOSManager = require('./managers/IOSocketManager');

var DTBManager = require('./managers/DataBaseManager');

var app = express();

var _ios = IOSManager();
var _dtb = DTBManager();

var _listPlys = List();

var server = app.listen(4000,function(){
	console.log('Listening in port 4000');
    console.log('DESDE INICIANDO ---> ');
});

app.use(express.static('public'));

var io = socket(server);

const roomName = 'world';

io.on(
	'connection',
	function(socket){

		console.log('Made socket connection');

		socket.on('enter',function(data){
	        _ios.joinRoom(socket,roomName);
	        _listPlys.add(Player(data.player));
	        _ios.sendPmMsg(socket,data.id_user,'enter',{
	            std:'1',
	            msj:'Bienvenido '+data.player.nickname+' a DEMO RPG',
							players:_listPlys.getAllElements()
	        });
					_ios.sendRoomMsg(io,roomName,'enter_new_player',{
	            std:'1',
							new_player:data.player
	        });
		});

		socket.on('attack',function(data){
			console.log('DATA: '+JSON.stringify(data));
		});

	  socket.on('room_join',function(data){
	      _ios.joinRoom(socket,data.id_current_room);
	  });

	  socket.on('room_leave',function(data){
	      _ios.leaveRoom(socket,data.id_past_room);
	  });

	  socket.on('move',function(data){
			_ios.sendRoomMsg(io,roomName,'move',data);
	  });

		socket.on('disconnect', function(data) {
			//TODO:remove disconected user from _listPlys
	    _ios.sendRoomMsg(io,roomName,'one_user_leave',data);
	  });

	}
);
