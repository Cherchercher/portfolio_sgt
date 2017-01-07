<?php
$_SESSION['errors']=[];
$_SESSION['grade']= $_POST['grade'];
$_SESSION['name']=$_POST['name'];
$_SESSION['course']=$_POST['course'];
    function isValidGrade($grade)
    {
        //Solution 1
//        $grade = (int)$grade;
//        return ($grade >= 0 && $grade <= 100);
        //Solution 2
        $regex = '/^100$|^[1-9]?[0-9]$/';
        return preg_match($regex, $grade);
    }
        if (preg_match($regex,$grade)){
            $_SESSION['grade']= $_POST['grade'];
        }
        else{
            $_SESSION['errors']['grade']="Grade needs to be 0-100";
    }
    function isValidName($name)
    {
        $regex = '/[A-Za-z\- ]*/';
        return preg_match($regex, $name);
    }
        if (preg_match($regex,$name)){
            $_SESSION['name']= $_POST['name'];
    }
        else{
            $_SESSION['errors']['name']="Name needs to be at least two characters";
}
    function isValidCourse($course){
        $regex = '/[ A-Za-z\-0-9]*/';
        return preg_match($regex,$course);
    }
        if (preg_match($regex,$grade)){
            $_SESSION['course']= $_POST['course'];
}
        else{
            $_SESSION['errors']['course']="Course needs to be at least two characters";
}
?>