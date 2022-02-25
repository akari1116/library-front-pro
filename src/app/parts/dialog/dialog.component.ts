import { Component, OnInit, Inject} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';



interface DialogData {
  name: string;
  dLogMessage: string;
  display: string;
  section: string;
  url: string;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})

export class DialogComponent implements OnInit {
  formControl:FormControl;
  
  constructor(public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:DialogData, private router:Router) {
      this.formControl = new FormControl('', [Validators.required]);
    }

  ngOnInit(): void {
  }

  cancel() {
    if(this.data.dLogMessage == "登録しました。") {
      this.router.navigate([this.data.url], { queryParams:{ 'section':this.data.section}});
    }
    this.dialogRef.close();
  }

  registName() {
    this.data.name = this.formControl.value;
  }

}
