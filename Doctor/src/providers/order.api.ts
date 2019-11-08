import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiConfig } from '../app/api.config'
@Injectable()
export class OrderApi {

    constructor(public http: HttpClient) {

    }


    public create(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'order/create';
        var headers = ApiConfig.GetHeader(url, data);
        let options = { headers: headers };
        let body = ApiConfig.ParamUrlencoded(data);
        let loading = null;

        if (showLoadingModal) {
            loading = ApiConfig.GetLoadingModal();
        }

        return this.http.post(url, body, options).toPromise()
            .then((res) => {
                return res;
            })
            .catch(err => {
                console.error(err);
                return ApiConfig.ErrorHandle('order/create', data, err);
            });
    }


    public info(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'order/info';
        var headers = ApiConfig.GetHeader(url, data);
        let options = { headers: headers };
        let body = ApiConfig.ParamUrlencoded(data);
        let loading = null;

        if (showLoadingModal) {
            loading = ApiConfig.GetLoadingModal();
        }

        return this.http.post(url, body, options).toPromise()
            .then((res) => {
                return res;
            })
            .catch(err => {
                console.error(err);
                return ApiConfig.ErrorHandle('order/info', data, err);
            });
    }


    public start(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'order/start';
        var headers = ApiConfig.GetHeader(url, data);
        let options = { headers: headers };
        let body = ApiConfig.ParamUrlencoded(data);
        let loading = null;

        if (showLoadingModal) {
            loading = ApiConfig.GetLoadingModal();
        }

        return this.http.post(url, body, options).toPromise()
            .then((res) => {
                return res;
            })
            .catch(err => {
                console.error(err);
                return ApiConfig.ErrorHandle('order/start', data, err);
            });
    }


    public end(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'order/end';
        var headers = ApiConfig.GetHeader(url, data);
        let options = { headers: headers };
        let body = ApiConfig.ParamUrlencoded(data);
        let loading = null;

        if (showLoadingModal) {
            loading = ApiConfig.GetLoadingModal();
        }

        return this.http.post(url, body, options).toPromise()
            .then((res) => {
                return res;
            })
            .catch(err => {
                console.error(err);
                return ApiConfig.ErrorHandle('order/end', data, err);
            });
    }


    public timeupdate(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'order/timeupdate';
        var headers = ApiConfig.GetHeader(url, data);
        let options = { headers: headers };
        let body = ApiConfig.ParamUrlencoded(data);
        let loading = null;

        if (showLoadingModal) {
            loading = ApiConfig.GetLoadingModal();
        }

        return this.http.post(url, body, options).toPromise()
            .then((res) => {
                return res;
            })
            .catch(err => {
                console.error(err);
                return ApiConfig.ErrorHandle('order/timeupdate', data, err);
            });
    }

    public orderlist(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'order/orderlist';
        var headers = ApiConfig.GetHeader(url, data);
        let options = { headers: headers };
        let body = ApiConfig.ParamUrlencoded(data);
        let loading = null;

        if (showLoadingModal) {
            loading = ApiConfig.GetLoadingModal();
        }

        return this.http.post(url, body, options).toPromise()
            .then((res) => {
                return res;
            })
            .catch(err => {
                console.error(err);
                return ApiConfig.ErrorHandle('order/orderlist', data, err);
            });
    }

    public addresult(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'order/addresult';
        var headers = ApiConfig.GetHeader(url, data);
        let options = { headers: headers };
        let body = ApiConfig.ParamUrlencoded(data);
        let loading = null;

        if (showLoadingModal) {
            loading = ApiConfig.GetLoadingModal();
        }

        return this.http.post(url, body, options).toPromise()
            .then((res) => {
                return res;
            })
            .catch(err => {
                console.error(err);
                return ApiConfig.ErrorHandle('order/addresult', data, err);
            });
    }

}
