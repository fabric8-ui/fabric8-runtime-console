import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Spaces} from "../../../model/space.model";
import {SpaceStore} from "../../../store/space.store";

@Component({
  selector: 'ipaas-spaces-list-page',
  templateUrl: './list-page.space.html',
  styleUrls: ['./list-page.space.scss'],
})
export class SpacesListPage implements OnInit {
  private readonly spaces: Observable<Spaces>;
  private readonly loading: Observable<boolean>;

  constructor(private spacesStore: SpaceStore) {
    this.spaces = this.spacesStore.list;
    this.loading = this.spacesStore.loading;
  }

  ngOnInit() {
    this.spacesStore.loadAll();
  }

}
