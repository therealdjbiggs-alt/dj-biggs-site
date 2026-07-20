export function startOfDay(d: Date): Date {
  const x = new Date(d)
  x.setHours(0, 0, 0, 0)
  return x
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

export function formatDisplayDate(d: Date): string {
  return d.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export function formatIsoDate(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function getMonthMatrix(view: Date): (Date | null)[][] {
  const year = view.getFullYear()
  const month = view.getMonth()
  const first = new Date(year, month, 1)
  const startPad = first.getDay() // 0 Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const cells: (Date | null)[] = []
  for (let i = 0; i < startPad; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d))
  while (cells.length % 7 !== 0) cells.push(null)

  const rows: (Date | null)[][] = []
  for (let i = 0; i < cells.length; i += 7) {
    rows.push(cells.slice(i, i + 7))
  }
  return rows
}

export type BookingFormValues = {
  name: string
  email: string
  phone: string
  eventType: string
  eventDate: Date | null
  location: string
  guestCount: string
  message: string
}

export function buildBookingMailto(
  to: string,
  values: BookingFormValues,
): string {
  const dateLabel = values.eventDate
    ? formatDisplayDate(values.eventDate)
    : 'Not selected'

  const subject = `DJ Biggs Booking Request — ${values.eventType || 'Event'} — ${dateLabel}`

  const body = [
    'New booking request from djbiggs site',
    '',
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    `Phone: ${values.phone || 'Not provided'}`,
    `Event type: ${values.eventType}`,
    `Preferred date: ${dateLabel}`,
    `Location / venue: ${values.location}`,
    `Estimated guests: ${values.guestCount || 'Not provided'}`,
    '',
    'Event details:',
    values.message || '(none)',
    '',
    '—',
    'Sent from the DJ Biggs website booking form.',
  ].join('\n')

  return `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
