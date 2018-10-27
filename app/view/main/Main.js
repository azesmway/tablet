Ext.define('Etpgpb.view.main.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'mainMain',

    requires: [
        'Ext.Img',
        'Ext.menu.Menu',
        'Ext.tab.Panel',
        'Ext.Panel',
        'Ext.ActionSheet',
        'Ext.Toolbar',
        'Ext.MessageBox',
        'Ext.layout.Fit',
        'Ext.menu.CheckItem',
        'Etpgpb.view.request.List',
        'Etpgpb.view.request.Grid',
        'Etpgpb.view.CustomerTile',
        'Etpgpb.view.FixedButton',
        'Etpgpb.view.request.StatusSelect',
        'Etpgpb.view.request.ActionTab',
        'Etpgpb.ux.SearchField'
    ],

    controller: 'mainMain',
    viewModel: 'mainMain',

    tabBar: {
        docked: 'bottom',
        defaults: {
            iconAlign: 'top'
        }
    },

    defaults: {
        scrollable: true,
        layout: 'fit'
    },

    items: [{
        iconCls: 'md-icon-list',
        hidden: true,
        route: 'home',
        items: [{
            xtype: 'requestList',
            itemId: 'requestList'
        }]
    }, {
        xtype: 'requestActionTab',
        hidden: true
    }, {
        xtype: 'toolbar',
        docked: 'top',
        scrollable: false,
        cls: 'main-toolbar',
        itemId: 'searchToolbar',
        hidden: true,
        plugins: {
            responsive: true
        },
        responsiveConfig: {
            'height < 800': {
                height: 50
            },
            'height >= 800': {
                height: 70
            }
        },
        layout: {
            pack: 'left'
        },
        items: [{
            width: 30,
            margin: '0 0 0 10px',
            iconCls: 'md-icon-arrow-back',
            xtype: 'button',
            handler: 'onBackBtnClick'
        }, {
            xtype: 'searchfield',
            itemId: 'searchField',
            flex: 1,
            paramName: 'search',
            margin: '0 14px 0 0',
            ui: 'alt',
            placeholder: 'Search'
        }]
    }, {
        xtype: 'toolbar',
        docked: 'top',
        scrollable: false,
        bind: {
            hidden: '{currentRoute == "home" ? 0 : 1}'
        },
        cls: 'main-toolbar',
        itemId: 'mainToolbar',
        plugins: {
            responsive: true
        },
        responsiveConfig: {
            'height < 800': {
                height: 50
            },
            'height >= 800': {
                height: 70
            }
        },
        layout: {
            pack: 'left'
        },
        items: [{
            width: 30,
            margin: '0 0 0 10px',
            iconCls: 'md-icon-menu',
            xtype: 'button',
            handler: 'toggleMenu'
        }, {
            xtype: 'requestStatusSelect',
            label: false,
            flex: 1,
            margin: '0 10px'
        }, {
            arrow: false,
            width: 30,
            margin: '0 10px 0 0',
            iconCls: 'md-icon-search',
            itemId: 'searchBtn',
            handler: 'onSearchBtnClick',
            xtype: 'button'
        }]
    }, {
        xtype: 'fixedbutton',
        iconCls: 'md-icon-add',
        stateKey: 'fixedbutton-add',
        handler: 'onFixedButtonClick',
        bind: {
            hidden: '{currentRoute != "home" || !isUserRequestsCreator}'
        }
    }],

    /**
     * @param {Object|String|Number} item
     * @param {Boolean} show Отобразить компонент после установки активного таба?
     */
    setActiveItem: function (item, show) {
        var me = this;

        me.callParent(arguments);

        if (show === true && me.isHidden()) {
            me.show();
        }
    }
});
