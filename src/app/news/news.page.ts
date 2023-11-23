import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  userName: string = "";

  constructor(private oauthService: OAuthService, private router: Router) { }

  ngOnInit() {
    console.log(this.userName)
  }

  logout() {
    this.oauthService.logOut();
    this.router.navigate(['/home']);
  }

  get accessToken() {
    let claims: any = this.oauthService.getIdentityClaims();
    console.log(claims)
    if (claims != null) {
      this.userName = claims.given_name;
    }
    console.log(this.userName);
    return this.oauthService.getAccessToken();
  }

}
