import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

export interface UsersData {
  fname: string;
  lname: string;
  phone: number;
  address: string;
}

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})

export class DialogBoxComponent {
  action:string;
  local_data:any;
  data:any=[];

  constructor(private http: HttpClient, public dialogRef: MatDialogRef<DialogBoxComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public userdata: UsersData) {
      console.log(userdata);
      this.local_data = {...userdata};
      this.action = this.local_data.action;
    }

  numericOnly(event) {    
    let patt = /^([0-9])$/;
    let result = patt.test(event.key);
    return result;
  }

  ngOnInit(): void {
    const url ='https://geo.api.gouv.fr/regions'
    this.http.get(url).subscribe((res)=>{
      this.data = res,
      console.log(this.data)
    })
  }

  doAction(){
    this.dialogRef.close({event:this.action, data:this.local_data});
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }
}
