import { useMemo, useState, type FormEvent } from 'react'
import { CheckCircle2, Mail } from 'lucide-react'
import { useI18n } from '@/context/I18nContext'
import { BRAND } from '@/data/siteContent'
import {
  buildBookingMailto,
  formatDisplayDate,
  type BookingFormValues,
} from '@/lib/booking'
import { BookingCalendar } from '@/components/booking/BookingCalendar'
import { handleNavClick } from '@/lib/navigate'
import { Button } from '@/components/ui/Button'

const fieldClass =
  'w-full rounded-2xl border border-white/10 bg-ink/50 px-4 py-3 text-sm text-soft-white placeholder:text-muted/60 outline-none transition focus:border-cyan/50 focus:ring-1 focus:ring-cyan/40'

export function BookingForm() {
  const { m, t } = useI18n()
  const [month, setMonth] = useState(() => {
    const n = new Date()
    return new Date(n.getFullYear(), n.getMonth(), 1)
  })
  const [values, setValues] = useState<BookingFormValues>({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: null,
    location: '',
    guestCount: '',
    message: '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormValues, string>>>(
    {},
  )
  const [sentHint, setSentHint] = useState(false)

  const selectedLabel = useMemo(
    () => (values.eventDate ? formatDisplayDate(values.eventDate) : null),
    [values.eventDate],
  )

  const setField = <K extends keyof BookingFormValues>(key: K, value: BookingFormValues[K]) => {
    setValues((v) => ({ ...v, [key]: value }))
    setErrors((e) => ({ ...e, [key]: undefined }))
  }

  const validate = (): boolean => {
    const next: typeof errors = {}
    if (!values.name.trim()) next.name = m.form.errName
    if (!values.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      next.email = m.form.errEmail
    }
    if (!values.eventType) next.eventType = m.form.errEventType
    if (!values.eventDate) next.eventDate = m.form.errDate
    if (!values.location.trim()) next.location = m.form.errLocation
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    const href = buildBookingMailto(BRAND.email, values)
    setSentHint(true)
    window.location.href = href
  }

  return (
    <form
      onSubmit={onSubmit}
      className="relative mx-auto mt-12 grid max-w-5xl gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]"
      noValidate
    >
      <div>
        <p className="mb-3 text-left text-xs font-semibold tracking-[0.22em] text-cyan uppercase">
          {m.form.step1}
        </p>
        <BookingCalendar
          month={month}
          selected={values.eventDate}
          onMonthChange={setMonth}
          onSelect={(day) => {
            setField('eventDate', day)
            setMonth(new Date(day.getFullYear(), day.getMonth(), 1))
          }}
        />
        {errors.eventDate && (
          <p className="mt-2 text-left text-sm text-neon-pink" role="alert">
            {errors.eventDate}
          </p>
        )}
        {selectedLabel && !errors.eventDate && (
          <p className="mt-3 text-left text-sm text-soft-white">
            {m.form.preferredDate}{' '}
            <span className="font-semibold text-gradient-neon">{selectedLabel}</span>
          </p>
        )}
      </div>

      <div className="glass-card rounded-3xl p-5 text-left sm:p-6">
        <p className="mb-4 text-xs font-semibold tracking-[0.22em] text-sunset uppercase">
          {m.form.step2}
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block sm:col-span-1">
            <span className="mb-1.5 block text-xs text-muted">{m.form.name}</span>
            <input
              className={fieldClass}
              name="name"
              autoComplete="name"
              value={values.name}
              onChange={(e) => setField('name', e.target.value)}
              required
            />
            {errors.name && (
              <span className="mt-1 block text-xs text-neon-pink">{errors.name}</span>
            )}
          </label>

          <label className="block sm:col-span-1">
            <span className="mb-1.5 block text-xs text-muted">{m.form.email}</span>
            <input
              className={fieldClass}
              type="email"
              name="email"
              autoComplete="email"
              value={values.email}
              onChange={(e) => setField('email', e.target.value)}
              required
            />
            {errors.email && (
              <span className="mt-1 block text-xs text-neon-pink">{errors.email}</span>
            )}
          </label>

          <label className="block sm:col-span-1">
            <span className="mb-1.5 block text-xs text-muted">{m.form.phone}</span>
            <input
              className={fieldClass}
              type="tel"
              name="phone"
              autoComplete="tel"
              value={values.phone}
              onChange={(e) => setField('phone', e.target.value)}
            />
          </label>

          <label className="block sm:col-span-1">
            <span className="mb-1.5 block text-xs text-muted">{m.form.eventType}</span>
            <select
              className={`${fieldClass} appearance-none`}
              name="eventType"
              value={values.eventType}
              onChange={(e) => setField('eventType', e.target.value)}
              required
            >
              <option value="">{m.form.selectEventType}</option>
              {m.form.options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            {errors.eventType && (
              <span className="mt-1 block text-xs text-neon-pink">{errors.eventType}</span>
            )}
          </label>

          <label className="block sm:col-span-2">
            <span className="mb-1.5 block text-xs text-muted">{m.form.location}</span>
            <input
              className={fieldClass}
              name="location"
              value={values.location}
              onChange={(e) => setField('location', e.target.value)}
              placeholder={m.form.locationPh}
              required
            />
            {errors.location && (
              <span className="mt-1 block text-xs text-neon-pink">{errors.location}</span>
            )}
          </label>

          <label className="block sm:col-span-2">
            <span className="mb-1.5 block text-xs text-muted">{m.form.guests}</span>
            <input
              className={fieldClass}
              name="guestCount"
              inputMode="numeric"
              value={values.guestCount}
              onChange={(e) => setField('guestCount', e.target.value)}
              placeholder={m.form.guestsPh}
            />
          </label>

          <label className="block sm:col-span-2">
            <span className="mb-1.5 block text-xs text-muted">{m.form.message}</span>
            <textarea
              className={`${fieldClass} min-h-[110px] resize-y`}
              name="message"
              value={values.message}
              onChange={(e) => setField('message', e.target.value)}
              placeholder={m.form.messagePh}
            />
          </label>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <Button type="submit" size="lg" className="w-full sm:w-auto">
            <Mail size={18} aria-hidden />
            {m.form.submit}
          </Button>
          <p className="text-xs leading-relaxed text-muted">
            {m.form.disclaimerBefore}{' '}
            <a
              className="text-cyan underline-offset-2 hover:underline"
              href={`mailto:${BRAND.email}`}
            >
              {BRAND.email}
            </a>
            {m.form.disclaimerAfter}{' '}
            <a
              className="text-cyan underline-offset-2 hover:underline"
              href="/booking-policy"
              onClick={(e) => handleNavClick(e, '/booking-policy')}
            >
              {m.form.bookingPolicy}
            </a>
            {m.form.disclaimerEnd}
          </p>

          {sentHint && (
            <p
              className="flex items-start gap-2 rounded-2xl border border-cyan/30 bg-cyan/10 px-4 py-3 text-sm text-soft-white"
              role="status"
            >
              <CheckCircle2 className="mt-0.5 shrink-0 text-cyan" size={18} aria-hidden />
              {t((msg) => msg.form.sentHint, { email: BRAND.email })}
            </p>
          )}
        </div>
      </div>
    </form>
  )
}
