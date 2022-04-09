import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user=localStorage.getItem("usuario");
  constructor() { }

  ngOnInit(): void {

    this.user=localStorage.getItem("usuario");
    console.log("home")
    // @ts-ignore
    $("[data-bs-chart]").each(function (e, o) {
      // @ts-ignore
      const chart = new Chart($(o), $(o).data("bs-chart"))
    })


  }

}
