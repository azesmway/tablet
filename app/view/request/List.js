Ext.define('Etpgpb.view.request.List', {
    extend: 'Ext.dataview.List',
    xtype: 'requestList',

    requires: [
        'Ext.ActionSheet',
        'Ext.dataview.listswiper.ListSwiper',
        'Ext.dataview.pullrefresh.PullRefresh',
        'Ext.dataview.plugin.ListPaging',
        'Etpgpb.store.Requests'
    ],

    controller: 'requestList',
    viewModel: 'requestList',

    cls: 'request-list',

    header: false,
    emptyText: 'Нет данных',

    plugins: {
        pullrefresh: {
            mergeData: false
        },
        listpaging: {
            autoPaging: true,
            bufferZone: 0
        },
        listswiper: {
            widget: {
                xtype: 'listswiperaccordion', //listswiperstepper
                iconCls: 'md-icon-undo',
                undo: {
                    docked: 'right',
                    iconCls: 'md-icon-undo',
                    xtype: 'button',
                    text: 'Отмена'
                }
            },
            left: [{
                iconCls: 'md-icon-delete',
                ui: 'alt decline',
                text: 'Удалить',
                commit: 'onDelete',
                undoable: true
            }],

            right: [{
                iconCls: 'md-icon-edit',
                ui: 'alt action',
                text: 'Редактировать',
                commit: 'onEdit',
                undoable: false
            }, {
                iconCls: 'md-icon-history',
                ui: 'alt confirm',
                text: 'События',
                commit: 'onHistory',
                undoable: false
            }]
        }
    },

    bind: {
        store: '{requests}'
    },

    infinite: true,
    itemConfig: {
        height: 75,
        cls: 'request-list-item'
    },

    itemMenuCfg: { // used by Controller
        xtype: 'actionsheet',
        viewModel: {},
        defaultType: 'button',
        width: '100%',
        selfAlign: 'left',
        buttonAlign: 'left',
        centered: true,
        cls: 'request-list-menu',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        padding: 0,
        items: [{
            text: 'Просмотреть',
            separator: true,
            margin: '10 0 0',
            iconCls: 'md-icon-visibility',
            handler: 'onRecordViewClick',
            bind: {
                hidden: '{currentRoute == "home" ? 0 : 1}'
            }
        }, {
            text: 'Редактировать',
            margin: '10 0 0',
            iconCls: 'md-icon-edit',
            handler: 'onRecordEditClick',
            bind: {
                hidden: '{record.status > 0 || !isUserRequestsCreator}'
            }
        }, {
            text: 'Отправить на согласование',
            margin: '10 0 0',
            iconCls: 'md-icon-send',
            ui: 'confirm',
            handler: 'onRecordSendClick',
            bind: {
                hidden: '{record.status != 0 || !isUserRequestsCreator}'
            }
        }, {
            text: 'Согласовать 1',
            margin: '10 0 0',
            iconCls: 'md-icon-done',
            ui: 'confirm',
            handler: 'onRecordApproveClick',
            bind: {
                hidden: '{record.status != 1 || record.step != 1 || (!isUserRequestsApprover || isUserRequestsProcedureCreator) }'
            }
        }, {
            text: 'Отказать 1',
            margin: '10 0 0',
            iconCls: 'md-icon-block',
            ui: 'decline',
            handler: 'onRecordRejectClick',
            bind: {
                hidden: '{record.status != 1 || record.step == 2 || (!isUserRequestsApprover || isUserRequestsProcedureCreator) }'
            }
        }, {
            text: 'Согласовать 2',
            margin: '10 0 0',
            iconCls: 'md-icon-done',
            ui: 'confirm',
            handler: 'onRecordApproveClick',
            bind: {
                hidden: '{record.status != 1 || record.step != 2 || !isUserRequestsApprover || !isUserRequestsProcedureCreator}'
            }
        }, {
            text: 'Отказать 2',
            margin: '10 0 0',
            iconCls: 'md-icon-block',
            ui: 'decline',
            handler: 'onRecordRejectClick',
            bind: {
                hidden: '{record.status != 1 || record.step != 2 || !isUserRequestsApprover || !isUserRequestsProcedureCreator}'
            }
        }, {
            text: 'Создать процедуру',
            margin: '10 0 0',
            iconCls: 'md-icon-done-all',
            ui: 'confirm',
            handler: 'onRecordDoneClick',
            bind: {
                hidden: '{record.status != 2 || record.step || !isUserRequestsProcedureCreator}'
            }
        }, {
            text: 'Отказать 3',
            margin: '10 0 0',
            iconCls: 'md-icon-block',
            ui: 'decline',
            handler: 'onRecordRejectClick',
            bind: {
                hidden: '{record.status != 2 || record.step || !isUserRequestsProcedureCreator}'
            }
        }, {
            text: 'События',
            margin: '10 0 0',
            iconCls: 'md-icon-history',
            handler: 'onRecordHistoryClick'
        }, {
            text: 'Удалить',
            margin: '10 0 0',
            iconCls: 'md-icon-delete',
            ui: 'decline',
            handler: 'onRecordDeleteClick',
            bind: {
                hidden: '{record.status > 0 || !isUserRequestsCreator}'
            }
        }, {
            cls: 'back-button',
            text: 'Назад',
            margin: '10 0 0',
            handler: 'onRecordBackClick'
        }]
    },

    itemTpl: '<div class="item">' +
    '<div class="title">№{id}, {user}' +
    '<span class="date">{date:date("d M")}</span>' +
    '</div>' +
    '<div class="status"><span class="item-circle value_{status}"></span> {statusText}</div>' +
    '</div>',

    /**
     * @param {Object} data
     * @param {Number} index
     * @param {Etpgpb.model.RequestLog} record
     * @return {Object}
     */
    prepareData: function (data, index, record) {
        data.statusText = Etpgpb.util.Format.status(record.get('status'), record.get('reject'));

        return data;
    }
});
