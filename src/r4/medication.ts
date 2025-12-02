import { BaseFhirResource } from './baseResource';
import { Identifier } from './identifier';
import { Reference } from './reference';
import { CodeableConcept } from './dataTypes/codeableConcept';
import { Quantity } from './dataTypes/quantity';
import { Ratio } from './dataTypes/ratio';

/**
 * Active or inactive ingredient in a medication
 */
export class MedicationIngredient {
    item: CodeableConcept | Reference;      // Required: The ingredient (substance or medication)
    isActive?: boolean;                     // Active ingredient indicator
    // Union type for strength[x]
    strengthRatio?: Ratio;
    strengthCodeableConcept?: CodeableConcept;
    strengthQuantity?: Quantity;

    constructor(data: Partial<MedicationIngredient>) {
        if (!data.item) {
            throw new Error('MedicationIngredient requires item');
        }

        // Handle item as either CodeableConcept or Reference
        if (data.item instanceof CodeableConcept || data.item instanceof Reference) {
            this.item = data.item;
        } else if (typeof data.item === 'object') {
            // Try to determine if it's a Reference or CodeableConcept based on properties
            if ('reference' in data.item || 'type' in data.item || 'identifier' in data.item) {
                this.item = new Reference(data.item as any);
            } else {
                this.item = new CodeableConcept(data.item as any);
            }
        } else {
            throw new Error('MedicationIngredient item must be CodeableConcept or Reference');
        }

        if (data.isActive !== undefined) {
            this.isActive = data.isActive;
        }

        // Handle strength[x] - only one should be set
        if (data.strengthRatio !== undefined) {
            this.strengthRatio = data.strengthRatio instanceof Ratio ? data.strengthRatio : new Ratio(data.strengthRatio as any);
        }
        if (data.strengthCodeableConcept !== undefined) {
            this.strengthCodeableConcept = data.strengthCodeableConcept instanceof CodeableConcept
                ? data.strengthCodeableConcept
                : new CodeableConcept(data.strengthCodeableConcept as any);
        }
        if (data.strengthQuantity !== undefined) {
            this.strengthQuantity = data.strengthQuantity instanceof Quantity
                ? data.strengthQuantity
                : new Quantity(data.strengthQuantity as any);
        }
    }

    toJson(): any {
        const json: any = {
            item: this.item.toJson()
        };

        if (this.isActive !== undefined) {
            json.isActive = this.isActive;
        }

        if (this.strengthRatio !== undefined) {
            json.strengthRatio = this.strengthRatio.toJson();
        }
        if (this.strengthCodeableConcept !== undefined) {
            json.strengthCodeableConcept = this.strengthCodeableConcept.toJson();
        }
        if (this.strengthQuantity !== undefined) {
            json.strengthQuantity = this.strengthQuantity.toJson();
        }

        return json;
    }

    toXml(): string {
        let xml = `<item>${this.item.toXml()}</item>`;

        if (this.isActive !== undefined) {
            xml += `<isActive value="${this.isActive}"/>`;
        }

        if (this.strengthRatio !== undefined) {
            xml += `<strengthRatio>${this.strengthRatio.toXml()}</strengthRatio>`;
        }
        if (this.strengthCodeableConcept !== undefined) {
            xml += `<strengthCodeableConcept>${this.strengthCodeableConcept.toXml()}</strengthCodeableConcept>`;
        }
        if (this.strengthQuantity !== undefined) {
            xml += `<strengthQuantity>${this.strengthQuantity.toXml()}</strengthQuantity>`;
        }

        return `<ingredient>${xml}</ingredient>`;
    }

    static fromJson(json: any): MedicationIngredient {
        return new MedicationIngredient(json);
    }
}

/**
 * Details about packaged medications
 */
export class MedicationBatch {
    lotNumber?: string;                     // Identifier assigned to batch
    expirationDate?: string;                // When batch will expire (dateTime)

    constructor(data: Partial<MedicationBatch>) {
        if (data.lotNumber !== undefined) {
            this.lotNumber = data.lotNumber;
        }

        if (data.expirationDate !== undefined) {
            this.expirationDate = data.expirationDate;
        }
    }

