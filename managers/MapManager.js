var List = require('../modelos/List');

var MapManager = function(){
	
    /*  pointPlayer--->
        {
            id_player:1,
            punto:{
                x : 3,
                y : 4,
                area : l
            }
        }
    */

    this.isPlayerChangedOfList = function(currentArea,lastArea){
        if(currentArea!=lastArea){
            return true;
        }
        return false;
    };

    //estemetodo funciona si tenemos lainfo correcta
    this.changePlayerOfList = function(currentList,lastList,dataPosPlayer){
        //comparar si es la posicion correcta
        auxPlayer = this.getCorrectPlayer(lastList.get(dataPosPlayer.pos_last_list),dataPosPlayer.id_player);
        if(auxPlayer!=null){
            auxPlayer.setPosObj(dataPosPlayer.pos);
            lastList.remove(dataPosPlayer.pos_last_list);
            currentList.add(auxPlayer);
            return true;
        }
        return false; 
    };

    this.getCorrectPlayer = function(playerObj,id_player){
        if(playerObj.getId()===id_player){
            return playerObj;
        }
        return null;
    };

    this.posPlayerInList = function(playerList,id_player){
        for(var i = 0;i<playerList.Length();i ++){
            if(playerList.get(i).getId()===id_player){
                return i;
            }
        }
        return -1;
    };

    this.updatePlayerPos = function(playerList,id_player,posObj,last_pos){
        if(playerList.get(last_pos).getId()===id_player){
            playerList.get(last_pos).setPosObj(posObj);
            return true;
        }
        return false;
    };

    this.createdPositionList = function(playersList,mobsList,atksList){
        var enviar = {
            players: this.getElemntsToSend(playersList),
            mobs: this.getElemntsToSend(mobsList),
            attacks: this.getElemntsToSend(atksList)
        };
        return enviar;
    };

    //aqui enviaremos algunos datos adicionales de hp y mp
    //debo crear un metodo aparte para los ataques 
    this.getElemntsToSend = function(plyList){
        var send = List();
        for(var i=0;i<plyList.Length();i++){
            send.add({
                id_player:plyList.get(i).getId(),
                pos:plyList.get(i).getPosObj()
            });
        }
        return send;
    };

}

module.exports = function(){
	var instancia = new MapManager();
	return instancia;
};