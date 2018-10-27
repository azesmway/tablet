Ext.define('Etpgpb.view.request.ListModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.requestList',

    data: {
        record: null, // Данное "активной" записи грида
        status: [],
        search: null
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
            }, {
                property: 'search',
                value: '{search}',
                operator: '='
            }]
        }
    }
});
