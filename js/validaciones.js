/*zona de validaciones de formularios de Alumnos*/
function comprobarFrmModDatosUsu(oEvento)
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
	}
	else
	{
		//modificar los datos del alumno
		oE.preventDefault();
		sNombre = document.frmModUsuario.nombreUsu.value.trim();
		sApellidos = document.frmModUsuario.apellidosUsu.value.trim();
		sDni = document.frmModUsuario.dniUsu.value.trim();

		var oUsuario = new Alumno(sNombre, sPassword, sApellidos, sDni, sTelefono, sDireccion, sEmail, "si", "");//objeto alumno con los datos modificados

		academia.modificarUsuario(oUsuario);
		//modificar los datos de sesión de usuario
		sessionStorage.setItem('usuario', JSON.stringify(oUsuario));
		location.href = "alumno.html";
			
	}
}



/*zona de validaciones de formularios de profesor*/
function comprobarFrmModDatosProf(oEvento)
{
	var oE = oEvento || window.event;
	var bValido = true;
	var sError = "";

var form = document.getElementById("frmModProf");
resetearCamposModMatriculaProf();

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
	}
	else
	{

		oE.preventDefault();
		sNombre = document.frmModProf.nombreUsu.value.trim();
		sApellidos = document.frmModProf.apellidosUsu.value.trim();
		sDni = document.frmModProf.dniUsu.value.trim();

		var oUsuario = new Profesor(sNombre, sPassword, sApellidos, sDni, sTelefono, sDireccion, sEmail, "si", "");//objeto alumno con los datos modificados
		academia.modificarUsuario(oUsuario);
		//modificar los datos de sesión de usuario
		sessionStorage.setItem('usuario', JSON.stringify(oUsuario));
		location.href = "alumno.html";
			
	}
}


