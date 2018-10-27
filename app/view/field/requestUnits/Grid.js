Ext.define('Etpgpb.view.field.requestUnits.Grid', {
    extend: 'Ext.grid.Grid',
    xtype: 'fieldRequestUnitsGrid',

    requires: [
        'Etpgpb.ux.grid.plugin.Manageable',
        'Etpgpb.view.field.OkeiCombo',
        'Etpgpb.view.field.ItemName'
    ],

    height: 300,
    plugins: {
        gridmanageable: {
            triggerEvent: 'childdoubletap',
            enableDeleteButton: true,
            createTool: 'requestUnitsAddTool',//TODO: fix it!!!
            formConfig: null,

            defaultFormConfig: {
                xtype: 'formpanel',
                itemId: 'asdasdad',
                scrollable: true,
                items: [{
                    xtype: 'fieldset'
                }, {
                    xtype: 'textfield',
                    name: 'name_text'
                }, {
                    xtype: 'textfield',
                    name: 'okei_symbol'
                }]
            },

            toolbarConfig: {
                xtype: 'titlebar',
                docked: 'top',
                items: [{
                    xtype: 'button',
                    ui: 'decline',
                    text: 'Cancel',
                    align: 'left',
                    action: 'cancel'
                }, {
                    xtype: 'button',
                    ui: 'confirm',
                    text: 'Submit',
                    align: 'right',
                    action: 'submit'
                }]
            }
        }
    },
    store: {
        type: 'requestUnits'
    }
});
