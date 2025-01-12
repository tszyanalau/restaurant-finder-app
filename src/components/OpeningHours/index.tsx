import Table from 'react-bootstrap/Table'
import { OpeningHour } from '../../types/restaurant'
import { DAYS_OF_WEEK } from '../../constants/common'
import { formatOpeningHour } from '../../utils'

type OpeningHourProps = {
  data: OpeningHour[]
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
                {ranges
                  ? ranges.map(({ open, close }) => `${formatOpeningHour(open)} - ${formatOpeningHour(close)}`).join(', ')
                  : 'Closed'}
              </td>
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}

export default OpeningHours
