var avgGrade = null;
var studentName = undefined;
var course = undefined;
var studentGrade = 0;
var validData = true;
var student_array = [];

$(document).ready(function(){
    student_populate();
    calculateAverage();
});

function clear_all(){
        clear_list();
        $('.avgGrade').text(0);
        avgGrade = 0;
        student_array = [];
        var paras = document.getElementsByClassName('student_row');
        while(paras[0])
        {
            paras[0].parentNode.removeChild(paras[0]);
        }
        console.log("trying to clear")
}

function student_add() {
    studentName = document.getElementById('studentName').value;
    course = document.getElementById('course').value;
    studentGrade = document.getElementById('studentGrade').value;
    console.log("Student:",studentName);
    console.log("Course:", course);
    console.log("Grade:", studentGrade);
    var studentGrade = Number(studentGrade);
    var student = {
        "name": studentName,
        "course": course,
        "grade": studentGrade
    };

    if (validate(studentName, course, studentGrade) == true)
    {
        student_array.push(student); 
        create_new_student(student);
        student_populate();
        addStudentToDom(student);
        calculateAverage();
    }
}

function validate(name,course,grade){
    if(name.length<2)
    {
        $('#studentName').addClass('invalid_input');
        alert('Name must be at least 2 letters long');
        validData=false;
    }
    else if($('#studentName').hasClass('invalid_input'))
    {
        $('#studentName').removeClass('invalid_input');
    }

    if(course.length<2)
    {
        $('#course').addClass('invalid_input');
        alert('Course must be at least 2 letters long');
        validData=false;
    }

    else if($('#course').hasClass('invalid_input'))
    {
        $('#course').removeClass('invalid_input');
    }

    if(isNaN(grade) || grade<0 || grade>100)
    {
        $('#studentGrade').addClass('invalid_input');
        alert('Grade must be a number between 0 and 100');
        validData=false;
    }

    else if($('#studentGrade').hasClass('invalid_input'))
    {
        $('#studentGrade').removeClass('invalid_input');
    }

    return validData;
}

function student_delete(target_element) {
    console.log($(target_element).attr('student_index'));
    var index = $(target_element).attr('index');
    student_array.splice(index, 1);
    $(target_element).parent().remove();
    studentClear();
    updateStudentList();
    calculateAverage();
    delete_student_button(index);
}

function studentClear() {
    $('tbody').html("");
}

function calculateAverage() {
    var sum = 0;
    var count = 0;
    for (var i = 0; i < student_array.length; i++) {

        sum += Number(student_array[i].grade);
        count++;
    }

    var average = sum / count;
    var avgGrade = Math.round(average);
    if (student_array.length === 0) {
        avgGrade = 0;
    }

    $('.avgGrade').text(avgGrade);
    return avgGrade;
}

function student_cancel() {
    document.getElementById('studentName').value = '';
    document.getElementById('course').value = '';
    document.getElementById('studentGrade').value = '';
    studentName = undefined;
    course = undefined;
    studentGrade = 0;
    console.log('cancel working');
    console.log(studentName);
    console.log(course);
    console.log(studentGrade);
}

    function student_populate(button) {
        console.log('Student Populate ran');
        $.ajax({
            dataType: 'json',
            // data: {
            //     api_key: "chercher",
            // },
            // method: "POST",
            // url: "http://s-apis.learningfuze.com/sgt/get",
            url: "populate.php",
            //crossDomain:true,
            //timeout: 3000,
            success: function (result) {
                console.log('AJAX Success student_populate function called, with the following result:',
                    result);
                global_result = result;

                if (result.success == true) {
                    student_array = result.data;
                    updateStudentList();
                    calculateAverage();
                }
            }
            //    else{
            //
            //        alert(result.error[0]);
            //    }
            //
            //},
            //    error: function(jqXHR, exception) {
            //        if (jqXHR.status === 0) {
            //            alert('Not connect.n Verify Network.');
            //        } else if (jqXHR.status == 404) {
            //            alert('Requested page not found. [404]');
            //        } else if (jqXHR.status == 500) {
            //            alert('Internal Server Error [500].');
            //        } else if (exception === 'parsererror') {
            //            alert('Requested JSON parse failed.');
            //        } else if (exception === 'timeout') {
            //            alert('Time out error.');
            //        } else if (exception === 'abort') {
            //            alert('Ajax request aborted.');
            //        } else {
            //            alert('Uncaught Error.n' + jqXHR.responseText);
            //        }
            //}

            //     });
            //};
        });
    }
