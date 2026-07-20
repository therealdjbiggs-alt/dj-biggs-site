import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useI18n } from '@/context/I18nContext'
import {
  formatDisplayDate,
  getMonthMatrix,
  isSameDay,
  startOfDay,
} from '@/lib/booking'

type Props = {
  month: Date
  selected: Date | null
  onMonthChange: (next: Date) => void
  onSelect: (day: Date) => void
}

export function BookingCalendar({
  month,
  selected,
  onMonthChange,
  onSelect,
}: Props) {
  const { m, t, locale } = useI18n()
  const today = startOfDay(new Date())
  const rows = getMonthMatrix(month)
  const dateLocale = locale === 'es' ? 'es-US' : 'en-US'
  const label = month.toLocaleDateString(dateLocale, {
    month: 'long',
    year: 'numeric',
  })

  const shiftMonth = (delta: number) => {
    onMonthChange(new Date(month.getFullYear(), month.getMonth() + delta, 1))
  }

  return (
    <div className="glass-card rounded-3xl p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between gap-2">
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-soft-white transition hover:border-cyan/40 hover:text-cyan"
          onClick={() => shiftMonth(-1)}
          aria-label={m.calendar.prev}
        >
          <ChevronLeft size={18} />
        </button>
        <h3 className="font-display text-base font-bold text-soft-white sm:text-lg">
          {label}
        </h3>
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-soft-white transition hover:border-cyan/40 hover:text-cyan"
          onClick={() => shiftMonth(1)}
          aria-label={m.calendar.next}
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div
        className="mb-2 grid grid-cols-7 gap-1 text-center text-[11px] tracking-wider text-muted uppercase"
        aria-hidden
      >
        {m.calendar.weekdays.map((d) => (
          <span key={d} className="py-1">
            {d}
          </span>
        ))}
      </div>

      <div
        role="grid"
        aria-label={t((msg) => msg.calendar.gridAria, { label })}
        className="grid grid-cols-7 gap-1"
      >
        {rows.flatMap((row, ri) =>
          row.map((day, ci) => {
            if (!day) {
              return <div key={`e-${ri}-${ci}`} className="aspect-square" />
            }

            const disabled = startOfDay(day) < today
            const isSelected = selected ? isSameDay(day, selected) : false
            const isToday = isSameDay(day, today)

            return (
              <button
                key={day.toISOString()}
                type="button"
                role="gridcell"
                disabled={disabled}
                aria-selected={isSelected}
                aria-label={formatDisplayDate(day)}
                onClick={() => onSelect(day)}
                className={[
                  'aspect-square rounded-xl text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan',
                  disabled
                    ? 'cursor-not-allowed text-muted/30'
                    : 'text-soft-white hover:bg-white/10',
                  isSelected
                    ? 'bg-gradient-book text-soft-white shadow-[0_8px_20px_rgba(255,46,147,0.35)] hover:brightness-110'
                    : '',
                  !isSelected && isToday ? 'ring-1 ring-cyan/50' : '',
                ].join(' ')}
              >
                {day.getDate()}
              </button>
            )
          }),
        )}
      </div>

      <p className="mt-4 text-xs text-muted">{m.calendar.hint}</p>
    </div>
  )
}
