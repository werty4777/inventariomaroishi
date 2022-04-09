import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../core/services/auth/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user=localStorage.getItem("usuario");
  constructor(private router:Router,private authService:AuthService) { }

  ngOnInit(): void {
    this.user=localStorage.getItem("usuario");
  }

  ingresar(username:string,password:string){
    let valuss=null;
    this.authService.logearse(username,password).subscribe(value => {
      /*localStorage.setItem("usuario",value.usuario);*/
      localStorage.setItem("token",value.Token);

      valuss=value;
      this.router.navigate(["/home/productos"]);

    })

  }
}
