import { DummyService } from './../dummy/dummy.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/*
import { Logger } from '../shared/logger.service';
import { User } from '../models/user';
import { UserService } from '../user/user.service';
import { AuthenticationService } from '../auth/authentication.service';
import { ToggleService } from '../toggle/toggle.service';
import { Toggle } from '../toggle/toggle';
import { ContextService } from '../shared/context.service';
*/
import { Broadcaster } from '../shared/broadcaster.service';
import {User} from "../models/user";

@Component({
  selector: 'alm-app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  // providers: [ToggleService]
})

export class HeaderComponent implements OnInit {
  title = 'Fabric8';
  imgLoaded: Boolean = false;
  //togglePaths: Toggle[];
  urlFeatureToggle: string = '';
  selectedFeatureToggle: string = 'Production';

  constructor(
    public router: Router,
/*
    private userService: UserService,
    private logger: Logger,
    private toggleService: ToggleService,
    private auth: AuthenticationService,
    public context: ContextService,
*/
    private broadcaster: Broadcaster,
    public dummy: DummyService,
  ) {
    router.events.subscribe(this.onNavigate);
  }

  get loggedIn(): boolean {
    return true;
    //return this.auth.isLoggedIn();
  }

  get loggedInUser(): User {
    return this.dummy.currentUser;
  }

/*


  getTogglePath(): void {
    this.toggleService
        .getToggles()
        .then(togglePaths => this.togglePaths = togglePaths);
  }

  setFeatureToggle(toggle: Toggle): void {
    this.toggleService.featureToggle = toggle;
    this.urlFeatureToggle = toggle.path;
    this.selectedFeatureToggle = toggle.name;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/public']);
  }

  login() {
    this.router.navigate(['login']);
  }
*/

  ngOnInit(): void {
    this.listenToEvents();
    this.onNavigate();
    this.dummy.ngOnInit();
  }

  onNavigate(): void {
/*
    this.getLoggedUser();
    this.getTogglePath();
*/
    if (this.broadcaster) {
      this.broadcaster.broadcast('refreshContext');
    }
  }

  onImgLoad() {
    this.imgLoaded = true;
  }

  resetData(): void {
    this.imgLoaded = false;
  }

  listenToEvents() {
    if (this.broadcaster) {
      this.broadcaster.on<string>('logout')
        .subscribe(this.resetData);
    }
  }

/*  private getLoggedUser(): void {
    if (this.auth.isLoggedIn) {
      this.userService.getUser();
    }
  }*/

}
