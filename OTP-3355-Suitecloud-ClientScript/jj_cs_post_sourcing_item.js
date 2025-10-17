/**
* @NApiVersion 2.x
* @NScriptType ClientScript
*/
define([], function() {
 
    function postSourcing(context) {
        if (context.sublistId === 'item' && context.fieldId === 'item') {
            let rec = context.currentRecord;
            let item = rec.getCurrentSublistValue({
                sublistId: 'item',
                fieldId: 'item'
            });
 
            if (item == 66) { 
                alert('Special item selected!');
            }
        }
    }
 
    return { postSourcing: postSourcing };
});