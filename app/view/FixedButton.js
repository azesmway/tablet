Ext.define('Etpgpb.view.FixedButton', {
    extend: 'Ext.Toolbar',
    xtype: 'fixedbutton',

    config: {
        iconCls: 'x-fa fa-ellipsis-h',
        handler: Ext.emptyFn,
        stateKey: 'fixedbutton',
        dragging: {
            constrain: {
                snap: {
                    y: 5,
                    x: 5
                },
                x: [10, window.innerWidth - 50 - 10],
                y: [60, window.innerHeight - 50 - 60]
            },
            listeners: {
                dragend: function (dragSource) {
                    var key = dragSource.ownerCmp.getConfig('stateKey');
                    localStorage.setItem(key + '-left', dragSource.ownerCmp.getLeft());
                    localStorage.setItem(key + '-top', dragSource.ownerCmp.getTop());
                }
            }
        }
    },

    docked: 'bottom',
    cls: Ext.baseCSSPrefix + 'fixed-toolbar',
    items: [{
        itemId: 'button',
        xtype: 'button',
        ui: 'alt',
        iconCls: 'md-icon-add',
        cls: Ext.baseCSSPrefix + 'fixed-toolbar-button'
    }],

    updateIconCls: function (iconCls) {
        this.down('#button').setIconCls(iconCls);
    },

    updateHandler: function (handler) {
        this.down('#button').setHandler(handler);
    },

    updateDragging: function (dragging) {
        this.setDraggable(dragging);
    },

    updateStateKey: function (key) {
        if (localStorage.getItem(key + '-left')) {
            this.setLeft(localStorage.getItem(key + '-left'))
        }
        if (localStorage.getItem(key + '-top')) {
            this.setTop(localStorage.getItem(key + '-top'))
        }
    }
});
