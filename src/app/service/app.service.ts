import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    constructor(private http: HttpClient) { }

    private base_url: string = "http://localhost:6070/api/";

    addSlot(data: any, cb: any) {
        return this.http.post(this.base_url + 'slot', data).subscribe(
            obj => {
                cb(obj);
            },
            error => {
                cb(error);
            }
        )
    }

    getSlot(cb: any) {
        return this.http.get(this.base_url + 'getSlot').subscribe(
            obj => {
                cb(obj);
            },
            error => {
                cb(error);
            }
        )
    }

    getAllSlots(date: any, cb: any) {
        return this.http.get(this.base_url + 'getAllSlots?date=' + date).subscribe(
            obj => {
                cb(obj);
            },
            error => {
                cb(error);
            }
        )
    }

    getAppointments(date: any, cb: any) {
        return this.http.get(this.base_url + 'getAppointments?date=' + date).subscribe(
            obj => {
                cb(obj);
            },
            error => {
                cb(error);
            }
        )
    }
}