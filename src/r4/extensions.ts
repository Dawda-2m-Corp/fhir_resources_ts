import { FhirBase64Binary, FhirBoolean, FhirCode, FhirDate, FhirDateTime, FhirDecimal, FhirId, FhirInstant, FhirInteger, FhirMakeDown, FhirOid, FhirPositiveInt, FhirString, FhirTime, FhirUnsignedInt, FhirUri, FhirUrl, FhirUuid } from "./dataTypes";
import { Address } from "./dataTypes/address";
import { Age } from "./dataTypes/age";
import { Annotation } from "./dataTypes/annotation";
import { Attachment } from "./dataTypes/attachment";
import { Availability } from "./dataTypes/availability";
import { CodeableConcept } from "./dataTypes/codeableConcept";
import { ContactDetail } from "./dataTypes/contactDetail";
import { ContactPoint } from "./dataTypes/contactPoint";
import { Contributor } from "./dataTypes/contributor";
import { Count } from "./dataTypes/count";
import { DataRequirement } from "./dataTypes/dataRequirement";
import { Distance } from "./dataTypes/distance";
import { Dosage } from "./dataTypes/dosage";
import { Duration } from "./dataTypes/duration";
import { Expression } from "./dataTypes/expression";
import { ExtendedContactDetail } from "./dataTypes/extendedContactDetail";
import { HumanName } from "./dataTypes/humanName";
import { Meta } from "./dataTypes/meta";
import { Money } from "./dataTypes/money";
import { ParameterDefinition } from "./dataTypes/parameterDefinition";
import { Period } from "./dataTypes/period";
import { Quantity } from "./dataTypes/quantity";
import { Range } from "./dataTypes/range";
import { Ratio } from "./dataTypes/ratio";
import { RelatedArtifact } from "./dataTypes/relatedArtifact";
import { SampledData } from "./dataTypes/sampledData";
import { Signature } from "./dataTypes/signature";
import { Timing } from "./dataTypes/timing";
import { TriggerDefinition } from "./dataTypes/triggerDefinition";
import { UsageContext } from "./dataTypes/usageContext";
import { Identifier } from "./identifier";
import { Reference } from "./reference";


export class Extension {
  url: string;
  valueBase64Binary?: FhirBase64Binary;
  valueBoolean?: FhirBoolean;
  valueCanonical?: FhirUri;
  valueCode?: FhirCode;
  valueDate?: FhirDate;
  valueDateTime?: FhirDateTime;
  valueDecimal?: FhirDecimal;
  valueId?: FhirId;
  valueInstant?: FhirInstant;
  valueInteger?: FhirInteger;
  valueMarkdown?: FhirMakeDown;
  valueOid?: FhirOid;
  valuePositiveInt?: FhirPositiveInt;
  valueString?: FhirString;
  valueTime?: FhirTime;
  valueUnsignedInt?: FhirUnsignedInt;
  valueUri?: FhirUri;
  valueUrl?: FhirUrl;
  valueUuid?: FhirUuid;
  valueAddress?: Address;
  valueAge?: Age;
  valueAnnotation?: Annotation;
  valueAttachment?: Attachment;
  valueCodeableConcept?: CodeableConcept;
  valueCoding?: FhirCode
  valueContactPoint?: ContactPoint;
  valueCount?: Count;
  valueDistance?: Distance;
  valueDuration?: Duration;
  valueHumanName?: HumanName;
  valueIdentifier?: Identifier;
  valueMoney?: Money;
  valuePeriod?: Period;
  valueQuantity?: Quantity;
  valueRange?: Range;
  valueRatio?: Ratio;
  valueReference?: Reference;
  valueSampledData?: SampledData;
  valueSignature?: Signature;
  valueTiming?: Timing;
  valueContactDetail?: ContactDetail;
  valueContributor?: Contributor;
  valueDataRequirement?: DataRequirement;
  valueExpression?: Expression;
  valueParameterDefinition?: ParameterDefinition;
  valueRelatedArtifact?: RelatedArtifact;
  valueTriggerDefinition?: TriggerDefinition;
  valueUsageContext?: UsageContext;
  valueAvailability?: Availability;
  valueExtendedContactDetail?: ExtendedContactDetail;
  valueDosage?: Dosage;
  valueMeta?: Meta;

  constructor(data: Extension) {
    this.url = data.url;
    Object.assign(this, data);
  }

