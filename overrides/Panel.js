Ext.define('Etpgpb.overrides.Panel', {
    override: 'Ext.Panel',

    config: {
        standardButtons: {
            ok: {
                text: 'OK'
            },
            abort: {
                text: 'Отменить'
            },
            retry: {
                text: 'Повторить'
            },
            ignore: {
                text: 'Игнорировать'
            },
            yes: {
                text: 'Да'
            },
            no: {
                text: 'Нет'
            },
            cancel: {
                text: 'Отмена'
            },
            apply: {
                text: 'Применить'
            },
            save: {
                text: 'Сохранить'
            },
            submit: {
                text: 'Отправить'
            },
            help: {
                text: 'Помощь'
            },
            close: {
                text: 'Закрыть'
            }
        }
    }
});
