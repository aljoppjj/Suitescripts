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

        /**
         * Defines the function definition that is executed after record is submitted.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @since 2015.2
        */
        
        function afterSubmit(context) {

            // 🔹 LOG AT THE VERY START TO CHECK IF SCRIPT RUNS
            log.debug('Script Triggered', 'afterSubmit has started for Customer ID: ' + context.newRecord.id);

            try {
                const customerId = context.newRecord.id;
                const customerName = context.newRecord.getValue({ fieldId: 'companyname' }) ||
                                    context.newRecord.getValue({ fieldId: 'entityid' });

                if (!customerName) {
                    log.debug('No name', 'Customer has no name, skipping.');
                    return;
                }

                const today = new Date();
                const monthPart = ('0' + (today.getMonth() + 1)).slice(-2);
                const namePart = customerName.substring(0, 2);
                const shortName = `${namePart}: ${monthPart}`;

                record.submitFields({
                    type: record.Type.CUSTOMER,
                    id: customerId,
                    values: { custentity_jj_short_name: shortName },
                    options: { enableSourcing: false, ignoreMandatoryFields: true }
                });

                log.debug('Short Name Set', `${customerName} -> ${shortName}`);

            } catch (e) {
                log.error('Error setting short name', e);
            }
        }

        return {
            afterSubmit: afterSubmit
        };

    });
