import { Injectable, Inject } from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service'
import { Subject } from 'rxjs';
const STORAGE_KEY = 'city_list';
@Injectable()



export class LocalstorageService {

  constructor(@Inject(SESSION_STORAGE) private storage:StorageService) { }

  removeDuplicates(originalArray:any[], prop) {
    let newArray = [];
    let lookupObject = {};
  originalArray.forEach((item, index) => {
      lookupObject[originalArray[index][prop]] = originalArray[index];
  });
  Object.keys(lookupObject).forEach(element => {
      newArray.push(lookupObject[element]);
  });
  return newArray;
 }

  storeOnLocalStorage(city: string, temp: number, condition: string) {
    const currentTodoList = this.storage.get(STORAGE_KEY) || [];
      currentTodoList.push({
            city: city,
            temp: temp,
            condition: condition
          });
      console.log("updating...");
    var res = this.removeDuplicates(currentTodoList,'city');
    this.storage.set(STORAGE_KEY, res);
    console.log(this.storage.get(STORAGE_KEY) || 'LocaL storage is empty');
  }

  removeFromLocalStorage(i){
    const currentTodoList = this.storage.get(STORAGE_KEY) || [];
    currentTodoList.splice(i,1);
    this.storage.set(STORAGE_KEY, currentTodoList);
    console.log(this.storage.get(STORAGE_KEY) || 'LocaL storage is empty');
  }

  getLocalStorage(){
    var res = this.storage.get(STORAGE_KEY);
    return res;
  }

}
