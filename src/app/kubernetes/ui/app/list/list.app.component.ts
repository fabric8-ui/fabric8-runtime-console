import {Component, Input} from "@angular/core";
import {TREE_ACTIONS} from "angular2-tree-component";
import {ParentLinkFactory} from "../../../../common/parent-link-factory";
import {AppDeployments} from "../list-page/list-page.app.component";
import {Space, createEmptySpace} from "../../../model/space.model";

@Component({
  selector: 'fabric8-apps-list',
  templateUrl: './list.app.component.html',
  styleUrls: ['./list.app.component.scss'],
})
export class AppListComponent {
  parentLink: string;

  @Input() loading: boolean;
  @Input() apps: AppDeployments[];
  @Input() space: Space;

  constructor(
    parentLinkFactory: ParentLinkFactory,
  ) {
    this.parentLink = parentLinkFactory.parentLink;
  }

}
