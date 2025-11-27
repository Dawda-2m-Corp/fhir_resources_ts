import BaseResource from "./baseResource";
import { uri } from "./data_types";
import Identifier from "./identifier";

class Reference extends BaseResource {
  reference?: String;
  type?: uri;
  identifier?: Identifier;
  display?: String;

  constructor(
    reference?: String,
    type?: uri,
    identifier?: Identifier,
    display?: String,
  ) {
    super();
    this.reference = reference;
    this.type = type;
    this.identifier = identifier;
    this.display = display;
  }
}

export default Reference;
