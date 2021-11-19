import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AllReportColumns} from '../model/allreportcolumns';
import {SelectedColumnJoins} from '../model/selectedcolumnjoins';
import {ReportData} from '../model/reportdata';
import { environment } from 'environments/environment';
import { Roles } from '../model/roles';

@Injectable({
    providedIn: 'root'
})
export class ReportsDataServiceComponent {

    private REST_API_SERVER = environment.adminAPIServer;

    // Http Headers
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    constructor(private httpClient: HttpClient) {

        // const csrfToken = this.getXSRFTokenFromCookie('XSRF-TOKEN');
        // console.log('NEW TOKEN' + csrfToken);
        // this.httpOptions.headers.append('X-XSRF-TOKEN', csrfToken); // not sending this token to backend

    }

    public getXSRFTokenFromCookie(name) {
        if (!document.cookie) {
            return null;
        }

        const xsrfCookies = document.cookie.split(';')
            .map(c => c.trim())
            .filter(c => c.startsWith(name + '='));

        if (xsrfCookies.length === 0) {
            return null;
        }
        return decodeURIComponent(xsrfCookies[0].split('=')[1]);
    }

    public sendGetRequest() {
        return this.httpClient.get<Roles>(this.REST_API_SERVER + '/api/v1/roles',
            this.httpOptions);
    }

    public sendPostRequest(requestBody: string, resourcePath: string) {
        return this.httpClient.post<SelectedColumnJoins>(this.REST_API_SERVER + resourcePath,
            requestBody, this.httpOptions);
    }

    public sendReportDataPostRequest(requestBody: string, resourcePath: string) {
        return this.httpClient.post<ReportData>(this.REST_API_SERVER + resourcePath,
            requestBody, this.httpOptions);
    }

}