  toJson(): Record<string, any> {
    const result: Record<string, any> = { url: this.url };

    if (this.valueBase64Binary !== undefined) result.valueBase64Binary = this.valueBase64Binary;
    if (this.valueBoolean !== undefined) result.valueBoolean = this.valueBoolean;
    if (this.valueCanonical !== undefined) result.valueCanonical = this.valueCanonical;
    if (this.valueCode !== undefined) result.valueCode = this.valueCode;
    if (this.valueDate !== undefined) result.valueDate = this.valueDate;
    if (this.valueDateTime !== undefined) result.valueDateTime = this.valueDateTime;
    if (this.valueDecimal !== undefined) result.valueDecimal = this.valueDecimal;
    if (this.valueId !== undefined) result.valueId = this.valueId;
    if (this.valueInstant !== undefined) result.valueInstant = this.valueInstant;
    if (this.valueInteger !== undefined) result.valueInteger = this.valueInteger;
    if (this.valueMarkdown !== undefined) result.valueMarkdown = this.valueMarkdown;
    if (this.valueOid !== undefined) result.valueOid = this.valueOid;
    if (this.valuePositiveInt !== undefined) result.valuePositiveInt = this.valuePositiveInt;
    if (this.valueString !== undefined) result.valueString = this.valueString;
    if (this.valueTime !== undefined) result.valueTime = this.valueTime;
    if (this.valueUnsignedInt !== undefined) result.valueUnsignedInt = this.valueUnsignedInt;
    if (this.valueUri !== undefined) result.valueUri = this.valueUri;
    if (this.valueUrl !== undefined) result.valueUrl = this.valueUrl;
    if (this.valueUuid !== undefined) result.valueUuid = this.valueUuid;
    // Add other value types as needed

    return result;
  }

  toXml(): string {
    let xml = `<extension>`;
    xml += `<url value="${this.url}"/>`;

    if (this.valueBase64Binary !== undefined) {
      xml += `<valueBase64Binary value="${this.valueBase64Binary}"/>`;
    }
    if (this.valueBoolean !== undefined) {
      xml += `<valueBoolean value="${this.valueBoolean}"/>`;
    }
    if (this.valueCanonical !== undefined) {
      xml += `<valueCanonical value="${this.valueCanonical}"/>`;
    }
    if (this.valueCode !== undefined) {
      xml += `<valueCode value="${this.valueCode}"/>`;
    }
    if (this.valueDate !== undefined) {
      xml += `<valueDate value="${this.valueDate}"/>`;
    }
    if (this.valueDateTime !== undefined) {
      xml += `<valueDateTime value="${this.valueDateTime}"/>`;
    }
    if (this.valueDecimal !== undefined) {
      xml += `<valueDecimal value="${this.valueDecimal}"/>`;
    }
    if (this.valueId !== undefined) {
      xml += `<valueId value="${this.valueId}"/>`;
    }
    if (this.valueInstant !== undefined) {
      xml += `<valueInstant value="${this.valueInstant}"/>`;
    }
    if (this.valueInteger !== undefined) {
      xml += `<valueInteger value="${this.valueInteger}"/>`;
    }
    if (this.valueMarkdown !== undefined) {
      xml += `<valueMarkdown value="${this.valueMarkdown}"/>`;
    }
    if (this.valueOid !== undefined) {
      xml += `<valueOid value="${this.valueOid}"/>`;
    }
    if (this.valuePositiveInt !== undefined) {
      xml += `<valuePositiveInt value="${this.valuePositiveInt}"/>`;
    }
    if (this.valueString !== undefined) {
      xml += `<valueString value="${this.valueString}"/>`;
    }
    if (this.valueTime !== undefined) {
      xml += `<valueTime value="${this.valueTime}"/>`;
    }
    if (this.valueUnsignedInt !== undefined) {
      xml += `<valueUnsignedInt value="${this.valueUnsignedInt}"/>`;
    }
    if (this.valueUri !== undefined) {
      xml += `<valueUri value="${this.valueUri}"/>`;
    }
    if (this.valueUrl !== undefined) {
      xml += `<valueUrl value="${this.valueUrl}"/>`;
    }
    if (this.valueUuid !== undefined) {
      xml += `<valueUuid value="${this.valueUuid}"/>`;
    }
    // Add other value types as needed

    xml += `</extension>`;
    return xml;
  }
}