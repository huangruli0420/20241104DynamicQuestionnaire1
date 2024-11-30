import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})

export class HttpClientService {
  constructor(private http : HttpClient){}

  // 取得
  getApi<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }

  // 新增
  postApi (url: string, postData: any){
    return this.http.post(url, postData)
  }

  // 更新
  putApi (url: string, postData: any){
    return this.http.put(url, postData)
  }

  // 刪除
  deleteApi (url: string){
    return this.http.delete(url)
  }

}
