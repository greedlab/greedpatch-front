'use strict';

/**
 * Created by Bell on 16/9/7.
 */

function deleteMember(project_id, member_id) {
    $.ajax({
        url: back_address + '/projects/' + project_id + '/members/' + member_id,
        type: 'DELETE',
        xhrFields: {
            withCredentials: true
        },
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: function success(data, textStatus) {
            window.location.reload(true);
        },
        error: function error(data, textStatus) {
            console.log(data);
            console.log(textStatus);
            $("#error").text("Delete failed");
        }
    });
}

function deleteProject(project_id, member_id) {
    $.ajax({
        url: back_address + '/projects/' + project_id,
        type: 'DELETE',
        xhrFields: {
            withCredentials: true
        },
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: function success(data, textStatus) {
            window.location.href = "/";
        },
        error: function error(data, textStatus) {
            console.log(data);
            console.log(textStatus);
            $("#error").text("Delete failed");
        }
    });
}
//# sourceMappingURL=project.js.map
