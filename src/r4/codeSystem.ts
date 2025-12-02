import { BaseFhirResource } from './baseResource';
import { Identifier } from './identifier';
import { Coding } from './dataTypes/coding';
import { CodeableConcept } from './dataTypes/codeableConcept';
import { Period } from './dataTypes/period';

/**
 * Filter that can be used in a value set
 */
export class CodeSystemFilter {
    code: string;                    // Required: Code that identifies the filter
    description?: string;            // How or why the filter is used
    operator: string[];              // Required: Operators (=, is-a, descendent-of, etc.)
    value: string;                   // Required: What to use for the value

    constructor(data: Partial<CodeSystemFilter>) {
        if (!data.code || !data.operator || !data.value) {
            throw new Error('CodeSystemFilter requires code, operator, and value');
        }

        this.code = data.code;
        this.operator = Array.isArray(data.operator) ? data.operator : [data.operator as string];
        this.value = data.value;

        if (data.description !== undefined) {
            this.description = data.description;
        }
    }

    toJson(): any {
        const json: any = {
            code: this.code,
            operator: this.operator,
            value: this.value
        };

        if (this.description !== undefined) {
            json.description = this.description;
        }

        return json;
    }

    toXml(): string {
        let xml = `<code value="${this.code}"/>`;

        if (this.description !== undefined) {
            xml += `<description value="${this.description}"/>`;
        }

        this.operator.forEach(op => {
            xml += `<operator value="${op}"/>`;
        });

        xml += `<value value="${this.value}"/>`;

        return `<filter>${xml}</filter>`;
    }

    static fromJson(json: any): CodeSystemFilter {
        return new CodeSystemFilter(json);
    }
}

/**
 * Additional information supplied about each concept
 */
export class CodeSystemProperty {
    code: string;                    // Required: Identifies the property on the concepts
    uri?: string;                    // Formal identifier for the property
    description?: string;            // Why the property is defined
    type: string;                    // Required: code | Coding | string | integer | boolean | dateTime | decimal

    constructor(data: Partial<CodeSystemProperty>) {
        if (!data.code || !data.type) {
            throw new Error('CodeSystemProperty requires code and type');
        }

        this.code = data.code;
        this.type = data.type;

        if (data.uri !== undefined) {
            this.uri = data.uri;
        }

        if (data.description !== undefined) {
            this.description = data.description;
        }
    }

    toJson(): any {
        const json: any = {
            code: this.code,
            type: this.type
        };

        if (this.uri !== undefined) {
            json.uri = this.uri;
        }

        if (this.description !== undefined) {
            json.description = this.description;
        }

        return json;
    }

    toXml(): string {
        let xml = `<code value="${this.code}"/>`;

        if (this.uri !== undefined) {
            xml += `<uri value="${this.uri}"/>`;
        }

        if (this.description !== undefined) {
            xml += `<description value="${this.description}"/>`;
        }

        xml += `<type value="${this.type}"/>`;

        return `<property>${xml}</property>`;
    }

    static fromJson(json: any): CodeSystemProperty {
        return new CodeSystemProperty(json);
    }
}

/**
 * Additional representations for the concept
 */
export class CodeSystemConceptDesignation {
    language?: string;               // Human language of the designation
    use?: Coding;                    // Details how this designation would be used
    additionalUse?: Coding[];        // Additional ways how this designation would be used
    value: string;                   // Required: The text value for this designation

    constructor(data: Partial<CodeSystemConceptDesignation>) {
        if (!data.value) {
            throw new Error('CodeSystemConceptDesignation requires value');
        }

        this.value = data.value;

        if (data.language !== undefined) {
            this.language = data.language;
        }

        if (data.use !== undefined) {
            this.use = data.use instanceof Coding ? data.use : new Coding(data.use as any);
        }

        if (data.additionalUse) {
            this.additionalUse = Array.isArray(data.additionalUse)
                ? data.additionalUse.map(u => u instanceof Coding ? u : new Coding(u as any))
                : [new Coding(data.additionalUse as any)];
        }
    }

    toJson(): any {
        const json: any = {
            value: this.value
        };

        if (this.language !== undefined) {
            json.language = this.language;
        }

        if (this.use) {
            json.use = this.use.toJson();
        }

        if (this.additionalUse) {
            json.additionalUse = this.additionalUse.map(u => u.toJson());
        }

        return json;
    }

