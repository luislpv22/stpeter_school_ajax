<?php

header('Content-type: application/json; charset=utf-8');

$db = new mysqli('localhost', 'root', '', 'stpeter_school');
$db->set_charset("utf8");

if (!empty($_POST))
{
	$sql = "SELECT dni, tipo FROM usuarios WHERE usuario='".$_POST['usuario']."' AND password='".$_POST['password']."' AND activo=1";
	$query = $db->query($sql);
	echo json_encode($query->fetch_object(), JSON_UNESCAPED_UNICODE);
}

?>
