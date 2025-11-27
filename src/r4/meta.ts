import type { canonical, id, instant, uri } from "./data_types";

class Meta {
  constructor(
    versionId?: id,
    lastUpdated?: instant,
    source?: uri,
    profile?: canonical,
  ) {}
}

export default Meta;
