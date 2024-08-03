const resp = (status: boolean) => {
     return {
          status,
          isPermitted: true,
          message: {
               kh: status ? 'ជោគជ័យ' : 'បរាជ័យ',
               en: status ? 'Successfully' : 'Failed'
          }
     }
}
const respm = () => {
     return {
          status: false,
          isPermitted: false,
          message: {
               kh: 'អ្នកមិនមានសិទ្ធទេ',
               en: `You don't have permission to that`
          }
     }
}
const respM = (status: boolean, kh: string, en: string, data?: any) => {
     if (data) {
          return {
               status,
               data,
               isPermitted: true,
               message: {
                    kh,
                    en
               }
          }
     }
     return {
          status,
          isPermitted: true,
          message: { kh, en }
     }
}
const respD = (status: boolean, data: any) => {
     return {
          status,
          data,
          isPermitted: true,
          message: {
               kh: status ? 'ជោគជ័យ' : 'បរាជ័យ',
               en: status ? 'Successfully' : 'Failed'
          }
     }
}
const respMD = (status: boolean, kh: string, en: string, data: any) => {
     return {
          status,
          data,
          isPermitted: true,
          message: { kh, en }
     }
}
const respE = (message: string) => {
     return {
          status: false,
          isPermitted: true,
          message: { kh: message, en: message }
     }
}
export {
     resp,
     respm,
     respM,
     respD,
     respMD,
     respE,
}