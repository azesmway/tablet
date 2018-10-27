Ext.define('Etpgpb.view.login.Form', {
    extend: 'Ext.form.Panel',
    xtype: 'loginForm',

    requires: [
        'Ext.form.Panel',
        'Ext.field.Text',
        'Ext.field.Password',
        'Ext.Button'
    ],

    title: 'Вход в систему',

    bodyPadding: 10,
    autoSize: true,

    items: [{
        xtype: 'textfield',
        name: 'login',
        label: 'Имя пользователя',
        placeholder: 'Имя пользователя',
        allowBlank: false,
        required: true
    }, {
        xtype: 'passwordfield',
        name: 'password',
        label: 'Пароль',
        placeholder: 'Пароль',
        allowBlank: false,
        required: true
    }],

    buttons: [{
        xtype: 'button',
        text: 'Войти',
        ui: 'action',
        formBind: true,
        handler: 'onLoginBtnClick'
    }]
});
