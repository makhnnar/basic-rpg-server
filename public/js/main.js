$(function(){
	/*
		desde aqui se captura el evento del boton para registrar un usuario.
		Como te mencione en la imagen hay un campo de nick que es innecesario.
		Eliminalo, y coloca otro campo de contraseña, para verificar si el usuario,
		ingreso bien su contraseña. Debes hacer la funcion que compruebe eso.
		Debes comprobar que las contraseñas creadas sean >=6 y <=20, y posean al menos
		un caracter, un simbolo y un numero
	*/
	$('#btn_registrar').on('click',function(){
		//ya esta implementado el md5
		
		var user = $('#user_username').val();
		var pass = calcMD5($('#user_password').val());
		var nick = $('#user_nickname').val();
		var name = $('#user_nombre').val();
		var ape = $('#user_apellido').val();
		var ced =$('#user_cedula').val();
		var sex = $('input:radio[name=sexo]:checked').val();
		var fec = $('#user_fec_nac').val();
		var pais = $('#user_pais').val();
		var est = $('#user_estado').val();
		var ciu = $('#user_ciudad').val();
		var urb = $('#user_urbanismo').val();
		var mz = $('#user_mz').val();
		var casa = $('#user_casa').val();

		var datos = { 
			username:user,
			password:pass,
			nickname:nick,
			nombre:name,
			apellido:ape,
			cedula:ced,
			sexo:sex,
			fec_nac:fec,
			pais:pais,
			estado:est,
			ciudad:ciu,
			urbanismo:urb,
			mz:mz,
			casa:casa
		};

		$.ajax({
			url: 'http://localhost/system_account/server/servicios/registrar_usuario.php',
			type: 'POST',
			dataType:'json',
			data: JSON.stringify(datos),
			success:function(msg){
				alert(msg.msj);
			},
			error:function(msg) {
				alert(msg.msj);
			},
		})
		.done(function() {
			console.log("success");
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
		
	});
	/*
		aqui se captura el evento para hacer el cambio de contraseña
		recuerda que bo se estan ocultando los campos de contraseña
		dichos campos deben permanecer ocultos mientras no se compruebe
		que el correo que se ingrese en el campo de correo exista en la
		base de datos. Por ahora, solo prueba ocultar los campos.
		El servicio web de comprobacion del correo lo hago esta semana
		para que puedas implementarlo. modifica la apariencia si es necesario.		
	*/
	$('#btn_cambiar').on('click',function(){
		
		console.log(' CAMBIANDO PASS ');

		var user = $('#user_username').val();
		var pass1 = $('#user_password1').val();
		var pass2 = $('#user_password2').val();

		if(pass1===pass2){

			pass1 = calcMD5(pass2);

			var datos = { 
				username:user,
				password:pass1
			};

			$.ajax({
				url: 'http://localhost/system_account/server/servicios/cambiar_pass_usuario.php',
				type: 'POST',
				dataType:'json',
				data: JSON.stringify(datos),
				success:function(msg){
					alert(msg.msj);
				},
				error:function(msg) {
					alert(msg.msj);
				},
			})
			.done(function() {
				console.log("success");
			})
			.fail(function() {
				console.log("error");
			})
			.always(function() {
				console.log("complete");
			});
		}
		
	});
	//aqui se captura el evento del boton de ingreso para iniciar sesion
	$('#btn_ingresar').on('click',function(){

		//me falta el md5

		console.log(' INGRESANDO AL SISTEMA ');
		
		var user = $('#user_username').val();
		var pass = $('#user_password').val();


		pass = calcMD5(pass);

		var datos = { 
			username:user,
			password:pass
		};

		$.ajax({
			url: 'http://localhost/system_account/server/servicios/iniciar_sesion.php',
			type: 'POST',
			dataType:'json',
			data: JSON.stringify(datos),
			success:function(msg){
				alert(msg.msj);
			},
			error:function(msg) {
				alert(msg.msj);
			},
		})
		.done(function() {
			console.log("success");
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
		
	});

});

