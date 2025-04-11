sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
    "sap/ui/model/Sorter"
], (Controller,JSONModel,Filter,FilterOperator,Sorter) => {
    "use strict";

    return Controller.extend("app.splitapp.controller.MasterView", {
        onInit() {

           
        },

        onDetailView:function(){
            // get the router object
            let oRouter=this.getOwnerComponent().getRouter()
            // use the navigation method
            oRouter.navTo("RouteDetail")
        },
        onSort:function(){
            if(!this.bDescending){
                this.bDescending=false;
            }            
            var oSorter=new Sorter("toolsName",this.bDescending);
            var oList=this.getView().byId("idListCtrl");
            var oBiniding=oList.getBinding("items");
            oBiniding.sort(oSorter);
              this.bDescending=!this.bDescending;
        },
        onSeach:function(oEvent){
            var searchString=oEvent.getParameter("query")|| oEvent.getParameter("newValue");
            var oName=new Filter("toolsName",FilterOperator.Contains,searchString );
            var oAvail=new Filter("availability",FilterOperator.Contains,searchString);
            var aFilter=[oName,oAvail];
            var mainFilter=new Filter({
                filters:aFilter,
                and:false
            });
            var oList=this.getView().byId("idListCtrl");
            var oBiniding=oList.getBinding("items");
            oBiniding.filter(mainFilter);
        },
      
        onItemSelect:function(oEvent){
            var oList=oEvent.getParameter("listItem");
            let sPath=oList.getBindingContextPath()
            let aItems=sPath.split("/")
            
            let id= aItems[aItems.length-1]
            let oRouter=this.getOwnerComponent().getRouter()
            oRouter.navTo("RouteDetail",{
               index:id
            })




            // // when i click it should navigate to the next page
            //        var oList=oEvent.getParameter("listItem");
            // // var sPath=oList.oBindingContexts.ToolModel.sPath
            // // ................secondly get the binding context path
            //         var sPath=oList.getBindingContextPath();
            //         var completePath="ToolModel>" + sPath;
            //         console.log(completePath);
        
            // // .....get the object of detail view from the parent VIEW
            //         var oApp=this.getView().getParent();
            //         // var oDetail=oApp.mAggregations.pages[1]
            //        var oDetail=oApp.getAggregation("pages")[1];
                 
            //  //...BIND THe PAGE WITH THE PATH
            //      oDetail.bindElement(completePath);
                 
            //           this.onDetailView();
                 
                 
                 
        }




    });
});