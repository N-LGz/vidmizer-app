import { AfterViewInit, Component, ViewChild } from '@angular/core';

import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

import { DialogBoxComponent } from './dialog-box/dialog-box.component';

export interface UsersData {
  fname: string;
  lname: string;
  phone: string;
  address: string;
}

const ELEMENT_DATA: UsersData[] = [];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'vidmizer-app';

  displayedColumns: string[] = ['lname', 'fname', 'phone', 'address', 'action'];
  dataSource = new MatTableDataSource<UsersData>(ELEMENT_DATA);

  @ViewChild(MatTable,{static:true}) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openDialog(action,obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data:obj
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        this.addRowData(result.data);
      }else if(result.event == 'Delete'){
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(row_obj){
    var d = new Date();
    this.dataSource.data.push({
      fname:row_obj.fname,
      lname:row_obj.lname,
      phone:row_obj.phone,
      address:row_obj.address
    });
    this.table.renderRows();
    
  }

  deleteRowData(row_obj){
    this.dataSource.data = this.dataSource.data.filter((value,key)=>{
      return value.lname != row_obj.lname;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
}
