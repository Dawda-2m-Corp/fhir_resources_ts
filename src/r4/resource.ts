import type { code, id, uri } from "./data_types";
import Meta from "./meta";

class Resource {
  meta?: Meta;
  id?: id;
  implicitRules?: uri;
  language?: code;

  constructor(id?: id, meta?: Meta, implicitRules?: uri, language?: code) {
    this.id = id;
    this.meta = meta;
    this.implicitRules = implicitRules;
    this.language = language;
  }
}

export default Resource;
