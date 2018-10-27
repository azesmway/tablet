Ext.define('Etpgpb.view.CustomerTile', {
    extend: 'Ext.Component',
    xtype: 'customertile',

    config: {
        name: null,
        contragentName: null,
        logo: '/mobile/Etpgpb/resources/images/logo.png'
    },

    classCls: Ext.baseCSSPrefix + 'customer-tile',
    template: [{
        reference: 'logoElement',
        cls: Ext.baseCSSPrefix + 'customer-tile-logo'
    }, {
        reference: 'nameElement',
        cls: Ext.baseCSSPrefix + 'customer-tile-name'
    }, {
        reference: 'contragentNameElement',
        cls: Ext.baseCSSPrefix + 'customer-tile-contragentName'
    }],

    updateLogo: function (logo) {
        this.logoElement.update('<img src="' + logo + '" alt="logo">');
    },

    updateName: function (name) {
        this.nameElement.update(name);
    },

    updateContragentName: function (role) {
        this.contragentNameElement.update(role);
    }
});
