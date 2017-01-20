import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { plural } from 'pluralize';

import { RESTService } from './rest.service';
import { BaseEntity } from './entity.model';
import {Observable} from "rxjs";

export abstract class AbstractStore<T extends BaseEntity, L extends Array<T>,
  R extends RESTService<T, L>> {

  private _list: BehaviorSubject<L>;

  private _current: BehaviorSubject<T>;

  private _loading: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private service: R, initialList: L, initialCurrent: T) {
    this._list = new BehaviorSubject(initialList);
    this._current = new BehaviorSubject(initialCurrent);
  }

  protected abstract get kind(): string;

  get list(): Observable<L>  { return this._list.asObservable(); }

  get resource(): Observable<T> { return this._current.asObservable(); }

  get loading(): Observable<boolean>  { return this._loading.asObservable(); }

  loadAll() {
    this._loading.next(true);
    this.service.list().subscribe(
      (list) => {
        this._list.next(list);
        this._loading.next(false);
      },
      (error) => {
        console.log('Error retrieving ' + plural(this.kind) + ': ' + error);
        this._loading.next(false);
      });
  }

  load(id: string) {
    this._loading.next(true);
    this.service.get(id).subscribe(
      (entity) => {
        this._current.next(entity);
        this._loading.next(false);
      },
      (error) => {
        console.log('Error retrieving ' + this.kind + ': ' + error);
        this._loading.next(false);
      });
  }

}
