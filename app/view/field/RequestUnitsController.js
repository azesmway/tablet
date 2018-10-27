Ext.define('Etpgpb.view.field.RequestUnitsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.fieldRequestUnits',

    listen: {
        store: {
            '#requestUnits': {
                datachanged: 'onRequestUnitsStoreDataChanged'
            }
        }
    },

    onRequestUnitsStoreDataChanged: function (store) {
        var me = this, list = me.getView().down('#unitsList');

        if (store.getCount() > 0) {
            store.each(function (record) {
                if (!record.isPhantom()) {
                    list.setDictionaryNode(record.get('dictionary_node'));

                    return false;
                }
            });
        } else {
            list.setDictionaryNode(null);
        }
    }
});
