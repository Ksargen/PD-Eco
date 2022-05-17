<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *, Authorization');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json; charset=utf-8');

require 'connection.php';
require 'functions.php';
$q = $_GET['q'];
$t = explode('/', $q);
$p = $t[0];
$id = $t[1];
$l = $t[2];

switch ($_SERVER['REQUEST_METHOD']) {
	case 'GET':
		if ($p == 'posts') {
			if (isset($id)) {
				getPost($connection, $id);
			} else {
				getPosts($connection);
			}
		}
		break;
	case 'POST':
		if ($p == 'posts') {
			addPost($connection, $_POST, count($_FILES) > 0 ? base64_encode(file_get_contents($_FILES['file']['tmp_name'])) : '');
		}
		break;
	case 'DELETE':
		if ($p == 'posts') {
			if (isset($id)) {
				deletePost($connection, $id);
			}
		}
		break;
	case 'PATCH':
		if ($p == 'posts') {
			if (isset($id)) {
				if (isset($l) and ($l == 'like')) {
					postLike($connection, $id);
					break;
				}
				$data = file_get_contents('php://input');
				$data = json_decode($data,true);
				editPost($connection, $id, $data);
			}
		}
}
