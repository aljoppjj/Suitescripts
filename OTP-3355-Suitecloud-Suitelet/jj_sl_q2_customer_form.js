/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/ui/serverWidget', 'N/record', 'N/log', 'N/search'], 
(serverWidget, record, log, search) => {

  const onRequest = (context) => {
    try {
      const request = context.request;
      const response = context.response;

      if (request.method === 'GET') {
        const form = serverWidget.createForm({ title: 'Customer Information Form' });

        form.addField({
          id: 'cust_name',
          type: serverWidget.FieldType.TEXT,
          label: 'Name'
        });

        form.addField({
          id: 'cust_email',
          type: serverWidget.FieldType.EMAIL,
          label: 'Email'
        });

        form.addField({
          id: 'cust_phone',
          type: serverWidget.FieldType.PHONE,
          label: 'Phone'
        });

        const salesRepField = form.addField({
          id: 'cust_salesrep',
          type: serverWidget.FieldType.SELECT,
          label: 'Sales Rep'
        });

        salesRepField.addSelectOption({ value: '', text: '' });

        const salesRepSearch = search.create({
          type: search.Type.EMPLOYEE,
          filters: [['salesrep', 'is', 'T']],
          columns: ['entityid']
        });

        salesRepSearch.run().each(result => {
          salesRepField.addSelectOption({
            value: result.id,
            text: result.getValue('entityid')
          });
          return true;
        });

        form.addField({
          id: 'cust_subsidiary',
          type: serverWidget.FieldType.SELECT,
          label: 'Subsidiary',
          source: 'subsidiary'
        });

        form.addSubmitButton({ label: 'Submit' });
        response.writePage(form);
        return;
      }

      const params = request.parameters;
      const customerRec = record.create({ type: record.Type.CUSTOMER, isDynamic: true });

      customerRec.setValue({ fieldId: 'companyname', value: params.cust_name || '' });
      customerRec.setValue({ fieldId: 'email', value: params.cust_email || '' });
      customerRec.setValue({ fieldId: 'phone', value: params.cust_phone || '' });

      if (params.cust_salesrep) {
        customerRec.setValue({
          fieldId: 'salesrep',
          value: parseInt(params.cust_salesrep, 10)
        });
      }

      if (params.cust_subsidiary) {
        customerRec.setValue({
          fieldId: 'subsidiary',
          value: parseInt(params.cust_subsidiary, 10)
        });
      }

      const customerId = customerRec.save();

      const saved = record.load({ type: record.Type.CUSTOMER, id: customerId });
      const salesrepText = saved.getText({ fieldId: 'salesrep' }) || '';
      const subsidiaryText = saved.getText({ fieldId: 'subsidiary' }) || '';

      const form = serverWidget.createForm({ title: 'Customer Created Successfully' });

      form.addField({
        id: 'custpage_name_disp',
        type: serverWidget.FieldType.INLINEHTML,
        label: 'Name'
      }).defaultValue = `<div><b>Name:</b> ${params.cust_name || ''}</div>`;

      form.addField({
        id: 'custpage_email_disp',
        type: serverWidget.FieldType.INLINEHTML,
        label: 'Email'
      }).defaultValue = `<div><b>Email:</b> ${params.cust_email || ''}</div>`;

      form.addField({
        id: 'custpage_phone_disp',
        type: serverWidget.FieldType.INLINEHTML,
        label: 'Phone'
      }).defaultValue = `<div><b>Phone:</b> ${params.cust_phone || ''}</div>`;

      form.addField({
        id: 'custpage_salesrep_disp',
        type: serverWidget.FieldType.INLINEHTML,
        label: 'Sales Rep'
      }).defaultValue = `<div><b>Sales Rep:</b> ${salesrepText}</div>`;

      form.addField({
        id: 'custpage_subsidiary_disp',
        type: serverWidget.FieldType.INLINEHTML,
        label: 'Subsidiary'
      }).defaultValue = `<div><b>Subsidiary:</b> ${subsidiaryText}</div>`;

      form.addField({
        id: 'custpage_customer_id',
        type: serverWidget.FieldType.INLINEHTML,
        label: 'Customer ID'
      }).defaultValue = `<div><b>Internal ID:</b> ${customerId}</div>`;

      response.writePage(form);

    } catch (error) {
      log.error({ title: 'Error Occurred', details: error });
      context.response.write('An error occurred. Please check the script logs.');
    }
  };

  return { onRequest };
});
