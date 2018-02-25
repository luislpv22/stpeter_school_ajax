<?php

function conexion_db()
{
	$db = new mysqli('localhost', 'root', '', 'stpeter_school');
	$db->set_charset("utf8");
	return $db;
}

?>