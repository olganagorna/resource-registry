(function () {

    angular.module('restApp')
        .constant('constant', {
            serviceBase: '/rest.php/',
            resourcesQuery: 'resources',
            searchQuery: 'searches',
            resource_classesQuery: 'resource_classes',
            parametersQuery: 'parameters',
            operationsQuery: 'operations',
            personal_datasQuery: 'personal_datas',
            paramsNumber: 6,
            perPage: 4,
            pageRange: 7,
            TIME_DIFF : 24*60*60*1000,
            MSEC_IN_MIN : 60000,
            MSEC_IN_SEC : 1000,
            DEFOULT_START_DATE : new Date(),
            DEFOULT_MIN_DATE : new Date(0),
            DAY_CHAR_START:0,
            DAY_CHAR_END:10,
            MSG_TO_FILL_TYPE_OPERATION : 'Виберіть будь ласка хоча б один тип операцій для перегляду подій',
            MSG_DELATE_RESOURCE: 'Ви дійсно бажаєте видалити цей ресурс ?',
            MSG_SELECT_CLASS:'Оберіть класс',
            reasonWatchGroupHash : [
                "owner.passport_series",
                "owner.passport_number",
                "owner.first_name",
                "owner.last_name",
                "owner.middle_name",
                "reason.passport.department",
                "reason.passport.date",
            ],
            MSG_REASON_DOC_PSW:'паспорт громадянина України',
            MSG_REASON_DOC_DEPARTMENT:'виданий на ім\'я'

        });
})();
