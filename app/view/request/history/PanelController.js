Ext.define('Etpgpb.view.request.history.PanelController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.requestHistoryPanel',

    control: {
        '#requestInfoToggleTool': {
            click: 'onRequestInfoToggleToolClick'
        }
    },

    onRequestInfoToggleToolClick: function (tool, e, owner, eOpts) {
        var me = this;

        me.getViewModel().set('requestInfoVisible', !me.getViewModel().get('requestInfoVisible'));
    }
});
