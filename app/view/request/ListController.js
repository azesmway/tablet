Ext.define('Etpgpb.view.request.ListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.requestList',

    control: {
        requestList: {
            childsingletap: 'onChildSingleTap',
            childdoubletap: 'onChildDoubleTap',
            childlongpress: 'onChildLongPress'
        }
    },

    itemMenu: null,
    itemMenuSide: 'bottom',

    init: function (list) {
        var me = this, side = me.itemMenuSide;

        if (Ext.os.is.Desktop) {
            list.el.on({
                scope: me,
                contextmenu: me.onContextMenu
            });
        }

        me.itemMenu = Ext.Viewport.setMenu(me.getMenuCfg(side), {
            side: side,
            reveal: false,
            cover: true
        });

        me.itemMenu.on('hide', 'onItemMenuHide', me);

        me.callParent(arguments);
    },

    destroy: function () {
        var me = this;

        Ext.destroyMembers(me, 'itemMenu', 'itemMenuSide');

        me.callParent();
    },

    onItemMenuHide: function () {
        this.getView().resumeEvent('childsingletap');
    },

    onContextMenu: function (e) {
        var me = this, list = me.getView(),
            target = e.getTarget(list.itemSelector),
            item;

        if (target) {
            e.stopEvent();

            item = Ext.getCmp(target.id);

            me.toggleMenu(item.getRecord());
        }
    },

    onChildSingleTap: function (list, info) {
        if (info.sourceElement.type === "button") {
            return false;
        }

        this.doView(info.record);
    },

    onChildDoubleTap: function (list, info) {
        this.toggleMenu(info.record);
    },

    onChildLongPress: function (list, info) {
        this.getView().suspendEvent('childsingletap');
        this.toggleMenu(info.record);
    },

    onEdit: function (list, info) {
        this.doEdit(info.record);
    },

    onHistory: function (list, info) {
        this.doHistory(info.record);
    },

    onDelete: function (list, info) {
        this.doDelete(info.record);
    },

    onRecordViewClick: function () {
        var me = this,
            record = me.getView().getStore().getById(me.itemMenu.getViewModel().get('record.id'));

        Ext.Viewport.hideMenu(me.itemMenuSide);

        me.doView(record);
    },

    onRecordEditClick: function () {
        var me = this,
            record = me.getView().getStore().getById(me.itemMenu.getViewModel().get('record.id'));

        Ext.Viewport.hideMenu(me.itemMenuSide);

        me.doEdit(record);
    },

    onRecordSendClick: function () {
        var me = this,
            record = me.getView().getStore().getById(me.itemMenu.getViewModel().get('record.id'));

        Ext.Viewport.hideMenu(me.itemMenuSide);

        me.doChangeStatus(record);
    },

    onRecordApproveClick: function () {
        var me = this,
            record = me.getView().getStore().getById(me.itemMenu.getViewModel().get('record.id'));

        Ext.Viewport.hideMenu(me.itemMenuSide);

        me.doChangeStatus(record);
    },

    onRecordRejectClick: function () {
        var me = this,
            record = me.getView().getStore().getById(me.itemMenu.getViewModel().get('record.id'));

        Ext.Viewport.hideMenu(me.itemMenuSide);

        me.doReject(record);
    },

    onRecordDoneClick: function () {
        var me = this;

        Ext.Viewport.hideMenu(me.itemMenuSide);

        Ext.Msg.alert('Внимание', 'Создание процедуры возможно только через полную версию площадки.');
    },

    onRecordHistoryClick: function () {
        var me = this,
            record = me.getView().getStore().getById(me.itemMenu.getViewModel().get('record.id'));

        Ext.Viewport.hideMenu(me.itemMenuSide);

        me.doHistory(record);
    },

    onRecordDeleteClick: function () {
        var me = this, msg = 'Вы уверены, что хотите удалить <b>заявку №{0}</b> от {1}?',
            record = me.getView().getStore().getById(me.itemMenu.getViewModel().get('record.id'));

        Ext.Msg.show({
            title: 'Внимание',
            message: Ext.String.format(msg, record.get('id'), record.get('user')),
            buttons: Ext.MessageBox.YESNO,
            defaultFocus: '#yes',
            hideOnMaskTap: true,
            prompt: false,
            scope: me,
            fn: function (answer) {
                if (answer === 'yes') {
                    Ext.Viewport.hideMenu(me.itemMenuSide);
                    me.doDelete(record);
                }
            }
        });
    },

    onRecordBackClick: function () {
        Ext.Viewport.hideMenu(this.itemMenuSide);
    },

    getMenuCfg: function (side) {
        var me = this, cfg;

        cfg = Ext.apply(me.getView().itemMenuCfg, {
            defaults: {
                scope: me
            },
            side: side
        });

        return cfg;
    },

    toggleMenu: function (record) {
        var me = this, side = me.itemMenuSide;

        me.itemMenu.getViewModel().set('record', record);

        Ext.Viewport.setMenu(me.itemMenu, {
            side: side
        });

        Ext.Viewport.toggleMenu(side);
    },

    doView: function (record) {
        this.getView().select(record);
        this.redirectTo('request/view/' + record.get('id'));
    },

    doEdit: function (record) {
        this.redirectTo('request/edit/' + record.get('id'));
    },

    doHistory: function (record) {
        this.redirectTo('request/history/' + record.get('id'));
    },

    doDelete: function (record) {
        var me = this, store = me.getView().getStore(),
            dparams = {mask: true, wait_text: 'Удаление запроса...'};

        performRPCCall(RPC.Procedurerequest.remove, [{id: record.get('id')}], dparams, function (response) {
            if (response.success === true) {
                store.remove(record);
                me.redirectTo('home');
            } else {
                echoResponseMessage(response);
            }
        });
    },

    doChangeStatus: function (record) {
        var me = this, store = me.getView().getStore(),
            dparams = {mask: true, wait_text: 'Loading...'};

        performRPCCall(RPC.Procedurerequest.changeStatus, [{id: record.get('id')}], dparams, function (response) {
            if (response.success === true) {
                me.redirectTo('home');
                store.reload();
            } else {
                echoResponseMessage(response);
            }
        });
    },

    doReject: function (record) {
        var me = this, dparams = {mask: true, wait_text: 'Loading...'};

        console.log('doReject');

        /*performRPCCall(RPC.Procedurerequest.changeStatus, [{id: record.get('id')}], dparams, function (response) {
            if (response.success === true) {
                me.redirectTo('home');
            } else {
                echoResponseMessage(response);
            }
        });*/
    }
});
