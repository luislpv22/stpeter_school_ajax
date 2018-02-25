


$("#btnModDatosUsu").click(modAlumno);
resetearCamposModMatricula();

function modAlumno (oEvento)
{
	oEvento.preventDefault();
	if (comprobarFrmModDatosAlu(oEvento))
	{
		sNombre= document.querySelector("#frmModUsuario #nombreUsu").value
		sPassword = document.querySelector("#frmModUsuario #passUsu").value
		sApellidos = document.querySelector("#frmModUsuario #apellidosUsu").value 
		sDni = document.querySelector("#frmModUsuario #dniUsu").value
		sTelefono = document.querySelector("#frmModUsuario #telefonoUsu").value
		sDireccion = document.querySelector("#frmModUsuario #direUsu").value
		sEmail = document.querySelector("#frmModUsuario #emailUsu").value
		var oAlumno = new Alumno(sNombre, sPassword, sApellidos, sDni, sTelefono, sDireccion, sEmail, "si", "");
		var sDatos = "datos=" + JSON.stringify(oAlumno);
		$.post("api/alumno.php", sDatos, respuestaModAlu, 'json');
	}
}


function respuestaModAlu(oDatosDevueltos, sStatus, oAjax) {

    // oDatosDevueltos[0]  --- si hay o no error
    if (oDatosDevueltos[0] == false) {
        // Mensaje
        alert(oDatosDevueltos[1]);
        academia.actualizarSesionUsuarios();


    } else {
        alert(oDatosDevueltos[1]);
    }
}

function comprobarFrmModDatosAlu(oEvento)
{
	var oE = oEvento || window.event;
	var bValido = true;
	var sError = "";

	var form = document.getElementById("frmModUsuario");
	resetearCamposModMatricula();

	//password      
	var sPassword = form.passUsu.value.trim();
	if (sPassword !="")
	{
		/*El campo apellido debe tener entre 5 y 30 caracteres y utilizar sólo caracteres alfabéticos en mayúsculas o minúsculas o espacios.*/
		var oExpReg = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,15}$/i;
		if (oExpReg.test(sPassword) == false)
		{
			var div = document.createElement("div");
			div.textContent = "La contraseña tiene que tener entre 6 y 15 caracteres, y debe haber números, letras mayusculas y letras minusculas \n"; 
			div.classList.add("text-error");
			form.passUsu.classList.add("errorFormulario");
			form.passUsu.parentNode.appendChild(div);
			form.passUsu.focus(); 
			var bValido = false;
		}
	}
	else
	{
		var div = document.createElement("div");
		div.textContent = "La contraseña no puede estar vacia \n"; 
		div.classList.add("text-error");
		form.passUsu.classList.add("errorFormulario");
		form.passUsu.parentNode.appendChild(div);
		form.passUsu.focus(); 
		var bValido = false;    
	}

	var sTelefono = form.telefonoUsu.value.trim();
	if (sTelefono != "")
	{
		var oExpReg = /^[679]{1}\d{8}$/;
		if (oExpReg.test(sTelefono) == false)
		{
			var div = document.createElement("div");
			div.textContent = "El campo teléfono solo puede tener 9 dígitos \n";  
			div.classList.add("text-error");
			form.telefonoUsu.classList.add("errorFormulario");
			form.telefonoUsu.parentNode.appendChild(div);
			form.telefonoUsu.focus(); 
			var bValido = false;
		}
	}
	else
	{
		var div = document.createElement("div");
		div.textContent = "El teléfono no puede estar vacio \n"; 
		div.classList.add("text-error");
		form.telefonoUsu.classList.add("errorFormulario");
		form.telefonoUsu.parentNode.appendChild(div);
		form.telefonoUsu.focus(); 
		var bValido = false;    
	}

	//dirección
	var sDireccion = form.direUsu.value.trim();
	if (sDireccion != "")
	{
		var oExpReg = /^[a-z\d\s\,\º\/]{3,40}$/i;
		if (oExpReg.test(sDireccion) == false)
		{
			var div = document.createElement("div");
			div.textContent = "El campo dirección debe tener entre 3 y 40 carácteres \n"; 
			div.classList.add("text-error");
			form.direUsu.classList.add("errorFormulario");
			form.direUsu.parentNode.appendChild(div);
			form.direUsu.focus(); 
			var bValido = false;
		}
	}
	else
	{
		var div = document.createElement("div");
		div.textContent = "La dirección no puede estar vacio \n"; 
		div.classList.add("text-error");
		form.direUsu.classList.add("errorFormulario");
		form.direUsu.parentNode.appendChild(div);
		form.direUsu.focus(); 
		var bValido = false;    
	}

	//email
	var sEmail = form.emailUsu.value.trim();
	if (sEmail != "")
	{
		var oExpReg = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i;
		if (oExpReg.test(sEmail) == false)
		{
			var div = document.createElement("div");
			div.textContent = "El correo electrónico no es correcto \n";  
			div.classList.add("text-error");
			form.emailUsu.classList.add("errorFormulario");
			form.emailUsu.parentNode.appendChild(div);
			form.emailUsu.focus(); 
			var bValido = false;
		}
	}
	else
	{
		var div = document.createElement("div");
		div.textContent = "El correo electrónico no puede estar vacio \n"; 
		div.classList.add("text-error");
		form.emailUsu.classList.add("errorFormulario");
		form.emailUsu.parentNode.appendChild(div);
		form.emailUsu.focus(); 
		var bValido = false;    
	}


	if (bValido == false){
		oE.preventDefault();
		return false;
	}
	else
	{
		//modificar los datos del alumno
		return true;	
	}
}








