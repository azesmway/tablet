Ext.define('Etpgpb.store.OkeiCombo', {
    extend: 'Ext.data.DirectStore',
    alias: 'store.okeiCombo',

    fields: [
        'id', {name: 'code', type: 'string'}, 'name'
    ],

    autoLoad: true,
    autoDestroy: true,
    idProperty: 'id',
    root: 'rows',
    pageSize: null,
    remoteSort: true,
    remoteFilter: true,
    sorters: {
        property: 'symbol',
        direction: 'ASC'
    },
    proxy: {
        type: 'direct',
        directFn: 'RPC.Reference.list',
        // sends single sort as multi parameter
        simpleSortMode: true,
        // Do not attempt to load orders inline.
        // They are loaded through the proxy
        implicitIncludes: true,
        reader: {
            type: 'json',
            rootProperty: 'rows',
            totalProperty: 'totalCount'
        }
    },

    listeners: {
        /**
         * @param {Etpgpb.store.OkeiCombo} store
         * @return {boolean}
         */
        beforeload: function (store) {
            var proxy = store.getProxy();

            proxy.setExtraParam('table', 'list');
            proxy.setExtraParam('reftype', 'Okei');
            proxy.setExtraParam('idfield', 'code');
            proxy.setExtraParam('namefield', 'symbol');
            proxy.setExtraParam('notempty', true);

            return true;
        }
    }
});
