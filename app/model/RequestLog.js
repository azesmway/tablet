Ext.define('Etpgpb.model.RequestLog', {
    extend: 'Etpgpb.model.Base',

    fields: [
        {name: 'id', type: 'int'},
        {name: 'status', type: 'int'},
        {name: 'reject', type: 'bool', defaultValue: false},
        {name: 'username', type: 'string'},
        {name: 'date', type: 'date'},
        {name: 'comment', type: 'string'},
        {name: 'department_role_name', type: 'string'},
        {name: 'department_name', type: 'string'},
        {name: 'files', type: 'auto'}
    ]
});
