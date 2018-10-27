Ext.define('Etpgpb.view.request.history.LogGrid', {
    extend: 'Ext.grid.Grid',
    xtype: 'requestHistoryLogGrid',

    requires: [
        'Etpgpb.store.RequestLogs',
        'Ext.dataview.plugin.ListPaging',
        'Ext.dataview.pullrefresh.PullRefresh'
    ],

    emptyText: 'Нет данных',
    border: 1,

    bind: {
        store: '{requestLogs}'
    },

    plugins: {
        listpaging: {
            autoPaging: true,
            bufferZone: 8
        },
        pullrefresh: {
            mergeData: false
        }
    },

    columns: [{
        text: 'ID',
        sortable: true,
        width: 60,
        minWidth: 50,
        dataIndex: 'id'
    }, {
        text: 'Инициатор',
        sortable: true,
        width: 100,
        dataIndex: 'username'
    }, {
        text: 'Подразделение (роль)',
        sortable: true,
        width: 200,
        renderer: function (value, record) {
            return Etpgpb.util.Format.department(record.get('department_name'), record.get('department_role_name'))
        }
    }, {
        xtype: 'datecolumn',
        text: 'Дата создания',
        dataIndex: 'date',
        format: 'd.m.Y',
        width: 120,
        sortable: true
    }, {
        text: 'Статус',
        dataIndex: 'status',
        width: 150,
        sortable: true,
        cell: {
            encodeHtml: false,
            renderer: function (value, record) {
                return Etpgpb.util.Format.status(record.get('status'), record.get('reject'))
            }
        }
    }, {
        text: 'Комментарий',
        dataIndex: 'comment',
        width: 120,
        sortable: true
    }, {
        text: 'Файлы',
        dataIndex: 'files',
        sortable: true,
        width: 100,
        cell: {
            encodeHtml: false,
            tpl: '<tpl for="files">' +
            '<a href="{link}">{description:htmlEncode}</a>' +
            '<tpl if="xindex!=xcount">,<br></tpl>' +
            '</tpl>'
        }
    }]
});
