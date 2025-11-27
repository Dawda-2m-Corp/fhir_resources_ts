import Coding from "./coding";

class CodeableConcept {
  coding?: Coding;
  text?: String;

  constructor(coding?: Coding, text?: String) {
    this.coding = coding;
    this.text = text;
  }
}

export default CodeableConcept;
