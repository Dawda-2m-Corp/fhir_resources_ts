import { Location, LocationPosition, LocationConstructorData } from '../../src/r4/location';
import { Identifier } from '../../src/r4/identifier';
import { Coding } from '../../src/r4/dataTypes/coding';
import { CodeableConcept } from '../../src/r4/dataTypes/codeableConcept';
import { Reference } from '../../src/r4/reference';
import { Address } from '../../src/r4/dataTypes/address';

describe('Location', () => {
    describe('Basic Location Creation', () => {
        test('should create basic Location', () => {
            const location = new Location({
                status: 'active',
                name: 'Main Hospital'
            });

            expect(location.resourceType).toBe('Location');
            expect(location.status).toBe('active');
            expect(location.name).toBe('Main Hospital');
        });

        test('should create Location with identifiers and mode', () => {
            const location = new Location({
                identifier: [{
                    system: 'http://example.org/location-ids',
                    value: 'LOC-001'
                }],
                status: 'active',
                mode: 'instance',
                name: 'Emergency Department'
            });

            expect(location.identifier).toHaveLength(1);
            expect(location.identifier![0]).toBeInstanceOf(Identifier);
            expect(location.identifier![0].value).toBe('LOC-001');
            expect(location.mode).toBe('instance');
        });
    });

    describe('Location with Geographic Position', () => {
        test('should create Location with position', () => {
            const location = new Location({
                status: 'active',
                name: 'City Hospital',
                position: {
                    longitude: -73.9857,
                    latitude: 40.7484,
                    altitude: 10.5
                }
            });

            expect(location.position).toBeInstanceOf(LocationPosition);
            expect(location.position!.longitude).toBe(-73.9857);
            expect(location.position!.latitude).toBe(40.7484);
            expect(location.position!.altitude).toBe(10.5);
        });

        test('should create Location with position without altitude', () => {
            const location = new Location({
                status: 'active',
                name: 'Clinic',
                position: {
                    longitude: -122.4194,
                    latitude: 37.7749
                }
            });

            expect(location.position!.longitude).toBe(-122.4194);
            expect(location.position!.latitude).toBe(37.7749);
            expect(location.position!.altitude).toBeUndefined();
        });
    });

    describe('Location with Complex Properties', () => {
        test('should create Location with operational status and type', () => {
            const location = new Location({
                status: 'active',
                operationalStatus: {
                    system: 'http://terminology.hl7.org/CodeSystem/v2-0116',
                    code: 'O',
                    display: 'Occupied'
                },
                name: 'Patient Room 101',
                type: [{
                    coding: [{
                        system: 'http://terminology.hl7.org/CodeSystem/v3-RoleCode',
                        code: 'HOSP',
                        display: 'Hospital'
                    }]
                }]
            });

            expect(location.operationalStatus).toBeInstanceOf(Coding);
            expect(location.operationalStatus!.code).toBe('O');
            expect(location.type).toHaveLength(1);
            expect(location.type![0]).toBeInstanceOf(CodeableConcept);
        });

        test('should create Location with address and managing organization', () => {
            const location = new Location({
                status: 'active',
                name: 'Main Campus',
                address: {
                    use: 'work',
                    line: ['123 Healthcare Ave'],
                    city: 'Medical City',
                    state: 'CA',
                    postalCode: '90210',
                    country: 'USA'
                },
                managingOrganization: {
                    reference: 'Organization/example-hospital'
                }
            });

            expect(location.address).toBeInstanceOf(Address);
            expect(location.address!.city).toBe('Medical City');
            expect(location.managingOrganization).toBeInstanceOf(Reference);
            expect(location.managingOrganization!.reference).toBe('Organization/example-hospital');
        });
    });

    describe('Location with Arrays and Collections', () => {
        test('should create Location with multiple aliases and characteristics', () => {
            const location = new Location({
                status: 'active',
                name: 'General Hospital',
                alias: ['City General', 'Main Hospital', 'Metro Health'],
                characteristic: [
                    {
                        coding: [{
                            system: 'http://terminology.hl7.org/CodeSystem/location-characteristic',
                            code: 'wheelchair',
                            display: 'Wheelchair accessible'
                        }]
                    },
                    {
                        coding: [{
                            system: 'http://terminology.hl7.org/CodeSystem/location-characteristic',
                            code: '24hr',
                            display: '24 hour service'
                        }]
                    }
                ]
            });

            expect(location.alias).toHaveLength(3);
            expect(location.alias).toContain('City General');
            expect(location.characteristic).toHaveLength(2);
            expect(location.characteristic![0]).toBeInstanceOf(CodeableConcept);
        });

        test('should create Location with part of relationship', () => {
            const location = new Location({
                status: 'active',
                name: 'Room 205A',
                partOf: {
                    reference: 'Location/wing-b'
                }
            });

            expect(location.partOf).toBeInstanceOf(Reference);
            expect(location.partOf!.reference).toBe('Location/wing-b');
        });
    });

    describe('JSON Serialization', () => {
        test('should serialize basic Location to JSON', () => {
            const location = new Location({
                id: 'example-location',
                status: 'active',
                name: 'Sample Location'
            });

            const json = location.toJson();

            expect(json.resourceType).toBe('Location');
            expect(json.id).toBe('example-location');
            expect(json.status).toBe('active');
            expect(json.name).toBe('Sample Location');
        });

        test('should serialize complex Location to JSON', () => {
            const location = new Location({
                id: 'complex-location',
                identifier: [{
                    system: 'http://example.org/locations',
                    value: 'LOC-123'
                }],
                status: 'active',
                operationalStatus: {
                    system: 'http://terminology.hl7.org/CodeSystem/v2-0116',
                    code: 'U',
                    display: 'Unoccupied'
                },
                name: 'Operating Room 1',
                alias: ['OR1', 'Surgery Suite 1'],
                description: 'Main operating room for cardiac procedures',
                mode: 'instance',
                type: [{
                    coding: [{
                        system: 'http://terminology.hl7.org/CodeSystem/v3-RoleCode',
                        code: 'OR',
                        display: 'Operating Room'
                    }]
                }],
                position: {
                    longitude: -73.9857,
                    latitude: 40.7484
                },
                managingOrganization: {
                    reference: 'Organization/hospital-main'
                }
            });

            const json = location.toJson();
            console.log('Complex Location JSON:', JSON.stringify(json, null, 2));

            expect(json.resourceType).toBe('Location');
            expect(json.identifier).toHaveLength(1);
            expect(json.status).toBe('active');
            expect(json.operationalStatus.code).toBe('U');
            expect(json.name).toBe('Operating Room 1');
            expect(json.alias).toHaveLength(2);
            expect(json.description).toBe('Main operating room for cardiac procedures');
            expect(json.mode).toBe('instance');
            expect(json.type).toHaveLength(1);
            expect(json.position.longitude).toBe(-73.9857);
            expect(json.managingOrganization.reference).toBe('Organization/hospital-main');
        });
    });

    describe('XML Serialization', () => {
        test('should serialize Location to XML', () => {
            const location = new Location({
                id: 'xml-location',
                status: 'active',
                name: 'XML Test Location',
                position: {
                    longitude: -122.4194,
                    latitude: 37.7749
                }
            });

            const xml = location.toXml();

            expect(xml).toContain('<Location');
            expect(xml).toContain('id="xml-location"');
            expect(xml).toContain('<status value="active"/>');
            expect(xml).toContain('<name value="XML Test Location"/>');
            expect(xml).toContain('<position>');
            expect(xml).toContain('<longitude value="-122.4194"/>');
            expect(xml).toContain('<latitude value="37.7749"/>');
            expect(xml).toContain('</Location>');
        });
    });

    describe('LocationPosition Tests', () => {
        test('should create standalone LocationPosition', () => {
            const position = new LocationPosition({
                longitude: -74.0059,
                latitude: 40.7128,
                altitude: 50.2
            });

            expect(position.longitude).toBe(-74.0059);
            expect(position.latitude).toBe(40.7128);
            expect(position.altitude).toBe(50.2);
        });

        test('should serialize LocationPosition to JSON', () => {
            const position = new LocationPosition({
                longitude: -118.2437,
                latitude: 34.0522
            });

            const json = position.toJson();

            expect(json.longitude).toBe(-118.2437);
            expect(json.latitude).toBe(34.0522);
            expect(json.altitude).toBeUndefined();
        });

        test('should serialize LocationPosition to XML', () => {
            const position = new LocationPosition({
                longitude: -87.6298,
                latitude: 41.8781,
                altitude: 180.0
            });

            const xml = position.toXml();

            expect(xml).toContain('<position>');
            expect(xml).toContain('<longitude value="-87.6298"/>');
            expect(xml).toContain('<latitude value="41.8781"/>');
            expect(xml).toContain('<altitude value="180"/>');
            expect(xml).toContain('</position>');
        });

        test('should create LocationPosition from JSON', () => {
            const json = {
                longitude: -71.0589,
                latitude: 42.3601,
                altitude: 43.0
            };

            const position = LocationPosition.fromJson(json);

            expect(position).toBeInstanceOf(LocationPosition);
            expect(position.longitude).toBe(-71.0589);
            expect(position.latitude).toBe(42.3601);
            expect(position.altitude).toBe(43.0);
        });
    });

    describe('Static Methods', () => {
        test('should create Location from JSON', () => {
            const json = {
                resourceType: 'Location',
                id: 'from-json',
                status: 'active',
                name: 'JSON Location',
                position: {
                    longitude: -80.1918,
                    latitude: 25.7617
                }
            };

            const location = Location.fromJson(json);

            expect(location).toBeInstanceOf(Location);
            expect(location.resourceType).toBe('Location');
            expect((location as any).id).toBe('from-json');
            expect(location.status).toBe('active');
            expect(location.name).toBe('JSON Location');
            expect(location.position).toBeInstanceOf(LocationPosition);
            expect(location.position!.longitude).toBe(-80.1918);
        });
    });

    describe('Edge Cases', () => {
        test('should handle Location with only required status', () => {
            const location = new Location({
                status: 'inactive'
            });

            expect(location.resourceType).toBe('Location');
            expect(location.status).toBe('inactive');
            expect(location.name).toBeUndefined();
            expect(location.identifier).toBeUndefined();
        });

        test('should handle single values converted to arrays', () => {
            const location = new Location({
                status: 'active',
                identifier: [{
                    value: 'single-id'
                }] as any,
                type: [{
                    text: 'Single type'
                }] as any,
                alias: ['Single alias']
            });

            expect(location.identifier).toHaveLength(1);
            expect(location.type).toHaveLength(1);
            expect(location.alias).toHaveLength(1);
            expect(location.alias![0]).toBe('Single alias');
        });

        test('should handle different status values', () => {
            const activeLocation = new Location({ status: 'active' });
            const suspendedLocation = new Location({ status: 'suspended' });
            const inactiveLocation = new Location({ status: 'inactive' });

            expect(activeLocation.status).toBe('active');
            expect(suspendedLocation.status).toBe('suspended');
            expect(inactiveLocation.status).toBe('inactive');
        });

        test('should handle different mode values', () => {
            const instanceLocation = new Location({
                status: 'active',
                mode: 'instance'
            });
            const kindLocation = new Location({
                status: 'active',
                mode: 'kind'
            });

            expect(instanceLocation.mode).toBe('instance');
            expect(kindLocation.mode).toBe('kind');
        });
    });
});