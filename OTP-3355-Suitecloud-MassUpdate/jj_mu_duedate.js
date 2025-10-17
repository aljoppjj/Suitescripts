/**
 /**
 * @NApiVersion 2.1
 * @NScriptType MassUpdateScript
 */
define(['N/record'],
    
    (record) => {
        /**
         * Defines the Mass Update trigger point.
         * @param {Object} params
         * @param {string} params.type - Record type of the record being processed
         * @param {number} params.id - ID of the record being processed
         * @since 2016.1
         */
        const each = (params) => {

            let invoice = record.load({
                type: params.type,
                id: params.id
            });

            let status = invoice.getValue({ fieldId: 'status' });
            let dueDate = invoice.getValue({ fieldId: 'duedate' });

            if (status === 'Open' && dueDate) {
                let today = new Date();
                let due = new Date(dueDate);
                let diffDays = Math.floor((today - due) / (1000 * 60 * 60 * 24));

                if (diffDays > 7) {

                    let newDueDate = new Date();
                    newDueDate.setDate(today.getDate() + 7);

                    invoice.setValue({
                        fieldId: 'duedate',
                        value: newDueDate
                    });

                    invoice.save();
                }
            }
        }

        return {each}

    });
