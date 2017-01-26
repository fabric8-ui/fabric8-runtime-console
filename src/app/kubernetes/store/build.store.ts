import {Injectable} from '@angular/core';
import {BuildService} from '../service/build.service';
import {Build, Builds} from '../model/build.model';
import {NamespacedResourceStore} from './namespacedresource.store';
import {NamespaceScope} from '../service/namespace.scope';

@Injectable()
export class BuildStore extends NamespacedResourceStore<Build, Builds, BuildService> {
  constructor(buildconfigBuild: BuildService, namespaceScope: NamespaceScope) {
    super(buildconfigBuild, [], <Build>{}, namespaceScope);
  }

  protected get kind() {
    return 'Build';
  }
}
