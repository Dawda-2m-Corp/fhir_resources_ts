import { Account, Identifier, Reference } from '../src/index';

describe('FHIR Account Resource', () => {
    test('should create a valid Account', () => {
        const account = new Account({
            status: 'active',
            name: 'Test Account'
        });

        expect(account.resourceType).toBe('Account');
        expect(account.status).toBe('active');
        expect(account.name).toBe('Test Account');
        expect(account.validate()).toBe(true);
    });

    test('should serialize to JSON correctly', () => {
        const account = new Account({
            status: 'active',
            name: 'Test Account'
        });

        const json = account.toJson();
        expect(json.resourceType).toBe('Account');
        expect(json.status).toBe('active');
        expect(json.name).toBe('Test Account');
    });

    test('should deserialize from JSON correctly', () => {
        const jsonData = {
            resourceType: 'Account',
            status: 'active',
            name: 'Test Account'
        };

        const account = Account.fromJson(jsonData);
        expect(account.resourceType).toBe('Account');
        expect(account.status).toBe('active');
        expect(account.name).toBe('Test Account');
    });

    test('should validate account status', () => {
        const validAccount = new Account({ status: 'active' });
        expect(validAccount.validate()).toBe(true);

        // Note: This would fail validation in a real scenario
        const invalidAccount = new Account({ status: 'invalid' as any });
        expect(invalidAccount.validate()).toBe(false);
    });

    test('should handle complex Account with references', () => {
        const patientRef = Reference.create('Patient/123', 'John Doe');
        const identifier = Identifier.create(
            'http://example.org/accounts',
            'ACC-001'
        );

        const account = new Account({
            status: 'active',
            identifier: [identifier],
            subject: [patientRef],
            name: 'John Doe Account'
        });

        expect(account.identifier).toHaveLength(1);
        expect(account.subject).toHaveLength(1);
        expect(account.subject?.[0].reference).toBe('Patient/123');
        expect(account.validate()).toBe(true);
    });
});