/*validación Alta  y modificación Alumno*/
function comprobarAltaAlu(oEvento)
{
	var form = document.getElementById("formEditarAlumno");
	resetearCamposAlumno();


	var oE = oEvento || window.event;
	var bValido=true;
	var sError = "";

	//dni
	var sDni = form.dni.value.trim();
	if (sDni !="")
	{
		/*El campo dni debe tener 8 dígitos y 1 letra mayúscula*/
		var oExpReg = /^\d{8}[a-zA-Z]$/i;
		if (oExpReg.test(sDni) == false)
		{
				
			var div = document.createElement("div");
           	div.textContent = "El campo dni debe tener 8 dígitos y 1 letra";	 
            div.classList.add("text-error");
            form.dni.classList.add("errorFormulario");
            form.dni.parentNode.appendChild(div);
            form.dni.focus();   
        }    
	}
	else
	{
		var div = document.createElement("div");
        div.textContent = "El dni no puede estar vacio";	 
        div.classList.add("text-error");
        form.dni.classList.add("errorFormulario");
        form.dni.parentNode.appendChild(div);
		form.dni.focus();
	}

	//password
	var sPassword = form.password.value.trim();
	if (sPassword !="")
	{
		/*El campo apellido debe tener entre 5 y 30 caracteres y utilizar sólo caracteres alfabéticos en mayúsculas o minúsculas o espacios.*/
		var oExpReg = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,15}$/i;
		if (oExpReg.test(sPassword) == false)
		{

			var div = document.createElement("div");
           	div.textContent = "La contraseña tiene que tener entre 6 y 15 caracteres, y debe haber números, letras mayusculas y letras minusculas \n";	 
            div.classList.add("text-error");
            form.password.classList.add("errorFormulario");
            form.password.parentNode.appendChild(div);
            form.password.focus();  
         }
	}
	else
	{
		var div = document.createElement("div");
        div.textContent = "La contraseña no puede estar vacia \n";	 
        div.classList.add("text-error");
        form.password.classList.add("errorFormulario");
        form.password.parentNode.appendChild(div);
        form.password.focus(); 	
	}

	//nombre
	var sNombre = form.nombre.value.trim();
	if (sNombre !="")
	{
		/*El nombre debe tener entre 3 y 15 caracteres y utilizar sólo caracteres alfabéticos en mayúsculas o minúsculas o espacios.*/
		var oExpReg = /^[a-z\s]{3,16}$/i;
		if (oExpReg.test(sNombre) == false)
		{
			var div = document.createElement("div");
           	div.textContent = "El nombre debe tener entre 3 y 15 caracteres y utilizar sólo caracteres alfabéticos en mayúsculas o minúsculas o espacios \n";	 
            div.classList.add("text-error");
            form.nombre.classList.add("errorFormulario");
            form.nombre.parentNode.appendChild(div);
            form.nombre.focus(); 
            var bValido = false;
		}
	}
	else
	{
			var div = document.createElement("div");
           	div.textContent = "El nombre no puede estar vacio \n";	 
            div.classList.add("text-error");
            form.nombre.classList.add("errorFormulario");
            form.nombre.parentNode.appendChild(div);
            form.nombre.focus(); 	
            var bValido = false;
	}


	//apellidos
	var sApellidos = form.apellidos.value.trim();
	if (sApellidos !="")
	{
		/*El campo apellido debe tener entre 5 y 30 caracteres y utilizar sólo caracteres alfabéticos en mayúsculas o minúsculas o espacios.*/
		var oExpReg = /^[a-z\s]{6,30}$/i;
		if (oExpReg.test(sApellidos) == false)
		{
			var div = document.createElement("div");
           	div.textContent = "El campo apellido debe tener entre 5 y 30 caracteres y utilizar sólo caracteres alfabéticos en mayúsculas o minúsculas o espacios \n"; 	 
            div.classList.add("text-error");
            form.apellidos.classList.add("errorFormulario");
            form.apellidos.parentNode.appendChild(div);
            form.apellidos.focus(); 
            var bValido = false;
		}
	}
	else
	{
			var div = document.createElement("div");
           	div.textContent = "El campo apellido no puede estar vacio \n"; 	 
            div.classList.add("text-error");
            form.apellidos.classList.add("errorFormulario");
            form.apellidos.parentNode.appendChild(div);
            form.apellidos.focus(); 	
            var bValido = false;	
	}

		//email
	var sEmail = form.email.value.trim();
	if (sEmail !="")
	{
		var oExpReg = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i;
		if (oExpReg.test(sEmail) == false)
		{

			var div = document.createElement("div");
           	div.textContent = "El correo electrónico no es correcto";	 
            div.classList.add("text-error");
            form.email.classList.add("errorFormulario");
            form.email.parentNode.appendChild(div);
            form.email.focus(); 
            var bValido = false;
		}
	}
	else
	{
			var div = document.createElement("div");
           	div.textContent = "El email no puede estar vacio \n";	 
            div.classList.add("text-error");
            form.email.classList.add("errorFormulario");
            form.email.parentNode.appendChild(div);
            form.email.focus(); 
            var bValido = false;
	}
	

	//teléfono
	var sTelefono = form.telefono.value.trim();
	if (sTelefono !="")
	{	
		var oExpReg = /^[0-9]{2,3}-? ?[0-9]{6,7}$/i;
		if (oExpReg.test(sTelefono) == false)
		{
			var div = document.createElement("div");
           	div.textContent = "El campo teléfono solo puede tener 9 dígitos \n"; 
            div.classList.add("text-error");
            form.telefono.classList.add("errorFormulario");
            form.telefono.parentNode.appendChild(div);
            form.telefono.focus(); 
            var bValido = false;
		}
	}
	else
	{
			var div = document.createElement("div");
           	div.textContent = "El campo teléfono no puede estar vacio \n"; 
            div.classList.add("text-error");
            form.telefono.classList.add("errorFormulario");
            form.telefono.parentNode.appendChild(div);
            form.telefono.focus(); 	
            var bValido = false;	
	}

	//dirección
	var sDireccion = form.direccion.value.trim();
	if (sDireccion !="")
	{
		var oExpReg = /^[a-z\d\s\,\º\/]{3,40}$/i;
		if (oExpReg.test(sDireccion) == false)
		{
			var div = document.createElement("div");
           	div.textContent = "El campo dirección debe tener entre 3 y 40 carácteres \n";  
            div.classList.add("text-error");
            form.direccion.classList.add("errorFormulario");
            form.direccion.parentNode.appendChild(div);
            form.direccion.focus(); 
            var bValido = false;
        }
	}
	else
	{
			var div = document.createElement("div");
           	div.textContent = "El campo dirección no puede estar vacio \n";  
            div.classList.add("text-error");
            form.direccion.classList.add("errorFormulario");
            form.direccion.parentNode.appendChild(div);
            form.direccion.focus(); 	
            var bValido = false;
	}



	if (bValido == false)
	{
		document.getElementById("formEditarAlumno").preventDefault;

		return false;
	}
	else
	{
		return true;
	}


}

