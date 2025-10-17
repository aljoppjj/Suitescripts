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
            
            var objRecord = record.load({
                type:params.type,
                id:params.id
            })

            var lineCount= objRecord.getLineCount({sublistId:'item'})

            for(var i=0;i<lineCount;i++)
            {
                objRecord.setSublistValue({
                    sublistId:'item',
                    fieldId:'quantity',
                    value:5,
                    line:i
                })
            }

            var id=objRecord.save();
            log.debug("id Saved",id)

        }

        return {each}

    });
