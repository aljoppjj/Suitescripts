/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/ui/serverWidget', 'N/record', 'N/log'], (serverWidget, record, log) => {

  const onRequest = (context) => {
    try {
      const { request, response } = context;

      if (request.method === 'GET') {
        const form = serverWidget.createForm({ title: 'Create Patient Record' });

        form.addField({
          id: 'custpage_name',
          type: serverWidget.FieldType.TEXT,
          label: 'Name'
        }).isMandatory = true;

        form.addField({
          id: 'custpage_age',
          type: serverWidget.FieldType.INTEGER,
          label: 'Age'
        }).isMandatory = true;

        const sexField = form.addField({
          id: 'custpage_sex',
          type: serverWidget.FieldType.SELECT,
          label: 'Sex'
        });
        sexField.isMandatory = true;
        sexField.addSelectOption({ value: '', text: '' });
        sexField.addSelectOption({ value: 'M', text: 'Male' });
        sexField.addSelectOption({ value: 'F', text: 'Female' });
        sexField.addSelectOption({ value: 'O', text: 'Others' });

        form.addField({
          id: 'custpage_address',
          type: serverWidget.FieldType.TEXTAREA,
          label: 'Address'
        }).isMandatory = true;

        form.addSubmitButton({ label: 'Submit' });
        response.writePage(form);
        return;
      }

      const params = request.parameters;

      const name = params.custpage_name?.trim();
      const age = parseInt(params.custpage_age, 10);
      const sex = params.custpage_sex;
      const address = params.custpage_address?.trim();

      if (!name || !age || !sex || !address) {
        throw new Error('All fields are mandatory.');
      }

      const patientRec = record.create({
        type: 'customrecord_patient',
        isDynamic: true
      });

      patientRec.setValue({ fieldId: 'custrecord_patient_name', value: name });
      patientRec.setValue({ fieldId: 'custrecord_patient_age', value: age });
      patientRec.setValue({ fieldId: 'custrecord_patient_sex', value: sex });
      patientRec.setValue({ fieldId: 'custrecord_patient_address', value: address });

      const patientId = patientRec.save();

      response.write(`Patient record created successfully. Internal ID: ${patientId}`);

    } catch (e) {
      log.error({ title: 'Error Creating Patient Record', details: e });
      context.response.write(`Error: ${e.message}`);
    }
  };

  return { onRequest };
});
