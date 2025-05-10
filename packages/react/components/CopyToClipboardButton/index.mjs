import React, { useContext, useState } from 'react'
import { copyToClipboard } from '@freesewing/utils'
import ReactDOMServer from 'react-dom/server'
import { CopyIcon, OkIcon } from '@freesewing/react/components/Icon'
import { LoadingStatusContext } from '@freesewing/react/context/LoadingStatus'

const strip = (html) =>
  typeof DOMParser === 'undefined'
    ? html
    : new DOMParser().parseFromString(html, 'text/html').body.textContent || ''

const handleCopied = (content, setCopied, setLoadingStatus, label) => {
  copyToClipboard(content)
  setCopied(true)
  setLoadingStatus([
    true,
    label ? `${label} copied to clipboard` : 'Copied to clipboard',
    true,
    true,
  ])
  setTimeout(() => setCopied(false), 1000)
}

/**
 * A component to copy something to the clipboard
 *
 * @component
 * @param {object} props - All component props
 * @param {JSX.element} props.children - The component children
 * @param {string} props.content - The content that should be copied to the clipboard
 * @param {string} props.label - The label to show when the content is copied
 * @param {boolean} props.sup - Set this to true to render as superscript (above the line)
 * @returns {JSX.Element}
 */
export const CopyToClipboardButton = ({ children, content, label = false, sup = false }) => {
  const [copied, setCopied] = useState(false)
  const { setLoadingStatus } = useContext(LoadingStatusContext)

  const style = sup ? 'tw:w-4 tw:h-4 tw:-mt-4 tw:-ml-1' : 'tw:w-5 tw:h-5'

  return (
    <button
      className={
        (copied ? 'tw:text-success ' : '') +
        'tw:daisy-btn tw:w-full tw:daisy-btn-ghost tw:lg:w-auto tw:hover:bg-transparent tw:hover:border-transparent tw:group tw:hover:shadow-none'
      }
      onClick={() => handleCopied(content, setCopied, setLoadingStatus, label)}
    >
      {sup ? children : null}
      {copied ? (
        <OkIcon
          className={`${style} tw:text-success-content tw:bg-success tw:rounded-full tw:p-1`}
          stroke={4}
        />
      ) : (
        <CopyIcon className={`${style} tw:text-inherit tw:group-hover:text-secondary`} />
      )}
        {sup ? null : children}
    </button>
  )
}
