Ext.define('Etpgpb.view.request.GridModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.requestGrid',

    data: {
        record: null, // Данное "активной" записи грида
        status: []
    },

    stores: {
        requests: {
            type: 'requests',
            autoLoad: true,
            platformConfig: {
                'desktop': {
                    pageSize: 24
                },
                'tablet': {
                    pageSize: 16
                },
                'phone': {
                    pageSize: 16
                }
            },
            filters: [{
                property: 'status',
                value: '{status}',
                operator: '='
            }]
        }
    }
});
