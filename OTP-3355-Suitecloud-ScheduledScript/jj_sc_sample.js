/**
 * @NApiVersion 2.1
 * @NScriptType ScheduledScript
 */
define(['N/record', 'N/search'],
    /**
 * @param{record} record
 * @param{search} search
 */
    (record, search) => {

        /**
         * Defines the Scheduled script trigger point.
         * @param {Object} scriptContext
         * @param {string} scriptContext.type - Script execution context. Use values from the scriptContext.InvocationType enum.
         * @since 2015.2
         */
        const execute = (scriptContext) => {
            let searchObj=search.load({
                id:savedsearchid
            });

            searchObj.run().each(function(result) {
            let entity = result.getValue({
                name: 'entity'
            });
            let subsidiary = result.getValue({
                name: 'subsidiary'
            });
            return true;
        });

        }

        return {execute}

    });
