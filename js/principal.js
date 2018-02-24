var academia = new Academia();

datosIniciales();

function datosIniciales()
{
	cargarUsuarios();
	cargarCursos();
	cargarMatriculas();
	cargarCalificaciones();
}

function iniciarSesion(oEvento)
{
    var sDni= document.querySelector("#dniAlu").value;
    var sPass= document.querySelector("#passAlu").value;

    oUsuario = academia.inicioSesion(sDni,sPass);

    if (oUsuario == null)
    {
        mensaje(document.createTextNode("Fallo al iniciar sesión"));
	    return false;
    }
    else
    {
    	if (oUsuario instanceof Administrador)
    		oUsuario.tipo = 'administrador';
    	else if (oUsuario instanceof Profesor)
    		oUsuario.tipo = 'profesor';
    	else
    		oUsuario.tipo = 'alumno';

        sessionStorage.setItem('usuario', JSON.stringify(oUsuario));
    }

    return true;
}

function cerrarSesion()
{
    sessionStorage.removeItem('usuario');
    location.href = "login.html";
}



/******** validación y alta de alumno*************************/
function cargarUsuarios()
{
    $.ajax(
    {
        url: "api/usuarios.php",
        type: "GET",
        async: false,
        data: { 'usuarios': 1 },
        success: function(usuarios)
        {
            for (let i=0; i<usuarios.length; i++)
            {
            	if (usuarios[i].tipo == 'alumno')
            	{
            		let estadoCobro = '';
				    $.ajax(
				    {
				        url: "api/usuarios.php",
				        type: "GET",
				        data: { 'alumno': usuarios[i].dni },
				        success: function(result) {
				        	estadoCobro = result;
				        }
				    });
            		academia.addUsuario(new Alumno(usuarios[i].nombre, usuarios[i].password, usuarios[i].apellidos, usuarios[i].dni, usuarios[i].telefono, usuarios[i].direccion, usuarios[i].email, usuarios[i].activo, estadoCobro));
            	}
            	else if (usuarios[i].tipo == 'profesor')
            		academia.addUsuario(new Profesor(usuarios[i].nombre, usuarios[i].password, usuarios[i].apellidos, usuarios[i].dni, usuarios[i].telefono, usuarios[i].direccion, usuarios[i].email, usuarios[i].activo));
            	else if (usuarios[i].tipo == 'administrador')
            		academia.addUsuario(new Administrador(usuarios[i].nombre, usuarios[i].password, usuarios[i].apellidos, usuarios[i].dni, usuarios[i].telefono, usuarios[i].direccion, usuarios[i].email, usuarios[i].activo));
            }
        }
    });
}

function cargarCursos()
{
    $.ajax(
    {
        url: "api/cursos.php",
        type: "GET",
        async: false,
        data: { 'cursos': 1 },
        success: function(cursos)
        {
            for (let i=0; i<cursos.length; i++)
            {
        		let oCurso = new Curso(cursos[i].codigo, cursos[i].idioma, cursos[i].duracion, cursos[i].precio, cursos[i].tipo, cursos[i].nivel, cursos[i].activo);
			    $.ajax(
			    {
			        url: "api/matriculas.php",
			        type: "GET",
			        data: { 'curso': cursos[i].codigo },
			        success: function(result) {
			    		oCurso.listaAlumnos = result;	
			        }
			    });
			    academia.addCurso(oCurso);
            }
        }
    });
}

function cargarMatriculas()
{
    $.ajax(
    {
        url: "api/matriculas.php",
        type: "GET",
        async: false,
        data: { 'matriculas': 1 },
        success: function(matriculas)
        {
        	for (var i=0; i<matriculas.length; i++)
        	{
        		let oAlumno = academia.getUsuario(matriculas[i].alumno);
        		oAlumno.listaCursos.push(matriculas[i].curso);
				academia.addMatricula(new Matricula(matriculas[i].numero, matriculas[i].estado, matriculas[i].alumno, matriculas[i].curso));
			}
        }
    });
}

function cargarCalificaciones()
{
    $.ajax(
    {
        url: "api/calificaciones.php",
        type: "GET",
        async: false,
        data: { 'calificaciones': 1 },
        success: function(calificaciones)
        {
        	for (var i=0; i<calificaciones.length; i++)
				academia.addCalificacionesAlu(new Calificacion(calificaciones[i].matricula, calificaciones[i].tarea, calificaciones[i].nota));
        }
    });
}