    toXml(): string {
        let xml = '';

        if (this.language !== undefined) {
            xml += `<language value="${this.language}"/>`;
        }

        if (this.use) {
            xml += `<use>${this.use.toXml()}</use>`;
        }

        if (this.additionalUse) {
            this.additionalUse.forEach(u => {
                xml += `<additionalUse>${u.toXml()}</additionalUse>`;
            });
        }

        xml += `<value value="${this.value}"/>`;

        return `<designation>${xml}</designation>`;
    }

    static fromJson(json: any): CodeSystemConceptDesignation {
        return new CodeSystemConceptDesignation(json);
    }
}

/**
 * Property value for the concept
 */
export class CodeSystemConceptProperty {
    code: string;                    // Required: Reference to CodeSystem.property.code
    // Union type for value[x]
    valueCode?: string;
    valueCoding?: Coding;
    valueString?: string;
    valueInteger?: number;
    valueBoolean?: boolean;
    valueDateTime?: string;
    valueDecimal?: number;

    constructor(data: Partial<CodeSystemConceptProperty>) {
        if (!data.code) {
            throw new Error('CodeSystemConceptProperty requires code');
        }

        this.code = data.code;

        // Handle value[x] - only one should be set
        if (data.valueCode !== undefined) this.valueCode = data.valueCode;
        if (data.valueCoding !== undefined) {
            this.valueCoding = data.valueCoding instanceof Coding ? data.valueCoding : new Coding(data.valueCoding as any);
        }
        if (data.valueString !== undefined) this.valueString = data.valueString;
        if (data.valueInteger !== undefined) this.valueInteger = data.valueInteger;
        if (data.valueBoolean !== undefined) this.valueBoolean = data.valueBoolean;
        if (data.valueDateTime !== undefined) this.valueDateTime = data.valueDateTime;
        if (data.valueDecimal !== undefined) this.valueDecimal = data.valueDecimal;
    }

    toJson(): any {
        const json: any = {
            code: this.code
        };

        if (this.valueCode !== undefined) json.valueCode = this.valueCode;
        if (this.valueCoding !== undefined) json.valueCoding = this.valueCoding.toJson();
        if (this.valueString !== undefined) json.valueString = this.valueString;
        if (this.valueInteger !== undefined) json.valueInteger = this.valueInteger;
        if (this.valueBoolean !== undefined) json.valueBoolean = this.valueBoolean;
        if (this.valueDateTime !== undefined) json.valueDateTime = this.valueDateTime;
        if (this.valueDecimal !== undefined) json.valueDecimal = this.valueDecimal;

        return json;
    }

    toXml(): string {
        let xml = `<code value="${this.code}"/>`;

        if (this.valueCode !== undefined) xml += `<valueCode value="${this.valueCode}"/>`;
        if (this.valueCoding !== undefined) xml += `<valueCoding>${this.valueCoding.toXml()}</valueCoding>`;
        if (this.valueString !== undefined) xml += `<valueString value="${this.valueString}"/>`;
        if (this.valueInteger !== undefined) xml += `<valueInteger value="${this.valueInteger}"/>`;
        if (this.valueBoolean !== undefined) xml += `<valueBoolean value="${this.valueBoolean}"/>`;
        if (this.valueDateTime !== undefined) xml += `<valueDateTime value="${this.valueDateTime}"/>`;
        if (this.valueDecimal !== undefined) xml += `<valueDecimal value="${this.valueDecimal}"/>`;

        return `<property>${xml}</property>`;
    }

    static fromJson(json: any): CodeSystemConceptProperty {
        return new CodeSystemConceptProperty(json);
    }
}

/**
 * Concepts in the code system
 */
export class CodeSystemConcept {
    code: string;                                    // Required: Code that identifies concept
    display?: string;                                // Text to display to the user
    definition?: string;                             // Formal definition
    designation?: CodeSystemConceptDesignation[];    // Additional representations for the concept
    property?: CodeSystemConceptProperty[];          // Property value for the concept
    concept?: CodeSystemConcept[];                   // Child Concepts (hierarchical)

