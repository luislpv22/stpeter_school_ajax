<?php

header('Content-type: application/json; charset=utf-8');

include('database.php');

$db = conexion_db();

if (!empty($_GET['cursos']))
{
	$sql = "SELECT * FROM cursos";
	$query = $db->query($sql);
	$cursos = array();
	while($fila = $query->fetch_object())
		$cursos[] = $fila;

	echo json_encode($cursos, JSON_UNESCAPED_UNICODE);
}
else if (!empty($_POST))
{
	$sql = "UPDATE cursos SET idioma='".$_POST['idioma']."', duracion='".$_POST['duracion']."', precio='".$_POST['precio']."', tipo='".$_POST['tipo']."', nivel='".$_POST['nivel']."', activo='".$_POST['activo']."' WHERE codigo='".$_POST['codigo']."'";

	if ($_POST['nuevo'])
		$sql = "INSERT INTO cursos (`codigo`, `idioma`, `duracion`, `precio`, `tipo`, `nivel`, `activo`, `profesor`) VALUES ('".$_POST['codigo']."', '".$_POST['idioma']."', '".$_POST['duracion']."', '".$_POST['precio']."', '".$_POST['tipo']."', '".$_POST['nivel']."', 1, '".$_POST['profesor']."')";

	if ($db->query($sql))
		echo true;
	else
		echo false;
}

?>
