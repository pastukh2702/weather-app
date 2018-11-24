import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {WeatherService} from './services/weather/weather.service';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WeatherCardComponent } from './weather-card/weather-card.component';
import { DetailsComponent } from './pages/details/details.component';
import { HomeComponent } from './pages/home/home.component';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { StorageServiceModule } from 'angular-webstorage-service';
import {LocalstorageService} from './services/localstorage/localstorage.service';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {AppRoutingModule} from './app-routing/app-routing.module';
import { MatButtonModule, MatExpansionModule, MatInputModule, MatSelectModule, MatButtonToggleModule, MatFormFieldModule } from '@angular/material';








@NgModule({
  declarations: [
    AppComponent,
    WeatherCardComponent,
    DetailsComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    StorageServiceModule,
    MatExpansionModule,
    MatFormFieldModule,
    DragDropModule,
    AppRoutingModule
    
  ],
  providers: [WeatherService,LocalstorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
