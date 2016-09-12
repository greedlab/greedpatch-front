/**
 * Created by Bell on 16/9/1.
 */

function updatePatchVersion() {
    const versions_string = $('#versions-string').text();
    const versions = JSON.parse(versions_string);
    const project_version = $('#project-version').val();
    let patch_version = 1;
    for (let version of versions) {
        if (version._id == project_version) {
            patch_version = Number(version.patch_version) + 1;
            break;
        }
    }
    $('#patch-version').val(patch_version);
}

function uploadFile() {
    let formData = new FormData();
    formData.append('file', $('#patch-file')[0].files[0]);

    $.ajax({
        url: back_address + '/files' ,
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
