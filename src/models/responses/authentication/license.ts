import {CortexResponse} from "../../internal/cortex-response";

export class License extends CortexResponse {
    constructor(public isOnline: boolean, public license: LicenseDetail) {
        super();
    }
}

export class LicenseDetail {
    constructor(
        public applications: string[],
        public billingFrom: Date,
        public billingTo: Date,
        public deviceInfo: DeviceInfo,
        public expired: boolean,
        public extenderLimit: number,
        public hardLimitTime: Date,
        public isCommercial: boolean,
        public licenseId: string,
        public licenseName: string,
        public localQuota: number,
        public scopes: string[],
        public seatCount: number,
        public sessionCount: number,
        public softLimitTime: Date,
        public totalDebit: number,
        public totalRegisteredDevices: number,
        public validFrom: Date,
        public validTo: Date,
        public maxDebit?: number,
    ) {}
}

export class DeviceInfo {
    constructor(
        public deviceLimit: number,
        public devicesPerSeat: number,
        public sessionLimit: SessionLimit
    ) {}
}

export class SessionLimit {
    constructor(
        public day?: number,
        public month?: number,
        public year?: number,
    ) {}
}