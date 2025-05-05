import React from 'react'
import { linkClasses } from '@freesewing/utils'

/**
 * An anchor link component
 *
 * @param {object} props - All React props
 * @param {array} props.children - The content to go in the layout
 * @param {array} props.id - The ID of the anchor to link to
 * @param {array} props.title - An optional link title
 */
export const AnchorLink = ({ children, id = '', title = false }) => (
  <a href={`#${id}`} className={linkClasses} title={title ? title : ''}>
    {children}
  </a>
)

/**
 * A regular link component
 *
 * @param {object} props - All React props
 * @param {array} props.children - The content to go in the layout
 * @param {array} props.href - The target to link to
 * @param {array} props.title - An optional link title
 * @param {string} props.className - Any non-default CSS classes to apply
 * @param {string} props.style - Any non-default styles to apply
 */
export const Link = ({
  href,
  title = false,
  children,
  className = linkClasses,
  target,
  style = {},
}) => (
  <a href={href} target={target} className={className} title={title ? title : ''} style={style}>
    {children}
  </a>
)

const BaseLink = Link

/**
 * A regular link, but on a success background
 *
 * @param {object} props - All React props
 * @param {array} props.children - The content to go in the layout
 * @param {array} props.href - The target to link to
 * @param {array} props.title - An optional link title
 * @param {string} props.className - Any non-default CSS classes to apply
 * @param {string} props.style - Any non-default styles to apply
 */
export const SuccessLink = ({
  href,
  title = false,
  children,
  className = `${linkClasses} tw:text-success-content tw:hover:text-success-content`,
  style = {},
}) => (
  <a href={href} className={className} title={title ? title : ''} style={style}>
    {children}
  </a>
)

export const CardLink = ({
  href,
  title,
  icon,
  children,
  Link,
  className = 'tw:bg-base-200 tw:text-base-content',
}) => {
  if (!Link) Link = BaseLink

  return (
    <Link
      href={href}
      className={`tw:px-8 tw:py-10 tw:rounded-lg tw:block ${className}
      tw:hover:bg-secondary/5 tw:shadow-lg tw:bg-base-200
      tw:transition-color tw:duration-300 grow tw:hover:no-underline no-hover-decoration`}
    >
      <h2 className="tw:mb-4 tw:text-base-content tw:flex tw:flex-row tw:gap-4 tw:justify-between tw:items-center">
        <span className="tw:text-base-content">{title}</span>
        <span className="tw:shrink-0 tw:text-base-content">{icon}</span>
      </h2>
      <div className="tw:text-base-content">{children}</div>
    </Link>
  )
}
