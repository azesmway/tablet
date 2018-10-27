Ext.define('Etpgpb.profile.Tablet', {
    extend: 'Ext.app.Profile',

    isActive: function () {
        return Ext.os.is.Tablet;
    },

    launch: function () {
        console.log('Launch Tablet');

        this.callParent(arguments);
    }
});
