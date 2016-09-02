/**
 * Created by Bell on 16/8/17.
 */

export function validUsername(input) {
    if (!input) {
        return false;
    }
    const patrn=/^([a-zA-Z0-9]|[_]){3,20}$/;
    return patrn.test(input);
}

export function validPassword(input) {
    if (!input) {
        return false;
    }
    const patrn=/^([a-zA-Z0-9]|[_]){6,20}$/;
    return patrn.test(input);
}
