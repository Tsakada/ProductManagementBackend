const getLocalDate = (): Date => {
    const utcDate = new Date()
    const offsetMinutes = utcDate.getTimezoneOffset()
    const localDate = new Date(utcDate.getTime() - (offsetMinutes * 60 * 1000))
    return localDate
}

const Y_M_D_String = (data?: Date | string): string => {
    const today = data === undefined ? new Date() : new Date(data)
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const dt = String(today.getDate()).padStart(2, '0')
    return `${year}-${month}-${dt}`
}

const d00 = (data?: Date | string) => {
    return data ? new Date(Y_M_D_String(data)) : new Date(Y_M_D_String())
}

const currentTime = (): string => {
    const d = new Date()
    const h = String(d.getHours()).padStart(2, '0')
    const m = String(d.getMinutes()).padStart(2, '0')
    return `${h}:${m}`
}

const isAfter24h = (createdAt: Date): boolean => {
    const currentTime = new Date()
    const timeDifference = currentTime.getTime() - createdAt.getTime()
    const hoursDifference = timeDifference / (1000 * 60 * 60)
    return hoursDifference >= 24
}

export {
    getLocalDate,
    Y_M_D_String,
    currentTime,
    isAfter24h,

}