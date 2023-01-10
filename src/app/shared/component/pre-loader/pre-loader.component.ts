import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pre-loader',
  templateUrl: './pre-loader.component.html',
  styleUrls: ['./pre-loader.component.scss']
})
export class PreLoaderComponent implements OnInit {


  @Input() isLoading = false;

  constructor() { }

  ngOnInit(): void {
  }

}
