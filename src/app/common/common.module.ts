import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TruncateCharactersPipe } from './truncate-characters.pipe';
import { TruncateWordsPipe } from './truncate-words.pipe';
import { LoadingComponent } from './loading/loading.component';
import {EntriesPipe} from './entries.pipe';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    EntriesPipe,
    TruncateCharactersPipe,
    TruncateWordsPipe,
    LoadingComponent,
  ],
  exports: [
    EntriesPipe,
    TruncateCharactersPipe,
    TruncateWordsPipe,
    LoadingComponent,
  ],
})
export class IPaaSCommonModule { }
