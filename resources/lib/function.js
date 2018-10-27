/*
 * Copyright (c) 2017. azesm
 */

Ext.ns('Main');
Ext.ns('Main.layout');
Ext.ns('Main.user');
Ext.ns('Main.contragent');
Ext.ns('Main.direct');

var REQUIRED_FIELD='&nbsp;<span style="color: red; white-space:nowrap; font-weight:bold;" ext:qtip="Поле обязательно для заполнения">*</span>';
var STYLE_NONEDITABLE_FIELD = 'background: transparent; border: none;';
var IMAGE_LOADING = '/css/images/default/grid/loading.gif';
var WAITING = '<img src="'+IMAGE_LOADING+'" />';
var ASEZ_FIELD = 'asez_id';
var RT_GUID_FIELD = 'rt_guid';
var PARCEL_DIRECTION_ASEZ = 'ASEZ';
var PARCEL_DIRECTION_ETP = 'ETP';
var POST_VAR_PROCEDURE_ID = 'procedure_id';
var POST_VAR_LOT_ID = 'lot_id';
var ACCEPTED_FILES = "The following file formats are accepted: {upload_file_types}";
var PIC_ACCEPTED_FORMATS = '.jpg, .gif, .png, .jpeg';
var MAX_UPLOAD_SIZE=1024*1024*50;
var MAX_UPLOAD_50kb=1024*50;
var MAX_UPLOAD_SIZE_TEXT = "File volume should not exceed ";
var UPLOAD_TEXT = 'Для размещения файлов документации загружайте их по одному с помощью формы ниже.';
var UPLOAD_SINGLE_PROTOCOL_TEXT = 'Актуальным может быть только один файл протокола.';
var ADDITION_FILES_TEXT = 'Необязательное поле для загрузки дополнительных файлов.';
var PIC_UPLOAD_SIZE=1024*1024*3;

/**
 * Типы документов-требований, которые участвуют в изменении условий для панели "Регистрационные документы"
 * @type {string}
 */
var OTHER_DOCS_REQUIREMENT =  'OTHER_DOCS';
var PRICELIST_REQUIREMENT =  'PRICELIST';
var VERIFICATION_II_REQUIREMENT =  'VERIFICATION_II';
var VERIFICATION_III_REQUIREMENT =  'VERFIFICATION_III';
var SMALL_BUSINESS_REQUIREMENT =  'SMALL_BUSINESS';


var USER_PROFILE_WITH_EDS = 1;
var USER_PROFILE_WITHOUT_EDS = 2;

var USER_STATUS_NOT_CONFIRMED = 1;
var USER_STATUS_NOT_AUTHORIZED = 2;
var USER_STATUS_AUTHORIZED = 3;
var USER_STATUS_BLOCKED = 4;
var USER_STATUS_DECLINED = 5;
var USER_STATUS_DELETED = 6;
var STATUS_ADDED = 1;
var STATUS_ACCEPTED = 3;
var STATUS_ACCEPTED_LIMITED = 5;

var USER_ROLE_GUEST = 1;
var USER_ROLE_NEWBIE = 2;
var USER_ROLE_ADMIN = 3;

var USER_ROLE_REQUESTS_CREATOR = 93;
var USER_ROLE_REQUESTS_APPROVE_USER = 94;
var USER_ROLE_REQUESTS_PROCEDURE_CREATOR = 95;

/**
 * Типы банковских реквизитов
 * @type {number}
 */
var RESIDENT_BANK_ACCOUNTS = 0;
var NONRESIDENT_BANK_ACCOUNTS = 1;

/* Статусы организации */
var
    COMPANY_STATUS_NOT_APPROVED         = 1,
    COMPANY_STATUS_APPROVED             = 2,
    COMPANY_STATUS_BLOCKED              = 3,
    COMPANY_STATUS_BLOCKED_FOR_DECISION = 4,
    COMPANY_STATUS_DELETED              = 5;

var TYPE_USER = 1;
var TYPE_OPERATOR = 2;
var TYPE_EXPERT = 3;

var SUPPLIER_TYPE_UR_RF = 1;
var SUPPLIER_TYPE_UR_FOREIGN = 4;
var SUPPLIER_TYPE_UR_SNG = 7;
var SUPPLIER_TYPE_IP_RF = 3;
var SUPPLIER_TYPE_IP_FOREIGN = 5;
var SUPPLIER_TYPE_IP_SNG = 8;
var SUPPLIER_TYPE_FIZ_RF = 2;
var SUPPLIER_TYPE_FIZ_FOREIGN = 6;
var SUPPLIER_TYPE_FIZ_SNG = 9;

