Ext.define('Etpgpb.view.request.view.PanelModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.requestViewPanel',

    data: {
        responseData: null,
        requestInfoVisible: true
    },

    formulas: {
        getDays: function (get) {
            var days = 0, data = get('responseData.data');

            if (data.last_change) {
                var last = new Date(data.last_change);
                var cur = new Date();
                var timeDiff = Math.abs(cur.getTime() - last.getTime());
                days = Math.ceil(timeDiff / (1000 * 3600 * 24));
            }

            days += ' ' + Etpgpb.util.Format.daysText(days) + ' на данном этапе';

            return days;
        },

        getStatus: function (get) {
            return Etpgpb.util.Format.status(get('responseData.data.status'), get('responseData.data.reject'));
        },

        getSteps: function (get) {
            var tpl = new Ext.XTemplate(
                '<tpl for=".">' +
                '<tpl if="current"><b></tpl>' +
                '<tpl if="dep_role_name">{dep_role_name:htmlEncode} ("{dep_name:htmlEncode}")</tpl>' +
                '<tpl if="!dep_role_name">"{dep_name:htmlEncode}"</tpl>' +
                '<tpl if="current"></b></tpl>' +
                '<tpl if="xindex!=xcount"> &gt; </tpl>' +
                '</tpl>'
            );

            return tpl.apply(get('responseData.data.steps'));
        }
    }
});
