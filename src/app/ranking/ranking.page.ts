import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.page.html',
  styleUrls: ['./ranking.page.scss'],
})
export class RankingPage implements OnInit {

  userName: string = "";

  selectedSegment: string = 'ranking'; // Default segment

  // sample data to try layouts
  data: any[] = [
    { homeTeam: 'Sassuolo', homeScore: 2, awayTeam: 'Salernitana', awayScore: 2, dateName: 'Ven 10/11'},
    { homeTeam: 'Sassuolo', homeScore: 2, awayTeam: 'Salernitana', awayScore: 2, dateName: 'Ven 10/11'},
    { homeTeam: 'Sassuolo', homeScore: 2, awayTeam: 'Salernitana', awayScore: 2, dateName: 'Ven 10/11'},
    { homeTeam: 'Sassuolo', homeScore: 2, awayTeam: 'Salernitana', awayScore: 2, dateName: 'Ven 10/11'},
    { homeTeam: 'Sassuolo', homeScore: 2, awayTeam: 'Salernitana', awayScore: 2, dateName: 'Ven 10/11'},
  ];

  // reorganize data in 2D structure
  reorganizedData: any[][] = [];
  itemsPerRow: number = 2;

  constructor(private oauthService: OAuthService, private router: Router) { }

  ngOnInit() {
    for (let i = 0; i < this.data.length; i += this.itemsPerRow) {
      this.reorganizedData.push(this.data.slice(i, i + this.itemsPerRow));
    }
    console.log(this.reorganizedData)
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