// validación para registrar y modificar administradores
function comprobarFormAdmin(oEvento)
{
	var form = document.getElementById("formEditarAdministrador");
	resetearCamposAdmin();

	var oE = oEvento || window.event;
	var bValido=true;
	var sError = "";

	//dni
	var sDni = form.dni.value.trim();
	if (sDni !="")
	{
		/*El campo dni debe tener 8 dígitos y 1 letra mayúscula*/
		var oExpReg = /^\d{8}[a-zA-Z]$/i;
		if (oExpReg.test(sDni) == false)
		{
				
			var div = document.createElement("div");
           	div.textContent = "El campo dni debe tener 8 dígitos y 1 letra";	 
            div.classList.add("text-error");
            form.dni.classList.add("errorFormulario");
            form.dni.parentNode.appendChild(div);
            form.dni.focus();   
        }    
	}
	else
	{
		var div = document.createElement("div");
        div.textContent = "El dni no puede estar vacio";	 
        div.classList.add("text-error");
        form.dni.classList.add("errorFormulario");
        form.dni.parentNode.appendChild(div);
		form.dni.focus();
	}

	//password
	var sPassword = form.password.value.trim();
	if (sPassword !="")
	{
		/*El campo apellido debe tener entre 5 y 30 caracteres y utilizar sólo caracteres alfabéticos en mayúsculas o minúsculas o espacios.*/
		var oExpReg = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,15}$/i;
		if (oExpReg.test(sPassword) == false)
		{

			var div = document.createElement("div");
           	div.textContent = "La contraseña tiene que tener entre 6 y 15 caracteres, y debe haber números, letras mayusculas y letras minusculas \n";	 
            div.classList.add("text-error");
            form.password.classList.add("errorFormulario");
            form.password.parentNode.appendChild(div);
            form.password.focus();  
         }
	}
	else
	{
		var div = document.createElement("div");
        div.textContent = "La contraseña no puede estar vacia \n";	 
        div.classList.add("text-error");
        form.password.classList.add("errorFormulario");
        form.password.parentNode.appendChild(div);
        form.password.focus(); 	
	}

	//nombre
	var sNombre = form.nombre.value.trim();
	if (sNombre !="")
	{
		/*El nombre debe tener entre 3 y 15 caracteres y utilizar sólo caracteres alfabéticos en mayúsculas o minúsculas o espacios.*/
		var oExpReg = /^[a-z\s]{3,16}$/i;
		if (oExpReg.test(sNombre) == false)
		{
			var div = document.createElement("div");
           	div.textContent = "El nombre debe tener entre 3 y 15 caracteres y utilizar sólo caracteres alfabéticos en mayúsculas o minúsculas o espacios \n";	 
            div.classList.add("text-error");
            form.nombre.classList.add("errorFormulario");
            form.nombre.parentNode.appendChild(div);
            form.nombre.focus(); 
            var bValido = false;
		}
	}
	else
	{
			var div = document.createElement("div");
           	div.textContent = "El nombre no puede estar vacio \n";	 
            div.classList.add("text-error");
            form.nombre.classList.add("errorFormulario");
            form.nombre.parentNode.appendChild(div);
            form.nombre.focus(); 	
            var bValido = false;
	}


	//apellidos
	var sApellidos = form.apellidos.value.trim();
	if (sApellidos !="")
	{
		/*El campo apellido debe tener entre 5 y 30 caracteres y utilizar sólo caracteres alfabéticos en mayúsculas o minúsculas o espacios.*/
		var oExpReg = /^[a-z\s]{6,30}$/i;
		if (oExpReg.test(sApellidos) == false)
		{
			var div = document.createElement("div");
           	div.textContent = "El campo apellido debe tener entre 5 y 30 caracteres alfabéticos en mayúsculas o minúsculas o espacios \n"; 	 
            div.classList.add("text-error");
            form.apellidos.classList.add("errorFormulario");
            form.apellidos.parentNode.appendChild(div);
            form.apellidos.focus(); 
            var bValido = false;
		}
	}
	else
	{
			var div = document.createElement("div");
           	div.textContent = "El campo apellido no puede estar vacio \n"; 	 
            div.classList.add("text-error");
            form.apellidos.classList.add("errorFormulario");
            form.apellidos.parentNode.appendChild(div);
            form.apellidos.focus(); 	
            var bValido = false;	
	}

		//email
	var sEmail = form.email.value.trim();
	if (sEmail !="")
	{
		var oExpReg = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i;
		if (oExpReg.test(sEmail) == false)
		{

			var div = document.createElement("div");
           	div.textContent = "El correo electrónico no es correcto";	 
            div.classList.add("text-error");
            form.email.classList.add("errorFormulario");
            form.email.parentNode.appendChild(div);
            form.email.focus(); 
            var bValido = false;
		}
	}
	else
	{
			var div = document.createElement("div");
           	div.textContent = "El email no puede estar vacio \n";	 
            div.classList.add("text-error");
            form.email.classList.add("errorFormulario");
            form.email.parentNode.appendChild(div);
            form.email.focus(); 
            var bValido = false;
	}
	

	//teléfono
	var sTelefono = form.telefono.value.trim();
	if (sTelefono !="")
	{	
		var oExpReg = /^[0-9]{2,3}-? ?[0-9]{6,7}$/i;
		if (oExpReg.test(sTelefono) == false)
		{
			var div = document.createElement("div");
           	div.textContent = "El campo teléfono solo puede tener 9 dígitos \n"; 
            div.classList.add("text-error");
            form.telefono.classList.add("errorFormulario");
            form.telefono.parentNode.appendChild(div);
            form.telefono.focus(); 
            var bValido = false;
		}
	}
	else
	{
			var div = document.createElement("div");
           	div.textContent = "El campo teléfono no puede estar vacio \n"; 
            div.classList.add("text-error");
            form.telefono.classList.add("errorFormulario");
            form.telefono.parentNode.appendChild(div);
            form.telefono.focus(); 	
            var bValido = false;	
	}

	//dirección
	var sDireccion = form.direccion.value.trim();
	if (sDireccion !="")
	{
		var oExpReg = /^[a-z\d\s\,\º\/]{3,40}$/i;
		if (oExpReg.test(sDireccion) == false)
		{
			var div = document.createElement("div");
           	div.textContent = "El campo dirección debe tener entre 3 y 40 carácteres \n";  
            div.classList.add("text-error");
            form.direccion.classList.add("errorFormulario");
            form.direccion.parentNode.appendChild(div);
            form.direccion.focus(); 
            var bValido = false;
        }
	}
	else
	{
			var div = document.createElement("div");
           	div.textContent = "El campo dirección no puede estar vacio \n";  
            div.classList.add("text-error");
            form.direccion.classList.add("errorFormulario");
            form.direccion.parentNode.appendChild(div);
            form.direccion.focus(); 	
            var bValido = false;
	}



	if (bValido == false)
	{
		return false;
	}
	else
	{
		return true;
	}


}

