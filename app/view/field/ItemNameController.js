Ext.define('Etpgpb.view.field.ItemNameController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.fieldItemName',

    listen: {
        component: {
            'fieldItemName': {
                focusenter: 'showSheet',
                expand: 'showSheet'
            }
        }
    },

    sheet: null,

    showSheet: function () {
        var me = this, list, store;

        me.getView().collapse();

        if (!me.sheet) {
            store = Ext.create('Etpgpb.store.DirectoryItems', {
                root: {
                    id: me.getView().getConfig('node'),
                    expanded: false
                }
            });

            store.getProxy().setExtraParam('directoryId', me.getView().getConfig('directoryId'));
            store.getProxy().setExtraParam('current', me.getView().getConfig('current'));
            store.getProxy().setExtraParam('form', me.getView().getConfig('form'));

            list = Ext.create('Ext.dataview.NestedList', {
                title: me.getView().getLabel(),
                displayField: 'text',
                store: store,
                listeners: {
                    scope: me,
                    leafchildtap: {
                        delay: 100,
                        fn: 'onLeafChildTap'
                    }
                }
            });

            me.sheet = me.getView().up('requestActionTab').add({
                header: false,
                zIndex: 99,
                xtype: 'sheet',
                items: [list],
                hideOnMaskTap: true,
                enter: 'right',
                exit: 'right',
                right: 0,
                width: 320,
                layout: 'fit',
                stretchY: true,
                hidden: true
            });
        }

        me.sheet.show();
    },

    /**
     * @param nestedlist
     * @param location
     */
    onLeafChildTap: function (nestedlist, location) {
        var me = this, record = location.record,
            form = record.get('form'),
            okeiCodeProperty = me.getView().getOkeiCodeProperty();

        me.sheet.removeAll(true);
        me.sheet.hide();
        me.sheet.destroy();
        me.sheet = null;

        me.getView().updateOptions([{
            id: record.get('id'),
            name: record.get('name')
        }]);

        me.getView().setValue(record.get('id'));
        me.getView().up('formpanel').getFields('name').setValue(record.get('name'));
        me.getView().up('formpanel').getFields('dictionary_node').setValue(record.get('parent_id'));

        if (form && form.values && form.values[okeiCodeProperty]) {
            me.getView().up('formpanel').getFields('okei_code').setValue(form.values[okeiCodeProperty]);
            me.getView().up('formpanel').getFields('okei_code').setDisabled(true);
        }
    }
});
