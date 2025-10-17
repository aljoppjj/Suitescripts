/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/ui/serverWidget', 'N/search', 'N/log'], (serverWidget, search, log) => {
  const onRequest = (context) => {
    try {
      const { request, response } = context;
      const form = serverWidget.createForm({ title: 'Sales Orders to Fulfill or Bill' });

      const subsidiaryField = form.addField({
        id: 'custpage_subsidiary',
        type: serverWidget.FieldType.SELECT,
        label: 'Subsidiary',
        source: 'subsidiary'
      });
      subsidiaryField.isMandatory = false;

      const customerField = form.addField({
        id: 'custpage_customer',
        type: serverWidget.FieldType.SELECT,
        label: 'Customer',
        source: 'customer'
      });
      customerField.isMandatory = false;

      form.addSubmitButton({ label: 'Filter' });

      const selectedSubsidiary = request.parameters.custpage_subsidiary || '';
      const selectedCustomer = request.parameters.custpage_customer || '';

      const sublist = form.addSublist({
        id: 'custpage_salesorder_sublist',
        type: serverWidget.SublistType.LIST,
        label: 'Sales Orders'
      });

      const fields = [
        { id: 'internalid', label: 'Internal ID', type: serverWidget.FieldType.TEXT },
        { id: 'tranid', label: 'Document Name', type: serverWidget.FieldType.TEXT },
        { id: 'trandate', label: 'Date', type: serverWidget.FieldType.DATE },
        { id: 'status', label: 'Status', type: serverWidget.FieldType.TEXT },
        { id: 'entity', label: 'Customer Name', type: serverWidget.FieldType.TEXT },
        { id: 'subsidiary', label: 'Subsidiary', type: serverWidget.FieldType.TEXT },
        { id: 'department', label: 'Department', type: serverWidget.FieldType.TEXT },
        { id: 'class', label: 'Class', type: serverWidget.FieldType.TEXT },
        { id: 'linesequencenumber', label: 'Line Number', type: serverWidget.FieldType.INTEGER },
        { id: 'subtotal', label: 'Subtotal', type: serverWidget.FieldType.CURRENCY },
        { id: 'taxamount', label: 'Tax', type: serverWidget.FieldType.CURRENCY },
        { id: 'total', label: 'Total', type: serverWidget.FieldType.CURRENCY }
      ];

      fields.forEach(field => {
        sublist.addField({
          id: field.id,
          label: field.label,
          type: field.type
        });
      });

      const filters = [['mainline', 'is', 'F'], 'AND', ['status', 'anyof', ['SalesOrd:A', 'SalesOrd:B']]];
      if (selectedSubsidiary) {
        filters.push('AND', ['subsidiary', 'anyof', selectedSubsidiary]);
      }
      if (selectedCustomer) {
        filters.push('AND', ['entity', 'anyof', selectedCustomer]);
      }

      const salesOrderSearch = search.create({
        type: search.Type.SALES_ORDER,
        filters: filters,
        columns: [
        'internalid',
        'tranid',
        'trandate',
        'status',
        'entity',
        'subsidiary',
        'department',
        'class',
        'linesequencenumber',
        'taxtotal',
        'total'
        ]

      });

      let i = 0;
      salesOrderSearch.run().each(result => {
        fields.forEach(field => {
          const value = field.type === serverWidget.FieldType.DATE
            ? result.getValue(field.id)
            : result.getText(field.id) || result.getValue(field.id);
          if (value !== null && value !== undefined && value !== '') {
            sublist.setSublistValue({
                id: field.id,
                line: i,
                value: String(value)
            });
        }
        });
        i++;
        return i < 1000;
      });

      response.writePage(form);
    } catch (e) {
      log.error({ title: 'Suitelet Error', details: e });
      context.response.write('An error occurred. Check script logs.');
    }
  };

  return { onRequest };
});
