import { formatOpeningHour, formatDateTime } from '../utils'

describe('formatOpeningHour', () => {
  it('should format time correctly for AM times', () => {
    expect(formatOpeningHour('0900')).toBe('9:00 AM')
  })

  it('should format time correctly for PM times', () => {
    expect(formatOpeningHour('1500')).toBe('3:00 PM')
  })

  it('should format midnight correctly', () => {
    expect(formatOpeningHour('0000')).toBe('12:00 AM')
  })

  it('should handle next day times with "+" prefix', () => {
    expect(formatOpeningHour('+0000')).toBe('12:00 AM (Next day)')
    expect(formatOpeningHour('+0300')).toBe('3:00 AM (Next day)')
  })

  it('should handle edge cases like 12:00 PM', () => {
    expect(formatOpeningHour('1200')).toBe('12:00 PM')
  })
})

describe('formatDateTime', () => {
  it('should format date and time correctly', () => {
    expect(formatDateTime('2024-06-19T11:16:02.000Z')).toBe('Jun 19 2024, 11:16 AM')
  })
})
