import { code, uri } from "./data_types";
import CodeableConcept from "./data_types/codeableConcept";
import Period from "./data_types/period";
import Reference from "./reference";

class Identifier {
  use?: code;
  type?: CodeableConcept;
  system?: uri;
  value?: String;
  period?: Period;
  assigner?: Reference;
}

export default Identifier;
