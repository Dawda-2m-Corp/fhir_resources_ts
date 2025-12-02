import { BaseFhirResource } from './baseResource';
import { Identifier } from './identifier';
import { Coding } from './dataTypes/coding';
import { CodeableConcept } from './dataTypes/codeableConcept';
import { ExtendedContactDetail } from './dataTypes/extendedContactDetail';
import { Address } from './dataTypes/address';
import { Reference } from './reference';
import { Availability } from './dataTypes/availability';
import { VirtualServiceDetail } from './dataTypes/virtualServiceDetail';

/**
 * The absolute geographic location of the Location
 */
export class LocationPosition {
    longitude!: number;      // Required: Longitude with WGS84 datum
    latitude!: number;       // Required: Latitude with WGS84 datum
    altitude?: number;       // Altitude with WGS84 datum

    constructor(data: Partial<LocationPosition>) {
        this.longitude = data.longitude!;
        this.latitude = data.latitude!;
        if (data.altitude !== undefined) {
            this.altitude = data.altitude;
        }
    }

    toJson(): any {
        const json: any = {
            longitude: this.longitude,
            latitude: this.latitude
        };
        if (this.altitude !== undefined) {
            json.altitude = this.altitude;
        }
        return json;
    }

    toXml(): string {
        let xml = '<position>';
        xml += `<longitude value="${this.longitude}"/>`;
        xml += `<latitude value="${this.latitude}"/>`;
        if (this.altitude !== undefined) {
            xml += `<altitude value="${this.altitude}"/>`;
        }
        xml += '</position>';
        return xml;
    }

    static fromJson(json: any): LocationPosition {
        return new LocationPosition({
            longitude: json.longitude,
            latitude: json.latitude,
            altitude: json.altitude
        });
    }
}

/**
 * Interface for Location constructor
 */
export interface LocationConstructorData {
    resourceType?: 'Location';
    id?: string;
    meta?: any;
    implicitRules?: string;
    language?: string;
    text?: any;
    contained?: any[];
    extension?: any[];
    modifierExtension?: any[];
    identifier?: Identifier[] | any[];
    status?: 'active' | 'suspended' | 'inactive';
    operationalStatus?: Coding | any;
    name?: string;
    alias?: string[];
    description?: string;
    mode?: 'instance' | 'kind';
    type?: CodeableConcept[] | any[];
    contact?: ExtendedContactDetail[] | any[];
    address?: Address | any;
    form?: CodeableConcept | any;
    position?: LocationPosition | any;
    managingOrganization?: Reference | any;
    partOf?: Reference | any;
    characteristic?: CodeableConcept[] | any[];
    hoursOfOperation?: Availability[] | any[];
    virtualService?: VirtualServiceDetail[] | any[];
    endpoint?: Reference[] | any[];
}

/**
 * Details and position information for a physical place where services are provided and resources and participants may be stored, found, contained, or accommodated.
 */
export class Location extends BaseFhirResource {
    resourceType: 'Location' = 'Location';
    identifier?: Identifier[];              // Unique code or number identifying the location to its users
    status?: 'active' | 'suspended' | 'inactive';  // Status of the location
    operationalStatus?: Coding;             // The operational status (typically for bed/room)
    name?: string;                          // Name of the location as used by humans
    alias?: string[];                       // Alternate names for the location
    description?: string;                   // Additional details about the location
    mode?: 'instance' | 'kind';             // Instance or kind
    type?: CodeableConcept[];               // Type of function performed
    contact?: ExtendedContactDetail[];      // Official contact details
    address?: Address;                      // Physical location
    form?: CodeableConcept;                 // Physical form of the location
    position?: LocationPosition;            // Absolute geographic location
    managingOrganization?: Reference;       // Organization responsible for provisioning
    partOf?: Reference;                     // Another Location this one is part of
    characteristic?: CodeableConcept[];     // Collection of characteristics
    hoursOfOperation?: Availability[];      // Operating hours
    virtualService?: VirtualServiceDetail[]; // Virtual service connection details
    endpoint?: Reference[];                 // Technical endpoints

