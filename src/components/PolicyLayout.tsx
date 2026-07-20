import { Fragment, useEffect, type ReactNode } from 'react'
import { useI18n } from '@/context/I18nContext'
import { BRAND } from '@/data/siteContent'
import { handleNavClick } from '@/lib/navigate'

type Props = {
  title: string
  updated: string
  children: ReactNode
}

/** Renders message text, turning `{email}` into a mailto link. */
export function PolicyEmailText({ text }: { text: string }) {
  const parts = text.split('{email}')
  if (parts.length === 1) return <>{text}</>

  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>
          {part}
          {i < parts.length - 1 && (
            <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
          )}
        </Fragment>
      ))}
    </>
  )
}

type PolicySection = {
  h: string
  p?: string[]
  ul?: string[]
  ol?: string[]
  pAfter?: string[]
}

export function PolicySections({ sections }: { sections: PolicySection[] }) {
  return (
    <>
      {sections.map((section) => (
        <section key={section.h}>
          <h2>{section.h}</h2>
          {section.p?.map((paragraph) => (
            <p key={paragraph}>
              <PolicyEmailText text={paragraph} />
            </p>
          ))}
          {section.ul && (
            <ul>
              {section.ul.map((item) => (
                <li key={item}>
                  <PolicyEmailText text={item} />
                </li>
              ))}
            </ul>
          )}
          {section.ol && (
            <ol>
              {section.ol.map((item) => (
                <li key={item}>
                  <PolicyEmailText text={item} />
                </li>
              ))}
            </ol>
          )}
          {section.pAfter?.map((paragraph) => (
            <p key={paragraph}>
              <PolicyEmailText text={paragraph} />
            </p>
          ))}
        </section>
      ))}
    </>
  )
}

export function PolicyLayout({ title, updated, children }: Props) {
  const { m, t } = useI18n()

  useEffect(() => {
    document.title = `${title} | ${BRAND.name}`
    return () => {
      document.title = m.policy.siteTitle
    }
  }, [title, m.policy.siteTitle])

  return (
    <div className="min-h-screen bg-ink text-soft-white">
      <header className="border-b border-white/5">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-5 sm:px-6">
          <a
            href="/"
            className="inline-flex items-center"
            onClick={(e) => handleNavClick(e, '/')}
          >
            <img
              src={BRAND.logoSrc}
              alt={BRAND.name}
              className="h-11 w-auto object-contain logo-neon-glow sm:h-12"
              width={160}
              height={52}
            />
          </a>
          <a
            href="/"
            className="text-sm text-muted transition hover:text-cyan"
            onClick={(e) => handleNavClick(e, '/')}
          >
            {m.policy.back}
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="text-xs font-semibold tracking-[0.28em] text-cyan uppercase">
          {m.policy.legal}
        </p>
        <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 text-sm text-muted">
          {t((msg) => msg.policy.lastUpdated, { date: updated })}
        </p>

        <div className="policy-prose mt-10 space-y-8 text-sm leading-relaxed text-muted sm:text-base">
          {children}
        </div>

        <div className="mt-14 border-t border-white/10 pt-8">
          <p className="text-sm text-muted">
            {m.policy.questions}{' '}
            <a
              className="text-cyan transition hover:text-soft-white"
              href={`mailto:${BRAND.email}`}
            >
              {BRAND.email}
            </a>
            .
          </p>
          <a
            href="/"
            className="mt-6 inline-flex text-sm font-medium text-soft-white transition hover:text-cyan"
            onClick={(e) => handleNavClick(e, '/')}
          >
            {m.policy.returnHome}
          </a>
        </div>
      </main>
    </div>
  )
}
