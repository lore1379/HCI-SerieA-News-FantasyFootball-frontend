import { FantasyService } from './../services/fantasy.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { OAuthService } from 'angular-oauth2-oidc';
import { OverlayEventDetail } from '@ionic/core/components';
import { Subscription } from 'rxjs';
import { Player } from '../model/player.model';

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

  fantasySubscription!: Subscription;
  playersList!: Array<Player>

  inTeamPlayers: any[] = [];

  selectedPlayer: any;

  constructor(
    private oauthService: OAuthService, 
    private router: Router,
    private fantasyService: FantasyService) { }

  ngOnInit() {
    this.getPlayers();
    console.log(this.getPlayersByRole('GK'));
  }

  getPlayers(): void {
    this.fantasySubscription = this.fantasyService.getPlayers()
      .subscribe((_players) => {
        this.playersList = _players.map(player => ({
          ...player,
          isSelected: false,
        }));
        console.log(this.playersList)
    });
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(null, 'confirm');
    console.log(this.playersList);

    // Create a copy of the array
    const playersCopy = [...this.playersList];

    for (const player of playersCopy ) {
      if (player.isSelected) {
        // remove element from player list
        const index = this.playersList.findIndex(p => p === player);
        if (index > -1) {
          this.playersList.splice(index, 1)
        }
        // add element to team
        this.inTeamPlayers.push(player);
      }
    }
    console.log(this.playersList);
    console.log(this.inTeamPlayers);
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  getPlayersByRole(role: string): Player[] {
    return this.inTeamPlayers.filter(player => player.role === role);
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
