import { RequestOptions, BaseRequestOptions, RequestOptionsArgs } from '@angular/http';

export class RequestOptionsService extends BaseRequestOptions {
    constructor() {
        super();
        this.headers.set('Content-Type', 'application/json');
        this.headers.set("grant_type", "password");
    }
    merge(options?: RequestOptionsArgs): RequestOptions {
        const newOptions = super.merge(options);
        if (options.url) {
            if (options.url.search("/USERLOGIN/") !== -1) {
                var token = JSON.parse(localStorage.getItem('_application_name_user_detail_')).basic_Token_;
            } else {
                var token = JSON.parse(localStorage.getItem('_application_name_user_detail_')).access_token;
            }
            newOptions.headers.set('authorization',
                `bearer ${token}`);
            return newOptions;
        } else {
            newOptions.headers.set('authorization',
                `bearer ${JSON.parse(localStorage.getItem('_application_name_user_detail_')).access_token}`);
            return newOptions;
        }
    }
}