    constructor(data: Partial<CodeSystemConcept>) {
        if (!data.code) {
            throw new Error('CodeSystemConcept requires code');
        }

        this.code = data.code;

        if (data.display !== undefined) {
            this.display = data.display;
        }

        if (data.definition !== undefined) {
            this.definition = data.definition;
        }

        if (data.designation) {
            this.designation = Array.isArray(data.designation)
                ? data.designation.map(d => d instanceof CodeSystemConceptDesignation ? d : new CodeSystemConceptDesignation(d as any))
                : [new CodeSystemConceptDesignation(data.designation as any)];
        }

        if (data.property) {
            this.property = Array.isArray(data.property)
                ? data.property.map(p => p instanceof CodeSystemConceptProperty ? p : new CodeSystemConceptProperty(p as any))
                : [new CodeSystemConceptProperty(data.property as any)];
        }

        if (data.concept) {
            this.concept = Array.isArray(data.concept)
                ? data.concept.map(c => c instanceof CodeSystemConcept ? c : new CodeSystemConcept(c as any))
                : [new CodeSystemConcept(data.concept as any)];
        }
    }

    toJson(): any {
        const json: any = {
            code: this.code
        };

        if (this.display !== undefined) {
            json.display = this.display;
        }

        if (this.definition !== undefined) {
            json.definition = this.definition;
        }

        if (this.designation) {
            json.designation = this.designation.map(d => d.toJson());
        }

        if (this.property) {
            json.property = this.property.map(p => p.toJson());
        }

        if (this.concept) {
            json.concept = this.concept.map(c => c.toJson());
        }

        return json;
    }

    toXml(): string {
        let xml = `<code value="${this.code}"/>`;

        if (this.display !== undefined) {
            xml += `<display value="${this.display}"/>`;
        }

        if (this.definition !== undefined) {
            xml += `<definition value="${this.definition}"/>`;
        }

        if (this.designation) {
            this.designation.forEach(d => {
                xml += d.toXml();
            });
        }

        if (this.property) {
            this.property.forEach(p => {
                xml += p.toXml();
            });
        }

        if (this.concept) {
            this.concept.forEach(c => {
                xml += c.toXml();
            });
        }

        return `<concept>${xml}</concept>`;
    }

    static fromJson(json: any): CodeSystemConcept {
        return new CodeSystemConcept(json);
    }
}

/**
 * CodeSystem - A terminological code system
 * 
 * A code system resource specifies a set of codes drawn from one or more code systems.
 */
export class CodeSystem extends BaseFhirResource {
    resourceType: 'CodeSystem' = 'CodeSystem';

    url?: string;                                    // Canonical identifier for this code system
    identifier?: Identifier[];                       // Additional identifier for the code system
    version?: string;                                // Business version of the code system
    versionAlgorithmString?: string;                 // How to compare versions (string)
    versionAlgorithmCoding?: Coding;                 // How to compare versions (coding)
    name?: string;                                   // Name for this code system (computer friendly)
    title?: string;                                  // Name for this code system (human friendly)
    status: string;                                  // Required: draft | active | retired | unknown
    experimental?: boolean;                          // For testing purposes, not real usage
    date?: string;                                   // Date last changed
    publisher?: string;                              // Name of the publisher/steward
    contact?: any[];                                 // Contact details for the publisher (ContactDetail)
    description?: string;                            // Natural language description
    useContext?: any[];                              // The context that the content is intended to support (UsageContext)
    jurisdiction?: CodeableConcept[];                // Intended jurisdiction for code system
    purpose?: string;                                // Why this code system is defined
    copyright?: string;                              // Use and/or publishing restrictions
    copyrightLabel?: string;                         // Copyright holder and year(s)
    approvalDate?: string;                           // When the CodeSystem was approved by publisher
    lastReviewDate?: string;                         // When the CodeSystem was last reviewed
    effectivePeriod?: Period;                        // When the CodeSystem is expected to be used
    topic?: CodeableConcept[];                       // E.g. Education, Treatment, Assessment, etc
    author?: any[];                                  // Who authored the CodeSystem (ContactDetail)
    editor?: any[];                                  // Who edited the CodeSystem (ContactDetail)
    reviewer?: any[];                                // Who reviewed the CodeSystem (ContactDetail)
    endorser?: any[];                                // Who endorsed the CodeSystem (ContactDetail)
    relatedArtifact?: any[];                         // Additional documentation, citations, etc (RelatedArtifact)
    caseSensitive?: boolean;                         // If code comparison is case sensitive
    valueSet?: string;                               // Canonical reference to the value set
    hierarchyMeaning?: string;                       // grouped-by | is-a | part-of | classified-with
    compositional?: boolean;                         // If code system defines a compositional grammar
    versionNeeded?: boolean;                         // If definitions are not stable
    content: string;                                 // Required: not-present | example | fragment | complete | supplement
    supplements?: string;                            // Canonical URL of Code System this adds designations to
    count?: number;                                  // Total concepts in the code system
    filter?: CodeSystemFilter[];                     // Filter that can be used in a value set
    property?: CodeSystemProperty[];                 // Additional information supplied about each concept
    concept?: CodeSystemConcept[];                   // Concepts in the code system

