
		if (typeof(sesion) === "undefined")
			var sesion = JSON.parse(sessionStorage.usuario);

		document.querySelector('#sidebar .usuario .nombre').appendChild(document.createTextNode(sesion.nombre));

		/*if (sesion.tipo != 'alumno')
			location.href = "index.html";*/

		var btnCerrarSesion= document.querySelector("#btnCerrarSesion");
		btnCerrarSesion.addEventListener("click", cerrarSesion, false);

		/*zona de configuración de eventos*/

		var enlaces = document.getElementsByTagName("a");
		for (var i = 0; i < enlaces.length ; i++) 
		{  
			enlaces[i].addEventListener("click", function (event)
			{
				event.preventDefault();
				mostrar(event);
			}, false);
		}

		document.querySelector("#enlaceMisDatos").click();

		var btnModDatosAlu= document.querySelector("#btnModDatosUsu");
		btnModDatosUsu.addEventListener("click", comprobarFrmModDatosUsu, false);
		//var btnResetModDatosAlu= document.querySelector("#btnResetModDatosAlu");

		oSelectIdioma= document.querySelector("#selectIdioma");
		oSelectIdioma.addEventListener("change", cargarNivel, false);
		oSelectIdioma.addEventListener("change", cargarTipo, false);

		oSelectNivel= document.querySelector("#selectNivel");
		oSelectNivel.addEventListener("change", cargarTipo, false);

		oSelectTipo= document.querySelector("#selectTipo");
		oSelectTipo.addEventListener("change", cargarCurso, false);

		btnAddCursoMatri= document.querySelector("#btnAddCursoMatri");
		btnAddCursoMatri.addEventListener("click", addCursoMatri, false); 

		btnEnviarMatri= document.querySelector("#btnEnviarMatri");
		btnEnviarMatri.addEventListener("click", realizarMatricula, false);

		btnDarBajaAca= document.querySelector("#btnDarBajaAca"); 
		btnDarBajaAca.addEventListener("click", function(oEvento){
			var oE = oEvento || window.event;
			oE.preventDefault();
			academia.borrarUsuario(sesion.dni);
			location.href = "login.html";

		}, false); 


		menuCursoUsuario(); //llamada al método para que cargue los cursos en los que esté inicialmente matriculado

		function menuCursoUsuario()
		{
			var oLiCurso = document.querySelector("#pageSubmenu1");

			borrarLi();

			var oLinkCurso = document.querySelector('a[href="#pageSubmenu1"]');
			var badge = document.createElement("span");
			badge.classList.add("badge");
			badge.id = "numCursos";
			badge.textContent = sesion.listaCursos.length;
			oLinkCurso.appendChild(badge);

			if(sesion.listaCursos.length>0)
			{
				for (var i=0; i<sesion.listaCursos.length; i++) 
				{
					var oCurso = academia.getCurso(sesion.listaCursos[i]);
					var oLi = document.createElement("LI");
					var oA = document.createElement("A");
					oA.href = "#listaCalificaciones";
					oA.textContent = oCurso.idioma+" "+oCurso.nivel;
					oA.id = "enlaceMisCursos";
					oA.value = oCurso.codigo;
					oA.dataset.codigoCurso = oCurso.codigo;
					oLi.appendChild(oA);
					oLiCurso.appendChild(oLi);
					// meterle eventos a los nuevos a creados
					document.querySelectorAll("#enlaceMisCursos")[i].addEventListener("click", function (event) { event.preventDefault(); mostrar(event); this.parentNode.classList.add("active"); }, false);
				}   
			}

			oLinkCurso.appendChild(badge);
		}

		function borrarLi()
		{
			var badge = document.querySelector('#numCursos');
			if (badge != null)
				badge.remove();

			var oLis = document.querySelectorAll("#pageSubmenu1 LI");
			for (var i=0; i<oLis.length; i++) 
			{
				oLis[i].parentNode.removeChild(oLis[i]);
			}
		}

		/* zona para mostrar y ocultar div*/
		function mostrar(oEvento)
		{

			var menus = document.querySelectorAll('nav li');
        	for (var i=0; i<menus.length; i++)
            menus[i].classList.remove('active');

       
			oE= oEvento || window.event;
			if (oE.target.id == "enlaceMisDatos")
			{
				document.getElementById("capaModificarAlu").classList.remove("ocultar");
				document.getElementById("capaMatriCurso").classList.add("ocultar");
				document.getElementById("capaDarBaja").classList.add("ocultar");
				document.getElementById("listaCalificaciones").classList.add("ocultar");
				document.querySelector('#enlaceMisDatos').parentNode.classList.add('active');
				resetearCamposModMatricula();
				cargarDatosUsuario();

			}
			else if (oE.target.id == "enlaceMatricular")
			{
				document.getElementById("capaMatriCurso").classList.remove("ocultar");
				document.getElementById("capaModificarAlu").classList.add("ocultar");
				document.getElementById("capaDarBaja").classList.add("ocultar");
				document.getElementById("listaCalificaciones").classList.add("ocultar");
				document.querySelector('#enlaceMatricular').parentNode.classList.add('active');
				resetearSelectIdiomas();
				cargarCursos();


			}
			else if (oE.target.id == "enlaceBaja")
			{
				document.getElementById("capaDarBaja").classList.remove("ocultar");
				document.getElementById("capaModificarAlu").classList.add("ocultar");
				document.getElementById("capaMatriCurso").classList.add("ocultar");
				document.getElementById("listaCalificaciones").classList.add("ocultar");
				document.querySelector('#enlaceBaja').parentNode.classList.add('active');
			}
			else if (oE.target.id == "enlaceMisCursos")
			{
				document.getElementById("listaCalificaciones").classList.remove("ocultar");
				document.getElementById("capaModificarAlu").classList.add("ocultar");
				document.getElementById("capaMatriCurso").classList.add("ocultar");
				document.getElementById("capaDarBaja").classList.add("ocultar");
				document.querySelector('#pageSubmenu1').parentNode.classList.add('active');
				cargarListadoCurso(oEvento);

			}
		}
