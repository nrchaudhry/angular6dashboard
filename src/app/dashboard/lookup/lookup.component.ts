import { Component, OnInit } from '@angular/core';
import { OnFailService } from "../../services/on-fail.service";
import { LookupService } from "../../services/lookup.service";
import { ToastrService } from 'ngx-toastr';
import { ButtonRendererComponent } from "../../renderer/button-renderer.component";

declare var $: any;
declare var jsPDF: any;

@Component({
  selector: 'app-lookup',
  templateUrl: './lookup.component.html',
  styleUrls: ['./lookup.component.css']
})
export class LookupComponent implements OnInit {

   gridApi;
   gridColumnApi;

   frameworkComponents: any;

   columnDefs;
   defaultColDef;
   rowData: any[];

  cell_center = {
    "text-align": "center",
    color: "black",
    "font-weight": "500"
  };

  constructor(
    private _toaster: ToastrService,
    private _lookup_: LookupService , private _onFail_ : OnFailService) {
    this.columnDefs = [
      {
        headerName: "#",
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true,
        suppressSizeToFit: true,
        cellStyle: this.cell_center
      },
      {
        headerName: "Edit",
        cellRenderer: "buttonRenderer",
        cellRendererParams: {
          onClick: this.editModel.bind(this),
          label: "Click 2"
        },
        cellClass: "grid-align",
        cellStyle: this.cell_center
      },
      {
        headerName: "Code",
        field: "code",
        headerClass: "resizable-header",
        cellStyle: this.cell_center
      },
      {
        headerName: "Entity Name",
        field: "entityname",
        cellStyle: this.cell_center
      },
      {
        headerName: "Entity Status",
        field: "entity_STATUS",
        cellStyle: this.cell_center
      },
      {
        headerName: "Description",
        field: "description",
        cellStyle: this.cell_center
      },
      {
        headerName: "isActive",
        field: "isactive",
        cellStyle: this.cell_center
      }
    ];
    this.defaultColDef = { resizable: true };
    this.frameworkComponents = { buttonRenderer: ButtonRendererComponent };
  }

 

  ngOnInit() {
  }

  sizeToFit() {
    this.gridApi.sizeColumnsToFit();
  }

  autoSizeAll() {
    var allColumnIds = [];
    this.gridColumnApi.getAllColumns().forEach(function (column) {
      allColumnIds.push(column.colId);
    });
    this.gridColumnApi.autoSizeColumns(allColumnIds);
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
    this.gridColumnApi = params.columnApi;
    this.getAllentitylist();
  }

  lookup: any = {
    entitystatus: null,
    code: null,
    entity: null,
    description: null
  };

  entityList = [];

  getAllentitylist(){
    this._lookup_.entityList().subscribe(res => {
      if(res)
      {
        console.log('====================================');
        console.log(res);
        this.entityList = res;
        console.log('====================================');
      }
    } , error => {
      console.error(error);
      this._onFail_.onFail(error);
    })
  }

  addFunction(){
    $("#addModal").modal("show");
  }

  

  addlookup(lookup){
    if(lookup.description == null)
    {
      lookup.description = "";
    }
    var object = {
      code: lookup.code,
      entityname:lookup.entity,
      entity_STATUS:lookup.entitystatus,
      description:lookup.description
    }
    console.log('====================================');
    console.log(object);
    console.log('====================================');
    this._lookup_.add(object).subscribe(res => {
      if (res.code)
      {
        this._toaster.success(res.code + "Addedd successfully");
        $("#addModal").modal("hide");
        this.lookup = {
          entitystatus: null,
          code: null,
          entity: null,
          description: null
        };    
      }
    } , error => {
        this._onFail_.onFail(error);
    })
  }

  getLookup(data){
    console.log('====================================');
    console.log(data);
    console.log('====================================');
    this._lookup_.lookup(data).subscribe(res => {
      if(res)
      {
        console.log('====================================');
        console.log(res);
        console.log('====================================');
        this.rowData = res;
      }
    }, error => {
        this._onFail_.onFail(error);
    })
  }

  editModel(row) {
    console.log('====================================');
    console.log(row);
    console.log('====================================');
    $("#editModal").modal("show");
    this.lookup = {
      id: row.rowData.id,
      entity: row.rowData.entityname,
      code: row.rowData.code,
      entitystatus: row.rowData.entity_STATUS,
      description: row.rowData.description
    }  
    console.log('====================================');
    console.log(this.lookup);
    console.log('====================================');
  }

  editlookup(lookup){
    console.log('====================================');
    console.log(lookup);
    console.log('====================================');
    if (lookup.description == null) {
      lookup.description = "";
    }
    var object = {
      code: lookup.code,
      entityname: lookup.entity,
      entity_STATUS: lookup.entitystatus,
      description: lookup.description
    }
    console.log('====================================');
    console.log(object);
    console.log(lookup.id);
    console.log('====================================');
    this._lookup_.update(object, lookup.id).subscribe(res => {
      if (res.code) {
        this._toaster.success(res.code + "Addedd successfully");
        this.getAllentitylist();
        $("#editModal").modal("hide");
        this.lookup = {
          entitystatus: null,
          code: null,
          entity: lookup.entity,
          description: null
        };
      }
    }, error => {
      this._onFail_.onFail(error);
    })
  }

  downloadPdf () {
    if(this.rowData.length > 0){
      if (confirm("Are you sure you want to download PDF")){
        let columns = ["code", "EntityName", "Description" , "isActive"];
        let rows = [];
        for (var i = 0; i <= this.rowData.length; i++) {
          if(this.rowData[i]){
            rows.push([this.rowData[i].code, this.rowData[i].entityname, this.rowData[i].description, this.rowData[i].isactive])
          }
        }
        console.log('====================================');
        console.log("rows");
        console.log(rows);
        console.log('====================================');
        let doc = new jsPDF('l', 'pt');
        doc.autoTable(columns, rows); // typescript compile time error
        doc.save('Lookup.pdf');
      }else{
        return;
      }  
    }else{
      alert("No data available ");
    }
  }

}
