function errorValidacion(campo, mensaje)
{
	let div = $('<div class="text-error">'+mensaje+'</div>');
	$(campo).addClass("errorFormulario");
	$(campo).parent().append(div);
	campo.focus(); 
	return false;
}

function limpiarErrores(form)
{
	$(form).find('.errorFormulario').each(function() { $(this).removeClass("errorFormulario"); });
	$(form).find('.text-error').each(function() { $(this).remove(); });
}

function validarFormUsuario(form)
{
	let str = "";
	let regex = "";
	let bValido = true;
	limpiarErrores(form);

	// password
	str = form.password.value.trim();
	if (str != "")
	{
		regex = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,15}$/i;
		if (!regex.test(str))
			bValido = errorValidacion(form.password, "La contraseña tiene que tener entre 6 y 15 caracteres, y debe haber números, letras mayusculas y letras minusculas");
	}
	else
		bValido = errorValidacion(form.password, "La contraseña no puede estar vacia");

	// nombre
	str = form.nombre.value.trim();
	if (str == "")
		bValido = errorValidacion(form.nombre, "El nombre no puede estar vacio");

	// apellidos
	str = form.apellidos.value.trim();
	if (str == "")
		bValido = errorValidacion(form.apellidos, "Los apellidos no pueden estar vacios");

	// telefono
	str = form.telefono.value.trim();
	if (str != "")
	{
		regex = /^[679]{1}\d{8}$/;
		if (!regex.test(str))
			bValido = errorValidacion(form.telefono, "El campo teléfono solo puede tener 9 dígitos");
	}
	else
		bValido = errorValidacion(form.telefono, "El teléfono no puede estar vacio");

	// dirección
	str = form.direccion.value.trim();
	if (str != "")
	{
		regex = /^[a-z\d\s\,\º\/]{3,40}$/i;
		if (!regex.test(str))
			bValido = errorValidacion(form.direccion, "El campo dirección debe tener entre 3 y 40 carácteres");
	}
	else
		bValido = errorValidacion(form.direccion, "La dirección no puede estar vacio");

	// email
	str = form.email.value.trim();
	if (str != "")
	{
		regex = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i;
		if (!regex.test(str))
			bValido = errorValidacion(form.email, "El correo electrónico no es correcto");
	}
	else
		bValido = errorValidacion(form.email, "El correo electrónico no puede estar vacio");

	return bValido;
}

// validación del campo seleccionar curso
function validarCampoCursos(form)
{
	let bValido = true;
	limpiarErrores(form);

	if (form.curso.value == "")
		bValido = errorValidacion(form.curso, "Debe seleccionar un curso");

	return bValido;
}

// validación de cursos
function validarFormCurso(form)
{
	let bValido = true;
	limpiarErrores(form);

	if (form.codigo.value.trim() == "")
		bValido = errorValidacion(form.codigo, "El código no puede estar vacio");

	if (form.duracion1.value.trim() == "")
		bValido = errorValidacion(form.duracion1, "La duración no puede estar vacia");

	if (form.precio.value.trim() == "")
		bValido = errorValidacion(form.precio, "El precio no puede estar vacio");

	if (form.profesor.value == "")
		bValido = errorValidacion(form.profesor, "Debe seleccionar un profesor");

	return bValido;
}