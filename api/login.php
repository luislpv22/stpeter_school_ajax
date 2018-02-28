<?php

header('Content-type: application/json; charset=utf-8');

include('database.php');

$db = conexion_db();

if (!empty($_POST))
{
	$sql = "SELECT tipo FROM usuarios WHERE dni='".$_POST['dni']."' AND password='".$_POST['password']."' AND activo=1";
	$query = $db->query($sql);
	echo json_encode($query->fetch_object(), JSON_UNESCAPED_UNICODE);
}

?>
