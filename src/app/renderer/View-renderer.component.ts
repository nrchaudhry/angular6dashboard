import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: "app-button-renderer",
  template: `
    <a href="javascript:(0)" class="btn-lg" (click)="onClick($event)">
      <span class="fa fa-eye"></span>
    </a>
  `
})
export class ViewRendererComponent implements ICellRendererAngularComp {
  params;
  label: string;

  agInit(params): void {
    this.params = params;
    this.label = this.params.label || null;
  }

  refresh(params?: any): boolean {
    return true;
  }

  onClick($event) {
    if (this.params.onClick instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data
      };
      this.params.onClick(params);
    }
  }
}