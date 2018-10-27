Ext.define('Etpgpb.store.RequestLogs', {
    extend: 'Ext.data.Store',
    alias: 'store.requestLogs',
    model: 'Etpgpb.model.RequestLog',

    autoLoad: false,
    autoDestroy: true,
    idProperty: 'id',
    totalProperty: 'totalCount',
    pageSize: null,
    remoteSort: true,
    remoteFilter: true,
    proxy: {
        type: 'direct',
        directFn: 'RPC.Procedurerequest.logList',
        // sends single sort as multi parameter
        simpleSortMode: true,
        // Do not attempt to load orders inline.
        // They are loaded through the proxy
        implicitIncludes: false,
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'totalCount'
        }
    }
});
