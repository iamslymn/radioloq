import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import './Button.css'

type Variant = 'primary' | 'secondary'
type Size = 'md' | 'sm'

type Common = {
  variant?: Variant
  size?: Size
  block?: boolean
  icon?: ReactNode
  children: ReactNode
}

type AsButton = Common & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }
type AsLink = Common & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

export function Button(props: AsButton | AsLink) {
  const { variant = 'primary', size = 'md', block, icon, children, className, ...rest } = props
  const cls = ['btn', `btn--${variant}`, `btn--${size}`, block && 'btn--block', className]
    .filter(Boolean)
    .join(' ')
  const content = (
    <>
      <span className="btn__label">{children}</span>
      {icon && <span className="btn__icon">{icon}</span>}
    </>
  )

  if (typeof rest.href === 'string') {
    return (
      <a className={cls} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {content}
      </a>
    )
  }
  return (
    <button type="button" className={cls} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  )
}

type TextLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { icon?: ReactNode }

export function TextLink({ icon, children, className, ...rest }: TextLinkProps) {
  return (
    <a className={['text-link', className].filter(Boolean).join(' ')} {...rest}>
      <span className="text-link__label">{children}</span>
      {icon && <span className="text-link__icon">{icon}</span>}
    </a>
  )
}
