<?php
require("populate_connect.php");
if(!empty($_POST)) {
    $id = $_POST['student_id'];
    $query = "DELETE FROM `SGT_3`WHERE `id` = '$id'";
    mysqli_query($conn, $query);

if(mysqli_affected_rows($conn) > 0){
    $output['success'] = 'true';
    print(json_encode($output));
}}
?>