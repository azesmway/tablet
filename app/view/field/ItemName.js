Ext.define('Etpgpb.view.field.ItemName', {
    extend: 'Ext.field.Select',
    xtype: 'fieldItemName',
    requires: [
        'Etpgpb.view.field.ItemNameController',
        'Ext.Sheet'
    ],

    controller: 'fieldItemName',

    config: {
        value: null,
        directoryId: null,
        current: null,
        node: null,
        form: true,

        okeiCodeProperty: 'etp_okei_code'
    },

    valueField: 'id',
    displayField: 'name',
    options: [],

    editable: false,
    focusable: false,

    initialize: function () {
        var me = this;

        me.callParent();

        me.inputElement.on('click', 'showSheet', me.controller);
    }
});
