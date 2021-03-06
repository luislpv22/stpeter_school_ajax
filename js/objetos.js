class Persona
{
	constructor(sNombre, sPassword, sApellidos, sDni, iTelefono, sDireccion, sCorreo, bActivo)
	{
		this.nombre    = sNombre;
		this.password  = sPassword;
		this.apellidos = sApellidos;
		this.dni       = sDni;
		this.telefono  = iTelefono;
		this.direccion = sDireccion;
		this.correo    = sCorreo;
		this.activo    = bActivo;
	}
}

class Profesor extends Persona
{
	constructor(sNombre, sPassword, sApellidos, sDni, iTelefono, sDireccion, sCorreo, bActivo, iSalario)
	{
		super(sNombre, sPassword, sApellidos, sDni, iTelefono, sDireccion, sCorreo, bActivo);

		this.salario = iSalario;
	}

	getCursos()
	{
		let listaCursos = [];
		let tCursos = academia.getCursos();
		for (let i=0; i<tCursos.length; i++)
			if (tCursos[i].profesor == this.dni)
				listaCursos.push(tCursos[i].codigo);

		return listaCursos;
	}
}

class Alumno extends Persona
{
	constructor(sNombre, sPassword, sApellidos, sDni, iTelefono, sDireccion, sCorreo, bActivo, bEstadoCobro)
	{
		super(sNombre, sPassword, sApellidos, sDni, iTelefono, sDireccion, sCorreo, bActivo);

		this.estadoCobro         = bEstadoCobro;
		this.listaCursos         = [];
		this.listaCalificaciones = [];
	}

	addCurso(codigo)
	{
		if (!this.listaCursos.includes(codigo))
			this.listaCursos.push(codigo); // Añade un curso al alumno
	}

	addNota(oCalificacion)
	{
		this.listaCalificaciones.push(oCalificacion); // Añade una calificacion al alumno
	}
}

class Administrador extends Persona
{
	constructor(sNombre, sPassword, sApellidos, sDni, iTelefono, sDireccion, sCorreo, bActivo)
	{
		super(sNombre, sPassword, sApellidos, sDni, iTelefono, sDireccion, sCorreo, bActivo);
	}
}

class Calificacion
{
	constructor(iMatricula, sTarea, fNota)
	{
		this.matricula = iMatricula;
		this.tarea     = sTarea;
		this.nota      = fNota;
	}
}

class Curso
{
	constructor(sCodigo, sIdioma, sDuracion, fPrecio, sTipo, sNivel, bActivo, sProfesor)
	{
		this.codigo       = sCodigo;
		this.idioma       = sIdioma;
		this.duracion     = sDuracion;
		this.precio       = fPrecio;
		this.tipo         = sTipo;
		this.nivel        = sNivel;
		this.listaAlumnos = []; // una lista de los alumnos que están matriculados en el curso
		this.activo       = bActivo; // boolean para saber si el curso sigue activo, o ya termino, o se canceló
		this.profesor     = sProfesor;
	}

	matricularAlumno(sDni)
	{
		this.listaAlumnos.push(sDni); // añade un alumno al curso
	}
}

class Matricula
{
	constructor(iNumero, sEstado, sDniAlumno, sCurso)
	{
		this.numero    = iNumero;
		this.estado    = sEstado;
		this.dniAlumno = sDniAlumno;
		this.curso     = sCurso;
	}
}


// Clase contenedora 
class Academia
{ 
	constructor()
	{
		this._alumnos    = []; // atributo privado, array que contiene todos los alumnos de la academia
		this._usuarios   = []; // atributo privado, array que contiene todos los usuarios de la academia
		this._cursos     = []; // atributo privado, array que contiene todos los cursos de la academia
		this._profesores = []; // atributo privado, array que contiene todos los profesores de la academia
		this._matriculas = []; // atributo privado, array que contiene todos las matrículas de la academia
	}

