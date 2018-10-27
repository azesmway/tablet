Ext.define('Etpgpb.util.Format', {
    singleton: true,
    alternateClassName: 'Etpgpb.Format',
    mixins: {
        observable: 'Ext.util.Observable'
    },

    statuses: {
        STATUS_NEW: {
            value: 0,
            name: 'Новая заявка'
        },
        STATUS_APPROVE: {
            value: 1,
            name: 'Подтверждение заявки'
        },
        STATUS_CREATE: {
            value: 2,
            name: 'Создание процедуры'
        },
        STATUS_ARCHIVE: {
            value: 3,
            name: 'Архив'
        }
    },

    status: function (status, reject) {
        var result = '', statuses = this.statuses;

        Ext.iterate(statuses, function (key, data) {
            if (data.value === status) {
                result = data.name;
                return false;
            }
        });

        if (reject) {
            result = "<i class='reject'>Отказ</i> / " + result;
        }
        return result;
    },

    department: function (department_name, department_role_name) {
        var value = department_name;
        if (department_role_name) {
            value += ' (' + department_role_name + ')';
        }
        return value;
    },

    daysText: function (days) {
        days = days.toString();
        var d = parseInt(days[days.length - 1]);

        if (d === 1) {
            return 'день';
        }

        if (d === 0 || (d >= 5 && d <= 9)) {
            return 'дней';
        }

        if (d >= 2 && d <= 4) {
            return 'дня';
        }
    }
});
