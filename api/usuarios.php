<?php

header('Content-type: application/json; charset=utf-8');

include('database.php');

$db = conexion_db();

if (!empty($_GET['usuarios']))
{
	$sql = "SELECT * FROM usuarios";
	$query = $db->query($sql);
	$usuarios = array();
	while($fila = $query->fetch_object())
		$usuarios[] = $fila;

	echo json_encode($usuarios, JSON_UNESCAPED_UNICODE);
}
else if (!empty($_GET['alumno']))
{
	$sql = "SELECT estadoCobro FROM alumnos WHERE dni='".$_GET['alumno']."'";
	$query = $db->query($sql);
	$result = $query->fetch_object();
	echo $result->estadoCobro;
}
else if (!empty($_POST))
{
	$sql = "UPDATE usuarios SET nombre='".$_POST['nombre']."', apellidos='".$_POST['apellidos']."', password='".$_POST['password']."', email='".$_POST['correo']."', telefono=".$_POST['telefono'].", direccion='".$_POST['direccion']."', activo='".$_POST['activo']."' WHERE dni='".$_POST['dni']."'";
	if ($db->query($sql))
		echo true;
	else
		echo false;
}

?>
