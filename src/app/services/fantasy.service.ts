import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from '../model/player.model';

const BASE_URL = 'http://localhost:8080'

@Injectable({
    providedIn: 'root'
  })
  
  export class FantasyService {

    constructor(private httpClient: HttpClient) {}

    getPlayers():  Observable<Array<Player>> {
        return this.httpClient.get<Array<Player>> (
            BASE_URL + '/players'
        )
    }
  }