import { render, screen } from '@testing-library/react'
import OpeningHours from './index'
import { DAYS_OF_WEEK } from '../../constants/common'
import { OpeningHour } from '../../types/restaurant'

describe('OpeningHours Component', () => {
  const sampleData: OpeningHour[] = [
    { day: 1, open: '0900', close: '1700' },
    { day: 2, open: '1000', close: '1800' },
    { day: 3, open: '1100', close: '+0200' },
    { day: 4, open: '0900', close: '1700' },
    { day: 5, open: '1000', close: '2000' },
  ]

  it('renders the opening hours for all provided days', () => {
    render(<OpeningHours data={sampleData} />)

    // Check that each day in the week has a row
    DAYS_OF_WEEK.forEach((day) => {
      expect(screen.getByText(day)).toBeInTheDocument()
    })

    // Check specific opening hours text
    expect(screen.getAllByText('9:00 AM - 5:00 PM')).toHaveLength(2) // Monday
    expect(screen.getByText('10:00 AM - 6:00 PM')).toBeInTheDocument() // Tuesday
    expect(screen.getByText('11:00 AM - 2:00 AM (Next day)')).toBeInTheDocument() // Wednesday
  })

  it('renders "Closed" for days without data', () => {
    render(<OpeningHours data={sampleData} />)

    // Ensure specific days are marked as closed
    expect(screen.getAllByText('Closed')).toHaveLength(2) // For days without hours
  })

  it('renders correctly for empty input data', () => {
    render(<OpeningHours data={[]} />)

    // Check that all days are marked as "Closed"
    DAYS_OF_WEEK.forEach((day) => {
      const dayRow = screen.getByText(day)
      const closedText = dayRow.nextSibling
      expect(closedText?.textContent).toBe('Closed')
    })
  })

  it('formats time correctly, including next day', () => {
    render(<OpeningHours data={[{ day: 1, open: '1200', close: '+0200' }]} />)

    expect(screen.getByText('12:00 PM - 2:00 AM (Next day)')).toBeInTheDocument()
  })
})
