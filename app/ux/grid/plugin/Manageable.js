Ext.define('Etpgpb.ux.grid.plugin.Manageable', {
    extend: 'Ext.grid.plugin.Editable',
    alias: 'plugin.gridmanageable',

    config: {
        createTool: null
    },

    originalEnableDeleteButton: null,

    updateGrid: function (grid, oldGrid) {
        var me = this, tool;

        me.callParent(arguments);

        if (me.getConfig('createTool')) {
            grid.on('painted', function () {
                tool = Ext.getCmp(me.getConfig('createTool'));
                tool.on('click', 'onCreateToolClick', me);

            }, me, {single: true, delay: 500});
        }
    },

    onCreateToolClick: function () {
        var me = this, rec,
            grid = me.getGrid(),
            store = grid.getStore();

        rec = store.getModel().create();
        store.add(rec);

        me.originalEnableDeleteButton = me.getEnableDeleteButton();
        me.setEnableDeleteButton(false);

        me.onTrigger(grid, {
            record: rec,
            row: store.indexOf(rec) + 1
        });
    },

    onTrigger: function (grid, location) {
        var me = this;

        me.callParent(arguments);

        me.sheet.setWidth('80%');
    },

    onCancelTap: function () {
        var me = this, rec = me.form.getRecord();

        me.setEnableDeleteButton(me.originalEnableDeleteButton);

        if (rec.isPhantom()) {
            me.getGrid().getStore().remove(rec);
        }

        me.callParent(arguments);
    },

    onSubmitTap: function () {
        var me = this;

        if (me.getGrid().fireEvent('beforesubmit', me) !== false) {
            me.callParent(arguments);
        }
    }
});
