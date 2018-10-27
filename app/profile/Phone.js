Ext.define('Etpgpb.profile.Phone', {
    extend: 'Ext.app.Profile',

    isActive: function () {
        return Ext.os.is.Phone;
    },

    launch: function () {
        console.log('Launch Phone');

        this.callParent(arguments);
    }
});
