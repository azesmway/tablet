Ext.define('Etpgpb.view.request.view.Panel', {
    extend: 'Ext.form.Panel',
    xtype: 'requestViewPanel',

    requires: [
        'Ext.field.Display'
    ],

    mixins: [
        'Etpgpb.mixins.FormNormalizer',
        'Gpb.form.builder.mixins.FormBuilder'
    ],

    controller: 'requestViewPanel',
    viewModel: 'requestViewPanel',

    bind: {
        title: 'Просмотр заявки №{responseData.data.id}'
    },
    titleAlign: 'left',
    scrollable: true,
    layout: {
        type: 'vbox'
    },
    padding: 0,

    tools: [{
        docked: 'right',
        margin: '0 10px 0 0',
        itemId: 'moreTool',
        iconCls: 'md-icon-more-vert'
    }],

    items: [{
        xtype: 'container',
        autoSize: true,
        padding: '5 10 5 10',
        itemId: 'requestInfo',
        showAnimation: 'fadeIn',
        hideAnimation: 'fadeOut',
        cls: Ext.baseCSSPrefix + 'request-history-info',
        bind: {
            hidden: '{!requestInfoVisible}',
            html: '<p class="username"><span class="x-icon-el x-font-icon md-icon md-icon-person"></span>{responseData.data.user}</p>' +
            '<p class="status"><span class="status-item-circle value_{responseData.data.status}"></span>{getStatus}</p>' +
            '<p class="days"><span class="x-icon-el x-font-icon md-icon md-icon-access-time"></span>{getDays}</p>'
        }
    }, {
        xtype: 'container',
        itemId: 'form',
        autoSize: true
    }],

    onRender: function () {
        var me = this, formData = me.getViewModel().get('responseData.form'),
            formItems;

        formData = me.normalizeFormData(formData);
        formItems = me.buildFormConfig(formData.blocks, formData.fields, formData.values, true);
        me.down('#form').add(formItems);

        me.callParent(arguments);
    }
});