	addMatricula(oMatricula)
	{
		let bEncontrado = false;
		for (var i=0; i<this._matriculas.length && !bEncontrado; i++)
			if (this._matriculas[i].numero == oMatricula.numero)
				bEncontrado = true;

		if (!bEncontrado)
		{
			this._matriculas.push(oMatricula);
			for (let i=0; i<this._usuarios.length && !bEncontrado; i++)
			{
				if (this._usuarios[i].dni == oMatricula.dniAlumno)
				{
					this._usuarios[i].addCurso(oMatricula.curso);
					bEncontrado = true;
				}
			}
		}

		return bEncontrado;
	}

	addUsuario(oUsuario)
	{
		var bEncontrado = false;
		for (var i=0; i<this._usuarios.length && !bEncontrado; i++)
			if (this._usuarios[i].dni == oUsuario.dni)
				bEncontrado = true;

		if (!bEncontrado)
		{
			if (oUsuario.nuevo)
			{
				let bInsert = false;
				$.ajax(
				{
					url: "api/usuarios.php",
					type: "POST",
					async: false,
					data: oUsuario,
					success: function(result)
					{
						if (result)
							bInsert = true;
					}
				});

				if (bInsert)
					this._usuarios.push(oUsuario);
			}
			else
				this._usuarios.push(oUsuario);
		}

		return !bEncontrado;
	}

	addCurso(oCurso)
	{
		var bEncontrado = false;
		for (var i=0; i<this._cursos.length && !bEncontrado; i++)
			if (this._cursos[i].codigo == oCurso.codigo)
				bEncontrado = true;

		if (!bEncontrado)
		{
			if (oCurso.nuevo)
			{
				let bInsert = false;
				$.ajax(
				{
					url: "api/cursos.php",
					type: "POST",
					async: false,
					data: oCurso,
					success: function(result)
					{
						if (result)
							bInsert = true;
					}
				});

				if (bInsert)
					this._cursos.push(oCurso);
			}
			else
				this._cursos.push(oCurso);
		}

		return !bEncontrado;
	}

	inicioSesion(sDni,sPass)
	{
		var oUsuario = null;
		for (var i=0; i<this._usuarios.length && oUsuario==null; i++)
		{
			if (this._usuarios[i].dni == sDni && this._usuarios[i].password == sPass)
			{
				if (this._usuarios[i].activo == "si")
					oUsuario = this._usuarios[i];	
			}	
		}
		return oUsuario;
	}

	modificarUsuario(oUsuario)
	{
		// recorrer la array de usuarios hasta encontrar a los que tengan el mismo dni y modificarlo
		var bEncontrado = false;

		for (var i=0; i<this._usuarios.length && bEncontrado==false; i++) 
		{
			if (this._usuarios[i].dni == oUsuario.dni)
			{
				let bUpdate = false;
				$.ajax(
				{
					url: "api/usuarios.php",
					type: "POST",
					async: false,
					data: oUsuario,
					success: function(result)
					{
						if (result)
							bUpdate = true;
					}
				});

				if (bUpdate)
				{
					let nuevoUsuario = null;
					if (this._usuarios[i] instanceof Administrador)
					{
						nuevoUsuario = new Administrador(oUsuario.nombre, oUsuario.password, oUsuario.apellidos, oUsuario.dni, oUsuario.telefono, oUsuario.direccion, oUsuario.correo, oUsuario.activo);
						nuevoUsuario.tipo = 'administrador';
					}
					else if (this._usuarios[i] instanceof Profesor)
					{
						nuevoUsuario = new Profesor(oUsuario.nombre, oUsuario.password, oUsuario.apellidos, oUsuario.dni, oUsuario.telefono, oUsuario.direccion, oUsuario.correo, oUsuario.activo, 0);
						nuevoUsuario.tipo = 'profesor';
					}
					else
					{
						nuevoUsuario = new Alumno(oUsuario.nombre, oUsuario.password, oUsuario.apellidos, oUsuario.dni, oUsuario.telefono, oUsuario.direccion, oUsuario.correo, oUsuario.activo, "");
						nuevoUsuario.listaCursos = oUsuario.listaCursos;
						nuevoUsuario.listaCalificaciones = oUsuario.listaCalificaciones;
						nuevoUsuario.tipo = 'alumno';
					}

					let sesion = JSON.parse(sessionStorage.usuario);
					if (nuevoUsuario.dni == sesion.dni)
						sessionStorage.setItem('usuario',  JSON.stringify(nuevoUsuario));

					this._usuarios[i] = nuevoUsuario;
				}

				bEncontrado = true;
			}
		}
	}

