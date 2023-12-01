import { LiveService } from './../services/live.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { MatchStats } from '../model/matchStats.model';

@Component({
  selector: 'app-live',
  templateUrl: './live.page.html',
  styleUrls: ['./live.page.scss'],
})
export class LivePage implements OnInit {

  userName: string = "";

  isOpen!: boolean;

  matchUpdate!: MatchStats;
  homeTeamLogo!: any;
  awayTeamLogo!: any;

  sum!: number;

  constructor(
    private oauthService: OAuthService, 
    private router: Router,
    private liveService: LiveService) { }

  ngOnInit() {
    this.liveService.getServerSentEvent().subscribe((data: any) => {
      this.matchUpdate = JSON.parse(data.data);
      this.homeTeamLogo = this.matchUpdate.homeTeamLogo;
      this.awayTeamLogo = this.matchUpdate.awayTeamLogo;
    });
  }

  computeBallPossession(valueToCompute: number): number {
    console.log(valueToCompute)
    let newValue = valueToCompute * 0.01;
    console.log(newValue)
    return newValue;
  }

  computeBarValue(valueToCompute: number, value: number): number {
    this.sum = valueToCompute + value;
    console.log(this.sum)
    return (valueToCompute / this.sum);
  }

  logout() {
    this.oauthService.logOut();
    this.router.navigate(['/home']);
  }

  displayStats() {
    if (!this.isOpen)
      this.isOpen = true;
    else 
      this.isOpen = false;
  }

  get accessToken() {
    let claims: any = this.oauthService.getIdentityClaims();
    if (claims != null) {
      this.userName = claims.given_name;
    }
    return this.oauthService.getAccessToken();
  }

}
