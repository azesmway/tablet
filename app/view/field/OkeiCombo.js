Ext.define('Etpgpb.view.field.OkeiCombo', {
    extend: 'Ext.field.ComboBox',
    xtype: 'fieldOkeiCombo',

    valueField: 'code',
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
            title: 'Выбор единицы измерения'
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
        type: 'okeiCombo'
    },

    listeners: {
        select: function (combo, newValue, oldValue) {
            combo.up('formpanel').getFields('okei_symbol').setValue(newValue.get('name'));
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
    }
});
