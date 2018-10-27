Ext.define('Etpgpb.view.request.GridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.requestGrid',

    toolMenu: null,

    control: {
        requestGrid: {
            childlongpress: 'onChildLongPress'
        }
    },

    init: function (grid) {
        var me = this;

        if (Ext.os.is.Desktop) {
            grid.el.on({
                scope: me,
                contextmenu: me.onContextMenu
            });
        }
        me.callParent(arguments);
    },

    destroy: function () {
        var me = this;

        me.toolMenu = Ext.destroy(me.toolMenu);
        me.callParent();
    },

    onChildLongPress: function (grid, location, eOpts) {
        var me = this;

        me.updateMenu(location.record, location.sourceElement, location.event, 'r-l?');
    },

    getMenu: function () {
        var me = this, menu = me.toolMenu, view = me.getView();

        if (!menu) {
            me.toolMenu = menu = Ext.create(Ext.apply({
                ownerCmp: view
            }, view.toolContextMenu));
        }

        return menu;
    },

    updateMenu: function (record, el, e, align) {
        var me = this, menu = me.getMenu();

        me.getViewModel().set('record', record.getData());
        menu.autoFocus = !e.pointerType;
        menu.showBy(el, align);
    },

    onContextMenu: function (e) {
        var me = this, grid = me.getView(),
            target = e.getTarget(grid.itemSelector),
            item;

        if (target) {
            e.stopEvent();

            item = Ext.getCmp(target.id);

            me.updateMenu(item.getRecord(), item.el, e, 't-b?');
        }
    },

    onMenu: function (grid, context) {
        var me = this;

        me.updateMenu(context.record, context.tool.el, context.event, 'r-l?');
    },

    onRecordRemoveClick: function (btn) {
        var me = this, msg = 'Вы уверены, что хотите удалить <b>заявку №{0}</b> от {1}?',
            record = me.getViewModel().getData().record,
            dparams = {mask: true, wait_text: 'Удаление запроса...'},
            store = me.getView().getStore(),
            recordIndex = store.indexOfId(record.id);

        Ext.Msg.show({
            title: 'Внимание',
            message: Ext.String.format(msg, record.id, record.user),
            buttons: Ext.MessageBox.YESNO,
            defaultFocus: '#yes',
            hideOnMaskTap: true,
            prompt: false,
            scope: me,
            fn: function (answer) {
                if (answer === 'yes') {
                    performRPCCall(RPC.Procedurerequest.remove, [{id: record.id}], dparams, function (response) {
                        if (response.success === true) {
                            store.removeAt(recordIndex, 1);
                        } else {
                            echoResponseMessage(response);
                        }
                    });
                }
            }
        });
    },

    onRecordViewClick: function (btn) {
        var me = this,
            record = me.getViewModel().getData().record;

        me.redirectTo('request/view/' + record.id);
    },

    onRecordHistoryClick: function (btn) {
        var me = this,
            record = me.getViewModel().getData().record;

        me.redirectTo('request/history/' + record.id);
    }
});
