/**
 * Created by Bell on 16/9/23.
 */

function updateUserStatus(userId, status) {
    $.ajax({
        url: back_address + '/users/' + userId + '/status',
        type: 'POST',
        xhrFields: {
            withCredentials: true
        },
        async: false,
        cache: false,
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({status: status}),
        processData: false,
        success: function (data, textStatus) {
            window.location.reload(true);
        },
        error: function (data, textStatus) {
            console.log(data);
            console.log(textStatus);
            $("#error").text("Disable user failed");
        }
    });
}

function disableUser(userId) {
    updateUserStatus(userId, 1);
}

function activeUser(userId) {
    updateUserStatus(userId, 0);
}

function modifyPassword(userId) {

}

function updateProjectStatus(projectId, status) {
    $.ajax({
        url: back_address + '/projects/' + projectId + '/status',
        type: 'POST',
        xhrFields: {
            withCredentials: true
        },
        async: false,
        cache: false,
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({status: status}),
        processData: false,
        success: function (data, textStatus) {
            window.location.reload(true);
        },
        error: function (data, textStatus) {
            console.log(data);
            console.log(textStatus);
            $("#error").text("Delete project failed");
        }
    });
}

function deleteProject(projectId) {
    updateProjectStatus(projectId, 1);
}

function recoverProject(projectId) {
    updateProjectStatus(projectId, 0);
}
