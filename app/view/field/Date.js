Ext.define('Etpgpb.view.field.Date', {
    extend: 'Ext.field.Date',
    xtype: 'fielddate',

    required: true,
    focusable: false,
    editable: false,
    dateFormat: 'd.m.Y',
    picker: 'edge',
    edgePicker: {
        cover: true,
        side: 'bottom',
        useTitles: false,
        height: '100%',
        width: '100%',
        doneButton: 'OK',
        cancelButton: 'Отмена'
    },

    listeners: {
        focusenter: function () {
            this.expand();
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

    parseValue: function (value, errors) {
        if (this.callParent([value, errors]) === null) {
            if (value) {
                value = Ext.Date.format(new Date(value), this.getDateFormat());
            }
            return this.callParent([value, errors]);
        }
    }
});
