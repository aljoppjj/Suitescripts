/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/ui/serverWidget'], (serverWidget) => {
    
    const onRequest = (context) => {
        try {
            const request = context.request;
            const response = context.response;

            if (request.method === 'GET') {
                const form = serverWidget.createForm({ title: 'Registration Form' });

                form.addField({
                    id: 'custpage_name',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Name'
                });

                form.addField({
                    id: 'custpage_age',
                    type: serverWidget.FieldType.INTEGER,
                    label: 'Age'
                });

                form.addField({
                    id: 'custpage_phone',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Phone Number'
                });

                form.addField({
                    id: 'custpage_email',
                    type: serverWidget.FieldType.EMAIL,
                    label: 'Email'
                });

                form.addField({
                    id: 'custpage_father',
                    type: serverWidget.FieldType.TEXT,
                    label: "Father's Name"
                });

                form.addField({
                    id: 'custpage_address',
                    type: serverWidget.FieldType.TEXTAREA,
                    label: 'Address'
                });

                form.addSubmitButton({ label: 'Register' });
                response.writePage(form);
                return;
            }


            const params = request.parameters;
            const form = serverWidget.createForm({ title: 'Registration Submitted' });

            const addInlineField = (id, type, label, value) => {
                const field = form.addField({ id, type, label });
                field.defaultValue = value || '';
                field.updateDisplayType({ displayType: serverWidget.FieldDisplayType.INLINE });
            };

            addInlineField('custpage_name_display', serverWidget.FieldType.TEXT, 'Name', params.custpage_name);
            addInlineField('custpage_age_display', serverWidget.FieldType.INTEGER, 'Age', params.custpage_age);
            addInlineField('custpage_phone_display', serverWidget.FieldType.TEXT, 'Phone Number', params.custpage_phone);
            addInlineField('custpage_email_display', serverWidget.FieldType.EMAIL, 'Email', params.custpage_email);
            addInlineField('custpage_father_display', serverWidget.FieldType.TEXT, "Father's Name", params.custpage_father);
            addInlineField('custpage_address_display', serverWidget.FieldType.TEXTAREA, 'Address', params.custpage_address);

            response.writePage(form);

        } catch (error) {
            log.error('Error in Suitelet', error)
        } 
    };

    return { onRequest };
});
