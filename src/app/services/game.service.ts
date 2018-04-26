import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class GameService {
    private api = 'http://localhost:8080/api/';
    constructor(private http: Http) { }

    getGames() {
        return new Promise((resolve, reject) => {
            this.http.get(this.api + 'game').toPromise().then(res => {
                console.log(res.json());
                resolve(res.json().data);
            }).catch(err => {
                reject(err);
            });
        });
    }

    getGame(id?: string) {
        return new Promise((resolve, reject) => {
            this.http.get(this.api + 'game/' + id).toPromise().then(res => {
                console.log(res.json());
                resolve(res.json().data);
            }).catch(err => {
                reject(err);
            });
        });
    }

}
