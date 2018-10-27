Ext.define('Etpgpb.view.request.Grid', {
    extend: 'Ext.grid.Grid',
    xtype: 'requestGrid',

    requires: [
        'Ext.dataview.pullrefresh.PullRefresh',
        'Ext.dataview.plugin.ListPaging',
        'Etpgpb.store.Requests'
    ],

    controller: 'requestGrid',
    viewModel: 'requestGrid',

    header: false,
    emptyText: 'Нет данных',

    plugins: {
        pullrefresh: true,
        listpaging: {
            autoPaging: true,
            bufferZone: 0
        }
    },

    bind: {
        store: '{requests}'
    },

    columns: [{
        text: 'ID',
        sortable: true,
        dataIndex: 'id',
        align: 'left',
        width: 50
    }, {
        text: 'Инициатор',
        sortable: true,
        align: 'left',
        dataIndex: 'user',
        flex: 2,
        minWidth: 150
    }, {
        text: 'Дата создания',
        dataIndex: 'date',
        xtype: 'datecolumn',
        format: 'd.m.Y',
        align: 'left',
        flex: 1,
        minWidth: 130,
        sortable: true
    }, {
        text: 'Статус',
        dataIndex: 'status',
        align: 'left',
        cell: {
            encodeHtml: false,
            renderer: function (value, record) {
                return Etpgpb.util.Format.status(record.get('status'), record.get('reject'))
            }
        },
        flex: 1,
        minWidth: 170,
        sortable: true
    }, {
        text: 'Операции',
        width: 100,
        align: 'center',
        cell: {
            tools: {
                menu: 'onMenu'
            }
        }
    }],

    toolContextMenu: { // used by Controller
        xtype: 'menu',
        anchor: true,
        padding: 10,
        minWidth: 300,
        viewModel: {},
        items: [{
            xtype: 'component',
            indented: false,
            bind: {
                data: '{record}'
            },
            tpl: '<div>' +
            '<div style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Заявка №{id} от {user}</div>' +
            '</div>'
        }, {
            text: 'Просмотреть',
            separator: true,
            margin: '10 0 0',
            iconCls: 'x-fa fa-eye',
            handler: 'onRecordViewClick'
        }, {
            text: 'Редактировать',
            margin: '10 0 0',
            iconCls: 'x-fa fa-edit',
            bind: {
                hidden: '{record.status > 0 || !isUserRequestsCreator}'
            }
        }, {
            text: 'События',
            margin: '10 0 0',
            iconCls: 'x-fa fa-list',
            handler: 'onRecordHistoryClick'
        }, {
            text: 'Удалить',
            margin: '10 0 0',
            iconCls: 'x-fa fa-remove',
            handler: 'onRecordRemoveClick',
            bind: {
                hidden: '{record.status > 0 || !isUserRequestsCreator}'
            }
        }]
    }
});
