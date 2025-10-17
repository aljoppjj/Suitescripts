/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/ui/serverWidget'],
    
    (serverWidget) => {
        /**
         * Defines the Suitelet script trigger point.
         * @param {Object} scriptContext
         * @param {ServerRequest} scriptContext.request - Incoming request
         * @param {ServerResponse} scriptContext.response - Suitelet response
         * @since 2015.2
         */
        const onRequest = (scriptContext) => {
            const request = scriptContext.request;
            const response = scriptContext.response;

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
                    label: 'Phone number'
                });

                form.addField({
                    id: 'custpage_email',
                    type: serverWidget.FieldType.EMAIL,
                    label: 'Email'
                });

                form.addField({
                    id: 'custpage_father',
                    type: serverWidget.FieldType.TEXT,
                    label: "Father's name"
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

            const fName = form.addField({
                id: 'custpage_name_display',
                type: serverWidget.FieldType.TEXT,
                label: 'Name'
            });
            fName.defaultValue = params.custpage_name || '';
            fName.updateDisplayType({ displayType: serverWidget.FieldDisplayType.INLINE });

            const fAge = form.addField({
                id: 'custpage_age_display',
                type: serverWidget.FieldType.INTEGER,
                label: 'Age'
            });
            fAge.defaultValue = params.custpage_age || '';
            fAge.updateDisplayType({ displayType: serverWidget.FieldDisplayType.INLINE });

            const fPhone = form.addField({
                id: 'custpage_phone_display',
                type: serverWidget.FieldType.TEXT,
                label: 'Phone number'
            });
            fPhone.defaultValue = params.custpage_phone || '';
            fPhone.updateDisplayType({ displayType: serverWidget.FieldDisplayType.INLINE });

            const fEmail = form.addField({
                id: 'custpage_email_display',
                type: serverWidget.FieldType.EMAIL,
                label: 'Email'
            });
            fEmail.defaultValue = params.custpage_email || '';
            fEmail.updateDisplayType({ displayType: serverWidget.FieldDisplayType.INLINE });

            const fFather = form.addField({
                id: 'custpage_father_display',
                type: serverWidget.FieldType.TEXT,
                label: "Father's name"
            });
            fFather.defaultValue = params.custpage_father || '';
            fFather.updateDisplayType({ displayType: serverWidget.FieldDisplayType.INLINE });

            const fAddress = form.addField({
                id: 'custpage_address_display',
                type: serverWidget.FieldType.TEXTAREA,
                label: 'Address'
            });
            fAddress.defaultValue = params.custpage_address || '';
            fAddress.updateDisplayType({ displayType: serverWidget.FieldDisplayType.INLINE });


            response.writePage(form);
        }

        return {onRequest}

    });
