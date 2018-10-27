Ext.define('Etpgpb.view.request.edit.PanelController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.requestEditPanel',

    privates: {
        firstChanged: true
    },

    onFieldChange: function (field, value) {
        var me = this;

        me.getViewModel().set('isValid', me.getView().isValid() && !me.firstChanged);

        if (me.firstChanged === true) {
            me.firstChanged = false;
        }
    },

    onSaveToolClick: function () {
        var me = this, form = me.getView(), record,
            values = form.getValues(), fieldRequestUnits = form.down('fieldRequestUnits'),
            dparams = {mask: true, wait_text: 'Loading...'},
            requestList = Etpgpb.getApplication().getMainView().down('requestList');

        values.etp_lot_units = fieldRequestUnits.getUnits();

        values.id = me.getViewModel().get('responseData.data.id');

        performRPCCall(RPC.Procedurerequest.save, [values], dparams, function (response) {
            if (response.success === true) {
                record = requestList.getStore().getById(response.data.id);
                if (record) {
                    record.set(response.data);
                }
                Ext.util.History.on('change', function (token) {
                    me.redirectTo('request/view/' + record.get('id'));
                }, me);
                Ext.util.History.back();
            } else {
                echoResponseMessage(response);
            }
        });
    }
});