var CUSTOMER_TYPE_CUST = 1;
var CUSTOMER_TYPE_ORG = 2;

var APPLIC_DOC_REQUIRED = 1;
var APPLIC_DOC_OTHER = 2;
var APPLIC_DOC_MAXSUM = 3;

var PROCEDURE_TYPE_AUC_ASC = 1;
var PROCEDURE_TYPE_AUC_DESC = 2;
var PROCEDURE_TYPE_TENDER = 3;
var PROCEDURE_TYPE_PRICELIST_REQ = 5;
var PROCEDURE_TYPE_QUOTATION_REQ = 4;
var PROCEDURE_TYPE_QUOTATION_REQ_KOLMAR = 24;
var PROCEDURE_TYPE_QUALIFICATION = 6;
var PROCEDURE_TYPE_AUCTION = 11;
var PROCEDURE_TYPE_PERETORG_REDUC = 7;
var PROCEDURE_TYPE_PERETORG_TENDER = 8;
var PROCEDURE_TYPE_POSITIONS_TENDER = 13;
var PROCEDURE_TYPE_COMPETITIVE_NEGOTIATIONS = 12;
var PROCEDURE_TYPE_OPEN_QUOTATION_REQ = 14;
// процедуры почты росиси
// Открытая тендерная закупка в электронной форме (наш запрос предложений)
var PROCEDURE_TYPE_RUSPOST_OPEN_TENDER = 15;    // Тендер
// Запрос предложений в электронной форме (наш запрос котировок)
var PROCEDURE_TYPE_RUSPOST_PRICELIST_REQ = 16;
// Открытый конкурс в электронной форме (наш конкурс) ПЕРЕИМЕНОВАН В "Запрос предложений (в неэлектронной форме)" #759
var PROCEDURE_TYPE_RUSPOST_TENDER = 17;
// Открытый аукцион в электронной (наш аукцион)
var PROCEDURE_TYPE_RUSPOST_AUCTION = 18;
// Редукцион ПР ПЕРЕИМЕНОВАН В "Открытая тендерная закупка в неэлектронной форме" #759
var PROCEDURE_TYPE_RUSPOST_REDUCTION = 19;
// Прямая закупка
var PROCEDURE_TYPE_DIRECT_PURCHASE = 20;
// Запрос цен по версии Газпрома
// Прием заявок -> Рассмотрение заявок -> Архив
var PROCEDURE_TYPE_GAZ_PRICES_REQ = 21;

// Разрешается прием аналогов в Попозиционной закупке
// positions_analogs
// null - прием аналогов не допускается
var PROCEDURE_ANALOGS_COMPETITORS_VISIBLE  = 1;   // Участники видят аналоги конкурентов
var PROCEDURE_ANALOGS_COMPETITORS_HIDDEN   = 2;   // Аналоги предложенные конкурентами скрыты

var LOT_STEP_WAIT_APPLIC_OPENED = 'wait_applic_opened'; // ожидание вскрытия конвертов
var LOT_STEP_APPLIC_OPENED = 'applic_opened';           // вскрытие конвертов
var LOT_STEP_FIRST_PARTS = 'first_parts';               // рассмотрение заявок
var LOT_STEP_TRADE = 'trade';                           // торги
var LOT_STEP_SECOND_PARTS = 'second_parts';             // подведение итогов
var LOT_STEP_EVALUATION = 'evaluation';                 // оценка заявок
var LOT_STEP_SELECTION = 'selection';                   // отбор заявок
var LOT_STEP_PERETORG_REDUC = 'peretorg_reduc';         // очная переторжка
var LOT_STEP_PERETORG_TENDER = 'peretorg_contest';      // заочная переторжка
var LOT_STEP_QUALIFICATION = 'qualification';           // квалификационный отбор
var LOT_STEP_PREQUALIFICATION = 'prequalification';     // преквалификация
var LOT_STEP_POSTQUALIFICATION = 'postqualification';   // постквалификация
var LOT_STEP_CORRECTION = 'correction';                 // подача окончательных предложений
var LOT_STEP_REGISTRATION = 'registration';             // прием заявок
var LOT_STEP_CONTRACT     = 'contract';                 // заключение договора
var LOT_STEP_ARCHIVE      = 'archive';                  // архив

