Ext.define('Etpgpb.view.request.ActionTab', {
    extend: 'Ext.Panel',
    xtype: 'requestActionTab',

    title: 'Request action tab',
    itemId: 'requestActionTab',
    items: [],
    defaults: {
        titleAlign: 'left'
    },

    defaultTools: [{
        iconCls: 'md-icon-arrow-back',
        docked: 'left',
        handler: function () {
            Ext.util.History.back();
        }
    }]
});
