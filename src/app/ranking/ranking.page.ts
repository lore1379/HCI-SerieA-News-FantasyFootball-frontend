import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { Team } from '../model/team.model';
import { RankingService } from '../services/ranking.service';
import { Subscription } from 'rxjs';
import { Match } from '../model/match.model';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.page.html',
  styleUrls: ['./ranking.page.scss'],
})
export class RankingPage implements OnInit {

  userName: string = "";

  selectedSegment: string = 'ranking'; // Default segment

  teamsList!: Array<Team>;
  rankingSubscription: Subscription | undefined;

  playedMatchesList!: Array<Match>
  upcomingMatchesList!: Array<Match>

  // reorganize data in 2D structure
  playedMatchesList2D: any[][] = [];
  upcomingMatchesList2D: any[][] = [];
  itemsPerRow: number = 2;

  constructor(
    private oauthService: OAuthService, 
    private router: Router,
    private rankingService: RankingService) { }

  ngOnInit() {
    this.getTeams();
    this.getPlayedMatches();
    this.getUpcomingMatches();
  }

  getTeams(): void {
    this.rankingSubscription = this.rankingService.getAllTeams()
      .subscribe((_teams) => {
        this.teamsList = _teams;
    });
  }

  getPlayedMatches(): void {
    this.rankingSubscription = this.rankingService.getPlayedMatches()
      .subscribe((_playedMatches) => {
        this.playedMatchesList = _playedMatches;
        for (let i = 0; i < this.playedMatchesList.length; i += this.itemsPerRow) {
          this.playedMatchesList2D.push(this.playedMatchesList.slice(i, i + this.itemsPerRow));
        }
    });
  }

  getUpcomingMatches(): void {
    this.rankingSubscription = this.rankingService.getUpcomingMatches()
      .subscribe((_upcomingMatches) => {
        this.upcomingMatchesList = _upcomingMatches;
        for (let i = 0; i < this.upcomingMatchesList.length; i += this.itemsPerRow) {
          this.upcomingMatchesList2D.push(this.upcomingMatchesList.slice(i, i + this.itemsPerRow));
        }
    });
  }

  logout() {
    this.oauthService.logOut();
    this.router.navigate(['/home']);
  }

  get accessToken() {
    let claims: any = this.oauthService.getIdentityClaims();
    if (claims != null) {
      this.userName = claims.given_name;
    }
    return this.oauthService.getAccessToken();
  }


}
