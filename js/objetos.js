class Persona
{
	constructor(sNombre, sPassword, sApellidos, sDni, iTelefono, sDireccion, sCorreo, bActivo)
	{
		this.nombre    = sNombre;
		this.password  = sPassword;
		this.apellidos  = sApellidos;
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

		this.salario     = iSalario;
		this.listaCursos = [];
	}

	addCurso(codigo)
	{
		if (!this.listaCursos.includes(codigo))
			this.listaCursos.push(codigo); // Añade un curso al profesor
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
	constructor(sCodigo, sIdioma, sDuracion, fPrecio, sTipo, sNivel, bArchivado)
	{
		this.codigo       = sCodigo;
		this.idioma       = sIdioma;
		this.duracion     = sDuracion;
		this.precio       = fPrecio;
		this.tipo         = sTipo;
		this.nivel        = sNivel;
		this.listaAlumnos = []; // una lista de los alumnos que están matriculados en el curso
		this.bArchivado   = bArchivado; // boolean para saber si el curso sigue activo, o ya termino, o se canceló
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
		this.numero  = iNumero;
		this.estado  = sEstado;
		this.dniAlumno = sDniAlumno;
		this.curso = sCurso;
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
		var bEncontrado = false;
		for (var i=0; i<this._matriculas.length && !bEncontrado; i++)
			if (this._matriculas[i].numero == oMatricula.numero)
				bEncontrado = true;

		if (!bEncontrado)
		{
			this._matriculas.push(oMatricula);
			var oAlumno = this.getUsuario(oMatricula.dniAlumno);
			oAlumno.addCurso(oMatricula.curso);
			this.modificarUsuario(oAlumno);
			sessionStorage.setItem('tMatriculas', JSON.stringify(this._matriculas));
		}

		return !bEncontrado;
	}

	addUsuario(oUsuario)
	{
		var bEncontrado = false;
		for (var i=0; i<this._usuarios.length && !bEncontrado; i++)
			if (this._usuarios[i].dni == oUsuario.dni)
				bEncontrado = true;

		if (!bEncontrado)
			this._usuarios.push(oUsuario);

		return !bEncontrado;
	}

	addCurso(oCurso)
	{
		var bEncontrado = false;
		for (var i=0; i<this._cursos.length && !bEncontrado; i++)
			if (this._cursos[i].codigo == oCurso.codigo)
				bEncontrado = true;

		if (!bEncontrado) {
			this._cursos.push(oCurso);
			sessionStorage.setItem('tCursos', JSON.stringify(this._cursos));
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
				var nuevoUsuario = null;

				if (this._usuarios[i] instanceof Administrador)
				{
					nuevoUsuario = new Administrador(oUsuario.nombre, oUsuario.password, oUsuario.apellidos, oUsuario.dni, oUsuario.telefono, oUsuario.direccion, oUsuario.correo, oUsuario.activo);
				}
				else if (this._usuarios[i] instanceof Profesor)
				{
					nuevoUsuario = new Profesor(oUsuario.nombre, oUsuario.password, oUsuario.apellidos, oUsuario.dni, oUsuario.telefono, oUsuario.direccion, oUsuario.correo, oUsuario.activo, 0);
					nuevoUsuario.listaCursos = oUsuario.listaCursos;
				}
				else
				{
					nuevoUsuario = new Alumno(oUsuario.nombre, oUsuario.password, oUsuario.apellidos, oUsuario.dni, oUsuario.telefono, oUsuario.direccion, oUsuario.correo, oUsuario.activo, "");
					nuevoUsuario.listaCursos = oUsuario.listaCursos;
					nuevoUsuario.listaCalificaciones = oUsuario.listaCalificaciones;
				}

				this._usuarios[i] = nuevoUsuario;
				bEncontrado = true;
			}
		}
		this.actualizarSesionUsuarios();
	}

	modificarCurso(oCurso)
	{
		// recorrer la array de cursos hasta encontrar a los que tengan el mismo codigo y modificarlo
		var bEncontrado = false;
		for (var i=0; i<this._cursos.length && bEncontrado==false; i++) 
		{
			if (this._cursos[i].codigo == oCurso.codigo)
			{
				this._cursos[i] = oCurso;
				bEncontrado = true;
			}
		}
		sessionStorage.setItem('tCursos', JSON.stringify(this._cursos));
	}

	modificarMatricula(oMatricula)
	{
		// recorrer la array de matrícula hasta encontrar al que tengan el mismo número y modificarlo
		var bEncontrado = false;
		for (var i=0; i<this._matriculas.length && bEncontrado==false; i++) 
		{
			if (this._matriculas[i].numero == oMatricula.numero)
			{
				this._matriculas[i] = oMatricula;
				bEncontrado = true;
			}
		}
		sessionStorage.setItem('tMatriculas', JSON.stringify(this._matriculas));
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
		var oMatri= null;
		for (var i = 0; i < this._matriculas.length; i++) 
		{
			
			if (this._matriculas[i].numero == numero)
			{
				
				oMatri=this._matriculas[i];
			}

		}
		return oMatri;
	}

	getMatri(curso, dni)
	{
		var oMatri= null;
		for (var i = 0; i < this._matriculas.length; i++) 
		{
			
			if (this._matriculas[i].curso == curso && this._matriculas[i].dniAlumno == dni)
			{
				oMatri=this._matriculas[i];
			}

		}
		return oMatri;
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

	actualizarSesionUsuarios()
	{
		var tUsuarios = this._usuarios;
		for (var i=0; i<tUsuarios.length; i++)
		{
			if (tUsuarios[i] instanceof Administrador)
				tUsuarios[i].tipo = 'administrador';
			else if (tUsuarios[i] instanceof Profesor)
				tUsuarios[i].tipo = 'profesor';
			else
				tUsuarios[i].tipo = 'alumno';
		}
		sessionStorage.setItem('tUsuarios', JSON.stringify(tUsuarios));
	}

	modificarNotaAlumno(sDni, oCalificacion)
	{
		for (var i=0; i<this._usuarios.length; i++) 
		{
			if (this._usuarios[i].dni == sDni)
			{
				var oCalifca = this._usuarios[i].listaCalificaciones;

				for (var j=0; j<oCalifca.length; j++)
				{
					if (oCalifca[j].curso == oCalificacion.curso && oCalifca[j].descripcion == oCalificacion.descripcion)
					{
						oCalifca[j].nota = oCalificacion.nota;
						this.actualizarSesionUsuarios();
					}
				}

			}
		}
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
				this._usuarios[i].activo = "no";
			
		this.actualizarSesionUsuarios();
	}

	getCalificaciones(codCurso, dniAlu)
	{
		// buscamos en la lista de calificación del alumno que tiene la sesión, las notas que tenga el código del curso,
		// dichas notas las metemos en un array y la devolvemos
		var listaCalificaciones = [];
		var indice = 0;
		var oAlu = this.getUsuario(dniAlu);
		var matricula = this.getMatri(codCurso, dniAlu);

		for (var i=0; i<oAlu.listaCalificaciones.length; i++)
			if (oAlu.listaCalificaciones[i].matricula == matricula.numero)
				listaCalificaciones.push(oAlu.listaCalificaciones[i]);

		return listaCalificaciones;
	}

	addCalificacionesAlu(dni, oCalificacion)
	{
		for (var i=0; i<this._usuarios.length; i++) 
			if (this._usuarios[i].dni == dni)
				this._usuarios[i].addNota(oCalificacion);
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





