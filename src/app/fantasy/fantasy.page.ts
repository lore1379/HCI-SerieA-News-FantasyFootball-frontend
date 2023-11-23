import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-fantasy',
  templateUrl: './fantasy.page.html',
  styleUrls: ['./fantasy.page.scss'],
})
export class FantasyPage implements OnInit {

  userName: string = "";

  constructor(private oauthService: OAuthService, private router: Router) { }

  ngOnInit() {
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