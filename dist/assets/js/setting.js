'use strict';

/**
 * Created by Bell on 16/9/8.
 */

function deleteToken(token_id) {
    $.ajax({
        url: back_address + '/tokens/' + token_id,
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

function copyNewToken() {
    copyToClipboard(document.getElementById("token-value"));
}
//# sourceMappingURL=setting.js.map
