import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'md' | 'lg'
}

const sizes = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: Props) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full font-medium transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan disabled:opacity-50'

  const variants = {
    primary:
      'bg-gradient-book text-soft-white shadow-[0_8px_28px_rgba(255,46,147,0.28)] hover:brightness-110 hover:shadow-[0_10px_32px_rgba(255,46,147,0.38)]',
    secondary:
      'border border-white/20 bg-white/5 text-soft-white hover:border-cyan/50 hover:bg-white/10',
    ghost: 'text-soft-white hover:text-cyan',
  }

  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
