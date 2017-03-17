import './rxjs-extensions';

import {BrowserModule} from "@angular/platform-browser";
import {NgModule, APP_INITIALIZER} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {RestangularModule} from "ng2-restangular";
import {AppRoutingModule} from "./approuting/approuting.module";

import {Fabric8CommonModule} from "./common/common.module";
import {AppComponent} from "./app.component";
import {ConfigService, configServiceInitializer} from "./config.service";
import {KubernetesUIModule} from "./kubernetes/ui/ui.module";
import {KubernetesStoreModule} from "./kubernetes/kubernetes.store.module";
import {HeaderComponent} from "./header/header.component";
import {DummyService} from "./dummy/dummy.service";
import {ContextService} from "./shared/context.service";
import {Logger} from "./shared/logger.service";
//import {LocalStorageModule} from 'angular-2-local-storage';
//import {DropdownModule} from 'ng2-dropdown';
//import {DropdownModule} from "./shared-component/dropdown/dropdown.module";
import {DropdownModule} from "ngx-dropdown";
import { OAuthService } from 'angular2-oauth2/oauth-service';
import {OnLogin} from "./shared/onlogin.service";

import { ENV_PROVIDERS } from './environment';
import { Broadcaster } from 'ngx-login-client';


export function restangularProviderConfigurer(restangularProvider: any, config: ConfigService) {
  restangularProvider.setBaseUrl(config.getSettings().apiEndpoint);
}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RestangularModule.forRoot([ConfigService], restangularProviderConfigurer),
    NgbModule.forRoot(),
    AppRoutingModule,
    DropdownModule,

    Fabric8CommonModule,
    KubernetesStoreModule,
    KubernetesUIModule,
/*
    LocalStorageModule.withConfig({
      prefix: 'fabric8',
      storageType: 'localStorage'
    }),
*/
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  providers: [
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: configServiceInitializer,
      deps: [ConfigService],
      multi: true,
    },
    Broadcaster,
    ContextService,
    DummyService,
    ENV_PROVIDERS,
    Logger,
    OnLogin,
    OAuthService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
