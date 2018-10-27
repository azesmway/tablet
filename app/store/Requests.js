Ext.define('Etpgpb.store.Requests', {
    extend: 'Ext.data.Store',
    alias: 'store.requests',
    model: 'Etpgpb.model.Request',

    autoLoad: false,
    autoDestroy: true,
    idProperty: 'id',
    pageSize: 16,
    remoteSort: true,
    remoteFilter: true,
    sorters: [{
        property: 'id',
        direction: 'DESC'
    }],
    proxy: {
        type: 'direct',
        directFn: 'RPC.Procedurerequest.list',
        // sends single sort as multi parameter
        simpleSortMode: true,
        extraParams: {
            dir: 'DESC',
            sort: 'id',
            limit: 16
        },
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'totalCount'
        }
    }
});
