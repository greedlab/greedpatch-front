'use strict';

/**
 * Created by Bell on 16/9/1.
 */

function showProjectVersionsSelect() {
    var dom = document.getElementById('project_versions_select');
    dom.removeAttribute('hidden');
}

function hideProjectVersionsSelect() {
    var dom = document.getElementById('project_versions_select');
    dom.hidden = "hidden";
}

function projectVersionsSelected() {}

function uploadFile() {
    var formData = new FormData();
    formData.append('file', $('#patch-file')[0].files[0]);

    $.ajax({
        url: front_address + '/files',
        type: 'POST',
        data: formData,
        xhrFields: {
            withCredentials: true
        },
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: function success(data, textStatus) {
            $("#patch-url").attr("value", data.file_url);
        },
        error: function error(data, textStatus) {
            $("#upload-error").text("upload failed");
        }
    });
}
//# sourceMappingURL=create-patch.js.map
