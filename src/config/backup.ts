import moment from 'moment'
// import AdmZip from 'adm-zip'
import { spawn } from 'child_process'
import { getLocalDate } from '../function/dateTimeFn'

export const backupDatabase = () => {
    try {
        const mongodumpCommand = 'mongodump';
        const mongodumpArgs = ['--db', 'angkor_kampuchea', '--out', '../backupFolder']
        const currentDateTime = getLocalDate()
        const currentDateFormat = moment(currentDateTime)?.format('YYYY/MM/DD HH:mm a')

        // Execute the mongodump command using spawn
        const mongodumpProcess = spawn(mongodumpCommand, mongodumpArgs)

        // Handle mongodump stdout data
        mongodumpProcess.stdout.on('data', (data: any) => {
            console.log(`mongodump stdout: ${data}`)
        })

        // Handle mongodump stderr data
        mongodumpProcess.stderr.on('data', (data: any) => {
            console.error(`mongodump stderr: ${data}`)
        })

        // Handle mongodump process exit
        mongodumpProcess.on('close', (mongodumpCode) => {
            if (mongodumpCode === 0) {
                console.log('mongodump completed successfully');

                // // Zip the backup folder after mongodump completes
                // const zip = new AdmZip();
                // zip.addLocalFolder('../backupFolder', 'backup') // Add the backup folder to the zip
                // zip.writeZip(`../backupFolder/Backup_AKC_${currentDateFormat}.zip`) // Save the zip file
                // console.log('Backup zipped successfully.')
            } else {
                console.error(`mongodump process exited with code ${mongodumpCode}`)
            }
        });
    } catch (error) {
        console.log(error.message)
    }
}