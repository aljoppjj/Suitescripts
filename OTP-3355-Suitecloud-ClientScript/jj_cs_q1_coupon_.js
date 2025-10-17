/**
*@NApiVersion 2.1
*@NScriptType ClientScript
*/
define([], () => {
    function pageInit(context) {
        const currentRecord = context.currentRecord;
        const couponField = currentRecord.getField({ fieldId: 'custentity2' });
        couponField.isDisabled = true;
    }

    function fieldChanged(context) {
        const currentRecord = context.currentRecord;
        if (context.fieldId === 'custentity1') {
            const isChecked = currentRecord.getValue({ fieldId: 'custentity1' });
            const couponField = currentRecord.getField({ fieldId: 'custentity2' });
            couponField.isDisabled = !isChecked;
            if (!isChecked) {
                currentRecord.setValue({ fieldId: 'custentity2', value: '' });
            }
        }
    }
 
    function saveRecord(context) {
        const currentRecord = context.currentRecord;
        if (currentRecord.getValue({ fieldId: 'custentity1' })) {
            const couponCode = currentRecord.getValue({ fieldId: 'custentity2' });
            if (!couponCode || couponCode.length !== 5) {
                alert('Coupon Code must be exactly 5 characters.');
                return false;
            }
        }
        return true;
    }
    return { pageInit, fieldChanged, saveRecord };
});