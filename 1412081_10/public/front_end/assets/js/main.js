var HOST_API = 'http://localhost:3000';

var student_rows_template = Handlebars.compile($("#student-rows-template").html());
var student_form_template = Handlebars.compile($("#modal-content-template").html());

$(document).ready(update_student_list);

function update_student_list() {
    $.get(HOST_API + '/api/student', function (response) {
        if (response.status === 1){
            var html = student_rows_template({students: response.data});
            $('#student-list').html(html);
        }
        else {
            alert(response.errors);
        }
    })
}

$('#add-student-btn').click(function () {
    var html = student_form_template({
        action: 'insert',
        id: '',
        code: '',
        name: '',
        email: '',
        score: ''
    });

    $('#modal-content').html(html);

    $('#myModal').modal('show');
});

$('body').on('click', '.update-student-btn', function () {
    $.get(HOST_API + "/api/student/" + $(this).data('id'), function (response) {
        if (response.status == 1){
            var data = response.data;
            data.action = 'update';
            var html = student_form_template(data);
            $('#modal-content').html(html);

            $('#myModal').modal('show');
        }
        else {
            alert(response.errors);
        }
    })
});

$('body').on('click', '.delete-student-btn', function () {

    var confirm = window.confirm("Are you sure?");
    if (!confirm)
        return false;

    var url = HOST_API + "/api/student/" + $(this).data('id');
    var this_obj = $(this);
    $.ajax({
        url: url,
        method: 'DELETE',
    }).done(function (response) {
        if (response.status === 1){
            this_obj.closest('tr').fadeOut('slow');
        }
        else {
            alert(response.errors)
        }
    })
});

$('#modal-submit-btn').click(function () {
    if ($('#action').val() === 'insert'){
        var data = {
            'code': $('#student-id').val(),
            'name': $('#student-name').val(),
            'email': $('#student-email').val(),
            'score': $('#student-score').val(),
        };

        var url = HOST_API + "/api/student";

        $.post(url, data, function (response) {
            if (response.status === 1){
                update_student_list();
                $('#myModal').modal('hide');
            }
            else {
                alert(response.errors);
            }
        })
    }
    else { // is update action

    }
});

