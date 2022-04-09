import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  user=localStorage.getItem("usuario");
  constructor() { }

  ngOnInit(): void {
    this.user=localStorage.getItem("usuario");
    console.log("perfil")
  }

}
