<?php

require('populate_connect.php');
//require('regex_test.php');

//$name = addslashes(trim($_POST['name']));
//$course = addslashes(trim($_POST['course']));
//grade = (int)$_POST['grade'];
$name = $_POST['name'];
$course = $_POST['course'];
$grade = $_POST['grade'];
$query = "INSERT INTO `SGT_3`( `name`, `course`, `grade`) VALUES ('$name', '$course', '$grade')";
mysqli_query($conn, $query);


if(mysqli_affected_rows($conn)>0) {
    $output['success'] = true;
    $newID = mysqli_insert_id($conn);
    $output['newID'] = $newID;
}
print(json_encode($output));
//if(isValidGrade($grade)==true && isValidCourse($course)==true && isValidName($name)==true){
//    $query = "INSERT INTO `SGT_3`( `name`, `course`, `grade`) VALUES ('$name', '$course', '$grade')";
//    mysqli_query($conn, $query);
//
//
//    if(mysqli_affected_rows($conn)>0) {
//        $output['success'] = true;
//        $newID = mysqli_insert_id($conn);
//        $output['newID'] = $newID;
//        print(json_encode($output));
//    }
//}
//else{
//    $output['success'] = false;
//    $output['errors'] = "Oh no what happened";
//    print(json_encode($output));
//}
?>

