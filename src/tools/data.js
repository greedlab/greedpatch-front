/**
 * Created by Bell on 16/9/7.
 */

import * as cookie from './cookie';

export function mainMenuData(ctx) {
    let main_menu = {};
    const user_email = cookie.getUserEmail(ctx);
    if (user_email) {
        main_menu.user_email = user_email;
    }
    const role = cookie.getUserRole(ctx);
    if (role == 1) {
        main_menu.admin = 1;
    }
    return main_menu;
}
