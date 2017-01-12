import { Injectable } from '@angular/core';
import { FunctionService } from './function.service';
import { Functions, Function } from './function.model';

import { AbstractStore } from '../entity/entity.store';

@Injectable()
export class FunctionStore extends AbstractStore<Function, Functions, FunctionService> {
  constructor(functionService: FunctionService) {
    super(functionService, [], <Function>{});
  }

  protected get kind() { return 'Function'; }
}