	modificarCurso(oCurso)
	{
		// recorrer la array de cursos hasta encontrar a los que tengan el mismo codigo y modificarlo
		let bEncontrado = false;

		for (let i=0; i<this._cursos.length && bEncontrado==false; i++) 
		{
			if (this._cursos[i].codigo == oCurso.codigo)
			{
				let bUpdate = false;
				$.ajax(
				{
					url: "api/cursos.php",
					type: "POST",
					async: false,
					data: oCurso,
					success: function(result)
					{
						if (result)
							bUpdate = true;
					}
				});

				if (bUpdate)
					this._cursos[i] = oCurso;

				bEncontrado = true;
			}
		}
	}

	modificarMatricula(oMatricula)
	{
		// recorrer la array de matrícula hasta encontrar al que tengan el mismo número y modificarlo
		var bEncontrado = false;
		for (var i=0; i<this._matriculas.length && bEncontrado==false; i++) 
		{
			if (this._matriculas[i].numero == oMatricula.numero)
			{
				let bUpdate = false;
				$.ajax(
				{
					url: "api/matriculas.php",
					type: "POST",
					async: false,
					data: oMatricula,
					success: function(result)
					{
						if (result)
							bUpdate = true;
					}
				});

				if (bUpdate)
					this._matriculas[i] = oMatricula;

				bEncontrado = true;
			}
		}
	}

	getUsuarios()
	{
		return this._usuarios;
	}

	getUsuario(dni)
	{
		var oUsuario = null;
		for (var i=0; i<this._usuarios.length && oUsuario == null; i++) 
			if (this._usuarios[i].dni == dni)
				oUsuario = this._usuarios[i];

		return oUsuario;
	}

	getAlumnos()
	{
		var alumnos = [];
		for (var i=0; i<this._usuarios.length; i++)
			if (this._usuarios[i] instanceof Alumno)
				alumnos.push(this._usuarios[i]);

		return alumnos;
	}

	getProfesores()
	{
		var profesores = [];
		for (var i=0; i<this._usuarios.length; i++)
			if (this._usuarios[i] instanceof Profesor)
				profesores.push(this._usuarios[i]);

		return profesores;
	}

	getAdministradores()
	{
		var administradores = [];
		for (var i=0; i<this._usuarios.length; i++)
			if (this._usuarios[i] instanceof Administrador)
				administradores.push(this._usuarios[i]);

		return administradores;
	}

	getMatriculas()
	{
		return this._matriculas;
	}

	getMatricula(numero)
	{
		let oMatricula = null;
		for (let i=0; i<this._matriculas.length; i++) 
			if (this._matriculas[i].numero == numero)
				oMatricula = this._matriculas[i];
			
		return oMatricula;
	}

	getCursos()
	{
		return this._cursos;
	}

	getCurso(sCodigo)
	{
		var oCurso = null;
		for (var i=0; i<this._cursos.length && oCurso==null; i++) 
			if (this._cursos[i].codigo == sCodigo)
				oCurso= this._cursos[i];

		return oCurso;
	}

	getCursosMatriculados(sDni)
	{
		oCursos=null;
		for (var i = 0; i < this._usuarios && oCursos==null; i++) 
		{
			if (this._usuarios[i].dni= sDni)
			{
				oCursos=this._usuarios[i].listaCursos;
			}
			
		}
		return oCursos;
	}

	modificarCalificacion(sDni, oCalificacion)
	{
		for (let i=0; i<this._usuarios.length; i++) 
		{
			if (this._usuarios[i].dni == sDni)
			{
				let tCalificaciones = this._usuarios[i].listaCalificaciones;
	   
				for (let j=0; j<tCalificaciones.length; j++)
					if (tCalificaciones[j].matricula == oCalificacion.matricula && tCalificaciones[j].tarea == oCalificacion.tarea)
						tCalificaciones[j].nota = oCalificacion.nota;

				this._usuarios[i].listaCalificaciones = tCalificaciones;
			}
		}

		$.ajax(
		{
			url: "api/profesor.php",
			type: "POST",
			async: true,
			data: {'notas': JSON.stringify(oCalificacion)},
			dataType: "JSON",
			success: function() {}
		});
	}

