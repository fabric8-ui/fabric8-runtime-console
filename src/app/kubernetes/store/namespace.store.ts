import {AbstractStore} from "../../store/entity/entity.store";
import {Injectable} from "@angular/core";
import {NamespaceService} from "../service/namespace.service";
import {Namespace, Namespaces} from "../model/namespace.model";

@Injectable()
export class NamespaceStore extends AbstractStore<Namespace, Namespaces, NamespaceService> {
  constructor(namespaceNamespace: NamespaceService) {
    super(namespaceNamespace, [], <Namespace>{});
  }

  protected get kind() {
    return 'Namespace';
  }
}
