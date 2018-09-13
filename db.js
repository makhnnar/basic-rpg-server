const {Pool,Client} = require('pg');

var DATABASE_URL = 'postgres://postgres:postgres@localhost:5432/rpg';
//var DATABASE_URL = 'postgres://postgres:root@localhost:5432/rpg';

var cliente = new Client({
  connectionString: DATABASE_URL,
});
cliente.connect();

function query(sql, params,cb) {
  const consulta = {
    text: sql,
    values: params,
    rowMode: 'object',
  };
  cliente.query(consulta,(err,res) =>{
    if(err){
      cb(err,null);
    }else{
      //console.log(res);
      cb(null,res.rows);
    }
  });
}

exports.findPlayersUserById = function(id, cb) {
  var sql = "SELECT usuario_player.id_player,player.nickname FROM login.usuario_player LEFT JOIN nucleo.player ON usuario_player.id_player=player.id_player WHERE id_usuario = $1";
  query(sql, [id],function(err, result) {
    if (err){ 
      cb(err,null);
    }else{
      cb(null,result);
    }
  });
};

exports.findPositionId = function(x,y,cb) {
  var sql = "SELECT id_posicion FROM nucleo.posicion WHERE x = $1 and y = $2 and z = 0";
  query(sql,[x,y],function(err, result) {
    if (err){ 
      cb(err,null);
    }else{
      cb(null,result);
    }
  });
};

exports.findAreaId = function(area,cb) {
  var sql = "SELECT id_area FROM nucleo.area WHERE name = $1";
  query(sql,[area],function(err, result) {
    if (err){ 
      cb(err,null);
    }else{
      cb(null,result);
    }
  });
};

exports.savePlayersPosition = function(pos,area,player_position, cb) {
  var sql = "UPDATE nucleo.player_area_position SET id_position = $1, id_area = $2 WHERE id_player_area_position = $3";
  query(sql, [pos,area,player_position],function(err, result) {
    if (err){ 
      cb(err,null);
    }else{
      cb(null,result);
    }
  });
};

// returns created user object
exports.insertUser = function(data, cb) {
  var sql = `
    INSERT INTO users (username, hashed_password)
    VALUES ($1, $2)
    RETURNING *  -- tells postgres to return the created user record to us
  `;

  bcrypt.hashPassword(data.password, function(err, hashedPassword) {
    if (err) return cb(err);
    query(sql, [data.username, hashedPassword], function(err, result) {
      if (err) return cb(err);
      cb(null, result.rows[0]);
    });
  });
};