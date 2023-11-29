import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { News } from '../model/news.model';
import { UserInfo } from '../model/userInfo.model';

const BASE_URL = 'http://localhost:8080'

@Injectable({
  providedIn: 'root'
})

export class NewsService {

    constructor(private httpClient: HttpClient) {}

    // TO DO for authorization
    // token: any as attribute
    // const headers = new HttpHeaders().set("Authorization", "Bearer " + token);
    // return this.httpClient.get<Array<News>>(
    //     url + '/anagraphics/players/' + sort, { headers: headers })
    // }

    getAllNews(): Observable<Array<News>> {
        return this.httpClient.get<Array<News>>(
            BASE_URL + '/news')
    }

    getFavoriteTeam(username: string): Observable<UserInfo> {
        return this.httpClient.get<UserInfo> (
            BASE_URL + '/user/' + username
        )
    }

    saveFavoriteTeam(data: any): Observable<any> {
        return this.httpClient.post<any> (
            BASE_URL + '/user/', data
        )
    }
}