	borrarCalificacion(sDni, sCurso, sTarea)
	{
		for (let i=0; i<this._usuarios.length; i++) 
		{
			if (this._usuarios[i].dni == sDni)
			{
				let tCalificaciones = this._usuarios[i].listaCalificaciones;
	   
				for (let j=0; j<tCalificaciones.length; j++)
				{
					let oMatricula = this.getMatricula(tCalificaciones[j].matricula);
					if (oMatricula.curso == sCurso && tCalificaciones[j].tarea == sTarea)
						tCalificaciones.splice(j, 1);
				}

				this._usuarios[i].listaCalificaciones = tCalificaciones;
			}
		}

		$.ajax(
		{
			url: "api/profesor.php",
			type: "GET",
			async: true,
			data: {'dni': sDni, 'curso' : sCurso, 'tarea' : sTarea}
		});
	}

	codNuevaMatri()
	{
		var oMatri=this._matriculas[this._matriculas.length -1]; // obteiene el último elemento de una array
		return parseInt(oMatri.numero)+1;
	}

	borrarUsuario(sDni)
	{
		for (var i=0; i<this._usuarios.length; i++) 
			if (this._usuarios[i].dni == sDni)
				this._usuarios[i].activo = 0;
	}

	getCalificaciones(codCurso, dniAlu)
	{
		var listaCalificaciones = [];

		let oMatricula = null;
		for (let i=0; i<this._matriculas.length; i++)
			if (this._matriculas[i].curso == codCurso && this._matriculas[i].dniAlumno == dniAlu)
				oMatricula = this._matriculas[i];

		let oAlumno = this.getUsuario(dniAlu);
		for (let i=0; i<oAlumno.listaCalificaciones.length; i++)
			if (oAlumno.listaCalificaciones[i].matricula == oMatricula.numero)
				listaCalificaciones.push(oAlumno.listaCalificaciones[i]);
				
		return listaCalificaciones;
	}

	addCalificacionesAlu(dni, oCalificacion)
	{
		for (var i=0; i<this._usuarios.length; i++) 
			if (this._usuarios[i].dni == dni)
				this._usuarios[i].addNota(oCalificacion);

		$.ajax({
			url: "api/profesor.php",
			type: "POST",
			async: true,
			data: {'add': JSON.stringify(oCalificacion)},
			dataType: "JSON",
			success: function()
			{
			}
		});
	}

	cambiarEstadoMatri(oMatri)
	{
		for (var i = 0; i < this._matriculas.length; i++) 
		{
			if (this._matriculas[i] == oMatri)
			{
				if (oMatri.estado == "activa")
					this._matriculas[i].estado = "inactiva";
				else
					this._matriculas[i].estado = "activa";
			}
		}
	}

	borrarCursosAlumno(sDni, cursosQuitarAlu)
	{
		var oAlu= this.getUsuario(sDni)
		var indice=0;
		var listaIndice = [];
		
		// para borrar las notas del curso de la lista de calificaciones del alumno
		for (var i = 0; i < oAlu.listaCalificaciones.length; i++) 
			if (oAlu.listaCalificaciones[i].codCurso == cursosQuitarAlu[i])
					indice = i;

		if (i !== -1)
			oAlu.listaCalificaciones.splice( indice, 1 );

		// para borrar el curso de la lista de cursos del alumno
		var indice = 0;
		for (var i = 0; i < cursosQuitarAlu.length; i++) 
		{
			var ind = oAlu.listaCursos.indexOf( cursosQuitarAlu[i] );
			if ( ind !== -1 )
			{
				listaIndice[indice] = ind;
				indice++;
			} 
		}

		for (var i = listaIndice.length-1; i >= 0; i--) 
			oAlu.listaCursos.splice(listaIndice[i], 1 );

		this.modificarUsuario(oAlu);
	}
}