    constructor(data: LocationConstructorData) {
        super(data as any);
        this.resourceType = 'Location';

        if (data.identifier) {
            this.identifier = Array.isArray(data.identifier)
                ? data.identifier.map(id => id instanceof Identifier ? id : new Identifier(id))
                : [new Identifier(data.identifier as any)];
        } if (data.status !== undefined) {
            this.status = data.status;
        }

        if (data.operationalStatus !== undefined) {
            this.operationalStatus = data.operationalStatus instanceof Coding ? data.operationalStatus : new Coding(data.operationalStatus);
        }

        if (data.name !== undefined) {
            this.name = data.name;
        }

        if (data.alias !== undefined) {
            this.alias = Array.isArray(data.alias) ? data.alias : [data.alias];
        }

        if (data.description !== undefined) {
            this.description = data.description;
        }

        if (data.mode !== undefined) {
            this.mode = data.mode;
        }

        if (data.type) {
            this.type = Array.isArray(data.type)
                ? data.type.map(t => t instanceof CodeableConcept ? t : new CodeableConcept(t))
                : [new CodeableConcept(data.type as any)];
        } if (data.contact) {
            this.contact = Array.isArray(data.contact)
                ? data.contact.map(c => new ExtendedContactDetail(c as any))
                : [new ExtendedContactDetail(data.contact as any)];
        } if (data.address !== undefined) {
            this.address = data.address instanceof Address ? data.address : new Address(data.address);
        }

        if (data.form !== undefined) {
            this.form = data.form instanceof CodeableConcept ? data.form : new CodeableConcept(data.form);
        }

        if (data.position !== undefined) {
            this.position = data.position instanceof LocationPosition ? data.position : new LocationPosition(data.position);
        }

        if (data.managingOrganization !== undefined) {
            this.managingOrganization = data.managingOrganization instanceof Reference ? data.managingOrganization : new Reference(data.managingOrganization);
        }

        if (data.partOf !== undefined) {
            this.partOf = data.partOf instanceof Reference ? data.partOf : new Reference(data.partOf);
        }

        if (data.characteristic) {
            this.characteristic = Array.isArray(data.characteristic)
                ? data.characteristic.map(c => c instanceof CodeableConcept ? c : new CodeableConcept(c))
                : [new CodeableConcept(data.characteristic as any)];
        } if (data.hoursOfOperation) {
            this.hoursOfOperation = Array.isArray(data.hoursOfOperation)
                ? data.hoursOfOperation.map(h => h instanceof Availability ? h : new Availability(h))
                : [new Availability(data.hoursOfOperation as any)];
        } if (data.virtualService) {
            this.virtualService = Array.isArray(data.virtualService)
                ? data.virtualService.map(v => v instanceof VirtualServiceDetail ? v : new VirtualServiceDetail(v))
                : [new VirtualServiceDetail(data.virtualService as any)];
        } if (data.endpoint) {
            this.endpoint = Array.isArray(data.endpoint)
                ? data.endpoint.map(e => e instanceof Reference ? e : new Reference(e))
                : [new Reference(data.endpoint as any)];
        }
    }

    toJson(): any {
        const json = super.toJson();

        if (this.identifier && this.identifier.length > 0) {
            json.identifier = this.identifier.map(id => id.toJson());
        }
        if (this.status !== undefined) {
            json.status = this.status;
        }
        if (this.operationalStatus) {
            json.operationalStatus = this.operationalStatus.toJson();
        }
        if (this.name !== undefined) {
            json.name = this.name;
        }
        if (this.alias && this.alias.length > 0) {
            json.alias = this.alias;
        }
        if (this.description !== undefined) {
            json.description = this.description;
        }
        if (this.mode !== undefined) {
            json.mode = this.mode;
        }
        if (this.type && this.type.length > 0) {
            json.type = this.type.map(t => t.toJson());
        }
        if (this.contact && this.contact.length > 0) {
            json.contact = this.contact.map(c => c.toJson());
        }
        if (this.address) {
            json.address = this.address.toJson();
        }
        if (this.form) {
            json.form = this.form.toJson();
        }
        if (this.position) {
            json.position = this.position.toJson();
        }
        if (this.managingOrganization) {
            json.managingOrganization = this.managingOrganization.toJson();
        }
        if (this.partOf) {
            json.partOf = this.partOf.toJson();
        }
        if (this.characteristic && this.characteristic.length > 0) {
            json.characteristic = this.characteristic.map(c => c.toJson());
        }
        if (this.hoursOfOperation && this.hoursOfOperation.length > 0) {
            json.hoursOfOperation = this.hoursOfOperation.map(h => h.toJson());
        }
        if (this.virtualService && this.virtualService.length > 0) {
            json.virtualService = this.virtualService.map(v => v.toJson());
        }
        if (this.endpoint && this.endpoint.length > 0) {
            json.endpoint = this.endpoint.map(e => e.toJson());
        }

        return json;
    }

