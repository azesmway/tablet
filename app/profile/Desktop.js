Ext.define('Etpgpb.profile.Desktop', {
    extend: 'Ext.app.Profile',

    isActive: function () {
        return Ext.os.is.Desktop;
    },

    launch: function () {
        console.log('Launch Desktop');

        this.callParent(arguments);
    }
});
