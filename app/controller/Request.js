Ext.define('Etpgpb.controller.Request', {
    extend: 'Ext.app.Controller',

    routes: {
        'request/:cmd/:id': {
            before: 'onRequestCmdBefore',
            action: 'onRequestCmd',
            conditions: {
                ':id': '([0-9]+)'
            }
        }
    },

    responseData: null,
    rpcByCmd: null,

    finishInit: function () {
        var me = this;

        me.rpcByCmd = {
            view: RPC.Procedurerequest.load,
            new: RPC.Procedurerequest.load,
            edit: RPC.Procedurerequest.load,
            history: RPC.Procedurerequest.info
        };

        me.callParent(arguments);
    },


    /**
     * @param {String} cmd
     * @param {Object} params
     * @param {Function} callback
     */
    loadCmdData: function (cmd, params, callback) {
        var me = this,
            dparams = {mask: true, wait_text: 'Loading...', scope: me},
            rpc = me.rpcByCmd[cmd] || null;

        if (!rpc) {
            callback.call(me, {success: false, message: 'Unknown RPC method for command "' + cmd + '".'});
        } else {
            performRPCCall(rpc, [params], dparams, function (response) {
                callback.call(me, response);
            });
        }
    },

    onRequestCmdBefore: function (cmd, id, action) {
        var me = this, params = {id: id};

        me.loadCmdData(cmd, params, function (response) {
            if (response && response.success === true) {
                me.responseData = response;
                action.resume();
            } else {
                action.stop();
                echoResponseMessage(response, function () {
                    me.redirectTo(me.getApplication().getConfig('defaultToken'));
                });
            }
        });
    },

    /**
     * @param {string} cmd Действие над заявкой
     * @param {Number} id Идентификатор заявки
     */
    onRequestCmd: function (cmd, id) {
        var me = this, viewName = 'Etpgpb.view.request.' + cmd + '.Panel',
            mainView = me.getApplication().getMainView(),
            tab = mainView.down('#requestActionTab'),
            view;

        if (Ext.ClassManager.get(viewName) === undefined) {
            return me.fireEvent('error', 'error', '<h1>Ошибка 404!</h1><br><h2>Страница не существует!</h2>');
        }

        view = Ext.create(viewName, {});
        view.getViewModel().set('responseData', me.responseData);

        tab.removeAll(true);
        tab.add(view);
        view.addTool(tab.defaultTools);

        mainView.setActiveItem(tab, true);
    }
});
