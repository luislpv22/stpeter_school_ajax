<?php

include('lib/password.php');

$db = new mysqli('localhost', 'root', '', 'stpeter_school');
$db->set_charset("utf8");

if (!empty($_POST['datos']))
{
	header('Content-type: application/json; charset=utf-8');
	$sDatos = $_POST["datos"];
	$oDatos = json_decode($sDatos);
	$sql = "UPDATE usuarios
        SET telefono = '".$oDatos->telefono."', direccion = '".$oDatos->direccion."', email = '".$oDatos->correo."', password = '".$oDatos->password."'
        WHERE dni = '".$oDatos->dni."'";
	$query = $db->query($sql);
	$afectados= $db->affected_rows;

	if ($afectados = 0)
	{
		$mensaje = "Error al modificar";
		$error =true;
	}
	else
	{
		$mensaje = "Usuario modificado";
		$error = false;
	}
	$respuesta = array($error, $mensaje);
	$sRespuesta = json_encode($respuesta);
	echo $sRespuesta;
}
else if (!empty($_REQUEST["usu"]))
{
	$sDni= $_REQUEST["usu"];
	$sql = "UPDATE usuarios SET activo = 0 WHERE dni = '".$sDni."'";
	$query = $db->query($sql);
	$respuesta = "Se ha dado de baja";
	echo $respuesta;
}
else if (!empty($_GET["idioma"]))
{
	$sql = "SELECT distinct idioma from  cursos";
	$query = $db->query($sql);
	$options = array();
	while ($fila=$query->fetch_ROW())  
	{
		$options[]='<option value="'.$fila[0].'">'.$fila[0].'</option>';
	}
	$datosAenviar= json_encode($options);
	echo $datosAenviar;
}
else if (!empty($_POST["selectIdioma"]))
{
	$sIdioma=$_POST['selectIdioma'];
	$sql = "SELECT distinct nivel from  cursos where idioma ='".$sIdioma."'";
	$query = $db->query($sql);
	$options = array();
	while ($fila=$query->fetch_ROW())  
	{
		$options[]='<option value="'.$fila[0].'">'.$fila[0].'</option>';
	}
	$datosAenviar= json_encode($options);
	echo $datosAenviar;
}
else if (!empty($_POST["datosOption"]))
{
	$sIdioma=$_POST['datosOption'];
	$oIdioma= json_decode($sIdioma);
	$sql = "SELECT distinct tipo from  cursos where idioma ='".$oIdioma->idioma."' and nivel = '".$oIdioma->nivel."'";
	$query = $db->query($sql);
	$options = array();
	while ($fila=$query->fetch_ROW())  
	{
		$options[]='<option value="'.$fila[0].'">'.$fila[0].'</option>';
	}
	$datosAenviar= json_encode($options);
	echo $datosAenviar;
}
else if (!empty($_POST["datosCurso"]))
{
	$sIdioma=$_REQUEST['datosCurso'];
	$oIdioma= json_decode($sIdioma);
	$sql = "SELECT duracion, precio, codigo from  cursos where idioma ='".$oIdioma->idioma."' and nivel = '".$oIdioma->nivel."' and tipo='".$oIdioma->tipo."'";
	$query = $db->query($sql);
	$options = array();
	while ($fila=$query->fetch_ROW())  
	{
		$duracion=$fila[0];
		$precio=$fila[1];
		$codigo=$fila[2];
	}
	$respuesta = array($duracion, $precio, $codigo);
	$datosAenviar= json_encode($respuesta);
	echo $datosAenviar;
}
else if (!empty($_POST["matricular"]))
{
	header('Content-type: application/json; charset=utf-8');
	$sMatricula=$_POST['matricular'];
	$oMatricula= json_decode($sMatricula);

	$sql = "INSERT INTO MATRICULAS (numero, alumno, curso, estado) values ('".$oMatricula->numero."','".$oMatricula->dniAlumno."','".$oMatricula->curso->codigo."','activa')";

	$query = $db->query($sql);
	if ( $db->affected_rows == 0)
	{
		$info=false;
	}
	else
	{
		$info=true;
	}
	echo json_encode($info);
}



?>





