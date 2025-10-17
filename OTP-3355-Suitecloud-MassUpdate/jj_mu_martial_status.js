/**
 /**
 * @NApiVersion 2.1
 * @NScriptType MassUpdateScript
 */
define(['N/record'],
    /**
 * @param{record} record
 */
    (record) => {
        /**
         * Defines the Mass Update trigger point.
         * @param {Object} params
         * @param {string} params.type - Record type of the record being processed
         * @param {number} params.id - ID of the record being processed
         * @since 2016.1
         */
        const each = (params) => {

            var objRecord=record.load({
                type: params.type,
                id: params.id
            })
            let martialStatus= objRecord.getText('custrecordjj_marital_status')

            if(martialStatus === 'unmarried')
                
            objRecord.setText({
                fieldId: 'custrecordjj_marital_status',
                text: 'Married'
            })

            objRecord.save()
        }

        return {each}

    });
