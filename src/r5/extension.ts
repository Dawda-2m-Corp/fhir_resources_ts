import { Identifier } from "../r4";
import { Extension as ExtensionR4 } from "../r4/extensions";

export class Extension extends ExtensionR4 {
    identifier?: Identifier;

    constructor(data: Extension) {
        super(data);
        if (data.identifier) {
            this.identifier = new Identifier(data.identifier);
        }
    }

    toJson(): Record<string, any> {
        const result: Record<string, any> = super.toJson();

        if (this.identifier !== undefined) {
            result.identifier = typeof this.identifier.toJson === 'function' ? this.identifier.toJson() : this.identifier;
        }

        return result;
    }
}