var LOT_STATUS_ADDED          = 0; // Добавлен
var LOT_STATUS_SIGNED         = 1; // Подписан
var LOT_STATUS_PUBLISHED      = 2; // Опубликован
var LOT_STATUS_APPLIC_OPENED  = 3; // Вскрытие конвертов
var LOT_STATUS_FIRST_PARTS    = 4; // Первые части
var LOT_STATUS_TRADE          = 5; // Торги
var LOT_STATUS_SECOND_PARTS   = 6; // Подведение итогов
var LOT_STATUS_CONTRACT       = 7; // Заключение договора
var LOT_STATUS_PAUSED         = 9; // Пауза
var LOT_STATUS_CANCELLED      = 10; // Отменен
var LOT_STATUS_ARCHIVE        = 8; // В архиве
var LOT_STATUS_CORRECTION     = 11;
var LOT_STATUS_PREQUALIFICATION = 12;
var LOT_STATUS_WAIT_APPLIC_OPENED = 13; // Ожидание вскрытия конвертов
var LOT_STATUS_SUGGESTION_DOCS = 14; // Загрузка коммерческих предложений

var DEPARTMENT_ROLE_HEAD        = 1;  // Начальник профильного отдела
var DEPARTMENT_ROLE_SPECIALIST  = 2;  // Главный специалист профильного отдела
var DEPARTMENT_ROLE_EXPERT      = 3;  // Члены комиссии
var DEPARTMENT_ROLE_OTO         = 4;  // Сотрудники ОТО (организационно-технического отдела)

var COORDINATION_STATUS_COORDINATION  = 1;  // на согласовании
var COORDINATION_STATUS_RESOLVED      = 2;  // согласовано
var COORDINATION_STATUS_DECLINED      = 3;  // отклонено
var COORDINATION_STATUS_RESOLVED_SIGNED = 4; // согласовано и подписано

var FISCALDOC_TYPE_COMMON       = 1;
var FISCALDOC_TYPE_EVADED       = 2;
var FISCALDOC_TYPE_CORRECT      = 3;   // корректирующая счет-фактура (используется при возврате лота из архива)

// Временный номер для документов (проставляется при создании документа)
// Реальный номер генерируется кроном
var FISCALDOC_NUMBER_NOT_ASSIGNED = -1;

var AUCTION_FEE = 3000;

/**
 * Константы протоколов
 */
var PROTOCOL_TYPE_FIRSTPART_REVIEW            = 1;
var PROTOCOL_TYPE_SECONDPART_REVIEW           = 2;  // протокол подведения итогов
var PROTOCOL_TYPE_SECONDPART_REVIEW_EXTRA     = 12;  // протокол подведения итогов
var PROTOCOL_TYPE_CONTRACT_REPUDIATION        = 3;

var PROTOCOL_TYPE_AUCTION_HAPPENED            = 44; // Аукцион состоялся (равен номеру шаблона протокола в vocab_doc_templates)
var PROTOCOL_TYPE_AUCTION_FAILED              = 45; // Аукцион не состоялся (равен номеру шаблона протокола в vocab_doc_templates)
var PROTOCOL_TYPE_AUCTION_HAPPENED_RETRADE    = 46; // Переторжка состоялась
var PROTOCOL_TYPE_AUCTION_FAILED_RETRADE      = 47; // Переторжка не состоялась
var PROTOCOL_TYPE_APPLIC_OPENED               = 5;  // Протокол вскрытия конвертов
var PROTOCOL_TYPE_APPLIC_OPENED_EXTRA         = 15;
var PROTOCOL_TYPE_QUALIFICATION_REVIEW        = 6; // Протокол квалификационного отбора
var PROTOCOL_TYPE_APPLIC_APPRAISAL            = 7; // Протокол оценки заявок
var PROTOCOL_TYPE_PRECONTRACT_NEGOTIATIONS    = 8; // Протокол преддоговорных переговоров
var PROTOCOL_TYPE_FIRSTPART_REVIEW_RETRADE    = 9; // Протокол рассмотрения на заочной переторжке
var PROTOCOL_TYPE_APPLIC_OPENED_REVIEW_RETRADE = 10; // Протокол вскрытия на заочной переторжке

var PROTOCOL_TYPE_OTHER_DOCUMENT              = 50;
// Черновой протокол загруженный администратором для дальнейшей замены пользовательского протокола
// (после подписи получает тип пользовательского протокола)
var PROTOCOL_TYPE_ADMIN_DRAFT                 = 51;

// Статус регистрации
// (позволяет определить идет ли в данный момент процесс регистрации и, если идет, то какого типа)
var REGISTRATION_LOCAL    = 1;  // локальная регистрация
var REGISTRATION_USER     = 2;  // регистрация доп пользователя
var REGISTRATION_GLOBAL_MASTER  = 3;  // глобальная регистрация мастера (проводит рассылку слейвам)
var REGISTRATION_GLOBAL_SLAVE   = 4;  // глобальная регистрация слейва
var REGISTRATION_OVER     = 5;  // регистрация завершена

