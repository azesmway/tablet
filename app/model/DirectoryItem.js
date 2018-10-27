Ext.define('Etpgpb.model.DirectoryItem', {
    extend: 'Etpgpb.model.Base',

    fields: [
        {name: 'directory_id', type: 'int'},
        {name: 'contragent_id', type: 'int'},
        {name: 'parent_id', type: 'int'},
        {name: 'name', type: 'string'},
        {name: 'weight', type: 'int'},
        {name: 'path', type: 'auto'},
        {name: 'form', type: 'auto'}
    ]
});
