Ext.define('Etpgpb.view.request.StatusSelect', {
    extend: 'Ext.field.Select',
    xtype: 'requestStatusSelect',

    cls: 'status-select',

    options: [{
        text: 'Все заявки',
        value: -1
    }, {
        text: 'Новая заявка',
        value: 0
    }, {
        text: 'Подтверждение заявки',
        value: 1
    }, {
        text: 'Создание процедуры',
        value: 2
    }, {
        text: 'Архив',
        value: 3
    }],
    itemTpl: '<span class="status-item-circle value_{value}"></span> {text}',
    picker: 'floated',
    floatedPicker: {
        xtype: 'boundlist',
        cls: 'status-select-list',
        infinite: false,
        scrollToTopOnRefresh: false,
        loadingHeight: 70,
        width: '100%',
        maxHeight: 300,
        floated: false,
        axisLock: false,
        showAnimation: 'fadeIn',
        hideAnimation: 'fadeOut'
    }
});
