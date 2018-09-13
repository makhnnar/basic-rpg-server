
var DataBaseManager = function(){

  const {Pool,Client} = require('pg');

  //DATABASE_URL = 'postgres://postgres:root@localhost:5432/rpg';
  //DATABASE_URL:'postgres://postgres:postgres@localhost:5432/rpg'

  this.DATABASE_URL = 'postgres://postgres:root@localhost:5432/rpg'; 
  this.client = null;

  this.init = function(){
    console.log("Conecting to ---> "+this.DATABASE_URL);
    this.cliente = new Client({
      connectionString: this.DATABASE_URL,
    });
    this.cliente.connect();
  };
  

  this.query = function(sql,params,cb){
    const consulta = {
      text: sql,
      values: params,
      rowMode: 'object',
    };
    this.cliente.query(consulta,(err,res) =>{
      if(err){
        cb(err,null);
      }else{
        cb(null,res.rows);
      }
    });
  };

  this.findPlayersUserById = function(id, cb) {
    var sql = "SELECT usuario_player.id_player,player.nickname FROM login.usuario_player LEFT JOIN nucleo.player ON usuario_player.id_player=player.id_player WHERE id_usuario = $1";
    query(sql, [id],function(err, result) {
      if (err){ 
        cb(err,null);
      }else{
        cb(null,result);
      }
    });
  };

  this.findPositionId = function(x,y,cb) {
    var sql = "SELECT id_posicion FROM nucleo.posicion WHERE x = $1 and y = $2 and z = 0";
    query(sql,[x,y],function(err, result) {
      if (err){ 
        cb(err,null);
      }else{
        cb(null,result);
      }
    });
  };

  this.findAreaId = function(area,cb) {
    var sql = "SELECT id_area FROM nucleo.area WHERE name = $1";
    query(sql,[area],function(err, result) {
      if (err){ 
        cb(err,null);
      }else{
        cb(null,result);
      }
    });
  };

  this.savePlayersPosition = function(pos,area,player_position, cb) {
    var sql = "UPDATE nucleo.player_area_position SET id_position = $1, id_area = $2 WHERE id_player_area_position = $3";
    query(sql, [pos,area,player_position],function(err, result) {
      if (err){ 
        cb(err,null);
      }else{
        cb(null,result);
      }
    });
  };

  this.updatePosPlayer = function(data,_ios,io,_map,listPlys,listaMobs,listaAtks){
    var id_position = 0;
    var id_area = 0;
    var resultado = "";
    this.findPositionId(data.pos.x,data.pos.y,function(err,result) {
      if(err){
        console.log("ERROR: ");
        console.log(err); 
      }
      if(result){
        console.log("RESULTADO!!! ----> ");
        console.log(result);
        id_position = result[0].id_posicion;
        this.findAreaId(data.pos.area,function(err,result) {
        if(err){
          console.log("ERROR: ");
          console.log(err);   
        }
        if(result){
          console.log("RESULTADO!!! ----> ");
          console.log(result);
          id_area = result[0].id_area;                    
          console.log(' id_position: '+id_position+' id_area: '+id_area);         
          this.savePlayersPosition(id_position,id_area,data.id_posicion,function(err,result) {
            if(err){
              console.log("ERROR: ");
              console.log(err);
              _ios.sendWarning(io,err);
            }
            if(result){
              console.log("RESULTADO!!! ----> ");
              console.log(result);
              var pto = Punto({
                x:data.pos.x,
                y:data.pos.y,
                area:data.pos.area
              });
              data.pos = pto;
              if(_map.isPlayerChangedOfList(data.pos.area,data.last_area)){
                
                if(!_map.changePlayerOfList(listPlys[data.pos.area],listPlys[data.last_area],data)){
                  //hacer algo.esto implica que no se actualizo 
                }

              }else{
                
                if(!_map.updatePlayerPos(listPlys[data.pos.area],data.id_player,pto,data.pos_last_list)){
                  //hacer algo.esto implica que no se actualizo
                } 
              
              }
              //enviar lista de todas las posiciones de los objetos en el mapa
              _ios.sendRoomMsg(io,id_room,'move',_map.createdPositionList(
                listPlys[data.pos.area],
                listaMobs[data.pos.area],
                listaAtks[data.pos.area]
              ));
            }   
          });
        }   
      });
    }   
  });

  };
  


};

module.exports = function(){
  var instancia = new DataBaseManager();
  instancia.init();
  return instancia;
};
