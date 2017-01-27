import { Component, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { OAuthService } from 'angular2-oauth2/oauth-service';

@Component({
  selector: 'fabric8-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: require("./app.component.html")
})

export class AppComponent implements AfterViewInit {
  name = 'Fabric8 Console';

  // White BG
  logoWhiteBg = 'assets/images/rh_fabric8_small.svg';
  iconWhiteBg = 'assets/images/glasses_logo.svg';

  // Dark BG
  logoDarkBg = 'assets/images/rh_fabric8_small.svg';
  iconDarkBg = 'assets/images/glasses_logo.svg';

  title = 'Fabric8 Console';
  url = 'https://www.twitter.com/fabric8io';
  loggedIn = true;

  constructor(private oauthService: OAuthService) {

    this.oauthService.loginUrl = "https://192.168.64.151:8443/oauth/authorize"; //Id-Provider?
    this.oauthService.redirectUri = window.location.origin + "/index.html";
    this.oauthService.clientId = "fabric8";

    // The name of the auth-server that has to be mentioned within the token
    this.oauthService.issuer = "https://192.168.64.151:8443";

    // set the scope for the permissions the client should request
    this.oauthService.scope = "user:full";

    // set to true, to receive also an id_token via OpenId Connect (OIDC) in addition to the
    // OAuth2-based access_token
    // setting to true doesn't work with openshift oauth
    this.oauthService.oidc = false;

    // Use setStorage to use sessionStorage or another implementation of the TS-type Storage
    // instead of localStorage
    this.oauthService.setStorage(sessionStorage);

    // To also enable single-sign-out set the url for your auth-server's logout-endpoint here
    this.oauthService.logoutUrl = "https://192.168.64.151:8443/connect/endsession?id_token={{id_token}}";

    // This method just tries to parse the token within the url when
    // the auth-server redirects the user back to the web-app
    // It dosn't initiate the login
    this.oauthService.tryLogin({});
    this.oauthService.initImplicitFlow();
    console.log("**** token: "+ this.oauthService.getAccessToken())

  }
  ngAfterViewInit() {
    $(document).ready(function () {
      // matchHeight the contents of each .card-pf and then the .card-pf itself
      $(".row-cards-pf > [class*='col'] > .card-pf .card-pf-title").matchHeight();
      $(".row-cards-pf > [class*='col'] > .card-pf > .card-pf-body").matchHeight();
      $(".row-cards-pf > [class*='col'] > .card-pf > .card-pf-footer").matchHeight();
      $(".row-cards-pf > [class*='col'] > .card-pf").matchHeight();

      // Initialize the vertical navigation
      $().setupVerticalNavigation(true);
    });
  }
}
