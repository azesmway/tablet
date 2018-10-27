Ext.application({
    extend: 'Etpgpb.Application',
    name: 'Etpgpb',
    profiles: ['Phone', 'Tablet', 'Desktop'],
    requires: [
        'Etpgpb.*',
        'Ext.Dialog',
        'Ext.plugin.Responsive'
    ]
});
