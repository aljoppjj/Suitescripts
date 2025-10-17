/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/ui/serverWidget', 'N/search', 'N/log'], (serverWidget, search, log) => {

  const onRequest = (context) => {
    try {
      const form = serverWidget.createForm({ title: 'Sales Order List' });

      const sublist = form.addSublist({
        id: 'custpage_salesorder_sublist',
        type: serverWidget.SublistType.LIST,
        label: 'Sales Orders'
      });

      sublist.addField({
        id: 'doc_number',
        type: serverWidget.FieldType.TEXT,
        label: 'Document Number'
      });

      sublist.addField({
        id: 'customer_name',
        type: serverWidget.FieldType.TEXT,
        label: 'Customer Name'
      });

      sublist.addField({
        id: 'subsidiary',
        type: serverWidget.FieldType.TEXT,
        label: 'Subsidiary'
      });

      sublist.addField({
        id: 'order_date',
        type: serverWidget.FieldType.DATE,
        label: 'Order Date'
      });

      const salesOrderSearch = search.create({
        type: search.Type.SALES_ORDER,
        filters: [['mainline', 'is', 'T']],
        columns: [
          'tranid',        
          'entity',        
          'subsidiary',    
          'trandate'       
        ]
      });

      let i = 0;
      salesOrderSearch.run().each(result => {
        sublist.setSublistValue({
          id: 'doc_number',
          line: i,
          value: result.getValue('tranid')
        });

        sublist.setSublistValue({
          id: 'customer_name',
          line: i,
          value: result.getText('entity')
        });

        const subsidiaryText = result.getText('subsidiary');
        if (subsidiaryText) {
          sublist.setSublistValue({
            id: 'subsidiary',
            line: i,
            value: subsidiaryText
          });
        }

        const orderDate = result.getValue('trandate');
        if (orderDate) {
          sublist.setSublistValue({
            id: 'order_date',
            line: i,
            value: orderDate
          });
        }

        i++;
        return i < 10;
      });

      context.response.writePage(form);

    } catch (e) {
      log.error({ title: 'Error in Suitelet', details: e });
    }
  };

  return { onRequest };
});