    constructor(data: Partial<CodeSystem>) {
        super(data as any);

        // Required field validation
        if (!data.status || !data.content) {
            throw new Error('CodeSystem resource requires status and content');
        }

        this.status = data.status;
        this.content = data.content;

        // Optional fields
        if (data.url !== undefined) this.url = data.url;
        if (data.version !== undefined) this.version = data.version;
        if (data.versionAlgorithmString !== undefined) this.versionAlgorithmString = data.versionAlgorithmString;
        if (data.versionAlgorithmCoding !== undefined) {
            this.versionAlgorithmCoding = data.versionAlgorithmCoding instanceof Coding
                ? data.versionAlgorithmCoding
                : new Coding(data.versionAlgorithmCoding as any);
        }
        if (data.name !== undefined) this.name = data.name;
        if (data.title !== undefined) this.title = data.title;
        if (data.experimental !== undefined) this.experimental = data.experimental;
        if (data.date !== undefined) this.date = data.date;
        if (data.publisher !== undefined) this.publisher = data.publisher;
        if (data.contact !== undefined) this.contact = data.contact;
        if (data.description !== undefined) this.description = data.description;
        if (data.useContext !== undefined) this.useContext = data.useContext;
        if (data.purpose !== undefined) this.purpose = data.purpose;
        if (data.copyright !== undefined) this.copyright = data.copyright;
        if (data.copyrightLabel !== undefined) this.copyrightLabel = data.copyrightLabel;
        if (data.approvalDate !== undefined) this.approvalDate = data.approvalDate;
        if (data.lastReviewDate !== undefined) this.lastReviewDate = data.lastReviewDate;
        if (data.caseSensitive !== undefined) this.caseSensitive = data.caseSensitive;
        if (data.valueSet !== undefined) this.valueSet = data.valueSet;
        if (data.hierarchyMeaning !== undefined) this.hierarchyMeaning = data.hierarchyMeaning;
        if (data.compositional !== undefined) this.compositional = data.compositional;
        if (data.versionNeeded !== undefined) this.versionNeeded = data.versionNeeded;
        if (data.supplements !== undefined) this.supplements = data.supplements;
        if (data.count !== undefined) this.count = data.count;

        // Array fields
        if (data.identifier) {
            this.identifier = Array.isArray(data.identifier)
                ? data.identifier.map(i => i instanceof Identifier ? i : new Identifier(i as any))
                : [new Identifier(data.identifier as any)];
        }

        if (data.jurisdiction) {
            this.jurisdiction = Array.isArray(data.jurisdiction)
                ? data.jurisdiction.map(j => j instanceof CodeableConcept ? j : new CodeableConcept(j as any))
                : [new CodeableConcept(data.jurisdiction as any)];
        }

        if (data.effectivePeriod !== undefined) {
            this.effectivePeriod = data.effectivePeriod instanceof Period
                ? data.effectivePeriod
                : new Period(data.effectivePeriod as any);
        }

        if (data.topic) {
            this.topic = Array.isArray(data.topic)
                ? data.topic.map(t => t instanceof CodeableConcept ? t : new CodeableConcept(t as any))
                : [new CodeableConcept(data.topic as any)];
        }

        if (data.author !== undefined) this.author = data.author;
        if (data.editor !== undefined) this.editor = data.editor;
        if (data.reviewer !== undefined) this.reviewer = data.reviewer;
        if (data.endorser !== undefined) this.endorser = data.endorser;
        if (data.relatedArtifact !== undefined) this.relatedArtifact = data.relatedArtifact;

        if (data.filter) {
            this.filter = Array.isArray(data.filter)
                ? data.filter.map(f => f instanceof CodeSystemFilter ? f : new CodeSystemFilter(f as any))
                : [new CodeSystemFilter(data.filter as any)];
        }

        if (data.property) {
            this.property = Array.isArray(data.property)
                ? data.property.map(p => p instanceof CodeSystemProperty ? p : new CodeSystemProperty(p as any))
                : [new CodeSystemProperty(data.property as any)];
        }

        if (data.concept) {
            this.concept = Array.isArray(data.concept)
                ? data.concept.map(c => c instanceof CodeSystemConcept ? c : new CodeSystemConcept(c as any))
                : [new CodeSystemConcept(data.concept as any)];
        }
    }

