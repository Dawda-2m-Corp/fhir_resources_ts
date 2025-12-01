import { Period } from "./dataTypes/period";
import { Extension } from "./extensions";
import { Reference } from "./reference";


export class Identifier {
  extensions?: Extension[];
  use?: string;
  type?: string;
  system?: string;
  value?: string;
  period?: Period;
  assigner?: Reference;

  constructor(data: Partial<Identifier> = {}) {
    Object.assign(this, data);
  }

  toJson(): Record<string, any> {
    return {
      ...this,
    };
  }

  toXml(): String {
    return `<Identifier>${JSON.stringify(this)}</Identifier>`;
  }
}