import {Component, Input} from "@angular/core";
import {Integration} from "../../store/integration/integration.model";
import {IntegrationStore} from "../../store/integration/integration.store";
import {Router} from "@angular/router";

@Component({
  selector: 'ipaas-integration-edit-toolbar',
  templateUrl: './edit-toolbar.integration.html',
  styleUrls: ['./edit-toolbar.integration.scss'],
})
export class IntegrationEditToolbarComponent {

  @Input() integration: Integration;

  constructor(private store: IntegrationStore, private router: Router) {
  }

  save() {
    console.log("TODO - waiting for store.update() function to merge! " + this.store);
    this.router.navigate(["integrations"]);

  /*
    TODO waiting for https://github.com/redhat-ipaas/ipaas-client/pull/112 to merge

    this.store.update(this.integration).subscribe(
      () => this.router.navigate(["integrations"])
    );
*/
  }
}
