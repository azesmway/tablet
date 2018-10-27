Ext.define('Etpgpb.model.Request', {
    extend: 'Etpgpb.model.Base',

    fields: [
        {name: 'id', type: 'int'},
        {name: 'status', type: 'int'},
        {name: 'reject', type: 'bool', defaultValue: false},
        {name: 'contragent_id', type: 'int'},
        {name: 'user_id', type: 'int'},
        {name: 'user', type: 'string'},
        {name: 'date', type: 'date'},
        {name: 'supply_object', type: 'string'},
        {name: 'department', type: 'int'},
        {name: 'department_role_id', type: 'int'},
        {name: 'procedure_id', type: 'int'}
    ]
});