/**
 * Типы заявок
 */
var APPLICATION_TYPE_BASIC = 1; // основное предложение
var APPLICATION_TYPE_ALT = 2; // альтернативное предложение

/**
 * Опции видимости в попозиционных торгах
 */
// Отображение наименований участников в таблице
// positions_suppliers_visibility
var PSV_FULL          = 1;  // Участники и их наименования отображаются в таблице
var PSV_NAME_HIDDEN   = 2;  // Участники отображаются в таблице, но их наименования скрыты
var PSV_HIDDEN        = 3;  // Участники не отображаются в таблице

// Отображение цен участников в таблице
// positions_applics_visibility
var PAV_FULL          = 1;  // Видны и цены и рейтинг участников
var PAV_PRICE_ONLY    = 2;  // Видны только цены подаваемые участниками
var PAV_RATE_ONLY     = 3;  // Виден только рейтинг цен
var PAV_HIDDEN        = 4;  // Цены и рейтинг скрыты

// Тип ограничения на подачу цен участниками в Попозиционной закупке
// positions_prices_limit_type
// null - нет ограничения
var POSITIONS_PRICES_LIMIT_GREATER = 1;  // Участники не могут подавать цены ниже начальной
var POSITIONS_PRICES_LIMIT_LOWER   = 2;  // Участники не могут подавать цены выше начальной

// Алгоритм определения лучшей цены заявки в Попозиционной закупке
// positions_best_price_type
var POSITIONS_BEST_PRICE_MAX = 1;  // Лучшей ценой считается наибольшая
var POSITIONS_BEST_PRICE_MIN = 2;  // Лучшей ценой считается наименьшая

var ROUBLE_CODE = 643;
var ROUBLE_CODE_OLD = 810;

// Типы запросов на разъяснение
var REQUEST_STATUS_OVERDUE = 5; // Запрос просрочен

//Статусы заявок банковского сопровождения
var BS_STATUS_EMPTY = 0; // Черновик заявки
var BS_STATUS_CUSTOMER_SIGNED = 1; // Заказчик подал заявку в ДУКЗ
var BS_STATUS_CUSTOMER_EDITING = 2; // Заказчик редактирует возвращенную заявку
var BS_STATUS_ORGANIZER_IN_REVIEW = 3; // ДУКЗ открыл заявку, но пока не принял решение
var BS_STATUS_ORGANIZER_ACCEPTED = 4; // ДУКЗ Принял заявку (Сотрудник Банка может ее видеть)
var BS_STATUS_ORGANIZER_REJECTED = 5; // ДУКЗ Отклонил заявку (Заказчик может догрузить документы и подписать)
var BS_STATUS_ORGANIZER_REFUSED = 6; // ДУКЗ Отклонил заявку (!Конечный статус)
var BS_STATUS_BANK_IN_REVIEW = 7; // Банк Принял заявку (Заявку изменять НЕЛЬЗЯ)
var BS_STATUS_BANK_ACCEPTED = 8; // Банк Принял заявку (Заявку изменять НЕЛЬЗЯ)
var BS_STATUS_BANK_REJECTED = 9; // Банк Отклонил заявку (ДУКЗ может догрузить документы и подписать, или вернуть Заказчику)
var BS_STATUS_BANK_REFUSED = 10; // Банк Отклонил заявку (!Конечный статус)

//Статус Запросов Банка в БС
var BQ_STATUS_EMPTY = 0; // Черновик запроса, сохранен Банком, видит только Банк
var BQ_STATUS_BANK_SIGNED = 1; // Банк отправил запрос в ДУКЗ
var BQ_STATUS_ORGANIZER_IN_REVIEW = 2; // ДУКЗ открыл запрос, но пока не принял решение
var BQ_STATUS_ORGANIZER_ACCEPTED = 3; // ДУКЗ одобрил запрос
var BQ_STATUS_ORGANIZER_REJECTED = 4; // ДУКЗ отклонил запрос
var BQ_STATUS_CUSTOMER_QUESTION = 5; // ДУКЗ передал Заказчику на уточнение
var BQ_STATUS_CUSTOMER_IN_REVIEW = 6; // Заказчик открыл форму
var BQ_STATUS_CUSTOMER_ANSWERED = 7; // Заказчик ответил ДУКЗу

/*
 * End Constants
 */

var DEFAULT_DONWLOAD_ELEMENT_COUNT = 500;

Function.prototype.createDelegate = function(obj, args, appendArgs) {
    return Ext.bind(this, obj, args, appendArgs);
};

Function.prototype.defer = function(millis, scope, args, appendArgs) {
    Ext.defer(this, millis, scope, args, appendArgs);
};

