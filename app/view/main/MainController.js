Ext.define('Etpgpb.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mainMain',

    control: {
        mainMain: {
            beforeactiveItemchange: 'onBeforeActiveItemChange',
            painted: {
                fn: 'onPainted',
                single: true
            }
        },
        requestStatusSelect: {
            select: 'onStatusSelect'
        },
        '#searchToolbar > #searchField': {
            clearicontap: 'onClearIconTap',
            search: 'onSearch'
        }
    },

    mainMenu: null,
    mainMenuSide: 'left',

    initViewModel: function () {
        var me = this;

        me.callParent(arguments);

        Ext.util.History.on('change', function (token) {
            me.getViewModel().set('currentRoute', token);
        }, me);
        me.getViewModel().set('currentRoute', Ext.util.History.getToken());
    },

    destroy: function () {
        var me = this;

        Ext.destroyMembers(me, 'mainMenu', 'mainMenuSide');

        me.callParent();
    },

    onPainted: function () {
        var me = this, side = me.mainMenuSide;

        me.mainMenu = Ext.Viewport.setMenu(me.getMainMenuCfg(side), {
            side: side,
            reveal: false,
            cover: true
        });
    },

    onBeforeActiveItemChange: function (tabPanel, newTab, oldTab, eOpts) {
        var me = this;

        if (newTab.route) {
            me.redirectTo(newTab.route);

            return false;
        }

        return true;
    },

    onStatusSelect: function (select, status) {
        var me = this;

        me.getView().down('#requestList').getViewModel().set('status', status.get('value'));
    },

    getMainMenuCfg: function (side) {
        var me = this, vm = me.getViewModel();
        var cfg = {
            side: side,
            cls: 'leftMenu',
            items: [{
                xtype: 'customertile',
                name: vm.get('user.full_name'),
                contragentName: vm.get('contragent.short_name')
            }, {
                text: 'Полная версия',
                iconCls: 'md-icon-desktop-windows',
                scope: me,
                handler: 'onFullModeBtnClick'
            }, {
                text: 'Выход',
                iconCls: 'md-icon-power-settings-new',
                separator: true,
                scope: me,
                handler: 'onLogoutClick'
            }]
        };

        if (side === 'left' || side === 'right') {
            cfg.width = '80%';
            cfg.maxWidth = 400;
        }

        return cfg;
    },

    toggleMenu: function () {
        var me = this,
            side = me.mainMenuSide;

        Ext.Viewport.setMenu(me.mainMenu, {
            side: side
        });

        Ext.Viewport.toggleMenu(side);
    },

    /**
     * @param {Ext.Button} btn
     */
    onFullModeBtnClick: function (btn) {
        var me = this;

        btn.disable();

        Ext.Msg.show({
            title: 'Внимание',
            message: 'Хотите перейти на полную версию сайта?',
            buttons: Ext.MessageBox.YESNO,
            defaultFocus: '#yes',
            hideOnMaskTap: true,
            prompt: false,
            scope: me,
            fn: function (answer) {
                if (answer === 'yes') {
                    performRPCCall(RPC.Index.switchToFullMode, [], null, function (resp) {
                        window.location = "/";
                    });
                }
                btn.enable();
            }
        });
    },

    /**
     * @param {Ext.Button} btn
     */
    onLogoutClick: function (btn) {
        Ext.Viewport.hideMenu(this.mainMenuSide);
        Etpgpb.getApplication().logout();
    },

    onFixedButtonClick: function () {
        this.redirectTo('request/new/0');
    },

    onSearchBtnClick: function (btn) {
        var me = this;

        me.getView().down('#mainToolbar').hide();
        me.getView().down('#searchToolbar').show();
        me.getView().down('#searchToolbar').down('searchfield').focus();
    },

    onBackBtnClick: function (btn) {
        var me = this;

        me.getView().down('#searchToolbar').down('searchfield').clearValue();
        me.getView().down('#requestList').getViewModel().set('search', null);

        me.getView().down('#mainToolbar').show();
        me.getView().down('#searchToolbar').hide();
    },

    onClearIconTap: function () {
        var me = this;

        me.getView().down('#requestList').getViewModel().set('search', null);
    },

    /**
     * @param {Etpgpb.ux.SearchField} field
     */
    onSearch: function (field) {
        var me = this;

        me.getView().down('#requestList').getViewModel().set('search', field.getValue());
    }
});
