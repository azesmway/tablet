Ext.define('Etpgpb.view.request.new.Panel', {
    extend: 'Ext.form.Panel',
    xtype: 'requestNewPanel',

    requires: [
        'Ext.field.Display'
    ],

    mixins: [
        'Etpgpb.mixins.FormNormalizer',
        'Gpb.form.builder.mixins.FormBuilder'
    ],

    controller: 'requestNewPanel',
    viewModel: 'requestNewPanel',

    bind: {
        title: 'Новая заявка'
    },

    titleAlign: 'left',

    padding: 0,

    tools: [{
        docked: 'right',
        margin: '0 10px 0 0',
        iconCls: 'md-icon-done',
        handler: 'onSaveToolClick',
        bind: {
            disabled: '{!isValid}'
        }
    }],

    scrollable: true,
    scrollbars: false,

    onRender: function () {
        var me = this, formData = me.getViewModel().get('responseData.form'),
            formItems;

        formData = me.normalizeFormData(formData);
        formItems = me.buildFormConfig(formData.blocks, formData.fields, formData.values);
        me.add(formItems);

        me.callParent(arguments);

        // We sync the enabled state of the submit button with form validity
        me.on({
            change: 'onFieldChange',
            delegate: 'field',
            scope: me.getController()
        });
    }
});
