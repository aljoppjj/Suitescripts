/**
 * @NApiVersion 2.1
 * @NScriptType Portlet
 */
define([], () => {
    
    const render = (params) => {
        const portlet = params.portlet;
        portlet.title = 'Greeting';
        portlet.html = '<div style="padding: 20px;">Good Morning</div>';
    };
    
    return { render };
});