/**
 * Вызывает Ext Direct метод, рисуя диалог «падажыте»
 * @param rpc_fn функция директа
 * @param params параметры функции (без каллбека)
 * @param displayparams параметры диалога
 *
 * Параметры диалога:
 *   mask: отображать диалог как маску (false)
 *   mask_el: элемент к которому применить маску (Ext.getBody())
 *   mask_class: класс к маске (x-mask-loading)
 *   wait_disable: не отображать никаких диалогов и масок
 *   wait_delay: интервал через который показать диалог (500 если не через маску, 0 если маской)
 *   wait_title: заголовок диалога
 *   wait_text: текст диалога или маски
 *   wait_icon: иконка диалога (Ext.MessageBox.INFO)
 *   wait_width: ширина диалога (400)
 *   exception_call: вызывать каллбек даже в случае эксцепшна в директе (false)
 *   confirm: спросить подтверждение операции, текст вопроса (null)
 *   confirm_title: заголовок вопроса подтверждения
 *   scope: скоуп вызова хендлера
 *   handle_failure: проверять пропертю success ответа. Если она false — показывать
 *   сообщение и не дергать каллбек.
 *   monitor_valid: проверять валидность указанного компонента, и не дергать каллбек если компонент
 *   уничтожен
 * Каллбек дергается также как и при простом вызове директа
 *
 * @param handler каллбек для функции директа
 */
function performRPCCall(rpc_fn, params, displayparams, handler) {
    var waiter = {};
    params = params || [{}];
    waiter.enable = true;
    waiter.shown = false;
    waiter.params = displayparams || {};
    if (!rpc_fn) {
        throw 'Internal error: no method specified';
    }
    waiter.params.mask_el = waiter.params.mask_el || Ext.Viewport;
    waiter.params.wait_delay = waiter.params.wait_delay || 0;
    waiter.params.scope = waiter.params.scope || window;
    waiter.params.wait_text = waiter.params.wait_text || "Загрузка...";
    Ext.apply(waiter, {
        show: function () {
            if (!this.enable || this.params.wait_disable || Ext.Msg.isVisible()) {
                this.shown = false;
                return;
            }
            if (this.params.mask) {
                this.params.mask_el.setMasked({
                    xtype: 'loadmask',
                    message: this.params.wait_text,
                    cls: this.params.mask_class || 'x-mask-loading'
                });
            }
            this.shown = true;
        },
        hide: function () {
            this.enable = false;
            if (this.shown) {
                this.params.mask_el.unmask();
            }
        },
        handler: function (result, e) {
            var is_exception = !result || !e;
            this.enable = false;
            if (this.params.mask || !is_exception) {
                this.hide();
            }
            if (Main && Main.app) {
                Main.app.un('rpcerror', this.clean);
            }
            if (!is_exception || this.params.exception_call) {
                if (this.params.handle_failure && result && false === result.success) {
                    echoResponseMessage(result);
                } else {
                    // проверяем уничтоженность компонентов
                    if (this.params.monitor_valid && (this.params.monitor_valid.isDestroyed || this.params.monitor_valid.destroying)) {
                        return;
                    }
                    handler.call(this.params.scope, result, e);
                }
            }
        },
        clean: function (event) {
            if (Main && Main.app) {
                Main.app.un('rpcerror', waiter.clean);
            }
            if (!waiter.params.mask) { // не перебиваем сообщение об ошибке системы
                this.shown = false;
            }
            waiter.hide();
            if (event && waiter.params.exception_call && !event.action && !event.method) {
                waiter.handler(null, event);
            }
        },
        rpccall: function () {
            if (0 === this.params.wait_delay) {
                this.show();
            } else {
                this.show.defer(this.params.wait_delay || 500, this);
            }
            params.push(this.handler.createDelegate(this));
            if (Main && Main.app) {
                Main.app.on('rpcerror', this.clean);
            }
            rpc_fn.apply(window, params);
        }
    });
    if (waiter.params.confirm) {
        Ext.MessageBox.confirm(waiter.params.confirm_title || 'Подтверждение', waiter.params.confirm, function (b) {
            if ('yes' === b) {
                waiter.rpccall();
            }
        });
    } else {
        waiter.rpccall();
    }
}

