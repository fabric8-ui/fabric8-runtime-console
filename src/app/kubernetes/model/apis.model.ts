export class APIs {
  constructor(public apis: Array<string> = new Array<string>()) {
  }

  hasAPI(api: string): boolean {
    var apis = this.apis;
    if (apis) {
      return apis.indexOf(api) >= 0;
    }
    return false;
  }

  isOpenShift(): boolean {
    return this.hasAPI("/oapi");
  }
}

export class Events extends Array<Event>{
}
