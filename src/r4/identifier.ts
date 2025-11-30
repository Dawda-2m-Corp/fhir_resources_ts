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
    if (data.extensions) this.extensions = data.extensions;
    if (data.use) this.use = data.use;
    if (data.type) this.type = data.type;
    if (data.system) this.system = data.system;
    if (data.value) this.value = data.value;
    if (data.period) this.period = data.period;
    if (data.assigner) this.assigner = data.assigner;
  }
}