// validación para alta y modificación de prof (desde el admin)
function comprobarFormProf(oEvento)
{
	var form = document.getElementById("formEditarProfesor");
	resetearCamposProfesor();


	var oE = oEvento || window.event;
	var bValido=true;
	var sError = "";

	//dni
	var sDni = form.dni.value.trim();
	if (sDni !="")
	{
		/*El campo dni debe tener 8 dígitos y 1 letra mayúscula*/
		var oExpReg = /^\d{8}[a-zA-Z]$/i;
		if (oExpReg.test(sDni) == false)
		{
				
			var div = document.createElement("div");
           	div.textContent = "El campo dni debe tener 8 dígitos y 1 letra";	 
            div.classList.add("text-error");
            form.dni.classList.add("errorFormulario");
            form.dni.parentNode.appendChild(div);
            form.dni.focus(); 
            var bValido = false;  
        }    
	}
	else
	{
		var div = document.createElement("div");
        div.textContent = "El dni no puede estar vacio";	 
        div.classList.add("text-error");
        form.dni.classList.add("errorFormulario");
        form.dni.parentNode.appendChild(div);
		form.dni.focus();
		var bValido = false;
	}

	//password
	var sPassword = form.password.value.trim();
	if (sPassword !="")
	{
		/*El campo apellido debe tener entre 5 y 30 caracteres y utilizar sólo caracteres alfabéticos en mayúsculas o minúsculas o espacios.*/
		var oExpReg = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,15}$/i;
		if (oExpReg.test(sPassword) == false)
		{

			var div = document.createElement("div");
           	div.textContent = "La contraseña tiene que tener entre 6 y 15 caracteres, y debe haber números, letras mayusculas y letras minusculas \n";	 
            div.classList.add("text-error");
            form.password.classList.add("errorFormulario");
            form.password.parentNode.appendChild(div);
            form.password.focus();  
            var bValido = false;
         }
	}
	else
	{
		var div = document.createElement("div");
        div.textContent = "La contraseña no puede estar vacia \n";	 
        div.classList.add("text-error");
        form.password.classList.add("errorFormulario");
        form.password.parentNode.appendChild(div);
        form.password.focus(); 	
        var bValido = false;
	}

	//nombre
	var sNombre = form.nombre.value.trim();
	if (sNombre !="")
	{
		/*El nombre debe tener entre 3 y 15 caracteres y utilizar sólo caracteres alfabéticos en mayúsculas o minúsculas o espacios.*/
		var oExpReg = /^[a-z\s]{3,16}$/i;
		if (oExpReg.test(sNombre) == false)
		{
			var div = document.createElement("div");
           	div.textContent = "El nombre debe tener entre 3 y 15 caracteres y utilizar sólo caracteres alfabéticos en mayúsculas o minúsculas o espacios \n";	 
            div.classList.add("text-error");
            form.nombre.classList.add("errorFormulario");
            form.nombre.parentNode.appendChild(div);
            form.nombre.focus(); 
            var bValido = false;
		}
	}
	else
	{
			var div = document.createElement("div");
           	div.textContent = "El nombre no puede estar vacio \n";	 
            div.classList.add("text-error");
            form.nombre.classList.add("errorFormulario");
            form.nombre.parentNode.appendChild(div);
            form.nombre.focus(); 	
            var bValido = false;
	}


	//apellidos
	var sApellidos = form.apellidos.value.trim();
	if (sApellidos !="")
	{
		/*El campo apellido debe tener entre 5 y 30 caracteres y utilizar sólo caracteres alfabéticos en mayúsculas o minúsculas o espacios.*/
		var oExpReg = /^[a-z\s]{6,30}$/i;
		if (oExpReg.test(sApellidos) == false)
		{
			var div = document.createElement("div");
           	div.textContent = "El campo apellido debe tener entre 5 y 30 caracteres y utilizar sólo caracteres alfabéticos en mayúsculas o minúsculas o espacios \n"; 	 
            div.classList.add("text-error");
            form.apellidos.classList.add("errorFormulario");
            form.apellidos.parentNode.appendChild(div);
            form.apellidos.focus(); 
            var bValido = false;
		}
	}
	else
	{
			var div = document.createElement("div");
           	div.textContent = "El campo apellido no puede estar vacio \n"; 	 
            div.classList.add("text-error");
            form.apellidos.classList.add("errorFormulario");
            form.apellidos.parentNode.appendChild(div);
            form.apellidos.focus(); 	
            var bValido = false;	
	}

		//email
	var sEmail = form.email.value.trim();
	if (sEmail !="")
	{
		var oExpReg = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i;
		if (oExpReg.test(sEmail) == false)
		{

			var div = document.createElement("div");
           	div.textContent = "El correo electrónico no es correcto";	 
            div.classList.add("text-error");
            form.email.classList.add("errorFormulario");
            form.email.parentNode.appendChild(div);
            form.email.focus(); 
            var bValido = false;
		}
	}
	else
	{
			var div = document.createElement("div");
           	div.textContent = "El email no puede estar vacio \n";	 
            div.classList.add("text-error");
            form.email.classList.add("errorFormulario");
            form.email.parentNode.appendChild(div);
            form.email.focus(); 
            var bValido = false;
	}
	

	//teléfono
	var sTelefono = form.telefono.value.trim();
	if (sTelefono !="")
	{	
		var oExpReg = /^[0-9]{2,3}-? ?[0-9]{6,7}$/i;
		if (oExpReg.test(sTelefono) == false)
		{
			var div = document.createElement("div");
           	div.textContent = "El campo teléfono solo puede tener 9 dígitos \n"; 
            div.classList.add("text-error");
            form.telefono.classList.add("errorFormulario");
            form.telefono.parentNode.appendChild(div);
            form.telefono.focus(); 
            var bValido = false;
		}
	}
	else
	{
			var div = document.createElement("div");
           	div.textContent = "El campo teléfono no puede estar vacio \n"; 
            div.classList.add("text-error");
            form.telefono.classList.add("errorFormulario");
            form.telefono.parentNode.appendChild(div);
            form.telefono.focus(); 	
            var bValido = false;	
	}

	//dirección
	var sDireccion = form.direccion.value.trim();
	if (sDireccion !="")
	{
		var oExpReg = /^[a-z\d\s\,\º\/]{3,40}$/i;
		if (oExpReg.test(sDireccion) == false)
		{
			var div = document.createElement("div");
           	div.textContent = "El campo dirección debe tener entre 3 y 40 carácteres \n";  
            div.classList.add("text-error");
            form.direccion.classList.add("errorFormulario");
            form.direccion.parentNode.appendChild(div);
            form.direccion.focus(); 
            var bValido = false;
        }
	}
	else
	{
			var div = document.createElement("div");
           	div.textContent = "El campo dirección no puede estar vacio \n";  
            div.classList.add("text-error");
            form.direccion.classList.add("errorFormulario");
            form.direccion.parentNode.appendChild(div);
            form.direccion.focus(); 	
            var bValido = false;
	}

	var listaCursos = form.cursos.options;
	var cursos=[];
	var indice=0;
	for (var i = 0; i < listaCursos.length; i++) 
	{
		if (listaCursos[i].selected)
		{
			cursos[indice] = listaCursos[i];
			indice++;
		}
	}


	if (cursos.length == 0)
	{
		var div = document.createElement("div");
        div.textContent = "Debes seleccionar al menos un curso \n";  
        div.classList.add("text-error");
        form.cursos.classList.add("errorFormulario");
        form.cursos.parentNode.appendChild(div);
        form.cursos.focus(); 
        var bValido = false;
	}

	if (bValido == false)
	{
		return false;
	}
	else
	{
		return true;
	}


}