Main.reloadPrivileges = function(redirect) {
    var dparams = {mask: true, wait_text: 'Загрузка привилегий...'};
    if (Ext.isEmpty(redirect)) {
        redirect = true;
    }

    return new Ext.Promise(function (resolve, reject) {
        performRPCCall(RPC.Index.index, [], dparams, function (resp) {
            if (resp.success && resp.user) {
                Main.eds = resp.eds;
                Main.user = resp.user;
                Main.contragent = resp.contragent;
            } else {
                Main.user.role = 'guest';
                Main.user.isAuthorized = false;
            }

            Main.user.isAuthorized = Main.user.role !== 'guest';

            if (resp && resp.auth_token) {
                Main.requestToken = resp.auth_token;
            }
            Ext.apply(Main.config, resp.config); // обновляем конфиги в связи с возможным их изменением для разных организаций
            resolve();
        });
    });
};

Main.direct.getSecurityToken = function() {
    return Main.requestToken || '';
};

Ext.override(Ext.direct.RemotingProvider, {
    getPayload: function (transaction) {
        var result = {
            action: transaction.action,
            method: transaction.method,
            data: transaction.data,
            type: 'rpc',
            tid: transaction.id,
            token: Main.requestToken
        };
        if (transaction.metadata) {
            result.metadata = transaction.metadata;
        }
        return result;
    },
    invokeFunction: function (action, method, args) {
        var me = this,
            transaction, form, isUpload, postParams;

        transaction = me.configureTransaction(action, method, args);

        if (me.fireEvent('beforecall', me, transaction, method) !== false) {
            Ext.direct.Manager.addTransaction(transaction);

            if (transaction.isForm) {
                form = transaction.form;

                isUpload = String(form.getAttribute("enctype")).toLowerCase() === 'multipart/form-data';

                postParams = {
                    extTID: transaction.id,
                    extAction: action,
                    extMethod: method.name,
                    extType: 'rpc',
                    extToken: Main.requestToken,
                    extUpload: String(isUpload)
                };

                if (transaction.metadata) {
                    postParams.extMetadata = Ext.JSON.encode(transaction.metadata);
                }

                Ext.apply(transaction, {
                    form: form,
                    isUpload: isUpload,
                    params: postParams
                });
            }

            me.queueTransaction(transaction);
            me.fireEvent('call', me, transaction, method);
        }
    }
});

/**
 * Это площадка газпрома?
 * @returns bool
 */
function isEtpGazprom() {
    return Main && Main.config && ('etpgaz' === Main.config.gpb_site_type);
}

/**
 * Это Общая площадка?
 * @returns bool
 */
function isEtpgpb() {
    return Main && Main.config && ('etp.gpb' === Main.config.gpb_site_type);
}

function onInitEtpgp () {

    if (Ext.REMOTING_API) {
        Ext.direct.Manager.addProvider(Ext.REMOTING_API);
    }

    return new Ext.Promise(function (resolve, reject) {
        var dparams = {mask: true, wait_text: 'Авторизация...'};
        performRPCCall(RPC.Index.index, [], dparams, function (resp) {
            if (resp && resp.session_name) {
                Main.session_name = resp.session_name;
            }
            if (resp && resp.auth_token) {
                Main.requestToken = resp.auth_token;
            }
            var urlRegex = /^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/\n]+)/igm;
            if (!isEtpGazprom()) {
                if (resp.site_url) {
                    Main.siteURL = resp.site_url.match(urlRegex)[0];
                } else {
                    Main.siteURL = '';
                }
                if (resp.site_url_slaves) {
                    var tmp = resp.site_url_slaves.match(urlRegex)[0];
                    Main.siteURLSlaves = tmp.replace('.loc', '.ru')
                } else {
                    Main.siteURLSlaves = '';
                }
            }
            if (resp.config) {
                Ext.apply(Main.config, resp.config);
                ACCEPTED_FILES = (new Ext.Template(ACCEPTED_FILES)).apply(resp.config);
                MAX_UPLOAD_SIZE = 1024 * 1024 * Number(resp.config.upload_file_size || 50);
                PIC_UPLOAD_SIZE = 1024 * Number(resp.config.picture_file_size || PIC_UPLOAD_SIZE);
                MAX_UPLOAD_SIZE_TEXT += Ext.util.Format.humanizeSize(Number(MAX_UPLOAD_SIZE));
            }
            Main.eds = resp.eds;
            if (resp.success && resp.user) {
                Main.user = resp.user;
                Main.contragent = resp.contragent;
                Main.available_sum = null; // чтобы потом сработал штатный евент
            } else {
                Main.user.role = 'guest';
                Main.user.landing = 'auth/login';
            }
            Main.user.isAuthorized = Main.user.role !== 'guest';
            if (resp.config.inactive_period) {
                Main.inactivetask = {
                    add_interval: resp.config.inactive_period * 60 * 1000,
                    finish_time: null,
                    interval: 1000 * 60,
                    run: function () {
                        var current_time = new Date().getTime();
                        if (current_time > this.finish_time) {
                            this.finish_time = current_time + this.add_interval;
                            if (Main.user.role !== 'guest') {
                                Etpgpb.app.redirectTo("logout");
                            }
                        }
                    }
                };
                Main.inactivetask.finish_time = new Date().getTime() + Main.inactivetask.add_interval;
                document.documentElement.onkeypress = document.documentElement.onmousemove = document.documentElement.onclick = function () {
                    Main.inactivetask.finish_time = (new Date).getTime() + Main.inactivetask.add_interval;
                };
                Ext.TaskManager.start(Main.inactivetask);
            }
            resolve();
        });
    });
}

