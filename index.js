//node libraries
var express = require('express');
var socket = require('socket.io');

//data base
//var db = require('./db');

//modelos
//var listaPlayers = require('./modelos/ListaPlayers');
//var listaAtks = require('./modelos/ListaAttacks');
//var listaMobs = require('./modelos/ListaMobs'); 

var listPlys = [];
var listAtks = [];
var listMobs = [];

var Punto = require('./modelos/Punto');
var Player = require('./modelos/Player');
var Attack = require('./modelos/Attack');

var IntManager = require('./managers/InitManager');
var MapManager = require('./managers/MapManager');
var DmgManager = require('./managers/DamageManager');
var IOSManager = require('./managers/IOSocketManager');
var DTBManager = require('./managers/DataBaseManager');

var app = express();

var _int = IntManager();
var _map = MapManager();
var _dmg = DmgManager();
var _ios = IOSManager();
var _dtb = DTBManager();

_int.initList(listPlys);
_int.initList(listAtks);
_int.initList(listMobs);

/*
	TODO: realizar una lista de mobs x area
	var Mobs = lista();
    TODO: crear un socket para la escucha de la AI cuando se conecte el agente
    TODO: Verificar la lista de ataques e implementarla
    Realizar los metodos que le faltan
    codigo hecho a medias

    cambiar las letras dela base de datos con numeros
*/

var server = app.listen(4000,function(){
	console.log('Listening in port 4000');
    console.log('DESDE INICIANDO ---> ');
    //console.log(_dtb.findPlayersUserById(2));
});

app.use(express.static('public'));

var io = socket(server);

io.on('connection',function(socket){

	console.log('Made socket connection');

	socket.on('enter',function(data){

        //TODO: Colocar un modulo para comprobar los usarios on-line
        //hacerlo con el token de sesion

        _ios.joinRoom(socket,data.room);

        listPlys[data.player.pos.area].add(Player(data.player));
            
        _ios.sendPmMsg(socket,data.id_user,'enter',{
            std : '1',
            msj : 'Bienvenido '+data.player.nickname+' a DEMO RPG'
        });

	});

	/**
		{
        	id_player:1,
        	vel:1,
        	distance:10,
        	pto_ini:{
				x : 1,
				y : 5,
				area : k
			},
        	pto_fin:{
				x : null,
				y : null,
				area : null
			},
        	cur_pos:{
				x : 1,
				y : 5,
				area : k
			},
        	direccion:1,
        	id_attack:1,
        	base_dmg:100 //por ahora lo enviamos del cliente
    	}
		
	*/

	socket.on('attack',function(data){

		console.log('DATA: '+JSON.stringify(data));
		
		listAtks[data.cur_pos.area].add(Attack(data));
		//falta logica de procesamiento de ataques
		//aqui se usara el DamageManager
		

	});


    socket.on('room_join',function(data){

        _ios.joinRoom(socket,data.id_current_room);

    });

    socket.on('room_leave',function(data){
        //Dejar un cuarto cuando ya no sea visible
        _ios.leaveRoom(socket,data.id_past_room);
    });

	/*

		{
            "id_player":1,
            "id_posicion":1, //el id del campo de pos del player, no de la psocion 
            pos:{
            	"x":30,
            	"y":20,
            	"area":1 //ya no son letras
            },
            "last_area":4,
			"pos_last_list":5
    	}

	*/

    socket.on('move',function(data){
        
        _dtb.updatePosPlayer(data,_ios,io,_map,listPlys,listaMobs,listaAtks);

    });

});