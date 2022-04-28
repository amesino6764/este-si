import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JsonService } from 'src/app/Service/json.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  form:FormGroup;
  submitted= false;
  constructor(private fb: FormBuilder, public json:JsonService) {
    this.form= fb.group({
      id:[0],
      name:["", Validators.required],
      description: ["",Validators.compose([Validators.required,Validators.minLength(12)])],
      status: [{value: true,enabled:false},Validators.required],
      areas: this.fb.array([
        this.fb.group({
          id:[0],
          name:["", Validators.required],
          description: ["",Validators.compose([Validators.required,Validators.minLength(12)])],
          status: [{value: true,enabled:false},Validators.required]
        }),
        this.fb.group({
          id:[0],
          name:["", Validators.required],
          description: ["",Validators.compose([Validators.required,Validators.minLength(12)])],
          status: [{value: true,enabled:false},Validators.required]
        }),
        this.fb.group({
          id:[0],
          name:["", Validators.required],
          description: ["",Validators.compose([Validators.required,Validators.minLength(12)])],
          status: [{value: true,enabled:false},Validators.required]
        })
      ])
    });
   }

  save(){
    this.submitted=true;
    if(this.form.valid){
      console.log("valid");
    }else{
      console.log("Invalid");
    }
    console.log(this.form.value);
  }
  ngOnInit(): void {
  }
  Clear(){
    this.form.reset();
  }
  get f(){
    return this.form.controls;
  }
  get areas(){
    return this.form.controls['areas'] as FormArray;
  }


  addArea(){
    let area: FormGroup=this.fb.group({
      id:[0],
      name:["", Validators.required],
      description: ["",Validators.compose([Validators.required,Validators.minLength(12)])],
      status: [{value: true,enabled:false},Validators.required]
    })
    this.areas.push(area);
  }
  eliminArea(area: AbstractControl){
    let index = this.areas.controls.indexOf(area);
    this.areas.removeAt(index);
  }

}
