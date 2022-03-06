import { Component } from '@angular/core';
import { StockmarketService } from './stockmarket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent {
  title = 'stockanalysis';

  stockanalysisData:any;
  
  constructor(){}

  stockChartXValuesFunction:any[] = [];
  stockChartYValuesFunction:any[] = [];

   API_KEY = "NTF74MI5KK8UO5J2";
   stockSymbol = "FB";
  
  ngOnInit(){

    //fetching data from api
    //free api from Alpha Vantage

    fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${this.stockSymbol}&outputsize=compact&apikey=${this.API_KEY}`)
    .then(response=>response.json())
    .then(data=>{
        for (var key in data["Time Series (Daily)"]) {
          this.stockChartXValuesFunction.push(key); 
          this.stockChartYValuesFunction.push(data["Time Series (Daily)"][key]["1. open"]);
        }
    }) 
  }
  

  //code for graph drawing
  public graph = {
    data: [
        {
           x: this.stockChartXValuesFunction,
           y: this.stockChartYValuesFunction,
           type: 'scatter', mode: 'lines+points', marker: {color: 'red'} },
        // { x: this.stockChartXValuesFunction, y: this.stockChartYValuesFunction, type: 'bar' },
    ],
    layout: {width: 1520, height: 540, title: ''}
};
  
}
