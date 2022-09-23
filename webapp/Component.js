sap.ui.define([
    'sap/ui/core/UIComponent'
], function(UIComponent) {
    'use strict';
    return UIComponent.extend("act.fin.ar.Component",{
        metadata : {
            manifest : "json"
        },
        init: function() {
            sap.ui.core.UIComponent.prototype.init.apply(this);
            var oRouter = this.getRouter();
            oRouter.initialize();
        },
        // createContent: function(){
        //     var oView = new sap.ui.view({
        //         viewName: "act.fin.ar.view.App", id:"idAppView", type: "XML"
        //     });

        //     var oView1 = new sap.ui.view({
        //         viewName: "act.fin.ar.view.View1", id:"idView1", type: "XML"
        //     });

        //     var oView2 = new sap.ui.view({
        //         viewName: "act.fin.ar.view.View2", id:"idView2", type: "XML"
        //     });

        //     var oAppCon = oView.byId("appCon");
        //     // oAppCon.addPage(oView1).addPage(oView2);
        //     oAppCon.addMasterPage(oView1).addDetailPage(oView2);
        //     return oView;
        // },
        destroy: function(){}
    });
});