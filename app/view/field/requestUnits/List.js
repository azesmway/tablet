Ext.define('Etpgpb.view.field.requestUnits.List', {
    extend: 'Ext.dataview.List',
    xtype: 'fieldRequestUnitsList',

    requires: [
        'Etpgpb.ux.list.plugin.Manageable',
        'Etpgpb.view.field.OkeiCombo',
        'Etpgpb.view.field.ItemName'
    ],

    autoSize: true,
    cls: 'request-units-list',
    store: {
        type: 'requestUnits',
        storeId: 'requestUnits'
    },

    config: {
        readOnly: false,
        dictionaryNode: null
    },

    directoryId: null,
    procedureType: null,

    emptyText: 'Нет данных',
    minHeight: 50,

    itemTpl: '<div class="item">' +
    '<p class="name">{name}</p>' +
    '<p class="quantity"><span>Кол-во: {quantity}</span>, <span>Ед. изм.: {okei_symbol}</span></p>' +
    '<p class="comment">{technical_requirements}</p>' +
    '</div>',

    initialize: function () {
        var me = this;

        me.addPlugin({
            type: 'listmanageable',
            triggerEvent: 'childdoubletap',
            enableDeleteButton: true,
            autoDeletePhantom: true,
            createTool: 'requestUnitsAddTool',//TODO: fix it!!!
            formConfig: {
                xtype: 'fieldRequestUnitsForm',
                dictionaryNode: me.getDictionaryNode(),
                directoryId: me.directoryId,
                procedureType: me.procedureType
            },
            toolbarConfig: {
                xtype: 'titlebar',
                docked: 'top',
                items: [{
                    xtype: 'button',
                    iconCls: 'md-icon-arrow-back',
                    text: 'Отмена',
                    align: 'left',
                    action: 'cancel'
                }, {
                    xtype: 'button',
                    iconCls: 'md-icon-done',
                    text: 'Сохранить',
                    align: 'right',
                    action: 'submit'
                }]
            }
        });

        me.setItemConfig({
            cls: 'request-units-list-item',
            tools: [{
                iconCls: 'md-icon-delete',
                hidden: me.getReadOnly(),
                handler: function (tool, info) {
                    var me = this, msg = 'Удалить позицию {0}?';

                    Ext.Msg.show({
                        title: 'Внимание',
                        message: Ext.String.format(msg, info.record.get('name')),
                        buttons: Ext.MessageBox.YESNO,
                        defaultFocus: '#yes',
                        hideOnMaskTap: true,
                        prompt: false,
                        scope: me,
                        fn: function (answer) {
                            if (answer === 'yes') {
                                tool.parent.getStore().remove(info.record);
                            }
                        }
                    });
                }
            }, {
                iconCls: 'md-icon-edit',
                hidden: me.getReadOnly(),
                handler: function (tool, info) {
                    tool.parent.fireEvent('childdoubletap', tool.parent, info)
                }
            }]
        });

        me.callParent(arguments);
    },

    applyDictionaryNode: function (dictionaryNode) {
        var me = this;

        Ext.each(me.getPlugins(), function (plugin) {
            if (plugin.type === 'listmanageable') {
                var formConfig = plugin.getFormConfig();
                formConfig.dictionaryNode = dictionaryNode;
                plugin.setFormConfig(formConfig);
            }
        });

        return dictionaryNode;
    }
});