    toJson(): any {
        const json: any = {};

        if (this.lotNumber !== undefined) {
            json.lotNumber = this.lotNumber;
        }

        if (this.expirationDate !== undefined) {
            json.expirationDate = this.expirationDate;
        }

        return json;
    }

    toXml(): string {
        let xml = '';

        if (this.lotNumber !== undefined) {
            xml += `<lotNumber value="${this.lotNumber}"/>`;
        }

        if (this.expirationDate !== undefined) {
            xml += `<expirationDate value="${this.expirationDate}"/>`;
        }

        return `<batch>${xml}</batch>`;
    }

    static fromJson(json: any): MedicationBatch {
        return new MedicationBatch(json);
    }
}

/**
 * Medication - Definition of a Medication
 * 
 * This resource is primarily used for the identification and definition of a medication, 
 * including ingredients, for the purposes of prescribing, dispensing, and administering a medication 
 * as well as for making statements about medication use.
 */
export class Medication extends BaseFhirResource {
    resourceType: 'Medication' = 'Medication';

    identifier?: Identifier[];                       // Business identifier for this medication
    code?: CodeableConcept;                         // Codes that identify this medication
    status?: string;                                // active | inactive | entered-in-error
    marketingAuthorizationHolder?: Reference;       // Organization that has authorization to market medication
    doseForm?: CodeableConcept;                     // powder | tablets | capsule +
    totalVolume?: Quantity;                         // Specific amount of drug in the product
    ingredient?: MedicationIngredient[];            // Active or inactive ingredient
    batch?: MedicationBatch;                        // Details about packaged medications
    definition?: Reference;                         // Knowledge about this medication (MedicationKnowledge)

    constructor(data: Partial<Medication>) {
        super(data as any);

        // Optional fields
        if (data.status !== undefined) {
            this.status = data.status;
        }

        if (data.code !== undefined) {
            this.code = data.code instanceof CodeableConcept ? data.code : new CodeableConcept(data.code as any);
        }

        if (data.marketingAuthorizationHolder !== undefined) {
            this.marketingAuthorizationHolder = data.marketingAuthorizationHolder instanceof Reference
                ? data.marketingAuthorizationHolder
                : new Reference(data.marketingAuthorizationHolder as any);
        }

        if (data.doseForm !== undefined) {
            this.doseForm = data.doseForm instanceof CodeableConcept ? data.doseForm : new CodeableConcept(data.doseForm as any);
        }

        if (data.totalVolume !== undefined) {
            this.totalVolume = data.totalVolume instanceof Quantity ? data.totalVolume : new Quantity(data.totalVolume as any);
        }

        if (data.batch !== undefined) {
            this.batch = data.batch instanceof MedicationBatch ? data.batch : new MedicationBatch(data.batch as any);
        }

        if (data.definition !== undefined) {
            this.definition = data.definition instanceof Reference ? data.definition : new Reference(data.definition as any);
        }

        // Array fields
        if (data.identifier) {
            this.identifier = Array.isArray(data.identifier)
                ? data.identifier.map(i => i instanceof Identifier ? i : new Identifier(i as any))
                : [new Identifier(data.identifier as any)];
        }

        if (data.ingredient) {
            this.ingredient = Array.isArray(data.ingredient)
                ? data.ingredient.map(i => i instanceof MedicationIngredient ? i : new MedicationIngredient(i as any))
                : [new MedicationIngredient(data.ingredient as any)];
        }
    }

    /**
     * Converts the Medication resource to JSON format
     */
    toJson(): any {
        const json = super.toJson();

        json.resourceType = this.resourceType;

        if (this.status !== undefined) {
            json.status = this.status;
        }

        if (this.code) {
            json.code = this.code.toJson();
        }

        if (this.marketingAuthorizationHolder) {
            json.marketingAuthorizationHolder = this.marketingAuthorizationHolder.toJson();
        }

        if (this.doseForm) {
            json.doseForm = this.doseForm.toJson();
        }

        if (this.totalVolume) {
            json.totalVolume = this.totalVolume.toJson();
        }

        if (this.batch) {
            json.batch = this.batch.toJson();
        }

        if (this.definition) {
            json.definition = this.definition.toJson();
        }

        if (this.identifier) {
            json.identifier = this.identifier.map(i => i.toJson());
        }

        if (this.ingredient) {
            json.ingredient = this.ingredient.map(i => i.toJson());
        }

        return json;
    }

