<?php
    require('populate_connect.php');
    //print_r($conn);
    $query = "SELECT * FROM `SGT_3`";
    //print_r($query);
    $result = mysqli_query($conn, $query);
    if(mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_assoc($result)){
            $output[]= $row;
        }
        //print_r(json_encode($output));
    }
$result = [
    'success'=>true, 'data'=>$output
];

print_r(json_encode($result));

?>