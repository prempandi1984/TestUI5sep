sap.ui.define([
    'act/fin/ar/controller/BaseController',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator'
], function(BaseController, Filter, FilterOperator) {
    'use strict';
    return BaseController.extend("act.fin.ar.controller.View1",{
        onInit: function(){
            this.oRouter = this.getOwnerComponent().getRouter();
        },
        onNext: function(sPath){
            // var oView = this.getView();
            // var oAppCon = oView.getParent();
            // oAppCon.to("idView2");
            this.oRouter.navTo("superman",{
                pid: sPath.replace("/","")
            });
        },
        onAdd: function(){
            this.oRouter.navTo("add");
        },
        onItemDelete: function(oEvent) {
            var oListItemToBeDeleted = oEvent.getParameter("listItem");
            var oList = oEvent.getSource();
            oList.removeItem(oListItemToBeDeleted);
        },
        onSelChange: function(oEvent){
            var oSelectItem = oEvent.getParameter("listItem");
            var sPath = oSelectItem.getBindingContextPath();
            // var oView2 = this.getView().getParent().getPages()[1];
            // var oView2 = this.getView().getParent().getParent().getDetailPages()[0];
            // oView2.bindElement(sPath,{expand:"To_Supplier"});
            this.onNext(sPath);
        },

        onSearch: function(oEvent){
            var sValue = oEvent.getParameter("query");
            if(sValue === undefined){
                sValue = oEvent.getParameter("newValue");
            }
            var oFilter1 = new Filter("CATEGORY",FilterOperator.Contains,sValue);
            var oFilter2 = new Filter("type",FilterOperator.Contains,sValue);
            var oFilter = new Filter({
                filters:[oFilter1, oFilter2], and : false});
            var oBindingsItems=this.getView().byId("idList").getBinding("items");
            oBindingsItems.filter([oFilter1]);
        }
    }); 
});