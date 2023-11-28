import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-live',
  templateUrl: './live.page.html',
  styleUrls: ['./live.page.scss'],
})
export class LivePage implements OnInit {

  userName: string = "";

  isOpen!: boolean;

  constructor(private oauthService: OAuthService, private router: Router) { }

  ngOnInit() {
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
