Ext.define('Etpgpb.ux.SearchField', {
    extend: 'Ext.field.Search',
    alias: 'widget.searchfield',

    clearable: true,
    triggers: {
        search: {
            weight: 1,
            cls: Ext.baseCSSPrefix + 'form-search-trigger',
            scope: 'this',
            handler: 'onSearchClick'
        }
    },

    doKeyUp: function (field, e) {
        var me = this;

        me.callParent(arguments);

        if (e.browserEvent.keyCode === 13) {
            me.fireEvent('search', me, e);
        }
    },

    onSearchClick: function (btn, e) {
        var me = this;

        me.fireEvent('search', me, e);
    }
});
