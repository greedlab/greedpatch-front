"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validUsername = validUsername;
exports.validPassword = validPassword;
/**
 * Created by Bell on 16/8/17.
 */

function validUsername(input) {
    if (!input) {
        return false;
    }
    var patrn = /^([a-zA-Z0-9]|[_]){3,20}$/;
    return patrn.test(input);
}

function validPassword(input) {
    if (!input) {
        return false;
    }
    var patrn = /^([a-zA-Z0-9]|[_]){6,20}$/;
    return patrn.test(input);
}
//# sourceMappingURL=string.js.map
