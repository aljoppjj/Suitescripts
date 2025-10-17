/**
 * @NApiVersion 2.1
 * @NScriptType MassUpdateScript
 */
define(['N/record'], (record) => {
    
    const each = (params) => {
        try {
            const objRecord = record.load({
                type: params.type,
                id: params.id
            });
            

            const tranDate = objRecord.getValue({ fieldId: 'trandate' });
            
            const today = new Date();
            const firstDayPrevMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
            const lastDayPrevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
            
            const orderDate = new Date(tranDate);
            
            if (orderDate >= firstDayPrevMonth && orderDate <= lastDayPrevMonth) {


                objRecord.setValue({
                    fieldId: 'memo',
                    value: 'Memo updated'
                });
                
            
                objRecord.save();
            }
            
        } catch (e) {
            log.error('Error updating record', e);
        }
    };
    
    return {
        each: each
    };
});