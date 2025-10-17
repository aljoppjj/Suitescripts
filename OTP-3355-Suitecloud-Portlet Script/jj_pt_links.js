/**
 * @NApiVersion 2.1
 * @NScriptType Portlet
 */
define([], function() {

    function render(params) {
        const portlet = params.portlet;
        portlet.title = 'Useful Links';

        portlet.addLine({
            url: 'https://suiteanswers.custhelp.com',
            text: 'SuiteAnswers'
        });

        portlet.addLine({
            url: '/app/common/entity/custjob.nl?id=25',
            text: 'View Customer'
        });

        portlet.addLine({
            url: '/app/common/entity/custjob.nl?id=26',
            text: 'View Related Customer',
            indent: 1 
        });
    }

    return { render: render };
});