<?php
function getPosts($connection)
{
	$zapr = mysqli_query($connection, "SELECT * FROM `Post`");
	$postlist = [];
	while ($post = mysqli_fetch_assoc($zapr)) {
		$postlist[] = $post;
	}
	if (!$postlist) {
		http_response_code(404);
	}
	echo json_encode($postlist);
}
function getPost($connection, $id)
{
	$post = mysqli_query($connection, "SELECT * FROM `Post` WHERE `post_id` = $id;");
	$post = mysqli_fetch_assoc($post);
	if (!$post) {
		http_response_code(404);
	}
	echo json_encode($post);
}
function addPost($connection, $data, $image){
	$title = $data['title'];
	$text = $data['text'];
	mysqli_query($connection, "INSERT INTO `post` (`title`, `text`, `image`) VALUES ('$title', '$text','$image')");
	http_response_code(201);
}
function deletePost($connection, $id)
{
	mysqli_query($connection, "DELETE FROM `post` WHERE `post`.`post_id` = '$id'");
}
function postLike($connection, $id){
	$like =mysqli_fetch_assoc(mysqli_query($connection, "SELECT `likes` FROM `post` WHERE `post_id` = '$id'"))['likes'];
	$like = $like + 1;
	mysqli_query($connection, "UPDATE `post` SET `likes`= $like WHERE `post_id`= $id");
}
function editPost($connection, $id, $data){
	$title = $data['title'];
	$text = $data['text'];
	mysqli_query($connection,"UPDATE `post` SET `title` = '$title', `text` = '$text' WHERE `post`.`post_id` = $id");
}
