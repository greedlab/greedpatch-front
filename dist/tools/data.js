'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.mainMenuData = mainMenuData;

var _cookie = require('./cookie');

var cookie = _interopRequireWildcard(_cookie);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function mainMenuData(ctx) {
    var main_menu = {};
    var user_email = cookie.getUserEmail(ctx);
    if (user_email) {
        main_menu.user_email = user_email;
    }
    var role = cookie.getUserRole(ctx);
    if (role == 1) {
        main_menu.admin = 1;
    }
    return main_menu;
} /**
   * Created by Bell on 16/9/7.
   */
//# sourceMappingURL=data.js.map
