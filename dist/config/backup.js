"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.backupDatabase = void 0;
const moment_1 = __importDefault(require("moment"));
const child_process_1 = require("child_process");
const dateTimeFn_1 = require("../function/dateTimeFn");
const backupDatabase = () => {
    try {
        const mongodumpCommand = 'mongodump';
        const mongodumpArgs = ['--db', 'angkor_kampuchea', '--out', '../backupFolder'];
        const currentDateTime = (0, dateTimeFn_1.getLocalDate)();
        const currentDateFormat = (0, moment_1.default)(currentDateTime)?.format('YYYY/MM/DD HH:mm a');
        const mongodumpProcess = (0, child_process_1.spawn)(mongodumpCommand, mongodumpArgs);
        mongodumpProcess.stdout.on('data', (data) => {
            console.log(`mongodump stdout: ${data}`);
        });
        mongodumpProcess.stderr.on('data', (data) => {
            console.error(`mongodump stderr: ${data}`);
        });
        mongodumpProcess.on('close', (mongodumpCode) => {
            if (mongodumpCode === 0) {
                console.log('mongodump completed successfully');
            }
            else {
                console.error(`mongodump process exited with code ${mongodumpCode}`);
            }
        });
    }
    catch (error) {
        console.log(error.message);
    }
};
exports.backupDatabase = backupDatabase;
