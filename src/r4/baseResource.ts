import Resource from "./resource";

class BaseResource {
  resourceType?: String;
  resource?: Resource;
  domainResource?: DomainResource;

  constructor(resource?: Resource, domainResource?: DomainResource) {
    this.domainResource = domainResource;
    this.resource = resource;
  }

  toJson() {}
  toXml() {}
}

export default BaseResource;
