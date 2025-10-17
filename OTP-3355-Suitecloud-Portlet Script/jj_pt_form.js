/**
 * @NApiVersion 2.1
 * @NScriptType Portlet
 */
define(['N/ui/serverWidget'], function(serverWidget) {

    function render(params) {
        const portlet = params.portlet;
        portlet.title = 'Simple Form Portlet';


        portlet.addField({
            id: 'custpage_mytext',
            type: serverWidget.FieldType.TEXT,
            label: 'Enter Something'
        });


        portlet.setSubmitButton({
            label: 'Submit',
            url: '/app/site/hosting/scriptlet.nl?script=customscript_jj_st_display_&deploy=customdeploy_jj_st_display_'
        });
    }

    return {
        render: render
    };
});