function clearCookies() {
    if (Main && Main.session_name) {
        //Ext.util.Cookies.clear(Main.session_name);
        var session_name = Main.session_name;
        var date = new Date();
        date.setTime(date.getTime() - 24 * 3600 * 1000); // expires day ago
        document.cookie = session_name + "=; expires=" + date.toGMTString();
    }
}

function echoResponseMessage(resp, callback) {
    callback = Ext.isFunction(callback) ? callback : Ext.emptyFn;

    if (!resp) {
        resp = {};
    }
    if (resp.failureType === 'server' && Ext.MessageBox.isVisible()) {
        // Уже отображается ошибка директа, не будем ее перебивать
        return;
    }
    if (typeof resp.success === 'function') {
        resp = resp.result || {};
    }
    var title = resp.success ? __("Documents and information sent successfully") : "Ошибка";
    var msg = resp.message || resp.msg;

    if (resp.changeTitle === true) {
        title = resp.title;
    }

    if (!msg) {
        msg = resp.success ? __("Documents and information sent successfully") : __("Unknown error");
    } else if (msg.match(/ошибка/i) || msg.match(/error/i)) {
        title = "Ошибка";
    }
    title = resp.title || title;

    Ext.Msg.show({
        title: title,
        message: msg,
        buttons: Ext.MessageBox.OK,
        defaultFocus: '#ok',
        prompt: false,
        hideOnMaskTap: true,
        fn: callback
    });
    return title;
}

/**
 * Получение id текущего юзера
 * @returns bool
 */
function getActiveUser() {
    return (!isGuest() && Main.user.id > 0) ? Main.user.id : -1;
}

/**
 * Гость ли пользователь?
 * @returns bool
 */
function isGuest() {
    return Main && Main.user && (Main.user.role == 'guest');
}

/**
 * Выдает html код с информациеей о файле
 * @param f объект с метаданными файла
 * @return string html код
 */
function getFileInfoHtml(f, withHash) {
    if (!f) return '';
    if (Ext.isEmpty(withHash)) withHash = true;
    var r = (f.link ? ('<a href="' + f.link + '" target="_blank">') : '') +
        (f.descr || f.description || f.custom_name || f.name || '').escapeHtml() +
        (f.link ? '</a>' : '') +
        '<span class="file_descr">' +
        (undefined !== f.size && 0 != f.size ? (', ' + __("size") + ' ' + Ext.util.Format.humanizeSize(f.size)) : '') +
        ((undefined !== f.hash && withHash) ? (', ' + __("hash sum GOST Р34.11-94") + ':  ' + f.hash) : '') +
        (undefined !== f.date_added || undefined !== f.date ? (', ' + __("added") + ' ' + Ext.util.Format.localDateRenderer(f.date_added || f.date)) : '') +
        '</span>';
    if (f.obsolete) {
        r = '<span class="not-actual">' + r + ' (' + (f.obsolete_text || 'неактуален') + ')</span>';
    } else {
        if (f.oos_publish_link) {
            r += '&nbsp;&nbsp;' + f.oos_publish_link;
        }
    }
    return r;
}

/**
 * Инициализация Id
 * @param array ids - массив названий переменных для инициализации ['field1_id', 'field2_id']
 * @return object ids - объект переменных с проинициализированными Id'ами
 */
function initIds(ids) {
    var result = {};
    for (var cnt = ids.length; cnt--;) {
        result[ids[cnt]] = Ext.id();
    }
    return result;
}

function setComponentValues(cmp, v, ignoreself) {
    var cmp_name = (cmp.name != undefined) ? cmp.name.replace(/\[\]/, '') : undefined;
    if (!ignoreself
        && cmp_name
        && undefined !== v[cmp_name]
        && 'null' != v[cmp_name]
        && (cmp.setValue || cmp.setValues)) {
        if (cmp.setValues) {
            cmp.setValues(v[cmp_name]);
        } else if (cmp.setValue) {
            cmp.setValue(v[cmp_name]);
            cmp.fireEvent('valueFilled', v[cmp_name]);
            cmp.fireEvent('change');
        }
    } else if (cmp.items && cmp.items.each) {
        cmp.items.each(function (i) {
            setComponentValues(i, v)
        });
    }
}

