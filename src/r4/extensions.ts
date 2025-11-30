import { FhirBase64Binary, FhirBoolean, FhirCode, FhirDate, FhirDateTime, FhirUri } from "./dataTypes";


export class Extension {
    url: string;
    valueBase64Binary?: FhirBase64Binary;
    valueBoolean?: FhirBoolean;
    valueCanonical?: FhirUri;
    valueCode?: FhirCode;
    valueDate?: FhirDate;
    valueDateTime?: FhirDateTime;
    valueDecimal: <decimal>
  valueId : <id>
    valueInstant : <instant>
        valueInteger : <integer>
            valueMarkdown : <markdown>
                valueOid : <oid>
                    valuePositiveInt : <positiveInt>
                        valueString : <string>
                            valueTime : <time>
                                valueUnsignedInt : <unsignedInt>
                                    valueUri : <uri>
                                        valueUrl : <url>
                                            valueUuid : <uuid>
                                                valueAddress : { Address }
valueAge: { Age }
valueAnnotation: { Annotation }
valueAttachment: { Attachment }
valueCodeableConcept: { CodeableConcept }
valueCoding: { Coding }
valueContactPoint: { ContactPoint }
valueCount: { Count }
valueDistance: { Distance }
valueDuration: { Duration }
valueHumanName: { HumanName }
valueIdentifier: { Identifier }
valueMoney: { Money }
valuePeriod: { Period }
valueQuantity: { Quantity }
valueRange: { Range }
valueRatio: { Ratio }
valueReference: { Reference }
valueSampledData: { SampledData }
valueSignature: { Signature }
valueTiming: { Timing }
valueContactDetail: { ContactDetail }
valueContributor: { Contributor }
valueDataRequirement: { DataRequirement }
valueExpression: { Expression }
valueParameterDefinition: { ParameterDefinition }
valueRelatedArtifact: { RelatedArtifact }
valueTriggerDefinition: { TriggerDefinition }
valueUsageContext: { UsageContext }
valueDosage: { Dosage }
valueMeta: { Meta }

constructor(data: Extension) {
    this.url = data.url;
}
}