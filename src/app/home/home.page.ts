import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthEvent, OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from 'src/app/sso-config';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private oauthService: OAuthService, private router: Router) {}

  ngOnInit() {
    this.configureSingleSignOn();
  }

  configureSingleSignOn() {
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }
  
  login() {
    this.oauthService.initLoginFlow();
  }
  
  logout() {
    this.oauthService.logOut();
  }
  
  get accessToken() {
    console.log(this.oauthService.getAccessToken())
    return this.oauthService.getAccessToken();
  }
}
