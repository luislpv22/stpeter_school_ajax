<?php

header('Content-type: application/json; charset=utf-8');

include('lib/password.php');

$db = new mysqli('localhost', 'root', '', 'stpeter_school');
$db->set_charset("utf8");

/*if (!empty($_POST))
{
	$sql = "SELECT * FROM usuarios WHERE dni='".$_POST['dni']."' AND password='".$_POST['password']."'";
	$query = $db->query($sql);

	if ($query->num_rows > 0)
		echo 'true';
	else
		echo 'false';
}*/

if (!empty($_POST))
{
	$sql = "SELECT dni, tipo FROM usuarios WHERE usuario='".$_POST['usuario']."' AND password='".$_POST['password']."'";
	$query = $db->query($sql);
	echo json_encode($query->fetch_object(), JSON_UNESCAPED_UNICODE);
}

?>
