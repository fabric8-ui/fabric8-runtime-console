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
import {Broadcaster} from "./shared/broadcaster.service";
import {ContextService} from "./shared/context.service";
import {Logger} from "./shared/logger.service";
//import {LocalStorageModule} from 'angular-2-local-storage';
//import {DropdownModule} from 'ng2-dropdown';
//import {DropdownModule} from "./shared-component/dropdown/dropdown.module";
import {DropdownModule} from "ngx-dropdown";

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
    Logger,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
