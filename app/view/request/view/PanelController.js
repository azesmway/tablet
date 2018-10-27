Ext.define('Etpgpb.view.request.view.PanelController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.requestViewPanel',

    control: {
        '#moreTool': {
            click: 'onMoreToolClick'
        }
    },

    onMoreToolClick: function (tool, e, owner, eOpts) {
        var me = this,
            requestList = Etpgpb.getApplication().getMainView().down('requestList');

        requestList.getController().toggleMenu(me.getViewModel().get('responseData.data'));
    }
});
