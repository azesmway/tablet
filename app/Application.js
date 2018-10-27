Ext.define('Etpgpb.Application', {
    extend: 'Ext.app.Application',
    name: 'Etpgpb',
    quickTips: false,
    platformConfig: {
        desktop: {
            quickTips: true
        }
    },

    defaultToken: 'home',
    loginToken: 'login',
    initEtpgpb: false,

    controllers: [
        'Etpgpb.controller.Error',
        'Etpgpb.controller.Main',
        'Etpgpb.controller.Request'
    ],

    models: [
        'Etpgpb.model.Request',
        'Etpgpb.model.RequestLog'
    ],

    stores: [
        'Etpgpb.store.Requests',
        'Etpgpb.store.RequestLogs'
    ],

    loading: true,

    launch: function () {
        var me = this;

        Ext.util.Format.defaultDateFormat = 'd.m.Y';

        Ext.direct.Manager.addProvider(Ext.REMOTING_API);

        Ext.Ajax.autoAbort = true;
        Ext.Ajax.on('beforerequest', 'onAjaxBeforeRequest', me);
        Ext.Ajax.on('requestcomplete', 'onAjaxComplete', me);
        Ext.Ajax.on('requestexception', 'onAjaxComplete', me);
    },

    onAjaxBeforeRequest: function (conn, options) {
        var me = this;

        if (me.loading) {
            Ext.fly('loader').destroy();
            me.loading = false;
        }

        return true;
    },

    onAjaxComplete: function (conn, response) {
        this.checkSessionExpired(response);
    },

    checkSessionExpired: function (response) {
        var me = this, data = Ext.JSON.decode(response.responseText, true);

        if (data.result.no_session === true) {
            me.logout();
        }
    },

    onAppUpdate: function () {
        Ext.Msg.confirm('Обновление приложения', 'Приложение обновлено, хотите перезагрузить его?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload(true);
                }
            }
        );
    },

    isLoggedIn: function () {
        return localStorage.getItem("EtpgpbLoggedIn") === '1';
    },

    logout: function () {
        var me = this;
        RPC.Authentication.logout(null, function (provider, response) {
            localStorage.setItem("EtpgpbLoggedIn", '0');
            clearCookies();
            Main.reloadPrivileges().then(function () {
                me.redirectTo(me.loginToken);
            });
        });
    }
});
