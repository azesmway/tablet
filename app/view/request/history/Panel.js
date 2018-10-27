Ext.define('Etpgpb.view.request.history.Panel', {
    extend: 'Ext.Panel',
    xtype: 'requestHistoryPanel',

    requires: [
        'Ext.field.Display'
    ],

    controller: 'requestHistoryPanel',
    viewModel: 'requestHistoryPanel',

    bind: {
        title: 'События по заявке №{responseData.data.id}'
    },
    titleAlign: 'left',
    scrollable: true,
    layout: {
        type: 'vbox'
    },

    tools: [{
        docked: 'right',
        margin: '0 10px 0 0',
        itemId: 'requestInfoToggleTool',
        bind: {
            iconCls: '{requestInfoVisible == true ? "x-fa fa-eye-slash" : "x-fa fa-eye"}'
        }
    }],

    items: [{
        xtype: 'container',
        autoSize: true,
        padding: '5 10 5 10',
        itemId: 'requestInfo',
        showAnimation: 'fadeIn',
        hideAnimation: 'fadeOut',
        cls: Ext.baseCSSPrefix + 'request-history-info',
        bind: {
            hidden: '{!requestInfoVisible}',
            html: '<p class="username"><span class="x-icon-el x-font-icon md-icon md-icon-person"></span>{responseData.data.user}</p>' +
            '<p class="status"><span class="status-item-circle value_{responseData.data.status}"></span>{getStatus}</p>' +
            '<p class="days"><span class="x-icon-el x-font-icon md-icon md-icon-access-time"></span>{getDays}</p>'
        }
    }, {
        xtype: 'requestHistoryLogGrid',
        plugins: {
            responsive: true
        },
        responsiveConfig: {
            'width < 1024 && tall': {
                hidden: true
            },
            'width >= 1024': {
                hidden: false
            }
        },
        flex: 1
    }, {
        xtype: 'requestHistoryLogList',
        plugins: {
            responsive: true
        },
        responsiveConfig: {
            'width < 1024 && tall': {
                hidden: false
            },
            'width >= 1024': {
                hidden: true
            }
        },
        flex: 1
    }]
});
