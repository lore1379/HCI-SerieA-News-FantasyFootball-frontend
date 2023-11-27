import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { OAuthService } from 'angular-oauth2-oidc';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-fantasy',
  templateUrl: './fantasy.page.html',
  styleUrls: ['./fantasy.page.scss'],
})
export class FantasyPage implements OnInit {

  @ViewChild(IonModal) modal!: IonModal;

  message!: string;
  
  userName: string = "";

  selectedSegment: string = 'fantasy'; // Default segment

  selectedRole: string = 'gk'; // Default role

  // sample data to try layouts
  data: any[] = [
    { playerName: 'Gabriele', playerScore: 6},
    { playerName: 'Damiano', playerScore: 6},
    { playerName: 'Lorenzo', playerScore: 9},
    { playerName: 'Mich', playerScore: 2},
    { playerName: 'Elias', playerScore: 6},
  ];

  // Sample array of goalkeepers
  freeGoalkeepers: any[] = [
    { name: 'GoalKeeper 1', role: '(GK)' },
    { name: 'GoalKeeper 2', role: '(GK)' },
    { name: 'GoalKeeper 3', role: '(GK)' },
  ];

  inTeamGoalkeepers: any[] = [
    { name: 'prova' },
  ]

  selectedGoalkeeper: any;

  constructor(private oauthService: OAuthService, private router: Router) { }

  ngOnInit() {
  }

  cancel() {
    console.log('Cancel button clicked');
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.selectedGoalkeeper, 'confirm');
    console.log(this.selectedGoalkeeper);
    this.inTeamGoalkeepers.push(this.selectedGoalkeeper);
  }

  cancel1() {
    console.log('Cancel button clicked');
    this.modal.dismiss(null, 'cancel');
  }

  confirm1() {
    this.modal.dismiss(this.selectedGoalkeeper, 'confirm');
    console.log(this.selectedGoalkeeper);
    this.inTeamGoalkeepers.push(this.selectedGoalkeeper);
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
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
