import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit{
  maxDate: string;
  minDate: string;
  constructor() {
  }
  ngOnInit(): void {
    const date = new Date();
    this.maxDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate() + 7}`;
    this.minDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate() - 4}`;
  }

}
