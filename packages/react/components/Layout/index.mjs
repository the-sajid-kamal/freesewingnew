import React from 'react'
import { Breadcrumbs } from '@freesewing/react/components/Breadcrumbs'
import { Link as DefaultLink } from '@freesewing/react/components/Link'

/*
 * This is the default layout, including title and breadcrumbs
 *
 * @param {object} props - All React props
 * @param {array} props.children - The content to go in the layout
 * @param {array} props.crumbs - Data for the breadcrumbs
 * @param {string} props.description - The page description
 * @param {function} props.Link - An optional framework specific Link component
 * @param {string} props.title - The page title
 */
export const Layout = ({ children = [], crumbs = [], description, Link = false, title }) => {
  if (!Link) Link = DefaultLink

  return (
    <BaseLayout>
      <div className="tw:max-w-xl tw:w-full tw:mx-auto">
        <Breadcrumbs {...{ crumbs, title, Link }} />
        <h1 className="tw:break-words">{title}</h1>
        <div className="tw:xl:pl-4">{children}</div>
      </div>
    </BaseLayout>
  )
}

/*
 * This is the base layout
 *
 * @param {object} props - All React props
 * @param {array} props.children - The content to go in the layout
 */
export const BaseLayout = ({ children }) => (
  <div className="tw:flex tw:flex-row tw:items-start tw:w-full tw:justify-between tw:2xl:px-36 tw:xl:px-12 tw:px-4 tw:gap-0 tw:lg:gap-4 tw:xl:gap-8 3xl:tw:gap-12">
    {children}
  </div>
)

/*
 * The left column of the base layout
 *
 * @param {object} props - All React props
 * @param {array} props.children - The content to go in the layout
 */
export const BaseLayoutLeft = ({ children = [] }) => (
  <div className="tw:max-w-96 tw:w-1/4 tw:hidden tw:lg:block tw:shrink-0 tw:my-8 tw:sticky tw:top-4 tw:max-h-screen tw:overflow-scroll">
    {children}
  </div>
)

/*
 * The right column of the base layout
 *
 * @param {object} props - All React props
 * @param {array} props.children - The content to go in the layout
 */
export const BaseLayoutRight = ({ children = [] }) => (
  <div className="tw:max-w-96 tw:w-1/4 tw:hidden tw:xl:block tw:my-8 tw:sticky tw:top-2">
    {children}
  </div>
)

/*
 * The main column for prose (text like docs and so on)
 *
 * @param {object} props - All React props
 * @param {array} props.children - The content to go in the layout
 * @param {array} props.wide - Whether or not to use the wide view
 */
export const BaseLayoutProse = ({ children = [], wide = false }) => (
  <div className={`tw:grow tw:w-full tw:m-auto tw:max-w-${wide ? 'full' : 'prose'} tw:my-8`}>
    {children}
  </div>
)

/*
 * The central column for wide content (no max-width)
 *
 * @param {object} props - All React props
 * @param {array} props.children - The content to go in the layout
 */
export const BaseLayoutWide = ({ children = [] }) => (
  <div className="tw:grow tw:w-full tw:m-auto tw:my-8 tw:grow">{children}</div>
)

/*
 * A layout for pages that do their own title/layout, like the sign in page
 *
 * @param {object} props - All React props
 * @param {array} props.children - The content to go in the layout
 */
export const NoTitleLayout = ({ children }) => {
  return (
    <BaseLayout>
      <div className="tw:max-w-xl tw:w-full tw:mx-auto">
        <div>{children}</div>
      </div>
    </BaseLayout>
  )
}
