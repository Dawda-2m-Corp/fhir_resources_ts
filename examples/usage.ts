import { Account, Coding, CodeableConcept, Reference, Identifier, Period } from '../src/index';

/**
 * Example usage of the improved FHIR library
 * Demonstrates the key features inspired by fhir.resources
 */

console.log('=== FHIR TypeScript Library Examples ===\n');

// Example 1: Creating a simple Account (like Python fhir.resources)
console.log('1. Creating a simple Account:');
try {
    const account = new Account({
        status: 'active',
        name: 'John Doe Medical Account',
        description: 'Primary medical account for patient care',
    });

    console.log('✓ Account created successfully');
    console.log('Resource Type:', account.getResourceType());
    console.log('Status:', account.status);
    console.log('Name:', account.name);

    // Validate the account
    console.log('Valid:', account.validate());
} catch (error) {
    console.error('✗ Error creating account:', error);
}

console.log('\n2. Creating Account with complex data:');
try {
    // Create some references
    const patientRef = Reference.create('Patient/12345', 'John Doe');
    const organizationRef = Reference.create('Organization/hospital-1', 'City Hospital');

    // Create identifier
    const identifier = Identifier.create(
        'http://hospital.example.org/account-ids',
        'ACC-2024-001',
        'official'
    );

    // Create service period
    const servicePeriod = new Period({
        start: '2024-01-01T00:00:00Z',
        end: '2024-12-31T23:59:59Z'
    });

    // Create account type
    const accountType = new CodeableConcept({
        coding: [
            new Coding({
                system: 'http://terminology.hl7.org/CodeSystem/v3-ActCode',
                code: 'PBILLACCT',
                display: 'patient billing account'
            })
        ],
        text: 'Patient Billing Account'
    });

    const complexAccount = new Account({
        status: 'active',
        identifier: [identifier],
        type: accountType,
        name: 'John Doe - 2024 Medical Services',
        subject: [patientRef],
        servicePeriod: servicePeriod,
        owner: organizationRef,
        description: 'Comprehensive medical account for all 2024 services'
    });

    console.log('✓ Complex Account created successfully');
    console.log('Validation result:', complexAccount.validate());

    // Convert to JSON (like model_dump in Python)
    const jsonOutput = complexAccount.toJson();
    console.log('JSON output keys:', Object.keys(jsonOutput));

} catch (error) {
    console.error('✗ Error creating complex account:', error);
}

console.log('\n3. JSON serialization and deserialization:');
try {
    // Create a simple account
    const originalAccount = new Account({
        status: 'active',
        name: 'Test Account'
    });

    // Convert to JSON string (like model_dump_json in Python)
    const jsonString = originalAccount.toJsonString(2);
    console.log('Serialized JSON:');
    console.log(jsonString.substring(0, 200) + '...');

    // Parse from JSON (like model_validate_json in Python)
    const parsedAccount = Account.fromJsonString(jsonString);
    console.log('✓ Successfully parsed from JSON');
    console.log('Parsed account name:', parsedAccount.name);
    console.log('Resource type matches:', parsedAccount.getResourceType() === 'Account');

} catch (error) {
    console.error('✗ Error with JSON operations:', error);
}

console.log('\n4. XML export:');
try {
    const account = new Account({
        status: 'active',
        name: 'XML Export Test Account'
    });

    const xmlOutput = account.toXml();
    console.log('XML output (first 200 chars):');
    console.log(xmlOutput.substring(0, 200) + '...');

} catch (error) {
    console.error('✗ Error with XML export:', error);
}

console.log('\n5. Validation examples:');
try {
    // Valid account
    const validAccount = new Account({ status: 'active' });
    console.log('Valid account validation:', validAccount.validate());

    // Invalid account (invalid status)
    const invalidAccount = new Account({ status: 'invalid-status' as any });
    console.log('Invalid account validation:', invalidAccount.validate());

} catch (error) {
    console.error('✗ Error with validation:', error);
}

console.log('\n6. Utility functions:');
try {
    const account = new Account({
        status: 'active',
        subject: [Reference.create('Patient/123'), Reference.create('Organization/456')]
    });

    // Extract references (utility function)
    const { extractReferences } = require('../src/utils');
    const references = extractReferences(account);
    console.log('Extracted references:', references);

} catch (error) {
    console.error('✗ Error with utilities:', error);
}

console.log('\n=== Examples completed ===');