    /**
     * Converts the CodeSystem resource to JSON format
     */
    toJson(): any {
        const json = super.toJson();

        json.resourceType = this.resourceType;
        json.status = this.status;
        json.content = this.content;

        if (this.url !== undefined) json.url = this.url;
        if (this.version !== undefined) json.version = this.version;
        if (this.versionAlgorithmString !== undefined) json.versionAlgorithmString = this.versionAlgorithmString;
        if (this.versionAlgorithmCoding !== undefined) json.versionAlgorithmCoding = this.versionAlgorithmCoding.toJson();
        if (this.name !== undefined) json.name = this.name;
        if (this.title !== undefined) json.title = this.title;
        if (this.experimental !== undefined) json.experimental = this.experimental;
        if (this.date !== undefined) json.date = this.date;
        if (this.publisher !== undefined) json.publisher = this.publisher;
        if (this.contact !== undefined) json.contact = this.contact;
        if (this.description !== undefined) json.description = this.description;
        if (this.useContext !== undefined) json.useContext = this.useContext;
        if (this.purpose !== undefined) json.purpose = this.purpose;
        if (this.copyright !== undefined) json.copyright = this.copyright;
        if (this.copyrightLabel !== undefined) json.copyrightLabel = this.copyrightLabel;
        if (this.approvalDate !== undefined) json.approvalDate = this.approvalDate;
        if (this.lastReviewDate !== undefined) json.lastReviewDate = this.lastReviewDate;
        if (this.caseSensitive !== undefined) json.caseSensitive = this.caseSensitive;
        if (this.valueSet !== undefined) json.valueSet = this.valueSet;
        if (this.hierarchyMeaning !== undefined) json.hierarchyMeaning = this.hierarchyMeaning;
        if (this.compositional !== undefined) json.compositional = this.compositional;
        if (this.versionNeeded !== undefined) json.versionNeeded = this.versionNeeded;
        if (this.supplements !== undefined) json.supplements = this.supplements;
        if (this.count !== undefined) json.count = this.count;

        if (this.identifier) {
            json.identifier = this.identifier.map(i => i.toJson());
        }

        if (this.jurisdiction) {
            json.jurisdiction = this.jurisdiction.map(j => j.toJson());
        }

        if (this.effectivePeriod) {
            json.effectivePeriod = this.effectivePeriod.toJson();
        }

        if (this.topic) {
            json.topic = this.topic.map(t => t.toJson());
        }

        if (this.author !== undefined) json.author = this.author;
        if (this.editor !== undefined) json.editor = this.editor;
        if (this.reviewer !== undefined) json.reviewer = this.reviewer;
        if (this.endorser !== undefined) json.endorser = this.endorser;
        if (this.relatedArtifact !== undefined) json.relatedArtifact = this.relatedArtifact;

        if (this.filter) {
            json.filter = this.filter.map(f => f.toJson());
        }

        if (this.property) {
            json.property = this.property.map(p => p.toJson());
        }

        if (this.concept) {
            json.concept = this.concept.map(c => c.toJson());
        }

        return json;
    }

