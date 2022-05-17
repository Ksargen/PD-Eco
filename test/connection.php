<?php
    $connection = mysqli_connect('localhost','root','root','test');
    if(!$connection){
        echo "Нет доступа к БД.";
        die();
    }
?>