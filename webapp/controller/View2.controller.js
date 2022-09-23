sap.ui.define([
    'act/fin/ar/controller/BaseController',
    'act/fin/ar/util/formatter',
    'sap/ui/core/Fragment',
    'sap/m/MessageBox',
    'sap/m/MessageToast'
], function(BaseController, Formatter, Fragment, MessageBox, MessageToast) {
    'use strict';
    return BaseController.extend("act.fin.ar.controller.View2",{
        formatter: Formatter,
        onInit: function(){
            this.oRouter = this.getOwnerComponent().getRouter();
            //register the event handler for Route matchd
            this.oRouter.getRoute("superman").attachMatched(this.herculis, this);
        },
        herculis: function(oEvent){
            console.log(oEvent);
            var params = oEvent.getParameter("arguments");
            var sPath = "/" + params.pid;
            this.getView().bindElement(sPath,{
                expand: 'To_Supplier'
            });
        },
        // onInit: function(){
        //     this.oRouter = this.getOwnerComponent().getRouter();
        //     this.oRouter.getRoute("spiderman").attachMatched(this.herculis, this);
        // },
        // herculis: function(oEvent) {
        //     console.log(oEvent);
        //     var params = oEvent.getParameter("arguments");
        //     var sPath = "/" + params.pid;
        //     this.getView().bindElement(sPath, {
        //         expand: 'To_Supplier' })
        // },
        onBack: function() {
            this.getView().getParent().to("idView1");
        },

        onApprove: function(){
            var msgConfirm = this.getView().getModel("i18n").getResourceBundle().getText("msgConfirm");
            MessageBox.confirm(msgConfirm,{onClose: this.onMsgConfirm.bind(this)});
        }
        ,

        onMsgConfirm: function(status){
            var msgConfirm = this.getView().getModel("i18n").getResourceBundle().getText("orderComplete",["5555"]);
            console.log(status);
            console.log(this);
            if(status === "OK") {
                MessageToast.show(msgConfirm);
            }else{
                MessageBox.warning("You have Cancelled it");
            }
        },
        onReject: function(){
            MessageBox.error("the order has been rejected");
        },
        cityPopup: null,
        oCityField: null,
        onPopupConfirm: function(oEvent){
            //S1: Get to know which item user selected
            var oWhichItemUserSelect = oEvent.getParameter("selectedItem");
            // Get the label from the item object- name of the city
            var sLabel = oWhichItemUserSelect.getLabel();
            // set the data back to the input field
            if (oEvent.getSource().getId().indexOf("city") != -1) {
                this.oCityField.setValue(sLabel);
            } else {

            }
            
        },
        onF4Help: function(oEvent){
            //IF lo_alv IS NOT INITIAL
            //alert("this function is under construction 😂😂")
            //Inside the promise, we cannot access 'this' pointer as controller object
            //so we create a local variable as copy of this, and use the local variable which
            //is accessible always in the callbacks
            var that = this;
            this.oCityField = oEvent.getSource();
            //We add a condition to avoid creation of duplicate objects again and again
            if(!this.cityPopup){
                Fragment.load({
                    id: 'city',
                    name:'act.fin.ar.fragments.popup',
                    controller: this
                })
                //it is a promise because fragment.load is going to load fragment asynchronously
                .then(function(oFragment){
                    //here inside the callback/promise we should use local variable only
                    that.cityPopup = oFragment;
                    that.cityPopup.setTitle("Cities");
                    //Allow the fragment to access the resources which view have access to like MODEL
                    that.getView().addDependent(that.cityPopup);
                    that.cityPopup.setMultiSelect(false);
                    //Syntax 4  for agg binding
                    that.cityPopup.bindAggregation("items",{
                        path: '/cities',
                        template: new sap.m.DisplayListItem({
                            label: '{name}',
                            value: '{famousFor}'
                        })
                    });

                    that.cityPopup.open();
                });
            }else{
                this.cityPopup.open();
            }
        },
        supplierPopup: null,
        onFilter:function(){
            var that = this;
            if(!this.supplierPopup){
                Fragment.load({
                    id: 'supplier',
                    name:'act.fin.ar.fragments.popup',
                    controller:this
                })
                .then(function(oFragment){
                    that.supplierPopup = oFragment;
                    that.supplierPopup.setTitle("suppliers");
                    that.getView().addDependent(that.supplierPopup);

                    that.supplierPopup.bindAggregation("items",{
                        path:'/suppliers',
                        template : new sap.m.DisplayListItem({
                            label: '{name}',
                            value: '{sinceWhen}'
                        })
                    }); that.supplierPopup.open();
                });
            } else { this.supplierPopup.open();
            }
        }
    }); 
});