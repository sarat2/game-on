import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class CommonService {
    private api = 'http://localhost:8080/api/';
    constructor(private http: Http) { }

    getTypes() {
        return new Promise((resolve, reject) => {
            this.http.get(this.api + '/types').toPromise().then(res => {
                console.log(res.json());
                resolve(res.json());
            }).catch(err => {
                reject(err);
            });
        });
    }
}
