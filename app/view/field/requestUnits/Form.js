Ext.define('Etpgpb.view.field.requestUnits.Form', {
    extend: 'Ext.form.Panel',
    xtype: 'fieldRequestUnitsForm',

    requires: [],

    directoryId: null,
    procedureType: null,

    config: {
        dictionaryNode: null
    },

    initialize: function () {
        var me = this;

        me.add([{
            xtype: 'fieldItemName',
            label: 'Наименование',
            name: 'directory_reference_id',
            directoryId: me.directoryId,
            node: me.getDictionaryNode()
        }, {
            xtype: 'hiddenfield',
            name: 'name'
        }, {
            xtype: 'hiddenfield',
            name: 'dictionary_node'
        }, {
            xtype: 'numberfield',
            label: 'Количество',
            name: 'quantity',
            minValue: 1.0000,
            maxValue: 9999999999.9999
        }, {
            xtype: 'fieldOkeiCombo',
            label: 'Единица измерения',
            name: 'okei_code'
        }, {
            xtype: 'hiddenfield',
            name: 'okei_symbol'
        }, {
            xtype: 'textareafield',
            label: 'Комментарий',
            name: 'technical_requirements',
            minValue: 1,
            maxRows: 2
        }, {
            xtype: 'hiddenfield',
            name: 'okdp_code'
        }, {
            xtype: 'hiddenfield',
            name: 'trademark'
        }]);

        me.callParent();
    },

    setRecord: function (record) {
        var me = this, nameField = me.down('fieldItemName'),
            okeiCodeField = me.getFields('okei_code');

        me.callParent(arguments);

        if (nameField && !record.isPhantom()) {
            nameField.updateOptions([{
                id: record.get('directory_reference_id'),
                name: record.get('name')
            }]);
            nameField.setValue(record.get('directory_reference_id'));
            nameField.setNode(record.get('dictionary_node'));
        }

        if (okeiCodeField && record.get(okeiCodeField.name)) {
            okeiCodeField.setDisabled(true);
        }

    }
});
