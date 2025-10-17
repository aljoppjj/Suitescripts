/**
* @NApiVersion 2.x
* @NScriptType ClientScript
* @NModuleScope SameAccount
*/
define([], function() {
 
    function pageInit(context) {
        const currentRecord = context.currentRecord;
        const couponField = currentRecord.getField({ fieldId: 'custbody3' });
        couponField.isDisabled = true;
    }
 
    
 
    return {
        pageInit: pageInit,
        fieldChanged: fieldChanged
    };
});