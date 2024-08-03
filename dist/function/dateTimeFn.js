"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAfter24h = exports.currentTime = exports.Y_M_D_String = exports.getLocalDate = void 0;
const getLocalDate = () => {
    const utcDate = new Date();
    const offsetMinutes = utcDate.getTimezoneOffset();
    const localDate = new Date(utcDate.getTime() - (offsetMinutes * 60 * 1000));
    return localDate;
};
exports.getLocalDate = getLocalDate;
const Y_M_D_String = (data) => {
    const today = data === undefined ? new Date() : new Date(data);
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const dt = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${dt}`;
};
exports.Y_M_D_String = Y_M_D_String;
const d00 = (data) => {
    return data ? new Date(Y_M_D_String(data)) : new Date(Y_M_D_String());
};
const currentTime = () => {
    const d = new Date();
    const h = String(d.getHours()).padStart(2, '0');
    const m = String(d.getMinutes()).padStart(2, '0');
    return `${h}:${m}`;
};
exports.currentTime = currentTime;
const isAfter24h = (createdAt) => {
    const currentTime = new Date();
    const timeDifference = currentTime.getTime() - createdAt.getTime();
    const hoursDifference = timeDifference / (1000 * 60 * 60);
    return hoursDifference >= 24;
};
exports.isAfter24h = isAfter24h;
