/**
 * Created by Bell on 16/9/1.
 */

function showProjectVersionsSelect() {
    let dom = document.getElementById('project_versions_select');
    dom.removeAttribute('hidden');
}

function hideProjectVersionsSelect() {
    let dom = document.getElementById('project_versions_select');
    dom.hidden = "hidden";
}

function projectVersionsSelected() {

}

function uploadFile() {
    var formData = new FormData();
    formData.append('file', $('#patch-file')[0].files[0]);
    $.ajax({
        url: 'http://localhost:4002/files' ,
        type: 'POST',
        data: formData,
        xhrFields: {
            withCredentials: true
        },
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: function (data, textStatus) {
            $("#patch-url").attr("value", data.file_url);
        },
        error: function (data, textStatus) {
            $("#upload-error").text("upload failed");
        }
    });
}
