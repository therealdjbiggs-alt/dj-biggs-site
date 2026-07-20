import { PolicyLayout, PolicySections } from '@/components/PolicyLayout'
import { useI18n } from '@/context/I18nContext'

export function BookingPolicyPage() {
  const { m } = useI18n()

  return (
    <PolicyLayout title={m.bookingPolicy.title} updated={m.bookingPolicy.updated}>
      <PolicySections sections={m.bookingPolicy.sections} />
    </PolicyLayout>
  )
}