    /**
     * Converts the Medication resource to XML format
     */
    toXml(): string {
        let xml = '';

        if (this.id) {
            xml += `<id value="${this.id}"/>`;
        }

        xml += `<resourceType value="${this.resourceType}"/>`;

        if (this.status !== undefined) {
            xml += `<status value="${this.status}"/>`;
        }

        if (this.code) {
            xml += `<code>${this.code.toXml()}</code>`;
        }

        if (this.marketingAuthorizationHolder) {
            xml += `<marketingAuthorizationHolder>${this.marketingAuthorizationHolder.toXml()}</marketingAuthorizationHolder>`;
        }

        if (this.doseForm) {
            xml += `<doseForm>${this.doseForm.toXml()}</doseForm>`;
        }

        if (this.totalVolume) {
            xml += `<totalVolume>${this.totalVolume.toXml()}</totalVolume>`;
        }

        if (this.batch) {
            xml += this.batch.toXml();
        }

        if (this.definition) {
            xml += `<definition>${this.definition.toXml()}</definition>`;
        }

        if (this.identifier) {
            this.identifier.forEach(i => {
                xml += i.toXml();
            });
        }

        if (this.ingredient) {
            this.ingredient.forEach(i => {
                xml += i.toXml();
            });
        }

        return `<Medication>${xml}</Medication>`;
    }

    /**
     * Creates a Medication resource from JSON
     */
    static fromJson(json: any): Medication {
        return new Medication(json);
    }

    /**
     * Validates the Medication resource
     */
    isValid(): boolean {
        // Validate status if present
        if (this.status) {
            const validStatuses = ['active', 'inactive', 'entered-in-error'];
            if (!validStatuses.includes(this.status)) {
                return false;
            }
        }

        // Validate that only one strength[x] is set per ingredient
        if (this.ingredient) {
            for (const ingredient of this.ingredient) {
                let strengthCount = 0;
                if (ingredient.strengthRatio) strengthCount++;
                if (ingredient.strengthCodeableConcept) strengthCount++;
                if (ingredient.strengthQuantity) strengthCount++;

                if (strengthCount > 1) {
                    return false; // Only one strength type allowed
                }
            }
        }

        // Validate dateTime format for batch expiration date
        if (this.batch?.expirationDate) {
            const dateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})$/;
            if (!dateTimeRegex.test(this.batch.expirationDate)) {
                return false;
            }
        }

        return true;
    }

    /**
     * Gets all active ingredients
     */
    getActiveIngredients(): MedicationIngredient[] {
        if (!this.ingredient) {
            return [];
        }

        return this.ingredient.filter(ingredient => ingredient.isActive === true);
    }

    /**
     * Gets all inactive ingredients
     */
    getInactiveIngredients(): MedicationIngredient[] {
        if (!this.ingredient) {
            return [];
        }

        return this.ingredient.filter(ingredient => ingredient.isActive === false);
    }

    /**
     * Checks if the medication has expired (based on batch expiration)
     */
    isExpired(): boolean {
        if (!this.batch?.expirationDate) {
            return false; // No expiration date means not expired
        }

        const expirationDate = new Date(this.batch.expirationDate);
        const currentDate = new Date();

        return currentDate > expirationDate;
    }

    /**
     * Gets the medication name from the code display
     */
    getMedicationName(): string | undefined {
        return this.code?.text as string || this.code?.coding?.[0]?.display as string;
    }

    /**
     * Gets the dose form display name
     */
    getDoseFormName(): string | undefined {
        return this.doseForm?.text as string || this.doseForm?.coding?.[0]?.display as string;
    }

    /**
     * Checks if this is a prescription medication (has marketing authorization)
     */
    isPrescriptionMedication(): boolean {
        return !!this.marketingAuthorizationHolder;
    }
}