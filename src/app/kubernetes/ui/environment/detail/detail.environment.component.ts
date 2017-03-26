import { Router } from '@angular/router';
import { ParentLinkFactory } from './../../../../common/parent-link-factory';
import { Component } from '@angular/core';
@Component({
  selector: 'fabric8-environments-detail',
  templateUrl: './detail.environment.component.html',
  styleUrls: ['./detail.environment.component.scss'],
})
export class EnvironmentDetailComponent {

  parentLink: string;

  constructor(
    parentLinkFactory: ParentLinkFactory,
    private router: Router
  ) {
    this.parentLink = parentLinkFactory.parentLink;

  }

  close() {
    let url = this.router.url;
    let terminator = 'environments';
    let newurl = url.slice(0, url.lastIndexOf(terminator) + terminator.length);
    this.router.navigateByUrl(newurl);
  }

}
