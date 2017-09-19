var HOST_API = 'http://localhost:3000';

var student_rows_template = Handlebars.compile($("#student-rows-template").html());
var student_form_template = Handlebars.compile($("#modal-content-template").html());
var alert_template = Handlebars.compile($("#alert-template").html());

$(document).ready(update_student_list);

function update_student_list() {
    $.get(HOST_API + '/api/student', function (response) {
        if (response.status === 1){
            var html = student_rows_template({students: response.data});
            $('#student-list').html(html);
        }
        else {
            response.errors.forEach(function (error, index) {
                push_alert("danger", "Fail", error);
            })
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
            data.id = $(this).data('id');
            var html = student_form_template(data);
            $('#modal-content').html(html);

            $('#myModal').modal('show');
        }
        else {
            response.errors.forEach(function (error, index) {
                push_alert("danger", "Fail", error);
            })
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
            this_obj.closest('tr').fadeOut('slow', function () {
                push_alert("success", 'Success', "");
            });
        }
        else {
            response.errors.forEach(function (error, index) {
                push_alert("danger", "Fail", error);
            })
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
                push_alert("success", 'Success', "");
            }
            else {
                response.errors.forEach(function (error, index) {
                    push_alert("danger", "Fail", error);
                });
                $('#myModal').modal('hide');
            }
        })
    }
    else { // is update action
        var data = {
            'code': $('#student-id').val(),
            'name': $('#student-name').val(),
            'email': $('#student-email').val(),
            'score': $('#student-score').val(),
        };

        var url = HOST_API + "/api/student/" + $('#id').val();
        $.ajax({
            url: url,
            data: data,
            method: 'PUT'
        }).done(function (response) {
            if (response.status === 1){
                update_student_list();
                $('#myModal').modal('hide');
                push_alert("success", 'Success', "");
            }
            else {
                response.errors.forEach(function (error, index) {
                    push_alert("danger", "Fail", error);
                })
                $('#myModal').modal('hide');
            }
        });
    }
});

function push_alert(status, title, content) {
    var id = Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);

    var html = alert_template({
        id: id,
        status: status,
        title: title,
        content: content
    })

    $('#alert').append(html);

    $('#alert-' + id).fadeTo(2000, 500).slideUp(500, function(){
        $('#alert-' + id).slideUp(500, function () {
            $('#alert-' + id).remove();
        });
    });
}