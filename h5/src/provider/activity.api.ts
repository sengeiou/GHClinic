// revice-serve.ts
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';




@Injectable()
export class ReciveServeProvider {

    constructor(public http: Http) {}

    // 网络请求接口
 

    // 本地JSON文件请求
    getRequestContact() {
        return this.http.get("assets/json/city.json");
    }

}
