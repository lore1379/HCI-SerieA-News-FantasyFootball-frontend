import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { NewsService } from '../services/news.service';
import { News } from '../model/news.model';
import { Subscription } from 'rxjs';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  teams: string[] = ['Inter', 'Napoli', 'Juventus'];

  userName: string = "";

  selectedSegment: string = 'all'; // Default segment

  newsList!: Array<News>;
  filteredNewsList!: Array<News>;
  newsSubscription: Subscription | undefined;
  favoriteTeam!: string | null;
  
  constructor(
    private oauthService: OAuthService, 
    private router: Router,
    private newsService: NewsService,
    private alertController: AlertController) { }

  ngOnInit() {
    this.getNews();
    this.getFavoriteTeam();
  }

  getNews(): void {
    this.newsSubscription = this.newsService.getAllNews()
      .subscribe((_news) => {
        this.newsList = _news;
    });
  }

  getFavoriteTeam(): void {
    this.newsSubscription = this.newsService.getFavoriteTeam(this.oauthService.getIdentityClaims()['given_name'])
      .subscribe((_userInfo) => {
        this.favoriteTeam = _userInfo.favoriteTeam;
      })
  }

  segmentChanged() {
    if (this.selectedSegment === 'favorites' && this.favoriteTeam === undefined) {
      this.presentAlert(this.userName);
    } else {
      this.filteredNewsList = this.newsList.filter(newsItem => newsItem.teamName === this.favoriteTeam);
    }
  }

  async presentAlert(userName: string) {
    const alert = await this.alertController.create({
      header: 'Welcome to our application!',
      message: 'Since this is your first time, please choose your favorite team to personalize your news feed.',
      inputs: this.teams.map((team) => ({
        name: 'team',
        type: 'radio',
        label: team,
        value: team,
      })),
      buttons: [
        {
          text: 'Confirm',
          handler: (selectedTeam) => {
            if (selectedTeam) {
              const data = { username: this.userName, favoriteTeam: selectedTeam };
              this.newsService.saveFavoriteTeam(data).subscribe(() => {
              });
            }
          },
        },
      ],
    });

    await alert.present();
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

  ngOnDestroy(): void {
    if (this.newsSubscription) {
      this.newsSubscription.unsubscribe();
    }
  }

}
