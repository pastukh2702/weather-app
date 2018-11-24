import {Component, OnInit, Input, Inject, Injectable } from '@angular/core';
import {WeatherService} from '../services/weather/weather.service';
import {Router} from '@angular/router';
import { DetailsComponent } from '../pages/details/details.component';
import {LocalstorageService} from '../services/localstorage/localstorage.service'








@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css']
})
export class WeatherCardComponent implements OnInit {

  cityGeo: string;
  tempGeo: number;
  condGeo: string;
  city: string;
  citySt: any[];

  constructor(public weather: WeatherService, public local: LocalstorageService, public router: Router) { 
    this.city = "Kyiv";
  }
  findMe(){
    this.weather.getCurrentCity().subscribe((data: string) => {
      this.cityGeo = data;
      this.cityGeo = this.city;
      });
    this.weather.getCurrentTemp(this.city).subscribe((data: number) => {
      this.tempGeo = data;
    });
    this.weather.getWeatherState(this.city).subscribe((data: string) => {
      this.condGeo = data;
    });

  }
  addWeather(){
    this.local.storeOnLocalStorage(this.city,0,"Cloud");
    this.citySt = this.local.getLocalStorage();
    this.updateWeather()
  }
  updateWeather(){
    this.citySt = this.local.getLocalStorage();
    for (let i = 0; i < this.citySt.length; i++) {
      this.weather.getCurrentTemp(this.citySt[i].city).subscribe((data1: number) => {
        this.citySt[i].temp = data1;
        this.weather.getWeatherState(this.citySt[i].city).subscribe((data: string) => {
          this.citySt[i].condition = data;
        });
        this.local.storeOnLocalStorage(this.citySt[i].city,this.citySt[i].temp,this.citySt[i].condition)
        this.citySt = this.local.getLocalStorage();
      });
    }
 }
 removeWeather(i){
   this.local.removeFromLocalStorage(i);
   this.updateWeather();
 }
  ngOnInit() {
    this.findMe();
    this.local.storeOnLocalStorage("London",10,"CLoud");
    this.local.storeOnLocalStorage("Kyiv",10,"CLoud");
    this.local.storeOnLocalStorage("Odessa",10,"CLoud");
    this.local.storeOnLocalStorage("Brighton",10,"CLoud");
    this.local.storeOnLocalStorage("Liverpool",10,"CLoud");
    this.local.storeOnLocalStorage("Helsinki",10,"CLoud");
    this.citySt = this.local.getLocalStorage();
    this.updateWeather();
    }
    openDetails(i) {
      this.router.navigateByUrl("details/"+this.citySt[i].city+"");
    }
    openDetailsGeo() {
      this.router.navigateByUrl("details/"+this.cityGeo+"");

    }

}
    
    

    







    


    

    
  


  
 



