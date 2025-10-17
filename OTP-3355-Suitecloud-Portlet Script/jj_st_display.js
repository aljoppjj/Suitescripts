/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/ui/serverWidget'], function(serverWidget) {

    function onRequest(context) {
        if (context.request.method === 'GET') {
            const form = serverWidget.createForm({ title: 'Simple Suitelet Form' });
            form.addField({
                id: 'custpage_mytext',
                type: serverWidget.FieldType.TEXT,
                label: 'Enter Something'
            });
            form.addSubmitButton({ label: 'Submit' });
            context.response.writePage(form);
        } else {
            const textValue = context.request.parameters.custpage_mytext;
            const form = serverWidget.createForm({ title: 'Form Submitted' });
            form.addField({
                id: 'custpage_mytext',
                type: serverWidget.FieldType.TEXT,
                label: 'You Entered'
            }).defaultValue = textValue;
            context.response.writePage(form);
        }
    }

    return { onRequest: onRequest };
});