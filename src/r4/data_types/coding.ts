import { code, uri } from ".";

class Coding {
  system?: uri;
  version?: String;
  code?: code;
  display?: String;
  userSelected?: boolean;
  constructor(
    system?: uri,
    version?: String,
    code?: code,
    display?: String,
    userSelected?: boolean,
  ) {
    this.system = system;
    this.version = version;
    this.code = code;
    this.display = display;
    this.userSelected = userSelected;
  }
}

export default Coding;
