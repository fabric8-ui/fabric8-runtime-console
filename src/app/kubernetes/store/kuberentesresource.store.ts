import {AbstractStore} from "../../store/entity/entity.store";
import {KubernetesService} from "../service/kubernetes.service";
import {KubernetesResource} from "../model/kubernetesresource.model";
import {Observable} from "rxjs";
import {whenUserLoggedIn} from "../../shared/onlogin.service";

export abstract class KubernetesResourceStore<T extends KubernetesResource, L extends Array<T>, R extends KubernetesService<T, L>> extends AbstractStore<T, L, R> {

  constructor(service: R, initialList: L, initialCurrent: T) {
    super(service, initialList, initialCurrent);
  }

  update(obj: T): Observable<T> {
    return this.service.update(obj);
  }

  updateResource(obj: T, resource: any): Observable<T> {
    return this.service.updateResource(obj, resource);
  }

  delete(obj: T): Observable<any> {
    return this.service.delete(obj);
  }

  loadAll(): void {
    whenUserLoggedIn(() => {
      super.loadAll();
    });
  }

  load(id: string): void {
    whenUserLoggedIn(() => {
      super.load(id);
    });
  }
}
