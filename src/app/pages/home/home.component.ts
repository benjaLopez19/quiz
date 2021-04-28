import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  titulo:AbstractControl;
  estado:AbstractControl;

  showTarea: boolean = false;
  showFormulario: boolean = true;
  showEditar: boolean = false;

  listaInicio:Array<string>=[];
  listaProceso:Array<string>=[];
  listaTerminado:Array<string>=[];

  auxEditar:string="";

  form: FormGroup;
  constructor(public fb: FormBuilder) { 
    this.form = this.fb.group({
      titulo:["",[Validators.required]],
      estado:["",[Validators.required]]
    });
    this.titulo = this.form.controls["titulo"];
    this.estado = this.form.controls["estado"];
  }

  ngOnInit(): void {
  }

  crear(){
    console.log(this.form.value);
    console.log(this.titulo.value);
    if(this.estado.value==0){ //ALERTA
      
    }

    if(this.estado.value == 1){
      this.listaInicio.push(this.titulo.value);
      console.log(this.listaInicio);
    }
    
    if(this.estado.value==2){
      this.listaProceso.push(this.titulo.value);
      console.log(this.listaProceso);
    }

    if(this.estado.value==3){
      this.listaTerminado.push(this.titulo.value);
      console.log(this.listaTerminado);
    }
    this.showFormulario=false;
    this.showTarea=true;

  }

  cancelar(){
    this.titulo.setValue("");
    this.estado.setValue(0);
  }

  eliminar(item){
    console.log(item);
    this.listaInicio.forEach((element,index)=>{
      if(element==item){
        this.listaInicio.splice(index,1);
      }
    });
  }

 adicionar(){
   this.showFormulario=true;
   this.showTarea=false;
 }

 editar(item){
  console.log(item);
  this.auxEditar=item;
  this.showTarea=false;
  this.showEditar=true;
  //this.actualizar(item);
}

  actualizar(){
    console.log("actualizar "+this.auxEditar);
    if(this.estado.value != 1){
      this.listaInicio.forEach((element,index)=>{
        if(element==this.auxEditar){
          this.listaInicio.splice(index,1);
        }
        if(this.estado.value == 2 ){
          this.listaProceso.push(this.titulo.value);
          console.log(this.listaProceso);
        }
        if(this.estado.value == 3){
          this.listaTerminado.push(this.titulo.value);
          console.log(this.listaTerminado);
        }
      });
    }
    else{
      this.listaInicio.forEach((element,index)=>{
        if(element==this.auxEditar){
          this.listaInicio[index] = this.titulo.value;
        }
      });
    }
    this.showTarea=true;
    this.showEditar=false;
  }
}
