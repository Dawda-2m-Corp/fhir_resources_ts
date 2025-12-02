import { FhirString } from '.';
import { Coding } from './coding';
import { ExtendedContactDetail } from './extendedContactDetail';

/**
 * Connection details of a virtual service (e.g. conference call)
 */
export class VirtualServiceDetail {
    channelType?: Coding;                    // Channel type for virtual service
    addressUrl?: string;                     // URL to the virtual service
    addressString?: string;                  // String address for the virtual service
    addressContactPoint?: ExtendedContactDetail;  // Contact point for the virtual service
    addressExtendedContactDetail?: ExtendedContactDetail;  // Extended contact detail
    additionalInfo?: string[];               // Additional connection information
    maxParticipants?: number;                // Maximum number of participants

    constructor(data: Partial<VirtualServiceDetail>) {
        if (data.channelType !== undefined) {
            this.channelType = data.channelType instanceof Coding ? data.channelType : new Coding(data.channelType as any);
        }
        if (data.addressUrl !== undefined) {
            this.addressUrl = data.addressUrl;
        }
        if (data.addressString !== undefined) {
            this.addressString = data.addressString;
        }
        if (data.addressContactPoint !== undefined) {
            this.addressContactPoint = data.addressContactPoint instanceof ExtendedContactDetail
                ? data.addressContactPoint
                : new ExtendedContactDetail(data.addressContactPoint as any);
        }
        if (data.addressExtendedContactDetail !== undefined) {
            this.addressExtendedContactDetail = data.addressExtendedContactDetail instanceof ExtendedContactDetail
                ? data.addressExtendedContactDetail
                : new ExtendedContactDetail(data.addressExtendedContactDetail as any);
        }
        if (data.additionalInfo !== undefined) {
            this.additionalInfo = Array.isArray(data.additionalInfo) ? data.additionalInfo : [data.additionalInfo];
        }
        if (data.maxParticipants !== undefined) {
            this.maxParticipants = data.maxParticipants;
        }
    }

    toJson(): any {
        const json: any = {};

        if (this.channelType) {
            json.channelType = this.channelType.toJson();
        }
        if (this.addressUrl !== undefined) {
            json.addressUrl = this.addressUrl;
        }
        if (this.addressString !== undefined) {
            json.addressString = this.addressString;
        }
        if (this.addressContactPoint) {
            json.addressContactPoint = this.addressContactPoint.toJson();
        }
        if (this.addressExtendedContactDetail) {
            json.addressExtendedContactDetail = this.addressExtendedContactDetail.toJson();
        }
        if (this.additionalInfo && this.additionalInfo.length > 0) {
            json.additionalInfo = this.additionalInfo;
        }
        if (this.maxParticipants !== undefined) {
            json.maxParticipants = this.maxParticipants;
        }

        return json;
    }

    toXml(): string {
        let xml = '<VirtualServiceDetail>';

        if (this.channelType) {
            xml += this.channelType.toXml().replace('<Coding', '<channelType').replace('</Coding>', '</channelType>');
        }
        if (this.addressUrl !== undefined) {
            xml += `<addressUrl value="${this.addressUrl}"/>`;
        }
        if (this.addressString !== undefined) {
            xml += `<addressString value="${this.addressString}"/>`;
        }
        if (this.addressContactPoint) {
            xml += this.addressContactPoint.toXml().replace('<ExtendedContactDetail', '<addressContactPoint').replace('</ExtendedContactDetail>', '</addressContactPoint>');
        }
        if (this.addressExtendedContactDetail) {
            xml += this.addressExtendedContactDetail.toXml().replace('<ExtendedContactDetail', '<addressExtendedContactDetail').replace('</ExtendedContactDetail>', '</addressExtendedContactDetail>');
        }
        if (this.additionalInfo && this.additionalInfo.length > 0) {
            this.additionalInfo.forEach(info => {
                xml += `<additionalInfo value="${info}"/>`;
            });
        }
        if (this.maxParticipants !== undefined) {
            xml += `<maxParticipants value="${this.maxParticipants}"/>`;
        }

        xml += '</VirtualServiceDetail>';
        return xml;
    }

    static fromJson(json: any): VirtualServiceDetail {
        return new VirtualServiceDetail(json);
    }
}