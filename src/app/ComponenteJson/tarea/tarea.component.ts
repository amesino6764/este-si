import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
import { JsonService } from 'src/app/Service/json.service';

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.css']
})
export class TareaComponent implements OnInit {
  obj:any;
  form:FormGroup;
  constructor(private fb: FormBuilder, public json:JsonService) {
    this.agregar();
    this.form=fb.group({
      nombre:["",Validators.required],
      status:[{value: true,enabled:false}],
      modulos: this.fb.array([])
    });
   }

  ngOnInit(): void {
  }
  mo:any;

  get menu(){
    return this.form.controls['modulos'].value[this.mo].menus as FormArray;
  }
  get modulos(){
    return this.form.controls['modulos'] as FormArray;
  }


  agregar(){
    let url="https://app-colabora-gateway-dev.azurewebsites.net/gateway/profile/GetProfileModulesCompany?idProfile=5";
    this.json.getJson(url).subscribe((res:any)=>{
      this.obj=res.resultObject;
      for(let mo in this.obj){
        let modulo: FormGroup=this.fb.group({
          nombre:[this.obj[mo].menuName],
          menus: this.fb.array([])
        });
        this.mo=mo;
        this.modulos.push(modulo);
        for(let me in this.obj[mo].inverseMenuFather){
          let menu: FormGroup=this.fb.group({
            nombre:[this.obj[mo].inverseMenuFather[me].menuName],
            status:[{value: this.obj[mo].inverseMenuFather[me].menuActive,enabled:false}]
          })
          this.menu.push(menu as unknown as AbstractControl);
        }
      }
      console.log("form");
      console.log(this.form.controls['modulos'].value);
    });
  }
}
