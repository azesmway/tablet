Ext.define('Etpgpb.view.field.SupplyObjectCombo', {
    extend: 'Ext.field.ComboBox',
    xtype: 'fieldSupplyObjectCombo',

    config: {
        name: 'etp_supply_object',
        directoryId: null,
        current: false,
        node: null,
        valueNotFoundText: 'Value not found'
    },

    valueField: 'id',
    displayField: 'name',
    queryMode: 'local',
    required: true,
    editable: false,
    readOnly: false,
    focusable: false,
    clearable: true,
    forceSelection: true,
    picker: 'edge',
    edgePicker: {
        xtype: 'combopicker',
        doneButton: {
            xtype: 'button',
            iconCls: 'md-icon-done',
            text: false
        },
        cancelButton: {
            xtype: 'button',
            align: 'left',
            iconCls: 'md-icon-arrow-back',
            text: false
        },
        toolbar: {
            xtype: 'titlebar',
            title: 'Выбор объекта поставки'
        },
        slot: {
            xtype: 'combopickerslot',
            itemTpl: '{name}'
        },
        enableSearch: {
            xtype: 'searchfield',
            placeholder: 'Поиск'
        }
    },
    store: {
        type: 'directoryItems'
    },

    listeners: {
        expand: function () {
            var me = this;

            if (!me.getStore().getRoot().expanded) {
                me.getStore().getRoot().expand();
            }
        }
    },

    onInputElementClick: function (e) {
        var me = this;

        me.expand();

        Ext.defer(function () {
            if (!me.expanded) {
                me.expand();
            }
        }, 300);
    },

    applyDirectoryId: function (directoryId) {
        var me = this, proxy = me.getStore().getProxy();

        proxy.setExtraParam('directoryId', directoryId);
    },

    applyCurrent: function (current) {
        var me = this, proxy = me.getStore().getProxy();

        proxy.setExtraParam('current', current);
    },

    applyNode: function (node) {
        var me = this, proxy = me.getStore().getProxy();

        proxy.setExtraParam('node', node);
    },

    applyValue: function (value) {
        var me = this;

        if (!Ext.isEmpty(value) && typeof value === 'string') {
            value = parseInt(value);
        }

        if (!me.getReadOnly()) {
            me.callParent(arguments);
        }

        /**
         * Загружаются все позиции, по ид смысла нет грузить.
         * me.setCurrent(true);
         * me.setNode(value);
         */


        if (!me.getStore().isLoaded()) {
            me.getStore().load(function (records) {
                if (records.length > 0) {
                    Ext.each(records, function (record) {
                        if (record.get('id') === value) {
                            me.setInputValue(record.get('name'));
                            return false;
                        }
                    });
                } else {
                    me.setInputValue(me.getValueNotFoundText() || '');
                }
            });
        }

        return value;
    },

    getValue: function () {
        var me = this, value = me.callParent(arguments);

        if (value && value.get) {
            return value.get('id');
        }

        return value;
    }
});
