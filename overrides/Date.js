Ext.define('Etpgpb.overrides.Date', {
    override: 'Ext.Date',

    dayNames: [
        "Воскресенье",
        "Понедельник",
        "Вторник",
        "Среда",
        "Четверг",
        "Пятница",
        "Суббота"
    ],

    monthNames: [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь"
    ],

    defaultFormat: 'd.m.Y',

    defaultTimeFormat: 'h:i A',

    firstDayOfWeek: 1,

    weekendDays: [0, 6]
});
