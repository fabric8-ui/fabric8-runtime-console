import {Component, ViewChild} from "@angular/core";
import {Build, PendingInputAction} from "../../../model/build.model";
import {PipelineStage} from "../../../model/pipelinestage.model";
import {Http, RequestOptions, Headers} from "@angular/http";
import {OnLogin} from "../../../../shared/onlogin.service";
import {pathJoin} from "../../../model/utils";
import {OAuthConfig} from "../../../store/oauth-config-store";

@Component({
  selector: 'input-action-dialog',
  templateUrl: './input-action-dialog.component.html',
  styleUrls: ['./input-action-dialog.component.scss'],
})
export class InputActionDialog {
  build: Build = new Build();
  stage: PipelineStage = null;
  inputAction: PendingInputAction = new PendingInputAction();

  @ViewChild('inputModal') modal: any;

  constructor(private http: Http, private onLogin: OnLogin) {
  }

  get messageLines(): string[] {
    let msg = this.inputAction.message || "";
    return msg.split("\n");
  }

  open() {
    console.log("opening the dialog for " + this.build.name + " on modal " + this.modal);
    this.modal.open();
  }

  proceed() {
    console.log('Proceeding pipeline ' + this.build.name);
    return this.invokeUrl(this.inputAction.proceedUrl);
  }

  abort() {
    console.log('Aborting pipeline ' + this.build.name);
    return this.invokeUrl(this.inputAction.abortUrl);
  }

  invokeUrl(url: string) {
    if (url) {
      if (url.startsWith("//")) {
        url = url.substring(1);
      }
      // TODO find Forge API from env vars and the namespace from the build!!!
      let jenkinsUrl = "http://localhost:8080/services/jenkins/jastrachan-jenkins/";
      if (jenkinsUrl) {
        let token = this.onLogin.token;
        url = pathJoin(jenkinsUrl, url);
        console.log("about to invoke " + url);
        let options = new RequestOptions();
        let headers = new Headers();
        headers.set("Authorization",  "Bearer " + token);
        options.headers = headers;
        let body = null;
        this.http.post(url, body, options).subscribe(res => {
          console.log("posting to url: " + url + " and returned response " + res.status);
        });
      } else {
        console.log("No jenkinsUrl could be determined for the build!");
      }
    }
    this.close();
  }
  close() {
    this.modal.close();
  }
}
