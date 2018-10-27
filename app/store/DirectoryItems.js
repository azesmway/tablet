Ext.define('Etpgpb.store.DirectoryItems', {
    extend: 'Ext.data.TreeStore',
    alias: 'store.directoryItems',
    model: 'Etpgpb.model.DirectoryItem',

    autoLoad: false,
    autoDestroy: true,
    idProperty: 'id',
    totalProperty: 'totalCount',
    pageSize: null,
    remoteSort: true,
    remoteFilter: true,
    defaultRootProperty: 'children',
    root: {
        id: 0,
        expanded: true
    },
    rootVisible: false,
    proxy: {
        type: 'direct',
        directFn: 'RPC.Directory.getTreeDirectoriesCombo',
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
    },

    listeners: {
        beforeload: function () {
            var me = this, proxy = me.getProxy();

            return !!proxy.getExtraParams().directoryId;
        }
    }
});
