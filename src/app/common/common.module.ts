import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {TruncateCharactersPipe} from "./truncate-characters.pipe";
import {TruncateWordsPipe} from "./truncate-words.pipe";
import {LoadingComponent} from "./loading/loading.component";
import {EntriesPipe} from "./entries.pipe";
import {ResourceHeaderComponent} from "../kubernetes/components/resource-header/resource.header.component";
import {DropdownConfig, DropdownModule} from "ng2-bootstrap";
import {ParentLinkFactory} from "./parent-link-factory";
import {OAuthService} from "angular2-oauth2/oauth-service";
import {OnLogin} from "../shared/onlogin.service";
import {SafeUrlPipe} from "./safeurl.pipe";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DropdownModule,
  ],
  declarations: [
    EntriesPipe,
    TruncateCharactersPipe,
    TruncateWordsPipe,
    LoadingComponent,
    ResourceHeaderComponent,
    SafeUrlPipe,
  ],
  exports: [
    EntriesPipe,
    TruncateCharactersPipe,
    TruncateWordsPipe,
    LoadingComponent,
    ResourceHeaderComponent,
    SafeUrlPipe,
  ],
  providers: [
    DropdownConfig,
    ParentLinkFactory,
    OAuthService,
    OnLogin,
  ],
})
export class Fabric8CommonModule { }
