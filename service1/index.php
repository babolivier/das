<?php

require_once('vendor/autoload.php');

use Macaroons\Macaroon;
use Macaroons\Verifier;

if(!isset($_COOKIE['das-macaroon'])) {
	echo "Not logged in";
	exit();
}

$serialised = $_COOKIE['das-macaroon'];

$m = Macaroon::deserialize($serialised);
$v = new Verifier();


$v->setCallbacks([
	function($a) {
		return !strcmp($a, "status = teacher");
	}
]);

try {
	$bool = $v->verify($m, 'pocsecret');
} catch(Exception $e) {
	$bool = false;
}

if($bool) {
	$name = join(" ", explode(";", $m->getIdentifier()));
	echo "Access granted.\n<br />Welcome ".$name."!";
} else {
	echo "Access denied. Service is restricted to teachers.";
}
