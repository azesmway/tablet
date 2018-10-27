Ext.define('Etpgpb.controller.Error', {
    extend: 'Ext.app.Controller',

    listen: {
        controller: {
            '*': {
                error: 'onError'
            }
        }
    },

    config: {
        icon: {
            error: 'x-fa fa-exclamation-circle',
            notFound: 'x-fa fa-exclamation-triangle'
        },
        title: {
            error: 'Ошибка',
            notFound: 'Ошибка'
        }
    },

    /**
     * @param {String} title
     * @param {String} msg
     * @param {String} iconCls
     */
    showDialog: function (title, msg, iconCls) {
        var me = this, dialog;

        dialog = Ext.create({
            xtype: 'dialog',
            title: title,
            maximizable: true,
            html: msg,
            iconCls: iconCls,
            buttons: {
                ok: function () {
                    dialog.destroy();
                    me.redirectTo(me.getApplication().getConfig('defaultToken'));
                }
            }
        });
        dialog.show();
    },

    /**
     * @param {String} type
     * @param {String} msg
     * @param {String} title
     */
    onError: function (type, msg, title) {
        var me = this;

        title = title || me.getConfig('title')[type];
        me.showDialog(title, msg, me.getConfig('icon')[type]);
    }
});
