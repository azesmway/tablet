Ext.define('Etpgpb.ux.list.plugin.Manageable', {
    extend: 'Ext.plugin.Abstract',
    alias: 'plugin.listmanageable',

    requires: [
        'Ext.form.FieldSet',
        'Ext.form.Panel',
        'Ext.Sheet',
        'Ext.TitleBar'
    ],

    config: {
        createTool: null,
        list: null,

        /**
         * @cfg {String} triggerEvent
         * The event used to trigger the showing of the editor form. This event should
         * be an event that is fired by the list.
         */
        triggerEvent: 'childdoubletap',

        /**
         * @cfg {Object} formConfig
         */
        formConfig: null,

        /**
         * @cfg {Object} toolbarConfig
         * Configures the toolbar appended to the editable panel.
         */
        toolbarConfig: {
            xtype: 'titlebar',
            docked: 'top',
            items: [{
                xtype: 'button',
                ui: 'alt',
                text: 'Cancel',
                align: 'left',
                action: 'cancel'
            }, {
                xtype: 'button',
                ui: 'alt',
                text: 'Submit',
                align: 'right',
                action: 'submit'
            }]
        },

        /**
         * @cfg {Boolean} enableDeleteButton
         * Creates a delete button, which allows the user to delete the selected row.
         */
        enableDeleteButton: true,

        autoDeletePhantom: true
    },

    init: function (list) {
        this.setList(list);

        list.setTouchAction({
            doubleTapZoom: false
        });
    },

    destroy: function () {
        this.cleanup();
        this.callParent();
    },

    updateList: function (list, oldList) {
        var me = this, tool,
            triggerEvent = this.getTriggerEvent();

        if (oldList) {
            oldList.un(triggerEvent, 'onTrigger', me);
        }

        if (list) {
            if (!list.getReadOnly()) {
                list.on(triggerEvent, 'onTrigger', me);

                if (me.getConfig('createTool')) {
                    list.on({
                        painted: {
                            single: true,
                            fn: function () {
                                tool = Ext.getCmp(me.getConfig('createTool'));
                                tool.on('click', 'onCreateToolClick', me);

                            }
                        }
                    });
                }
            }
        }
    },

    onCreateToolClick: function () {
        var me = this, rec,
            list = me.getList(),
            store = list.getStore();

        rec = store.getModel().create();
        store.add(rec);

        me.originalEnableDeleteButton = me.getEnableDeleteButton();
        me.setEnableDeleteButton(false);

        me.onTrigger(list, {
            record: rec,
            recordIndex: store.indexOf(rec) + 1
        });
    },

    onCancelTap: function () {
        var me = this, rec = me.form.getRecord();

        me.setEnableDeleteButton(me.originalEnableDeleteButton);

        if (me.getAutoDeletePhantom() && rec.isPhantom()) {
            me.getList().getStore().remove(rec);
        }

        me.sheet.hide();
    },

    onSubmitTap: function () {
        var me = this;

        me.setEnableDeleteButton(me.originalEnableDeleteButton);

        if (me.getList().fireEvent('beforesubmit', me) !== false) {
            me.form.getRecord().set(me.form.getValues());
            me.form.getRecord().commit();
            me.sheet.hide();
        }
    },

    onSheetHide: function () {
        this.cleanup();
    },

    onTrigger: function (list, location) {
        var me = this,
            record = location.record,
            formConfig = me.getFormConfig(),
            toolbarConfig = me.getToolbarConfig(),
            form, sheet, toolbar;

        if (!record) {
            return;
        }

        if (Ext.isEmpty(formConfig)) {
            Ext.log({
                level: 'error',
                dump: me,
                stack: true,
                indent: 1
            }, '>> Etpgpb.ux.list.plugin.Manageable.config.formConfig must be set.');

            return;
        }

        if (!formConfig.xtype) {
            formConfig.xtype = 'formpanel';
        }

        me.form = form = Ext.create(formConfig);

        toolbar = Ext.factory(toolbarConfig, Ext.form.TitleBar);
        me.submitButton = toolbar.down('button[action=submit]');
        toolbar.down('button[action=cancel]').on('tap', 'onCancelTap', me);
        me.submitButton.on('tap', 'onSubmitTap', me);

        // We sync the enabled state of the submit button with form validity
        form.on({
            change: 'onFieldChange',
            delegate: 'field',
            scope: me
        });

        form.setRecord(record);

        me.sheet = sheet = list.add({
            xtype: 'sheet',
            items: [toolbar, form],
            hideOnMaskTap: true,
            enter: 'right',
            exit: 'right',
            right: 0,
            width: '100%',
            layout: 'fit',
            stretchY: true,
            hidden: true
        });

        if (me.getEnableDeleteButton()) {
            form.add({
                xtype: 'button',
                text: 'Удалить',
                ui: 'alt decline',
                margin: 10,
                handler: function () {
                    list.getStore().remove(record);
                    sheet.hide();
                }
            });
        }

        sheet.on('hide', 'onSheetHide', me);

        sheet.show();
    },

    privates: {
        originalEnableDeleteButton: null,

        onFieldChange: function () {
            this.submitButton.setDisabled(!this.form.isValid());
        },

        cleanup: function () {
            var me = this,
                form = me.form;

            if (form && !form.destroyed && form.clearFields) {
                form.removeAll(false);
            }

            me.form = me.sheet = Ext.destroy(me.sheet);
        }
    }
});
