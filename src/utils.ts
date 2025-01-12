import moment from 'moment'

export const formatOpeningHour = (time: string): string => {
  const isNextDay = time.startsWith('+')
  const rawTime = isNextDay ? time.slice(1) : time // Treat "+" as midnight
  const formattedTime = moment(rawTime, 'HHmm').format('h:mm A')
  return isNextDay ? `${formattedTime} (Next day)` : formattedTime
}