//validación de cursos
function comprobarFormCurso(oEvento)
{
	var form = document.getElementById("formEditarCurso");

	resetearCamposCurso();

	var oE = oEvento || window.event;
	var bValido=true;
	var sError = "";

	var sCodigo = form.codigo.value.trim();
	if (sCodigo == "")
	{
		var div = document.createElement("div");
        div.textContent = "El código no puede estar vacio";	 
        div.classList.add("text-error");
        form.codigo.classList.add("errorFormulario");
        form.codigo.parentNode.appendChild(div);
		form.codigo.focus();
		var bValido = false;
	}

	var sDuracion = form.duracion1.value.trim();
	if (sDuracion == "")
	{
		var div = document.createElement("div");
        div.textContent = "La duración no puede estar vacio";	 
        div.classList.add("text-error");
        form.duracion1.classList.add("errorFormulario");
        form.duracion1.parentNode.appendChild(div);
		form.duracion1.focus();
		var bValido = false;
	}

	var sPrecio = form.precio.value.trim();
	if (sPrecio == "")
	{
		var div = document.createElement("div");
        div.textContent = "El precio no puede estar vacio";	 
        div.classList.add("text-error");
        form.precio.classList.add("errorFormulario");
        form.precio.parentNode.parentNode.appendChild(div);
		form.precio.focus();
		var bValido = false;
	}

	if (bValido == false)
	{
		return false;
	}
	else
	{
		return true;
	}
}


function comprobarFormMatricula (oEvento)
{
	var form = document.getElementById("formModMatri");
	resetearCamposMatricula();
	var listaCursos = form.seleCurMatri.options;

	var cursos=[];
	var indice=0;
	for (var i = 0; i < listaCursos.length; i++) 
	{
		if (listaCursos[i].selected)
		{
			cursos[indice] = listaCursos[i];
			indice++;
		}
	}

	if (cursos.length == 0)
	{
		var div = document.createElement("div");
        div.textContent = "Debes seleccionar al menos un curso \n";  
        div.classList.add("text-error");
        form.seleCurMatri.classList.add("errorFormulario");
        form.seleCurMatri.parentNode.appendChild(div);
        form.seleCurMatri.focus(); 
        var bValido = false;
	}

	if (bValido == false)
	{
		return false;
	}
	else
	{
		return true;
	}
}

