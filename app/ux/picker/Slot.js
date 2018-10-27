Ext.define('Etpgpb.ux.picker.Slot', {
    extend: 'Ext.dataview.BoundList',
    alias: 'widget.combopickerslot',

    isSlot: true,

    config: {
        /**
         * @cfg {String} name (required) The name of this slot.
         * @accessor
         */
        name: null,

        /**
         * @cfg {Number} value The value of this slot
         * @accessor
         */
        value: null,

        /**
         * @cfg {Number} flex
         * @accessor
         * @private
         */
        flex: 1,

        /**
         * @cfg {String} align The horizontal alignment of the slot's contents.
         *
         * Valid values are: "left", "center", and "right".
         * @accessor
         */
        align: 'left',

        /**
         * @cfg {String} displayField The display field in the store.
         * @accessor
         */
        displayField: 'text',

        /**
         * @cfg {String} valueField The value field in the store.
         * @accessor
         */
        valueField: 'value',

        /**
         * @cfg {String} itemTpl The template to be used in this slot.
         * If you set this, {@link #displayField} will be ignored.
         */
        itemTpl: null,

        /**
         * @cfg {Object} scrollable
         * @accessor
         * @hide
         */
        scrollable: {
            x: false,
            y: true,
            scrollbars: false
        }
    },

    tabIndex: null,
    focusEl: null,
    itemsFocusable: false,

    selectedIndex: 0,

    /**
     * @private
     */
    initialize: function () {
        var me = this;

        me.callParent();

        me.on({
            scope: me,
            childtap: 'onChildItemTap'
        });
    },

    /**
     * @param {this} slot
     * @param {object} info
     * @private
     */
    onChildItemTap: function (slot, info) {
        this.selectedIndex = info.recordIndex;
    },

    updateDisplayField: function (newDisplayField) {
        if (!this.config.itemTpl) {
            this.setItemTpl('<div class="' + Ext.baseCSSPrefix + 'picker-item {cls} <tpl if="extra">' + Ext.baseCSSPrefix + 'picker-invalid</tpl>">{' + newDisplayField + '}</div>');
        }
    },

    /**
     * Returns the value of this slot
     * @private
     */
    getValue: function (useDom) {
        var me = this, store = me.getStore(), record, value;

        if (!store) {
            return;
        }

        if (!useDom) {
            return me._value;
        }

        //if the value is ever false, that means we do not want to return anything
        if (me._value === false) {
            return null;
        }

        record = store.getAt(me.selectedIndex);

        value = record ? record.get(me.getValueField()) : null;

        return value;
    },

    /**
     * Sets the value of this slot
     * @private
     */
    setValue: function (value) {
        return this.doSetValue(value);
    },

    /**
     * Sets the value of this slot
     * @private
     */
    setValueAnimated: function (value) {
        return this.doSetValue(value, true);
    },

    doSetValue: function (value, animated) {
        var me = this,
            hasSelection = true,
            store, index, item;

        // Store can be null
        store = me.getStore();

        index = store ? store.findExact(me.getValueField(), value) : -1;

        if (index === -1) {
            hasSelection = false;
            index = 0;
        }

        me.selectedIndex = index;

        item = me.getViewItems()[index];
        if (item) {
            me.scrollToItem(item, animated);
            if (hasSelection) {
                // only set selection if an item is actually selected
                me.select(me.selectedIndex);
            }
        }

        me._value = value;
    },

    /**
     * @private
     */
    scrollToItem: function (item, animated) {
        // Scrollable will scroll into the bar region because of our getScrollableClientRegion
        // implementation above.
        this.getScrollable().scrollIntoView(item.el, false, animated);
    }
});
