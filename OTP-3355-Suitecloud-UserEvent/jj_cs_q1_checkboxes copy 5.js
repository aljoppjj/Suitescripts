/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/record', 'N/log', 'N/search', 'N/email', 'N/runtime'],
/**
 * @param{record} record
 * @param{log} log
 * @param{search} search
 * @param{email} email
 * @param{runtime} runtime
 */
(record, log, search, email, runtime) => {

    function afterSubmit(scriptContext) {
        try {
            log.debug('Step 1: Script Triggered', `Sales Order ID: ${scriptContext.newRecord.id}`);

            // Only run on CREATE
            if (scriptContext.type !== scriptContext.UserEventType.CREATE) {
                log.debug('Step 2: Exit', 'Not a CREATE event. Exiting script.');
                return;
            }
            log.debug('Step 2: Event Type Check', 'Confirmed CREATE event.');

            const salesOrder = scriptContext.newRecord;
            const customerId = salesOrder.getValue('entity'); // Customer internal ID
            const salesRepId = salesOrder.getValue('salesrep'); // Sales Rep internal ID
            log.debug('Step 3: Sales Order Info', `Customer ID: ${customerId}, Sales Rep ID: ${salesRepId}`);

            if (!customerId || !salesRepId) {
                log.debug('Step 4: Missing Info', 'Customer or Sales Rep is missing. Exiting script.');
                return;
            }
            log.debug('Step 4: Required Fields Check', 'Customer and Sales Rep exist.');

            // Search for overdue invoices
            const invoiceSearch = search.create({
                type: search.Type.INVOICE,
                filters: [
                    ['entity', 'anyof', customerId],
                    'AND',
                    ['status', 'anyof', 'CustInvc:A'],
                    'AND',
                    ['duedate', 'onorbefore', 'today']
                ],
                columns: ['internalid']
            });

            let hasOverdue = false;
            invoiceSearch.run().each(() => {
                hasOverdue = true;
                return false; // Stop after first overdue found
            });
            log.debug('Step 5: Overdue Invoice Check', `Has overdue invoices: ${hasOverdue}`);

            if (!hasOverdue) {
                log.debug('Step 6: No Overdue', 'No overdue invoices found. Exiting script.');
                return;
            }

            // Load sales rep to get manager
            const salesRepRecord = record.load({
                type: record.Type.EMPLOYEE,
                id: salesRepId
            });
            log.debug('Step 6: Sales Rep Loaded', `Sales Rep ID: ${salesRepId}`);

            const managerId = salesRepRecord.getValue('supervisor');
            log.debug('Step 7: Manager Check', `Manager ID: ${managerId}`);

            if (!managerId) {
                log.debug('Step 8: No Manager', 'Sales Rep has no supervisor. Exiting script.');
                return;
            }

            // Send email
            email.send({
                author: runtime.getCurrentUser().id,
                recipients: managerId,
                subject: `Overdue Customer Alert: Sales Order Created`,
                body: `A sales order (#${salesOrder.id}) has been created for customer ${customerId}, who has overdue invoices.`
            });
            log.debug('Step 9: Email Sent', `Notification sent to manager ${managerId}`);

        } catch (e) {
            log.error({
                title: 'Error in afterSubmit',
                details: e
            });
        }
    }

    return {
        afterSubmit: afterSubmit
    };

});
