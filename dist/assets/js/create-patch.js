'use strict';

/**
 * Created by Bell on 16/9/1.
 */

function updatePatchVersion() {
    var versions_string = $('#versions-string').text();
    var versions = JSON.parse(versions_string);
    var project_version = $('#project-version').val();
    var patch_version = 1;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = versions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var version = _step.value;

            if (version._id == project_version) {
                patch_version = Number(version.patch_version) + 1;
                break;
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    $('#patch-version').val(patch_version);
}

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
