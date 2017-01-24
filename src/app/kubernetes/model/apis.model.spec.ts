/* tslint:disable:no-unused-variable */
import {APIs} from "./apis.model";

describe('APIs', () => {
  let matchingApis = ["/api", "/oapi"];
  let notMatchingApis = ["/cheese"];

  let apiModel = new APIs(matchingApis as Array<string>);

  it("should be OpenShift", () => {
    expect(apiModel.isOpenShift()).toBeTruthy();
  });

  matchingApis.forEach(api => {
    it("api should match for: " + api, () => {
      expect(apiModel.hasAPI(api)).toBeTruthy();
    });
  });

  notMatchingApis.forEach(api => {
    it("api should not match for: " + api, () => {
      expect(apiModel.hasAPI(api)).toBeFalsy();
    });
  });
});