    toXml(): string {
        let xml = `<Location`;
        if (this.id) xml += ` id="${this.id}"`;
        xml += `>`;

        if (this.identifier && this.identifier.length > 0) {
            this.identifier.forEach(id => {
                xml += id.toXml().replace('<Identifier', '<identifier').replace('</Identifier>', '</identifier>');
            });
        }
        if (this.status !== undefined) {
            xml += `<status value="${this.status}"/>`;
        }
        if (this.operationalStatus) {
            xml += this.operationalStatus.toXml().replace('<Coding', '<operationalStatus').replace('</Coding>', '</operationalStatus>');
        }
        if (this.name !== undefined) {
            xml += `<name value="${this.name}"/>`;
        }
        if (this.alias && this.alias.length > 0) {
            this.alias.forEach(a => {
                xml += `<alias value="${a}"/>`;
            });
        }
        if (this.description !== undefined) {
            xml += `<description value="${this.description}"/>`;
        }
        if (this.mode !== undefined) {
            xml += `<mode value="${this.mode}"/>`;
        }
        if (this.type && this.type.length > 0) {
            this.type.forEach(t => {
                xml += t.toXml().replace('<CodeableConcept', '<type').replace('</CodeableConcept>', '</type>');
            });
        }
        if (this.contact && this.contact.length > 0) {
            this.contact.forEach(c => {
                xml += c.toXml().replace('<ExtendedContactDetail', '<contact').replace('</ExtendedContactDetail>', '</contact>');
            });
        }
        if (this.address) {
            xml += this.address.toXml().replace('<Address', '<address').replace('</Address>', '</address>');
        }
        if (this.form) {
            xml += this.form.toXml().replace('<CodeableConcept', '<form').replace('</CodeableConcept>', '</form>');
        }
        if (this.position) {
            xml += this.position.toXml();
        }
        if (this.managingOrganization) {
            xml += this.managingOrganization.toXml().replace('<Reference', '<managingOrganization').replace('</Reference>', '</managingOrganization>');
        }
        if (this.partOf) {
            xml += this.partOf.toXml().replace('<Reference', '<partOf').replace('</Reference>', '</partOf>');
        }
        if (this.characteristic && this.characteristic.length > 0) {
            this.characteristic.forEach(c => {
                xml += c.toXml().replace('<CodeableConcept', '<characteristic').replace('</CodeableConcept>', '</characteristic>');
            });
        }
        if (this.hoursOfOperation && this.hoursOfOperation.length > 0) {
            this.hoursOfOperation.forEach(h => {
                xml += h.toXml().replace('<Availability', '<hoursOfOperation').replace('</Availability>', '</hoursOfOperation>');
            });
        }
        if (this.virtualService && this.virtualService.length > 0) {
            this.virtualService.forEach(v => {
                xml += v.toXml().replace('<VirtualServiceDetail', '<virtualService').replace('</VirtualServiceDetail>', '</virtualService>');
            });
        }
        if (this.endpoint && this.endpoint.length > 0) {
            this.endpoint.forEach(e => {
                xml += e.toXml().replace('<Reference', '<endpoint').replace('</Reference>', '</endpoint>');
            });
        }

        xml += '</Location>';
        return xml;
    }

    static fromJson(json: any): Location {
        return new Location(json);
    }
}