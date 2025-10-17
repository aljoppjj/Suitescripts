/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/log', 'N/record'],
    /**
 * @param{log} log
 * @param{record} record
 */
    (log, record) => {
        // /**
        //  * Defines the function definition that is executed before record is loaded.
        //  * @param {Object} scriptContext
        //  * @param {Record} scriptContext.newRecord - New record
        //  * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
        //  * @param {Form} scriptContext.form - Current form
        //  * @param {ServletRequest} scriptContext.request - HTTP request information sent from the browser for a client action only.
        //  * @since 2015.2
        //  */
        // const beforeLoad = (scriptContext) => {

        // }

        /**
         * Defines the function definition that is executed before record is submitted.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @since 2015.2
         */
        function beforeSubmit(scriptContext) {
            try {
                const newRecord = scriptContext.newRecord;

                const memoUpdated = newRecord.getValue({
                    fieldId: 'custbody_jj_memo_updated',
                });

                if (memoUpdated) {
                    newRecord.setValue({
                        fieldId: 'memo',
                        value: "Memo Updated"
                    });
                }
            }
            catch (e) {
                log.error({
                    title: 'Error updating memo!',
                    details: e
                });
            }
            
        }

        // /**
        //  * Defines the function definition that is executed after record is submitted.
        //  * @param {Object} scriptContext
        //  * @param {Record} scriptContext.newRecord - New record
        //  * @param {Record} scriptContext.oldRecord - Old record
        //  * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
        //  * @since 2015.2
        //  */
        // const afterSubmit = (scriptContext) => {

        // }

        return {
            beforeSubmit: beforeSubmit
        };

    });
