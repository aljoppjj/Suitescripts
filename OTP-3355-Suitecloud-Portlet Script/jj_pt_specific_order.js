/**
 * @NApiVersion 2.1
 * @NScriptType Portlet
 */
define(['N/search', 'N/ui/serverWidget'], (search, serverWidget) => {
    
    const render = (params) => {
        const list = params.portlet;
        
        list.title = 'Recent Sales Orders';
        
        list.addColumn({
            id: 'orderid',
            type: serverWidget.FieldType.TEXT,
            label: 'Order ID',
            align: serverWidget.LayoutJustification.LEFT
        });
        
        list.addColumn({
            id: 'ordernumber',
            type: serverWidget.FieldType.TEXT,
            label: 'Order Number',
            align: serverWidget.LayoutJustification.LEFT
        });
        
        list.addColumn({
            id: 'customer',
            type: serverWidget.FieldType.TEXT,
            label: 'Customer',
            align: serverWidget.LayoutJustification.LEFT
        });
        
        const salesSearch = search.create({
            type: 'salesorder',
            filters: [['mainline', 'is', 'T']],
            columns: ['internalid', 'tranid', 'entity']
        });
        
        let count = 0;
        
        salesSearch.run().each((result) => {
            list.addRow({
                orderid: result.getValue('internalid'),
                ordernumber: result.getValue('tranid'),
                customer: result.getText('entity')
            });
            
            count++;
            if (count >= 5) {
                return false;
            }
            return true;
        });
    };
    
    return { render };
});