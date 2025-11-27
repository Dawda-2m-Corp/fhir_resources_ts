import { datetimestr } from ".";

class Period {
  start?: datetimestr;
  end?: datetimestr;

  constructor(start?: datetimestr, end?: datetimestr) {
    this.start = start;
    this.end = end;
  }
}

export default Period;
