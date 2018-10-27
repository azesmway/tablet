Ext.define('Etpgpb.ux.picker.ComboPicker', {
    extend: 'Ext.Sheet',
    alias: 'widget.combopicker',

    requires: [
        'Etpgpb.ux.picker.Slot'
    ],

    isPicker: true,

    config: {
        /**
         * @cfg {String/Mixed} doneButton
         * Can be either:
         *
         * - A {String} text to be used on the Done button.
         * - An {Object} as config for {@link Ext.Button}.
         * - `false` or `null` to hide it.
         * @accessor
         */
        doneButton: true,

        /**
         * @cfg {String/Mixed} cancelButton
         * Can be either:
         *
         * - A {String} text to be used on the Cancel button.
         * - An {Object} as config for {@link Ext.Button}.
         * - `false` or `null` to hide it.
         * @accessor
         */
        cancelButton: true,

        /**
         * @cfg {Array} slots
         * An array of slot configurations.
         *
         * - `name` {String} - Name of the slot
         * - `data` {Array} - An array of text/value pairs in the format `{text: 'myKey', value: 'myValue'}`
         * - `title` {String} - Title of the slot. This is used in conjunction with `useTitles: true`.
         *
         * @accessor
         */
        slots: null,

        /**
         * @cfg {Object} value The value to initialize the picker with. The value must be an object
         * with the key being the name of the slot to set the value to.
         *
         *     Ext.create('Ext.picker.Picker', {
         *         displayed: true,
         *         side: 'bottom',
         *         value: {
         *             limit_speed: 100
         *         },
         *         slots: [{
         *             name: 'limit_speed',
         *             title: 'Speed',
         *             data: [
         *                 {text: '50 KB/s', value: 50},
         *                 {text: '100 KB/s', value: 100},
         *                 {text: '200 KB/s', value: 200},
         *                 {text: '300 KB/s', value: 300}
         *             ]
         *         }]
         *     });
         *
         * @accessor
         */
        value: null,

        /**
         * @cfg {object}
         * @inheritdoc
         */
        layout: {
            type: 'fit'
        },

        toolbarPosition: 'top',

        /**
         * @cfg {Ext.TitleBar/Ext.Toolbar/Object} toolbar
         * The toolbar which contains the {@link #doneButton} and {@link #cancelButton} buttons.
         * You can override this if you wish, and add your own configurations. Just ensure that you take into account
         * the {@link #doneButton} and {@link #cancelButton} configurations.
         *
         * The default xtype is a {@link Ext.TitleBar}:
         *
         *     toolbar: {
         *         items: [
         *             {
         *                 xtype: 'button',
         *                 text: 'Left',
         *                 align: 'left'
         *             },
         *             {
         *                 xtype: 'button',
         *                 text: 'Right',
         *                 align: 'left'
         *             }
         *         ]
         *     }
         *
         * Or to use a {@link Ext.Toolbar instead}:
         *
         *     toolbar: {
         *         xtype: 'toolbar',
         *         items: [
         *             {
         *                 xtype: 'button',
         *                 text: 'Left'
         *             },
         *             {
         *                 xtype: 'button',
         *                 text: 'Left Two'
         *             }
         *         ]
         *     }
         *
         * @accessor
         */
        toolbar: {
            xtype: 'titlebar'
        },

        slot: {
            xtype: 'combopickerslot'
        },

        /**
         * @cfg {string}
         * @inheritdoc
         */
        side: 'bottom',

        /**
         * @cfg {Boolean} Возможность поиска. Добавляет поле для поиска по списку
         *
         */
        enableSearch: false
    },

    refresh: Ext.emptyFn,

    baseCls: Ext.baseCSSPrefix + 'combopicker',

    floated: true,
    focusable: true,
    tabIndex: -1,

    initialize: function () {
        this.callParent();

        this.on({
            scope: this,
            show: 'onShow'
        });
    },

    onShow: function () {
        this.setWidth('100%');
        this.setHeight('100%');
    },

    /**
     * Updates the {@link #doneButton} configuration. Will change it into a button when appropriate, or just update the text if needed.
     * @param {Object} config
     * @param {Object} oldButton
     * @return {Object}
     */
    applyDoneButton: function (config, oldButton) {
        if (config) {
            if (config === true) {
                config = {};
            }

            if (typeof config === "string") {
                config = {
                    text: config
                };
            }

            Ext.applyIf(config, {
                align: 'right',
                text: 'Done'
            });

            return Ext.Factory.widget.update(oldButton, config, this, 'createDoneButton');
        }
    },

    createDoneButton: function (button) {
        return Ext.apply({
            xtype: 'button',
            ownerCmp: this
        }, button);
    },

    updateDoneButton: function (newDoneButton, oldDoneButton) {
        var toolbar = this.getToolbar();

        if (newDoneButton) {
            toolbar.add(newDoneButton);
            newDoneButton.on('tap', this.onDoneButtonTap, this);
        }

        if (oldDoneButton) {
            toolbar.remove(oldDoneButton);
        }
    },

    /**
     * Updates the {@link #cancelButton} configuration. Will change it into a button when appropriate, or just update the text if needed.
     * @param {Object} config
     * @param {Object} oldButton
     * @return {Object}
     */
    applyCancelButton: function (config, oldButton) {
        if (config) {
            if (Ext.isBoolean(config)) {
                config = {};
            }

            if (typeof config === "string") {
                config = {
                    text: config
                };
            }

            Ext.applyIf(config, {
                align: 'left',
                text: 'Cancel'
            });

            return Ext.Factory.widget.update(oldButton, config, this, 'createCancelButton');
        }
    },

    createCancelButton: function (button) {
        return Ext.apply({
            xtype: 'button',
            ownerCmp: this
        }, button);
    },

    updateCancelButton: function (newCancelButton, oldCancelButton) {
        var toolbar = this.getToolbar();

        if (newCancelButton) {
            toolbar.add(newCancelButton);
            newCancelButton.on('tap', this.onCancelButtonTap, this);
        }

        if (oldCancelButton) {
            toolbar.remove(oldCancelButton);
        }
    },

    /**
     * @private
     */
    applyToolbar: function (config, oldToolbar) {
        var me = this;

        if (config) {
            if (config === true) {
                config = {};
            }

            Ext.applyIf(config, {
                docked: me.getToolbarPosition()
            });
        }

        return Ext.Factory.widget.update(oldToolbar, config);
    },

    /**
     * @private
     */
    updateToolbar: function (newToolbar, oldToolbar) {
        if (newToolbar) {
            this.add(newToolbar);
        }

        if (oldToolbar) {
            this.remove(oldToolbar);
        }
    },

    applySlots: function (slots) {
        var slot = this.getSlot();

        if (!slot) {
            slot = 'combopickerslot';
        }
        if (typeof slot === 'string') {
            slot = {
                xtype: slot
            };
        }
        slot.picker = this;

        //loop through each of the slots and add a reference to this picker
        if (slots) {
            var ln = slots.length,
                i;

            for (i = 0; i < ln; i++) {
                Ext.applyIf(slots[i], slot);
            }
        }

        return slots;
    },

    /**
     * Adds any new {@link #slots} to this picker, and removes existing {@link #slots}
     * @private
     */
    updateSlots: function (newSlots) {
        var me = this,
            bcss = Ext.baseCSSPrefix,
            innerItems;

        me.removeAll(true, false);

        if (newSlots) {
            me.add(newSlots);
        }

        innerItems = me.getInnerItems();

        if (innerItems.length > 0) {
            innerItems[0].addCls(bcss + 'first');
            innerItems[innerItems.length - 1].addCls(bcss + 'last');
        }

        me.setValue(me.getValue());
    },

    /**
     * @private
     * Called when the done button has been tapped.
     */
    onDoneButtonTap: function () {
        var me = this,
            oldValue = me._value,
            newValue = me.getValue(true);

        if (newValue !== oldValue) {
            me._values = me._value = newValue;

            me.fireEvent('change', me, newValue);
        }

        me.hide();
        Ext.util.InputBlocker.unblockInputs();
    },

    /**
     * @private
     * Called when the cancel button has been tapped.
     */
    onCancelButtonTap: function () {
        this.fireEvent('cancel', this);
        this.hide();
        Ext.util.InputBlocker.unblockInputs();
    },

    onClearIconTap: function () {
        this.onSearch(this.down('#searchField'));
    },

    onSearch: function (field) {
        var me = this, combo = me.ownerCmp;

        combo.getStore().getProxy().setExtraParam('query', field.getValue());
        combo.getStore().reload();
    },

    applyEnableSearch: function (config, old) {
        if (config) {
            if (Ext.isBoolean(config)) {
                config = {};
            }

            if (typeof config === "string") {
                config = {
                    xtype: config
                };
            }

            return Ext.Factory.widget.update(old, config, this, 'createEnableSearch');
        }
    },

    createEnableSearch: function (config) {
        return Ext.applyIf(config, {
            xtype: 'searchfield',
            docked: 'top',
            placeholder: 'Search',
            itemId: 'searchField'
        });
    },

    updateEnableSearch: function (newEnableSearch, oldEnableSearch) {
        var me = this;

        if (newEnableSearch) {
            me.add(newEnableSearch);

            newEnableSearch.on('search', 'onSearch', me);
            newEnableSearch.on('clearicontap', 'onClearIconTap', me);
        }

        if (oldEnableSearch) {
            me.remove(oldEnableSearch);
        }
    },

    setValue: function (values, animated) {
        var me = this,
            slots = me.getInnerItems(),
            ln = slots.length,
            key, slot, i, value;

        if (!values) {
            values = {};
            for (i = 0; i < ln; i++) {
                //set the value to false so the slot will return null when getValue is called
                values[slots[i].getName()] = null;
            }
        }

        for (key in values) {
            value = values[key];
            for (i = 0; i < slots.length; i++) {
                slot = slots[i];
                if (slot.getName() === key) {
                    if (animated) {
                        slot.setValueAnimated(value);
                    } else {
                        slot.setValue(value);
                    }
                    break;
                }
            }
        }

        me._values = me._value = values;

        return me;
    },

    setValueAnimated: function (values) {
        this.setValue(values, true);
    },

    /**
     * Returns the values of each of the pickers slots
     * @return {Object} The values of the pickers slots
     */
    getValue: function (useDom) {
        var me = this, values = {},
            slots = me.getInnerItems(),
            ln = slots.length,
            slot, i;

        if (useDom) {
            for (i = 0; i < ln; i++) {
                slot = slots[i];
                if (slot && slot.isSlot) {
                    values[slot.getName()] = slot.getValue(useDom);
                }
            }

            me._values = values;
        }

        return me._values;
    },

    /**
     * Returns the values of each of the pickers slots.
     * @return {Object} The values of the pickers slots.
     */
    getValues: function () {
        return this.getValue();
    },

    afterShow: function (me) {
        me.callParent([me]);

        if (!me.isHidden()) {
            me.setValue(me._value);
        }

        Ext.util.InputBlocker.blockInputs();
    }
});