    /**
     * Converts the CodeSystem resource to XML format
     */
    toXml(): string {
        let xml = '';

        if (this.id) {
            xml += `<id value="${this.id}"/>`;
        }

        xml += `<resourceType value="${this.resourceType}"/>`;
        xml += `<status value="${this.status}"/>`;
        xml += `<content value="${this.content}"/>`;

        if (this.url !== undefined) xml += `<url value="${this.url}"/>`;
        if (this.version !== undefined) xml += `<version value="${this.version}"/>`;
        if (this.versionAlgorithmString !== undefined) xml += `<versionAlgorithmString value="${this.versionAlgorithmString}"/>`;
        if (this.versionAlgorithmCoding !== undefined) xml += `<versionAlgorithmCoding>${this.versionAlgorithmCoding.toXml()}</versionAlgorithmCoding>`;
        if (this.name !== undefined) xml += `<name value="${this.name}"/>`;
        if (this.title !== undefined) xml += `<title value="${this.title}"/>`;
        if (this.experimental !== undefined) xml += `<experimental value="${this.experimental}"/>`;
        if (this.date !== undefined) xml += `<date value="${this.date}"/>`;
        if (this.publisher !== undefined) xml += `<publisher value="${this.publisher}"/>`;
        if (this.description !== undefined) xml += `<description value="${this.description}"/>`;
        if (this.purpose !== undefined) xml += `<purpose value="${this.purpose}"/>`;
        if (this.copyright !== undefined) xml += `<copyright value="${this.copyright}"/>`;
        if (this.copyrightLabel !== undefined) xml += `<copyrightLabel value="${this.copyrightLabel}"/>`;
        if (this.approvalDate !== undefined) xml += `<approvalDate value="${this.approvalDate}"/>`;
        if (this.lastReviewDate !== undefined) xml += `<lastReviewDate value="${this.lastReviewDate}"/>`;
        if (this.caseSensitive !== undefined) xml += `<caseSensitive value="${this.caseSensitive}"/>`;
        if (this.valueSet !== undefined) xml += `<valueSet value="${this.valueSet}"/>`;
        if (this.hierarchyMeaning !== undefined) xml += `<hierarchyMeaning value="${this.hierarchyMeaning}"/>`;
        if (this.compositional !== undefined) xml += `<compositional value="${this.compositional}"/>`;
        if (this.versionNeeded !== undefined) xml += `<versionNeeded value="${this.versionNeeded}"/>`;
        if (this.supplements !== undefined) xml += `<supplements value="${this.supplements}"/>`;
        if (this.count !== undefined) xml += `<count value="${this.count}"/>`;

        if (this.identifier) {
            this.identifier.forEach(i => {
                xml += i.toXml();
            });
        }

        if (this.jurisdiction) {
            this.jurisdiction.forEach(j => {
                xml += `<jurisdiction>${j.toXml()}</jurisdiction>`;
            });
        }

        if (this.effectivePeriod) {
            xml += `<effectivePeriod>${this.effectivePeriod.toXml()}</effectivePeriod>`;
        }

        if (this.topic) {
            this.topic.forEach(t => {
                xml += `<topic>${t.toXml()}</topic>`;
            });
        }

        if (this.filter) {
            this.filter.forEach(f => {
                xml += f.toXml();
            });
        }

        if (this.property) {
            this.property.forEach(p => {
                xml += p.toXml();
            });
        }

        if (this.concept) {
            this.concept.forEach(c => {
                xml += c.toXml();
            });
        }

        return `<CodeSystem>${xml}</CodeSystem>`;
    }

    /**
     * Creates a CodeSystem resource from JSON
     */
    static fromJson(json: any): CodeSystem {
        return new CodeSystem(json);
    }

    /**
     * Validates the CodeSystem resource
     */
    isValid(): boolean {
        // Required field validation
        if (!this.status || !this.content) {
            return false;
        }

        // Validate status values
        const validStatuses = ['draft', 'active', 'retired', 'unknown'];
        if (!validStatuses.includes(this.status)) {
            return false;
        }

        // Validate content values
        const validContentTypes = ['not-present', 'example', 'fragment', 'complete', 'supplement'];
        if (!validContentTypes.includes(this.content)) {
            return false;
        }

        // Validate hierarchyMeaning if present
        if (this.hierarchyMeaning) {
            const validHierarchyMeanings = ['grouped-by', 'is-a', 'part-of', 'classified-with'];
            if (!validHierarchyMeanings.includes(this.hierarchyMeaning)) {
                return false;
            }
        }

        return true;
    }

    /**
     * Gets all concepts including nested ones
     */
    getAllConcepts(): CodeSystemConcept[] {
        if (!this.concept) {
            return [];
        }

        const allConcepts: CodeSystemConcept[] = [];

        const addConcepts = (concepts: CodeSystemConcept[]) => {
            concepts.forEach(concept => {
                allConcepts.push(concept);
                if (concept.concept) {
                    addConcepts(concept.concept);
                }
            });
        };

        addConcepts(this.concept);
        return allConcepts;
    }

    /**
     * Finds a concept by code
     */
    findConcept(code: string): CodeSystemConcept | undefined {
        return this.getAllConcepts().find(c => c.code === code);
    }

    /**
     * Gets the total number of concepts (including nested)
     */
    getConceptCount(): number {
        return this.getAllConcepts().length;
    }
}