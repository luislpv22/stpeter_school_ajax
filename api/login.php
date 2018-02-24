<?php

include('lib/password.php');

$db = new mysqli('localhost', 'root', '', 'stpeter_school');
$db->set_charset("utf8");

if (!empty($_POST))
{
	$sql = "SELECT * FROM usuarios WHERE usuario='".$_POST['usuario']."' AND password='".$_POST['password']."'";
	$query = $db->query($sql);

	if ($query->num_rows > 0)
		echo 'true';
	else
		echo 'false';
}

?>
