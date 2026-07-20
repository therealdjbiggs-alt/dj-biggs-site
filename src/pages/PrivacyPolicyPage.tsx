import { PolicyLayout, PolicySections } from '@/components/PolicyLayout'
import { useI18n } from '@/context/I18nContext'

export function PrivacyPolicyPage() {
  const { m } = useI18n()

  return (
    <PolicyLayout title={m.privacy.title} updated={m.privacy.updated}>
      <PolicySections sections={m.privacy.sections} />
    </PolicyLayout>
  )
}
