import { useI18n } from '@/context/I18nContext'
import { useScrolled } from '@/hooks/useUi'
import { scrollToId } from '@/lib/scroll'
import { Button } from '@/components/ui/Button'

export function MobileBookingBar() {
  const { m } = useI18n()
  const scrolled = useScrolled(400)

  if (!scrolled) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink/90 p-3 backdrop-blur-xl lg:hidden safe-area-pb">
      <div className="mx-auto flex max-w-lg items-center gap-3">
        <p className="flex-1 text-xs text-muted">{m.mobileBar.text}</p>
        <Button
          className="shrink-0"
          onClick={() => scrollToId('#book')}
          aria-label={m.mobileBar.aria}
        >
          {m.mobileBar.cta}
        </Button>
      </div>
    </div>
  )
}
