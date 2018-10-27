Ext.define('Etpgpb.mixins.FormNormalizer', {
    extend: 'Ext.Mixin',
    requires: [],

    /**
     * @param {Object} data
     * @returns {*}
     */
    normalizeFormData: function (data) {
        var me = this;

        Ext.each(data.blocks, function (block) {
            switch (block.xtype) {
                case "fieldset":
                    block.xtype = "fieldset";
                    break;
                //no default
            }
        });

        Ext.each(data.fields, function (field) {
            switch (field.xtype) {
                case "Application.components.dateField":
                    field.xtype = "fielddate";
                    break;
                case "Application.components.SupplyObjectCombo":
                    field.xtype = "fieldSupplyObjectCombo";
                    field.name = "etp_supply_object";
                    break;
                case "Application.components.RequestUnits2UnitsEdit":
                    field.xtype = "fieldRequestUnits";
                    field.name = "etp_lot_units";
                    break;
                case "textarea":
                    field.xtype = "textareafield";
                    break;
                default:
                    field.xtype = "textfield";
            }
        });

        return data;
    }
});
