import {Injectable} from '@angular/core';
import {BuildConfigService} from '../service/buildconfig.service';
import {BuildConfig, BuildConfigs} from '../model/buildconfig.model';
import {NamespacedResourceStore} from './namespacedresource.store';
import {NamespaceScope} from '../service/namespace.scope';

@Injectable()
export class BuildConfigStore extends NamespacedResourceStore<BuildConfig, BuildConfigs, BuildConfigService> {
  constructor(buildconfigBuildConfig: BuildConfigService, namespaceScope: NamespaceScope) {
    super(buildconfigBuildConfig, [], <BuildConfig>{}, namespaceScope);
  }

  protected get kind() {
    return 'BuildConfig';
  }
}
