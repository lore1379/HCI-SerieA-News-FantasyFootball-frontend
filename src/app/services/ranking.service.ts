import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from '../model/team.model';
import { Match } from '../model/match.model';

const BASE_URL = 'http://localhost:8080'

@Injectable({
  providedIn: 'root'
})

export class RankingService {

    constructor(private httpClient: HttpClient) {}

    getAllTeams(): Observable<Array<Team>> {
        return this.httpClient.get<Array<Team>>(
            BASE_URL + '/teams')
    }

    getPlayedMatches(): Observable<Array<Match>> {
        return this.httpClient.get<Array<Match>>(
            BASE_URL + '/matches/played')
    }

    getUpcomingMatches(): Observable<Array<Match>> {
        return this.httpClient.get<Array<Match>>(
            BASE_URL + '/matches/upcoming')
    }

}