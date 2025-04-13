sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], (BaseController,JSONModel,Fragment,Filter,FilterOperator) => {
    "use strict";

    return BaseController.extend("app.splitapp.controller.DetailView", {
        onInit() {

           let oRouter=this.getOwnerComponent().getRouter();
           oRouter.attachRoutePatternMatched(this.onRouteMatched,this)
        },
      onRouteMatched:function(oEvent){
          
           let index= oEvent.getParameter("arguments").index
           let sPath="ToolModel>/toolListSet/"+index
           let oView=this.getView()
           oView.bindElement(sPath)

        //.....code for table  
            //   let oModel=this.getModel("ToolModel")
                                                     
            //   let searchString=oModel.getProperty("/toolListSet/"+index+"/toolsName")
            //   let filterName=new sap.ui.model.Filter("toolsName",
            //                                     sap.ui.model.FilterOperator.EQ,
            //                                     searchString
            //                                         )
            // //  let aFilter=[filterName]
            //  let oTable=this.getView().byId("idMTable")
            // let bindingInfo=oTable.getBinding("items")
            // bindingInfo.filter([filterName]);
      },
      onFilter:function(){
       let aFilter=[]
       let sName=this.getView().byId("idInptSupp").getValue()
       let sCity=this.getView().byId("idInptCity").getValue()
       if(sName){
         let filterName=new Filter("supplierName", FilterOperator.Contains,sName)                    
         aFilter.push(filterName)
       }
       if(sCity){
        let filterName=new Filter("location", FilterOperator.Contains,sCity)                    
        aFilter.push(filterName)
       }
     
       let oTable=this.getView().byId("idMTable")
       let bindingInfo=oTable.getBinding("items")
            bindingInfo.filter(aFilter);

        
      },
      onConfimSupp:function(oEvent){
        let oSeletedItems=oEvent.getParameter("selectedItem")
        let sValue=oSeletedItems.getProperty("info")
        let oInput=sap.ui.getCore().byId(this.inputFiled)
            oInput.setValue(sValue)
        // confirm the choice 
        // we need the value that selected
        // we need to place it exactly at the same input field where the value was selected
        // you are setting the value on that input field
      },
          
      onF4Help:function(oEvent){
        // let myInptFieldwhere the popup actually popped up
         this.inputFiled=oEvent.getSource().getId()
         let oModel=this.getView().getModel("ToolModel")
          let aData=oModel.getProperty("/supplierSet")
          let deepCopy=JSON.parse(JSON.stringify(aData))
          let oModelFrag=new JSONModel({newSuppSet:deepCopy})
       
        if(!this.oDiolog){
          this.oDiolog=Fragment.load({
            fragmentName:"app.splitapp.fragments.popUp",
            controller:this
          }).then((dialog)=>{
            this.oDiolog=dialog
            this.getView().addDependent(this.oDiolog)
            this.getView().setModel(oModelFrag,"FragementModel")
            this.oDiolog.open()
          })
        }else{
           this.oDiolog.open()
        }

         // what is the diff bw normal funciton and arrow funtion
        // this takes it value from the lexical context it is placed in.
        // arrow function are easy to wirte bc of its easier synax.
        // have you heard about es6 as against es5 which is free demo server.
        // it is a consortium that is resopoinsible bringin newer ways of coding syles
        //   ex: templeate literals, let const, spread operator, arrow functions.

      }





    //   onF4Help:function(){
        
    //     if(!this.oDiolog){
    //       this.oDiolog=Fragment.load({
    //         fragmentName:"app.splitapp.fragments.popUp",
    //         controller:this
    //       }).then(function(dialog){
    //         this.oDiolog=dialog
    //         this.getView().addDependent(this.oDiolog)
    //         this.oDiolog.open()
    //       }.bind(this))
    //     }else{
    //        this.oDiolog.open()
    //     }
    //   }




      
    //   onF4Help:function(){
    //     let that=this
    //     if(!this.oDiolog){
    //       this.oDiolog=Fragment.load({
    //         fragmentName:"app.splitapp.fragments.popUp",
    //         controller:this
    //       }).then(function(dialog){
    //         that.oDiolog=dialog
    //         that.getView().addDependent(that.oDiolog)
    //         that.oDiolog.open()
    //       })
    //     }else{
    //        this.oDiolog.open()
    //     }




    //   }














        // onListView:function(){
        //     // get the router object
        //     let oRouter=this.getOwnerComponent().getRouter()
        //     // use the navigation method
        //     oRouter.navTo("RouteMaster")
        // }






    });
});