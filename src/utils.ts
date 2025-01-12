import moment from 'moment-timezone'

export const formatOpeningHour = (time: string): string => {
  const isNextDay = time.startsWith('+')
  const rawTime = isNextDay ? time.slice(1) : time // Treat "+" as midnight
  const formattedTime = moment(rawTime, 'HHmm').format('h:mm A')
  return isNextDay ? `${formattedTime} (Next day)` : formattedTime
}

export const formatDateTime = (timestamp: string): string => {
  return moment(timestamp)
    .tz(import.meta.env.VITE_TIMEZONE)
    .format('MMM D YYYY, h:mm A')
}
