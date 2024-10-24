import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppStorageService {

  constructor() { }

  set(key: string, value: string) {
    localStorage.setItem(key, value);
}

setObject(key:string,value:Object){
  localStorage.setItem(key, JSON.stringify(value));

}

get(key: string) {
    return localStorage.getItem(key);
}

getObject<T>(key:string){
  var value=localStorage.getItem(key);
  if(value){
   return JSON.parse(value) as T;
  }
  else{
    return null;
  }
}

remove(key: string) {
    localStorage.removeItem(key);
}

isSet(key:string){
  return !(localStorage.getItem(key)==null);
}
}
