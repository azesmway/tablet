Ext.define('Gpb.form.builder.mixins.FormBuilder', {
    extend: 'Ext.Mixin',
    requires: [
        'Ext.field.*'
    ],

    buildFormConfig: function (blocks, fields, values, readOnly) {
        var me = this, cfg = [], blockCfg, fieldCfg;

        readOnly = readOnly === true;

        Ext.each(blocks, function (block) {
            blockCfg = {
                itemId: 'block-' + block.id,
                blockId: block.id,
                xtype: block.xtype,
                title: block.title,
                items: []
            };

            Ext.each(fields, function (field) {
                if (block.id !== field.block_id) {
                    return true;
                }
                fieldCfg = {
                    itemId: 'field-' + field.id,
                    blockId: block.id,
                    fieldId: field.id,
                    xtype: field.xtype,
                    label: field.pseudo,
                    clearable: true,
                    editable: !readOnly,
                    disabled: readOnly,
                    readOnly: readOnly
                };

                if (!Ext.isEmpty(field.name)) {
                    fieldCfg.name = field.name;
                }
                Ext.apply(fieldCfg, field.field_properties);

                if (!Ext.isEmpty(fieldCfg.name) && !Ext.isEmpty(values[fieldCfg.name])) {
                    fieldCfg.value = values[fieldCfg.name];
                }

                blockCfg.items.push(fieldCfg);
            });

            cfg.push(blockCfg);
        });

        return cfg;
    }
});
