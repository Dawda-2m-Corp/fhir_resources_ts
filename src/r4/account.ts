import BaseResource from "./baseResource";
import { code, positiveInt } from "./data_types";
import CodeableConcept from "./data_types/codeableConcept";
import Period from "./data_types/period";
import Identifier from "./identifier";
import Reference from "./reference";

class AccountCoverage {
  coverage: Reference;
  priority?: positiveInt;

  constructor(coverage: Reference, priority?: positiveInt) {
    this.coverage = coverage;
    this.priority = priority;
  }
}

class AccountGaurantor {
  party: Reference;
  onHold?: boolean;
  period?: Period;

  constructor(party: Reference) {
    this.party = party;
  }
}

class Account extends BaseResource {
  identifier?: Array<Identifier>;
  status: code;
  type?: CodeableConcept;
  name?: String;
  subject?: Array<Reference>;
  servicePeriod?: Period;
  coverage?: Array<AccountCoverage>;
  owner?: Reference;
  description?: String;
  guarantor?: Array<AccountGaurantor>;
  partOf?: Reference;

  constructor(status: code, identifier?: Array<Identifier>) {
    super();
    this.identifier = identifier;
    this.status = status;
  }
}

export default { AccountCoverage, Account, AccountGaurantor };
