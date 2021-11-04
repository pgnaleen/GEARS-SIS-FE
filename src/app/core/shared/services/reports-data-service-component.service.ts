import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AllReportColumns} from '../model/allreportcolumns';
import {SelectedColumnJoins} from '../model/selectedcolumnjoins';
import {ReportData} from '../model/reportdata';

@Injectable({
    providedIn: 'root'
})
export class ReportsDataServiceComponent {

    private REST_API_SERVER = 'http://localhost:8385';

    // Http Headers
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
          // , 'Authorization': 'Basic ' + btoa('nalin:nalin')
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
        return this.httpClient.get<AllReportColumns>(this.REST_API_SERVER + '/report-details/all-report-columns',
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
