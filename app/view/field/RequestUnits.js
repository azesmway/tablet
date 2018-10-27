Ext.define('Etpgpb.view.field.RequestUnits', {
    extend: 'Ext.Panel',
    xtype: 'fieldRequestUnits',
    requires: [
        'Etpgpb.view.field.requestUnits.Grid',
        'Etpgpb.view.field.requestUnits.List',
        'Etpgpb.view.field.requestUnits.Form'
    ],

    controller: 'fieldRequestUnits',

    title: 'Добавленные позиции',
    layout: 'fit',

    config: {
        value: null,
        readOnly: false,
        name: 'etp_lot_units',
        dictionaryId: null,
        procedureType: null
    },

    initialize: function () {
        var me = this;

        me.add([{
            xtype: 'fieldRequestUnitsList',
            itemId: 'unitsList',
            directoryId: me.getConfig('dictionaryId'),
            procedureType: me.getConfig('procedureType'),
            readOnly: me.getReadOnly()
        }]);

        me.setTools([{
            type: 'plus',
            hidden: me.getReadOnly(),
            id: 'requestUnitsAddTool' // TODO: fix it!!!
        }]);

        me.callParent(arguments);
    },

    getUnits: function () {
        var me = this, list = me.down('#unitsList'),
            units = [], unit;

        list.getStore().each(function (record) {
            unit = record.getData();
            unit.number = units.length + 1;
            units.push(unit);
        });

        return units;
    },

    applyValue: function (value) {
        if (!Ext.isEmpty(value) && typeof value === 'string') {
            value = Ext.JSON.decode(value, true);
        }

        if (Ext.isArray(value)) {
            Ext.each(value, function (rec) {
                if (!rec.id) {
                    rec.id = Ext.id(rec, "extModel-");
                }
            });
        }

        return value;
    },

    updateValue: function (value) {
        this.doSetUnits(value);
    },

    doSetUnits: function (units) {
        var me = this, list = me.down('#unitsList');

        if (!list) {
            Ext.defer(function () {
                me.doSetUnits(units);
            }, 100);
            return false;
        }

        if (Ext.isArray(units)) {
            list.getStore().setData(units);
        }

        return true;
    }
});
