import React from 'react'

/**
 * A button with an icon and a label, something which we commonly use across our UI.
 *
 * @component
 * @param {object} props - All component props
 * @param {string} [props.btnProps={}] - Any props to pass to the button
 * @param {string} [props.children=[]] - The button children (content)
 * @param {string} [props.className=''] - Any extra classes to add to the button
 * @param {string} [props.title=''] - The button title
 * @param {string} [props.color='primary'] - The main button color, one of DaisyUI's named colors
 * @param {string} [props.href=false] - Set this to render a link instead of a button
 * @param {function} [props.onClick=false] - Set this to render a button instead of a link
 * @returns {JSX.Element}
 */
export const IconButton = ({
  btnProps = {},
  children = [],
  className = '',
  color = 'primary',
  href = false,
  onClick = false,
  title = '',
}) => {
  const allProps = {
    className: `tw:daisy-btn-${color} hover:tw:text-${color}-content ${className}`,
    title: title,
    ...btnProps,
  }
  if (onClick) allProps.onClick = onClick
  else if (href) allProps.href = href

  return onClick ? (
    <button {...allProps}>
      <div className={`tw:text-${color}-content ${staticLinkClasses}`}>{children}</div>
    </button>
  ) : (
    <a {...allProps}>
      <div className={`tw:text-${color}-content ${staticLinkClasses}`}>{children}</div>
    </a>
  )
}

const staticLinkClasses =
  'tw:flex tw:flex-row tw:gap-2 tw:lg:gap-6 tw:items-center tw:grow ' +
  'tw:justify-between tw:w-full tw:md:w-auto tw:daisy-btn tw:hover:no-underline tw:capitalize'
