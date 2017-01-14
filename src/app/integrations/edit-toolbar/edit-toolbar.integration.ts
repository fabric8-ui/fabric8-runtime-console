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
/*
    this.store.update(this.integration).subscribe(
      () => this.router.navigate(["integrations"])
    );
*/
  }
}