function renderPagingToolbar(msg, store, pagesize, items, plugins) {
    return {
        xtype: 'pagingtoolbar',
        pageSize: pagesize || 25,
        store: store,
        displayInfo: true,
        displayMsg: msg + " {0} - {1} из {2}",
        emptyMsg: "Список пуст",
        afterPageText: "из {0}",
        beforePageText: "Страница",
        items: items,
        plugins: plugins
    };
}

/**
 * Выдает конфиг для панели с информацией о файле
 * @param file объект с метаданными файла
 * @param params опциональко, конфиг отображения. Возможные параметры:
 *   deleteHandler: функция-каллбек для удаления файла (если ее нет, то удалялка
 *   не отображается);
 *   deleteIcon: путь к иконке удаления (по умолчанию корзинка)
 *   deleteText: текст ссылки на удаление.
 * @return объект-конфиг панели
 */
function getFileInfoPanel(file, params, withHash) {
    var p = {
        border: false,
        cls: 'spaced-bottom-shallow',
        file: file,
        html: getFileInfoHtml(file, withHash)
    };
    params = params || {};
    var file_delete_handler = null;
    if (file && file.deleteHandler && !params.deleteHandler) {
        file_delete_handler = file.deleteHandler;
    }
    if (params.deleteHandler || file_delete_handler) {
        var delete_id = Ext.id();
        p.html += '&nbsp;<a href="javascript:;"><img src="' + (params.deleteIcon || performUrl('/ico/garbage.png')) +
            '" ext:qtip="' + (params.deleteText || __(["Delete", "files"])) + '" id="' + delete_id + '"/></a>';
        p.listeners = {
            afterrender: function (cmp) {
                var d = Ext.get(delete_id);
                d.on('click', function () {
                    var name = cmp.file.custom_name || cmp.file.name;
                    Ext.Msg.confirm(__("Confirmation"),
                        __("Are you sure you want to delete a file «{0}»?", name.escapeHtml()),
                        function (b) {
                            if (b == 'yes') {
                                if (file_delete_handler) {
                                    file_delete_handler(cmp.file, cmp);
                                } else {
                                    params.deleteHandler(cmp.file, cmp);
                                }
                            }
                        });
                });
            }
        }
    }
    return p;
}

if (!String.prototype.escapeHtml) {
    String.prototype.escapeHtml = function () {
        if (Ext) {
            return Ext.util.Format.htmlEncode(this);
        }
        return this.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
}

/**
 * Корректировка урла для всяких фэйковых алиасов, типа ГИСПа. пок атолько дял ГИСПа
 * @param url
 * @returns {string}
 */
function performUrl(url) {
    if (Ext.isEmpty(url)) {
        return url;
    }
    var controller = isGispVersion() ? getConfigValue('fake_controller', '/etp/') : '';
    var regExp = new RegExp(/\w+:\/\/[^/]+/i);
    var basePath = url.match(regExp);
    if (!Ext.isEmpty(basePath)) {
        url = url.replace(regExp, '');
    }
    var newUrl = (controller + url).replace('//', '/');
    return (!Ext.isEmpty(basePath)) ? (basePath[0] + newUrl) : newUrl;
}

/**
 * Парсит строку с датой-временем по стандартным паттернам (iso, db и т.п.)
 * @param date строка с датой
 * @param formats форматы, массив или строка, по умолчанию все типовые паттерны
 * @return Date JS-объект даты или null
 */
function parseDate(date, formats) {
    var d;
    if (Ext.isDate(date)) {
        return date;
    }
    if (!formats) {
        formats = ['c', 'Y-m-d H:i:sp', 'Y-m-d H:i:s.u', 'Y-m-d H:i:s.up', 'Y-m-d H:i:s'];
    }
    if (!Ext.isArray(formats)) {
        formats = [formats];
    }
    for (var i = 0; i < formats.length; i++) {
        if (formats[i].match(/p$/)) {
            var fmt = formats[i].substr(0, formats[i].length - 1) + 'O';
            d = Ext.Date.parseDate(date + '00', fmt);
        } else {
            d = Ext.Date.parseDate(date, formats[i]);
        }
        if (d) {
            return d;
        }
    }
    return null;
}

function isGispVersion() {
    return (
        window.location.pathname.match(/\/gisp(\/|#)?/) ||
        window.location.toString().match(/.+?gisp\.gov.*?/) ||
        window.location.toString().match(/.+?gisindustry.*?/)
    );
}
