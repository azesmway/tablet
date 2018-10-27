Ext.define('Etpgpb.view.request.history.LogList', {
    extend: 'Ext.dataview.List',
    xtype: 'requestHistoryLogList',

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

    cls: 'history-log-list',

    selectable: false,
    itemConfig: {
        cls: 'history-log-list-item'
    },

    itemTpl: '<span class="status-item-circle value_{status}"></span><div class="line-wrap">' +
    '<div class="content">' +
    '<div class="title">{username} <span class="date">{date:date("d M")}</span></div>' +
    '<div class="status">{statusText}</div>' +
    '<div class="department">{department_name}<tpl if="department_role_name"> ({department_role_name})</tpl></div>' +
    '<tpl if="comment"><div class="comment">{comment}</div></tpl>' +
    '<tpl if="files.length"><div class="files"></tpl>' +
    '<tpl for="files">' +
    '<a href="{link}" target="_blank"><span class="x-icon-el x-font-icon md-icon md-icon-attach-file"></span>{description:htmlEncode}</a>' +
    '<tpl if="xindex!=xcount">&nbsp;</tpl>' +
    '</tpl>' +
    '<tpl if="files.length"></div></tpl>' +
    '</div>' +
    '</div>',

    /**
     * @param {Object} data
     * @param {Number} index
     * @param {Etpgpb.model.RequestLog} record
     * @return {Object}
     */
    prepareData: function (data, index, record) {
        data.statusText = Etpgpb.util.Format.status(record.get('status'), record.get('reject'));

        return data;
    }
});