/*esta validación la dejo aqui porque puede servir casi perfecto tanto para crear alumnos, profesores, y administrativos*/
function comprobarEnvio(oEvento)
{
	var oE = oEvento || window.event;
	var bValido = true;
	var sError = "";

	//nombre
	var sNombre = document.frmAlu.nombreAlu.value.trim();
	if (sNombre != "")
	{
		/*El nombre debe tener entre 5 y 15 caracteres y utilizar sólo caracteres alfabéticos en mayúsculas o minúsculas o espacios.*/
		var oExpReg = /^[a-z\s]{6,16}$/i;
		if (oExpReg.test(sNombre) == false)
		{
			document.frmAlu.nombreAlu.classList.add("errorFormulario");
			document.frmAlu.nombreAlu.focus();
			bValido = false;
			sError += "El nombre de usuario debe tener entre 5 y 15 caracteres y utilizar sólo caracteres alfabéticos en mayúsculas o minúsculas o espacios \n"; 
		}
		else {
			document.frmAlu.nombreAlu.classList.remove("errorFormulario");
		}
	}
	else
	{
		document.frmAlu.nombreAlu.classList.add("errorFormulario");
		if(bValido) 
		  document.frmAlu.nombreAlu.focus();
		bValido = false;
		sError += "El nombre no puede estar vacio \n";	
	}

	//password
	var sPassword = document.frmAlu.passAlu.value.trim();
	if (sPassword != "")
	{
		/*El campo apellidos debe tener entre 5 y 30 caracteres y utilizar sólo caracteres alfabéticos en mayúsculas o minúsculas o espacios.*/
		var oExpReg = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,15}$/i;
		if (oExpReg.test(sPassword) == false)
		{
			document.frmAlu.passAlu.classList.add("errorFormulario");
			document.frmAlu.passAlu.focus();
			bValido = false;
			sError += "La contraseña tiene que tener entre 6 y 15 caracteres, y debe haber números, letras mayusculas y letras minusculas \n";
		}
		else {
			document.frmAlu.passAlu.classList.remove("errorFormulario");
		}
	}
	else
	{
		document.frmAlu.passAlu.classList.add("errorFormulario");
		if(bValido) 
		  document.frmAlu.passAlu.focus();
		bValido = false;
		sError += "La contraseña no puede estar vacia \n";		
	}

	//apellidos
	var sApellidos = document.frmAlu.apellidosAlu.value.trim();
	if (sApellidos != "")
	{
		/*El campo apellidos debe tener entre 5 y 30 caracteres y utilizar sólo caracteres alfabéticos en mayúsculas o minúsculas o espacios.*/
		var oExpReg = /^[a-z\s]{6,30}$/i;
		if (oExpReg.test(sApellidos) == false)
		{
			document.frmAlu.apellidosAlu.classList.add("errorFormulario");
			document.frmAlu.apellidosAlu.focus();
			bValido = false;
			sError += "El campo apellidos debe tener entre 5 y 30 caracteres y utilizar sólo caracteres alfabéticos en mayúsculas o minúsculas o espacios \n"; 
		}
		else {
			document.frmAlu.apellidosAlu.classList.remove("errorFormulario");
		}
	}
	else
	{
		document.frmAlu.apellidosAlu.classList.add("errorFormulario");
		if(bValido) 
		  document.frmAlu.apellidosAlu.focus();
		bValido = false;
		sError += "El campo apellidos no puede estar vacio \n";		
	}

	//dni
	var sDni = document.frmAlu.dniAlu.value.trim();
	if (sDni != "")
	{
		/*El campo dni debe tener 8 dígitos y 1 letra mayúscula*/
		var oExpReg = /^\d{8}[a-zA-Z]$/i;
		if (oExpReg.test(sDni) == false){

				document.frmAlu.dniAlu.classList.add("errorFormulario");
				document.frmAlu.dniAlu.focus();
				bValido = false;
				sError += "El campo dni debe tener 8 dígitos y 1 letra  \n"; 
			} else {
				document.frmAlu.dniAlu.classList.remove("errorFormulario");
			}
	}
	else
	{
		document.frmAlu.dniAlu.classList.add("errorFormulario");
		if(bValido) 
		  document.frmAlu.dniAlu.focus();
		bValido = false;
		sError += "El dni no puede estar vacio \n";		
	}


	//teléfono
	var sTelefono = document.frmAlu.telefonoAlu.value.trim();
	if (sTelefono != "")
	{	
		var oExpReg = /^[0-9]{2,3}-? ?[0-9]{6,7}$/i;
		if (oExpReg.test(sTelefono) == false)
		{
			document.frmAlu.telefonoAlu.classList.add("errorFormulario");
			document.frmAlu.telefonoAlu.focus();
			bValido = false;
			sError += "El campo teléfono solo puede tener 9 dígitos \n"; 
		}
		else {
			document.frmAlu.telefonoAlu.classList.remove("errorFormulario");
		}
	}
	else
	{
		document.frmAlu.telefonoAlu.classList.add("errorFormulario");
		if(bValido) 
		  document.frmAlu.telefonoAlu.focus();
		bValido = false;
		sError += "El campo teléfono no puede estar vacio \n";		
	}


	//dirección
	var sDireccion = document.frmAlu.direAlu.value.trim();
	if (sDireccion != "")
	{
		var oExpReg = /^[a-z\d\s\,\º\/]{3,40}$/i;
		if (oExpReg.test(sDireccion) == false)
		{
			document.frmAlu.direAlu.classList.add("errorFormulario");
			document.frmAlu.direAlu.focus();
			bValido = false;
			sError += "El campo dirección debe tener entre 3 y 40 carácteres \n"; 
		}
		else {
			document.frmAlu.direAlu.classList.remove("errorFormulario");
		}
	}
	else
	{
		document.frmAlu.direAlu.classList.add("errorFormulario");
		if(bValido) 
		  document.frmAlu.direAlu.focus();
		bValido = false;
		sError += "El campo dirección no puede estar vacio \n";		
	}

	//email
	var sEmail = document.frmAlu.emailAlu.value.trim();
	if (sEmail != "")
	{
		var oExpReg = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i;
		if (oExpReg.test(sEmail) == false)
		{
			document.frmAlu.emailAlu.classList.add("errorFormulario");	
			if(bValido) 
				document.frmAlu.emailAlu.focus();
			bValido = false;
			sError += "El email debe tener la siguiente estructura: Caracteres_permitidos@caracteres_permitidos.caracteres_permitidos \n";
 
		}
		else {
			document.frmAlu.emailAlu.classList.remove("errorFormulario");
		}
	}
	else
	{
		document.frmAlu.emailAlu.classList.add("errorFormulario");
		if(bValido) 
		  document.frmAlu.emailAlu.focus();
		bValido = false;
		sError += "El email no puede estar vacio \n";
	}

	if (bValido == false)
	{
		alert(sError);
		oE.preventDefault();
	}
	else
	{
		oE.preventDefault();
		alumno = new Alumno(sNombre,sPassword, sApellidos, sDni, sTelefono, sDireccion, sEmail, true, false);
		mensaje(document.createTextNode("Alumno creado con éxito"));
		btnCerrarMensaje.addEventListener("click", document.frmAlu.submit(), false);	
	}
}

