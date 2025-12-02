import { BaseFhirResource as BaseFhirResourceR4 } from "../r4";
import { Extension } from "./extension";

export class BaseFhirResource extends BaseFhirResourceR4 {
    extension?: Extension[] | undefined;
}