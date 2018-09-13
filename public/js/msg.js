var socket = io.connect("http://localhost:4000");

//var output = $('#output');

$(function(){

	$('#send_msg').on('click',function(){
		
		var input = $('#input_msg').val();

		console.log('SE PRESIONO ');

		socket.emit('move',{
			message:{
				id_player:"3",
				x:"34",
				y:"4",
				area:"l"
			}
		});

	});

});

socket.on('chat',function(data){
	$('#output').html($('#output').html()+'<p><strong>USER</strong>: '+data.message+'</p>').show();
	console.log('MSG: '+data.message);
});