function mensaje(sTexto)
{
	document.getElementById("pTextoMensaje").appendChild(sTexto);
	document.getElementById("panelMensajes").style.display = 'block';
}

function cerrarMensaje()
{
	document.getElementById("pTextoMensaje").textContent="";
	document.getElementById("panelMensajes").style.display = 'none';
}

if (document.querySelector('#sidebarCollapse') != null)
	document.querySelector('#sidebarCollapse').addEventListener("click", mostrarSidebar, false);

function mostrarSidebar()
{
	var sidebar = document.querySelector('#sidebar');
	if (sidebar.classList.contains('active'))
		sidebar.classList.remove('active');
	else
		sidebar.classList.add('active');
}

function capitalize(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

/*******************************Cargar datos Usuario ********************************/
/*este método lo dejo aqui porque puede servir casi identico para cargar los datos de profesores y administrativos
 para que puedan modificar sus datos*/
function cargarDatosUsuario()
{
	document.querySelector("#frmModAlu #nombreAlu").value = sesion.nombre;
	document.querySelector("#frmModAlu #apellidosAlu").value = sesion.apellidos;
	document.querySelector("#frmModAlu #dniAlu").value = sesion.dni;
	document.querySelector("#frmModAlu #passAlu").value = sesion.password;
	document.querySelector("#frmModAlu #telefonoAlu").value = sesion.telefono;
	document.querySelector("#frmModAlu #direAlu").value = sesion.direccion;
	document.querySelector("#frmModAlu #emailAlu").value = sesion.correo;
}

function loadXMLDoc(filename)
{
	var xhttp = null;

	if (window.XMLHttpRequest)
		xhttp = new XMLHttpRequest();
	else // IE 5/6
		xhttp = new ActiveXObject("Microsoft.XMLHTTP");

	xhttp.open("GET", filename, false);
	xhttp.send();
	return xhttp.responseXML;
}