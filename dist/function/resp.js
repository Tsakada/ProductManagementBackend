"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.respE = exports.respMD = exports.respD = exports.respM = exports.respm = exports.resp = void 0;
const resp = (status) => {
    return {
        status,
        isPermitted: true,
        message: {
            kh: status ? 'ជោគជ័យ' : 'បរាជ័យ',
            en: status ? 'Successfully' : 'Failed'
        }
    };
};
exports.resp = resp;
const respm = () => {
    return {
        status: false,
        isPermitted: false,
        message: {
            kh: 'អ្នកមិនមានសិទ្ធទេ',
            en: `You don't have permission to that`
        }
    };
};
exports.respm = respm;
const respM = (status, kh, en, data) => {
    if (data) {
        return {
            status,
            data,
            isPermitted: true,
            message: {
                kh,
                en
            }
        };
    }
    return {
        status,
        isPermitted: true,
        message: { kh, en }
    };
};
exports.respM = respM;
const respD = (status, data) => {
    return {
        status,
        data,
        isPermitted: true,
        message: {
            kh: status ? 'ជោគជ័យ' : 'បរាជ័យ',
            en: status ? 'Successfully' : 'Failed'
        }
    };
};
exports.respD = respD;
const respMD = (status, kh, en, data) => {
    return {
        status,
        data,
        isPermitted: true,
        message: { kh, en }
    };
};
exports.respMD = respMD;
const respE = (message) => {
    return {
        status: false,
        isPermitted: true,
        message: { kh: message, en: message }
    };
};
exports.respE = respE;
