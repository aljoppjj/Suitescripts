/**
 * @NApiVersion 2.1
 * @NScriptType ScheduledScript
 */
define([],
    
    () => {

        /**
         * Defines the Scheduled script trigger point.
         * @param {Object} scriptContext
         * @param {string} scriptContext.type - Script execution context. Use values from the scriptContext.InvocationType enum.
         * @since 2015.2
         */
        const execute = (scriptContext) => {

            const today = new Date();
            const firstDayPrevMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
            const lastDayPrevMonth = new Date(today.getFullYear(), today.getMonth(), 0);

            const startDate = format.format({value: firstDayPrevMonth, type: format.Type.DATE});
            const endDate = format.format({value: lastDayPrevMonth, type: format.Type.DATE});

            const salesOrderSearch = search.create({
            type: search.Type.SALES_ORDER,
            filters: [
                ['trandate', 'within', startDate, endDate]
            ],
            columns: [
                'tranid', 'entity', 'salesrep', 'amount'
            ]
            });

            let salesOrderDetails = '';
            let salesRepId = null;

            salesOrderSearch.run().each(function(result) {
            const tranid = result.getValue('tranid');
            const customer = result.getText('entity');
            const salesrep = result.getText('salesrep');
            const amount = result.getValue('amount');
            salesOrderDetails += `Order#: ${tranid}, Customer: ${customer}, Sales Rep: ${salesrep}, Amount: ${amount}\n`;
            if (!salesRepId) {
                salesRepId = result.getValue('salesrep');
            }
            return true;
            });

            if (!salesOrderDetails) {
            log.audit('No sales orders found for previous month.');
            return;
            }

            const SALES_MANAGER_ID = 123; 

            const salesManagerRec = record.load({
            type: record.Type.EMPLOYEE,
            id: SALES_MANAGER_ID
            });
            const salesManagerEmail = salesManagerRec.getValue('email');

            let salesRepEmail = '';
            if (salesRepId) {
            const salesRepRec = record.load({
                type: record.Type.EMPLOYEE,
                id: salesRepId
            });
            salesRepEmail = salesRepRec.getValue('email');
            }

            email.send({
            author: salesRepId,
            recipients: [salesManagerEmail],
            subject: 'Previous Month Sales Order Details',
            body: salesOrderDetails
            });
        }

        return {execute}

    });