function create_new_student(student) {
    console.log("Create new student works");
    console.log("STUDENT", student);
    //api_key:the string for my API access
    //student:object that contains all of this student's data
    $.ajax({
        dataType: "json",
        data: {
            //    api_key: "TDDR4ZFpj6",
            name: student.name,
            course: student.course,
            grade: student.grade
            },
            method: "POST",
            url: "create.php",
            success: function (result) {
                console.log('AJAX Success create new student function called, with the following result:', result);
                global_result = result;
                if (result.success == true) {
                    //student_array = result.data;
                    updateStudentList();
                    return result;
                }
                else {
                    console.log(result.error);
                }
            },
            error: function () {
                console.log("error loading data from server")
            }
        })
}

function delete_student_button(index){
    console.log("Delete student_working");
    $.ajax({
        dataType:"json",
        data: {
            //api_key: "TDDR4ZFpj6",
            student_id:index,
        },
        method:"POST",
        url:'http://localhost:8888/lfz/SGT/deletestudent.php',
        crossDomain:true,
        success:function(delete_student_result){
            console.log("AJAX Success create delete student function called, with the following result:", delete_student_result);
            global_result=delete_student_result;
            if(delete_student_result.success===true) {
                student_array = delete_student_result.data;
                updateStudentList();
            }
            else{
                //alert(delete_student_result.error);
            }
        },



    })
}
function updateStudentList() {
    clear_list();
    for (var i = 0; i < student_array.length; i++) {
        addStudentToDom(student_array[i], i);
    }
}

function addStudentToDom(student, studentIndex) {

//create new table row with data shown
    var new_tr = $('<tr>', {
        class: 'student_row'
    });

    var td_name = $('<td>', {
        text: student.name
    });

    var td_course = $('<td>', {
        text: student.course
    });

    var td_grade = $('<td>', {
        text: student.grade
    });

    var td_operation = $('<td>', {
        button: "delete",
        type: "button",
        class: "btn btn-danger",
        text: "Delete",
        student_index: student.id
    });

    td_operation.attr('index', studentIndex);
//st function to be called

    td_operation.click(function () {
        delete_student_button($(this).attr('student_index'));
        student_delete(this);
    });

    $('#deleteAll').click(function(){
        clear_all();
    });
    $(new_tr).append(td_name, td_course, td_grade, td_operation);
    $('tbody').append(new_tr);
}

 function sortGrade() {
    student_array.sort(function (a, b) {
        if (a.grade < b.grade) return -1;
        if (a.grade > b.grade) return 1;
        return 0;
    });
    updateStudentList();
}
function sortGradebottom() {
    student_array.sort(function (a, b) {
        if (a.grade > b.grade) return -1;
        if (a.grade < b.grade) return 1;
        return 0;
    });
    updateStudentList();
}


function sortName(){
    student_array.sort(function (a,b){
        if(a.name < b.name) return-1;
        if(a.name > b.name) return 1;
        return 0;
    });
    updateStudentList();
}
function sortNameZtoA() {
    student_array.sort(function (a, b) {
        if (a.name > b.name) return -1;
        if (a.name < b.name) return 1;
        return 0;
    });
    updateStudentList();
}

function sortCourse(){
    student_array.sort(function(a,b){
        if(a.course < b.course) return -1;
        if(a.course > b.course) return 1;
        return 0;
    });
       updateStudentList();
}
function sortCourseZtoA(){
    student_array.sort(function(a,b){
        if(a.course > b.course) return -1;
        if(a.course < b.course) return 1;
        return 0;
    });
    updateStudentList();
}

function clear_list(){
    $("tbody").html("");
}
