import { Binary } from '../../src/r4/binary';
import { Reference } from '../../src/r4/reference';

describe('Binary Resource Tests', () => {
    describe('Constructor and Basic Properties', () => {
        test('should create Binary with minimal required data', () => {
            const binary = new Binary({
                contentType: 'image/jpeg'
            });

            expect(binary.resourceType).toBe('Binary');
            expect(binary.contentType).toBe('image/jpeg');
            expect(binary.securityContext).toBeUndefined();
            expect(binary.data).toBeUndefined();
        });

        test('should create Binary with all properties', () => {
            const securityContext = new Reference({
                reference: 'Patient/123'
            });

            const binary = new Binary({
                id: 'binary-123' as any,
                contentType: 'application/pdf',
                securityContext: securityContext,
                data: 'SGVsbG8gV29ybGQ='  // "Hello World" in base64
            });

            expect(binary.id).toBe('binary-123');
            expect(binary.contentType).toBe('application/pdf');
            expect(binary.securityContext).toBe(securityContext);
            expect(binary.data).toBe('SGVsbG8gV29ybGQ=');
        });

        test('should throw error when contentType is missing', () => {
            expect(() => {
                new Binary({} as any);
            }).toThrow('Binary resource requires contentType');
        });

        test('should create securityContext from object', () => {
            const binary = new Binary({
                contentType: 'text/plain',
                securityContext: new Reference({
                    reference: 'Patient/456'
                })
            });

            expect(binary.securityContext).toBeInstanceOf(Reference);
            expect(binary.securityContext?.reference).toBe('Patient/456');
        });
    });

    describe('JSON Serialization', () => {
        test('should serialize minimal Binary to JSON', () => {
            const binary = new Binary({
                contentType: 'image/png'
            });

            const json = binary.toJson();
            expect(json.resourceType).toBe('Binary');
            expect(json.contentType).toBe('image/png');
            expect(json.securityContext).toBeUndefined();
            expect(json.data).toBeUndefined();
        });

        test('should serialize complete Binary to JSON', () => {
            const binary = new Binary({
                id: 'test-binary' as any,
                contentType: 'application/json',
                securityContext: new Reference({
                    reference: 'Organization/org1'
                }),
                data: 'eyJ0ZXN0IjogdHJ1ZX0='
            });

            const json = binary.toJson();
            expect(json.resourceType).toBe('Binary');
            expect(json.id).toBe('test-binary');
            expect(json.contentType).toBe('application/json');
            expect(json.securityContext.reference).toBe('Organization/org1');
            expect(json.data).toBe('eyJ0ZXN0IjogdHJ1ZX0=');
        });
    });

    describe('XML Serialization', () => {
        test('should serialize minimal Binary to XML', () => {
            const binary = new Binary({
                contentType: 'text/html'
            });

            const xml = binary.toXml();
            expect(xml).toContain('<Binary>');
            expect(xml).toContain('<resourceType value="Binary"/>');
            expect(xml).toContain('<contentType value="text/html"/>');
            expect(xml).toContain('</Binary>');
        });

        test('should serialize complete Binary to XML', () => {
            const binary = new Binary({
                id: 'xml-test' as any,
                contentType: 'application/xml',
                securityContext: new Reference({
                    reference: 'Practitioner/doc1'
                }),
                data: 'PD94bWwgdmVyc2lvbj0iMS4wIj8+'
            });

            const xml = binary.toXml();
            expect(xml).toContain('<Binary>');
            expect(xml).toContain('<id value="xml-test"/>');
            expect(xml).toContain('<contentType value="application/xml"/>');
            expect(xml).toContain('<securityContext>');
            expect(xml).toContain('<data value="PD94bWwgdmVyc2lvbj0iMS4wIj8+"/>');
            expect(xml).toContain('</Binary>');
        });
    });

    describe('Validation', () => {
        test('should validate Binary with valid contentType', () => {
            const binary = new Binary({
                contentType: 'image/jpeg'
            });

            expect(binary.isValid()).toBe(true);
        });

        test('should invalidate Binary with invalid MIME type', () => {
            const binary = new Binary({
                contentType: 'invalid-mime-type'
            });

            expect(binary.isValid()).toBe(false);
        });

        test('should validate Binary with valid base64 data', () => {
            const binary = new Binary({
                contentType: 'text/plain',
                data: 'SGVsbG8gV29ybGQ='
            });

            expect(binary.isValid()).toBe(true);
        });

        test('should invalidate Binary with invalid base64 data', () => {
            const binary = new Binary({
                contentType: 'text/plain',
                data: 'Invalid@Base64!'
            });

            expect(binary.isValid()).toBe(false);
        });
    });

    describe('Utility Methods', () => {
        test('should calculate correct content size', () => {
            const binary = new Binary({
                contentType: 'text/plain',
                data: 'SGVsbG8gV29ybGQ='  // "Hello World" = 11 bytes
            });

            expect(binary.getContentSize()).toBe(11);
        });

        test('should return 0 size for no data', () => {
            const binary = new Binary({
                contentType: 'text/plain'
            });

            expect(binary.getContentSize()).toBe(0);
        });

        test('should identify images correctly', () => {
            const imageBinary = new Binary({
                contentType: 'image/png'
            });

            const textBinary = new Binary({
                contentType: 'text/plain'
            });

            expect(imageBinary.isImage()).toBe(true);
            expect(textBinary.isImage()).toBe(false);
        });

        test('should identify documents correctly', () => {
            const pdfBinary = new Binary({
                contentType: 'application/pdf'
            });

            const docBinary = new Binary({
                contentType: 'application/msword'
            });

            const imageBinary = new Binary({
                contentType: 'image/jpeg'
            });

            expect(pdfBinary.isDocument()).toBe(true);
            expect(docBinary.isDocument()).toBe(true);
            expect(imageBinary.isDocument()).toBe(false);
        });

        test('should get correct file extensions', () => {
            const tests = [
                { contentType: 'image/jpeg', expected: 'jpg' },
                { contentType: 'image/png', expected: 'png' },
                { contentType: 'application/pdf', expected: 'pdf' },
                { contentType: 'text/plain', expected: 'txt' },
                { contentType: 'application/unknown', expected: 'bin' }
            ];

            tests.forEach(test => {
                const binary = new Binary({
                    contentType: test.contentType
                });
                expect(binary.getFileExtension()).toBe(test.expected);
            });
        });
    });

    describe('Static Methods', () => {
        test('should create Binary from JSON', () => {
            const json = {
                resourceType: 'Binary',
                id: 'from-json' as any,
                contentType: 'application/json',
                data: 'eyJ0ZXN0IjogdHJ1ZX0='
            };

            const binary = Binary.fromJson(json);
            expect(binary).toBeInstanceOf(Binary);
            expect(binary.id).toBe('from-json');
            expect(binary.contentType).toBe('application/json');
            expect(binary.data).toBe('eyJ0ZXN0IjogdHJ1ZX0=');
        });
    });

    describe('Edge Cases', () => {
        test('should handle empty base64 string', () => {
            const binary = new Binary({
                contentType: 'text/plain',
                data: ''
            });

            expect(binary.getContentSize()).toBe(0);
        });

        test('should handle base64 with padding', () => {
            const binaryNoPadding = new Binary({
                contentType: 'text/plain',
                data: 'SGVsbG8'  // "Hello" - no padding needed
            });

            const binaryOnePad = new Binary({
                contentType: 'text/plain',
                data: 'SGVsbG8='  // "Hello" - one padding
            });

            const binaryTwoPad = new Binary({
                contentType: 'text/plain',
                data: 'SGVsbG8=='  // "Hello" but with double padding (4 bytes)
            });

            expect(binaryNoPadding.getContentSize()).toBe(5);
            expect(binaryOnePad.getContentSize()).toBe(5);
            expect(binaryTwoPad.getContentSize()).toBe(4);  // Double padding reduces size
        }); test('should handle various MIME types', () => {
            const mimeTypes = [
                'text/plain',
                'application/json',
                'image/svg+xml',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            ];

            mimeTypes.forEach(mimeType => {
                const binary = new Binary({
                    contentType: mimeType
                });
                expect(binary.isValid()).toBe(true);
            });
        });
    });
});