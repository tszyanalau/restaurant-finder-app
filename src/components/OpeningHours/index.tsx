import Table from 'react-bootstrap/Table'
import { OpeningHour } from '../../types/restaurant'
import { DAYS_OF_WEEK } from '../../constants/common'

type OpeningHourProps = {
  data: OpeningHour[]
}

const formatTime = (time: string): string => {
  const isNextDay = time.startsWith('+')
  const rawTime = isNextDay ? time.slice(1) : time // Treat "+" as midnight
  const hours = parseInt(rawTime.slice(0, 2), 10)
  const minutes = rawTime.slice(2)
  const period = hours >= 12 ? 'PM' : 'AM'
  const formattedHours = hours % 12 || 12 // Convert 0 or 12+ hours to 12-hour format
  const formattedTime = `${formattedHours}:${minutes} ${period}`

  return isNextDay ? `${formattedTime} (Next day)` : formattedTime
}

const groupByDay = (hour: OpeningHour[]) => {
  const grouped: { [key: number]: { open: string; close: string }[] } = {}
  hour.forEach(({ day, open, close }) => {
    if (!grouped[day]) {
      grouped[day] = []
    }
    grouped[day].push({ open, close })
  })
  return grouped
}

const OpeningHours = ({ data }: OpeningHourProps) => {
  const groupedHour = groupByDay(data)
  return (
    <Table>
      <tbody>
        {DAYS_OF_WEEK.map((dayName, index) => {
          const dayNumber = index + 1 // Convert 0-based index to 1-based day number
          const ranges = groupedHour[dayNumber]
          return (
            <tr key={dayNumber}>
              <th>{dayName}</th>
              <td>
                {ranges ? ranges.map(({ open, close }) => `${formatTime(open)} - ${formatTime(close)}`).join(', ') : 'Closed'}
              </td>
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}

export default OpeningHours
