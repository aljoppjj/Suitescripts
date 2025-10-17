/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/search', 'N/ui/serverWidget'], (search, serverWidget) => {
    
    const onRequest = (context) => {
        if (context.request.method === 'POST') {
            
            const orderNumber = context.request.parameters.custpage_ordernumber;
            const customerName = context.request.parameters.custpage_customer;
            
            const form = serverWidget.createForm({
                title: 'Search Results'
            });
            
            let results = '<h3>Search Results:</h3>';
            results += '<p>Order Number: ' + orderNumber + '</p>';
            results += '<p>Customer: ' + customerName + '</p>';
            results += '<hr>';
            
            const salesSearch = search.create({
                type: 'salesorder',
                filters: [
                    ['mainline', 'is', 'T'],
                    'AND',
                    ['tranid', 'contains', orderNumber]
                ],
                columns: ['internalid', 'tranid', 'entity']
            });
            
            results += '<ul>';
            salesSearch.run().each((result) => {
                results += '<li>Order: ' + result.getValue('tranid') + 
                          ' - Customer: ' + result.getText('entity') + '</li>';
                return true;
            });
            results += '</ul>';
            
            const htmlField = form.addField({
                id: 'custpage_results',
                type: serverWidget.FieldType.INLINEHTML,
                label: 'Results'
            });
            htmlField.defaultValue = results;
            
            context.response.writePage(form);
        }
    };
    
    return { onRequest };
});