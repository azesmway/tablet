Ext.define('Etpgpb.controller.Main', {
    extend: 'Ext.app.Controller',

    routes: {
        '*': {
            before: 'onBeforeRoutes'
        },
        'login': 'onLoginRoute',
        ':route': 'onRoute'
    },

    listen: {
        controller: {
            loginMain: {
                loggedin: 'onLoggedIn'
            }
        }
    },

    /**
     * Запрошенный роут
     *
     * @cfg {String}
     */
    requestedToken: null,

    init: function () {
        var me = this;

        if (Ext.util.History.getToken() && Ext.util.History.getToken() !== me.getApplication().loginToken) {
            me.requestedToken = Ext.util.History.getToken();
        } else {
            me.requestedToken = me.getApplication().getConfig('defaultToken');
        }

        Ext.util.History.on('change', function (token) {
            Ext.Viewport.getViewModel() && Ext.Viewport.getViewModel().set('currentRoute', token);
        }, me);

        me.callParent(arguments);
    },

    /**
     * @param {object} user @see Main.user
     */
    onLoggedIn: function (user) {
        var me = this, mainView;

        Ext.Viewport.removeAll(true, true);
        me.getApplication().setMainView('Etpgpb.view.main.Main');
        mainView = me.getApplication().getMainView();
        Ext.Viewport.add(mainView);

        mainView.getViewModel().set('user', user);
        mainView.getViewModel().set('contragent', Main.contragent);

        if (me.requestedToken !== me.getApplication().getConfig('defaultToken')) {
            me.getApplication().getMainView().hide();
        }

        Ext.Viewport.setViewModel({
            type: 'viewport'
        });

        Ext.Viewport.getViewModel().set('currentRoute', me.requestedToken);
        me.redirectTo(me.requestedToken);
    },

    onBeforeRoutes: function (action) {
        var me = this;

        if (me.getApplication().initEtpgpb !== true) {
            onInitEtpgp().then(function () {
                me.getApplication().initEtpgpb = true;
                if (me.getApplication().isLoggedIn()) {
                    me.onLoggedIn(Main.user);
                    action.resume();
                } else {
                    if (location.hash !== '#login') {
                        action.stop();
                        me.redirectTo(me.getApplication().loginToken);
                    } else {
                        action.resume();
                    }
                }
            });
        } else {
            action.resume();
        }
    },

    onLoginRoute: function () {
        var me = this;

        if (me.getApplication().isLoggedIn()) {
            me.redirectTo(me.getApplication().getConfig('defaultToken'));
        } else {
            Ext.Viewport.removeAll(true, true);
            me.getApplication().setMainView('Etpgpb.view.login.Main');
            Ext.Viewport.add(me.getApplication().getMainView());
        }
    },

    /**
     * @param {String} hash
     */
    onRoute: function (hash) {
        var me = this, view = me.getApplication().getMainView();

        if (!me.getApplication().isLoggedIn()) {
            me.redirectTo(me.getApplication().loginToken);
        } else {
            var item = view.down('[route="' + hash + '"]');
            if (item) {
                view.suspendEvent('beforeactiveItemchange');
                view.setActiveItem(item, true);
                view.resumeEvent('beforeactiveItemchange');
            } else {
                //me.redirectTo(me.getApplication().getConfig('defaultToken'));
                return me.fireEvent('error', 'notFound', '<h1>Ошибка 404!</h1><br><h2>Страница #(' + hash + ') не существует!</h2>');
            }
        }
    }
});
