import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class GoogleSheetsService {
  data: any = null;

  constructor(public httpClient: HttpClient) { }

  public getSheetData(id: string): Observable<any> {
    const url = 'https://spreadsheets.google.com/feeds/list/' + id + '/od6/public/values?alt=json';    
    return this.httpClient.get(url)
      .pipe(
        map((res: any) => {
          const data = res.feed.entry;
          const returnArray: Array<any> = [];
          if (data && data.length > 0) {
            data.forEach(entry => {
              const obj = {};
              for (const x in entry) {
                if (x.includes('gsx$') && entry[x].$t) {
                  obj[x.split('$')[1]] = entry[x]['$t'];
                }
              }
              returnArray.push(obj);
            });
          }          
          return returnArray;
        })
      );
  }
  

}