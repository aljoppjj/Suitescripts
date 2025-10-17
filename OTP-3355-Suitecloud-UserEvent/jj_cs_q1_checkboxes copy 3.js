/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/log', 'N/runtime', 'N/email'],
    /**
 * @param{log} log
 * @param{runtime} runtime
 * @param{email} email
 */
    function (log, runtime, email) {

        /**
         * Defines the function definition that is executed after record is submitted.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @since 2015.2
        */
                
        function afterSubmit (scriptContext) {
            try {
                log.audit('User Event Triggered', 'Type: ' + scriptContext.type);

                const eventType = scriptContext.type;
                const newRecord = scriptContext.newRecord;
                const oldRecord = scriptContext.oldRecord;

                const entityType = newRecord.type;
                const recordId = newRecord.id;

                const userId = runtime.getCurrentUser().id;
                const senderId = 468;

                let subject = '';
                let body = '';

                if (eventType === scriptContext.UserEventType.CREATE) {
                    const entityName = newRecord.getValue({ fieldId: 'entityid' }) || newRecord.getValue({ fieldId: 'companyname' }) || newRecord.getValue({ fieldId: 'firstname' });
                    subject = 'Record Created:' + entityType;
                    body =
                        'A new record is created.\n\n' +
                        'Entity Type: ' + entityType + '\n' +
                        'Internal ID: ' + recordId + '\n' +
                        'Name: ' + entityName + '\n' +
                        'Message: Record created successfully!';
                }

                else if (eventType === scriptContext.UserEventType.DELETE) {
                    const deletedRecordID = oldRecord.id;
                    subject = 'Record Deleted:' + entityType;
                    body =
                        'A record is deleted.\n\n' +
                        'Entity Type: ' + entityType + '\n' +
                        'Internal ID: ' + deletedRecordID + '\n' +
                        'Message: Record deleted successfully!';
                }

                if (eventType === scriptContext.UserEventType.CREATE || eventType === scriptContext.UserEventType.DELETE) {
                    email.send({
                        author: senderId,
                        recipients: userId,
                        subject: subject,
                        body: body
                    });

                    log.debug('Email sent!', 'Sent to: ' + userId + 'for event ' + eventType);
                }
            }

            catch (e) {
                log.debug({
                    title: 'Error in sending email!',
                    details: e
                });
            }
        }

        return {
            afterSubmit: afterSubmit
        };

    });
