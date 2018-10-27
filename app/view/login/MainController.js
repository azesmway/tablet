Ext.define('Etpgpb.view.login.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.loginMain',

    control: {
        textfield: {
            keyup: 'onFieldKeyUp'
        },
        passwordfield: {
            keyup: 'onFieldKeyUp'
        }
    },

    /**
     *
     * @param {Ext.field.Field} field
     * @param {Ext.event.Event} e
     */
    onFieldKeyUp: function (field, e) {
        if (e && e.getKey() === e.ENTER) {
            this.doLogin();
        }
    },

    /**
     * @param {Ext.Button} btn
     */
    onLoginBtnClick: function (btn) {
        this.doLogin();
    },

    doLogin: function () {
        var me = this,
            form = me.lookupReference('loginForm'),
            values = form.getValues(),
            login = values.login,
            password = values.password,
            params = [login, password, {
                'lock_ip': false,
                'come_from_marker': false
            }],
            dparams = {
                mask: true,
                wait_text: 'Загрузка привилегий...',
                mask_el: me.getView()
            };

        if (!form.validate()) {
            return;
        }

        performRPCCall(RPC.Authentication.login, params, dparams, function (result) {
            if (result.success === true) {
                Main.reloadPrivileges().then(function () {
                    // Если нет ролей "Уполномоченный на создание заявки" или "Уполномоченный на согласование процедуры"
                    // отправляем на основную площадку
                    if (Main.user.roles.indexOf(USER_ROLE_GUEST) === -1
                        && Main.user.roles.indexOf(USER_ROLE_REQUESTS_CREATOR) === -1
                        && Main.user.roles.indexOf(USER_ROLE_REQUESTS_APPROVE_USER) === -1) {

                        performRPCCall(RPC.Index.switchToFullMode, [], null, function (resp) {
                            window.location = "/";
                        });
                        return;
                    }

                    me.fireEvent('loggedin', Main.user);
                });
                localStorage.setItem("EtpgpbLoggedIn", '1');
            } else {
                echoResponseMessage(result, function () {
                    me.getView().down('[name="login"]').focus();
                });
            }
        });
    }
});
