import React, { useState } from 'react'

/*
 * DaisyUI's accordion seems rather unreliable.
 * So instead, we handle this in React state
 */
const getProps = (isActive = false) => ({
  className: `tw:p-2 tw:px-4 tw:rounded-lg tw:bg-transparent tw:shadow tw:hover:cursor-pointer
    tw:w-full tw:h-auto tw:content-start tw:text-left
    ${isActive ? 'tw:hover:bg-transparent' : 'tw:hover:bg-secondary/10'}`,
})

const getSubProps = (isActive) => ({
  className: `tw:p-2 tw:px-4 tw:rounded-none tw:bg-transparent tw:w-full tw:h-auto
  tw:content-start tw:bg-secondary/20 tw:text-left
  ${isActive ? 'tw:bg-secondary tw:hover:bg-transparent tw:shadow' : 'tw:hover:bg-secondary/10 '}`,
})

const components = {
  button: (props) => <button {...props}>{props.children}</button>,
  div: (props) => <div {...props}>{props.children}</div>,
}

export const BaseAccordion = ({
  items, // Items in the accordion
  act, // Allows one to preset the active (opened) entry
  propsGetter = getProps, // Method to get the relevant props
  component = 'button',
}) => {
  const [active, setActive] = useState(act)
  const Component = components[component]

  return (
    <nav>
      {items
        .filter((item) => item[0])
        .map((item, i) =>
          active === item[2] ? (
            <div key={i} {...propsGetter(true)}>
              <Component
                onClick={setActive}
                className="tw:w-full tw:bg-transparent tw:border-0 tw:hover:bg-secondary/20 tw:hover:cursor-pointer"
              >
                {item[0]}
              </Component>
              {item[1]}
            </div>
          ) : (
            <Component
              key={i}
              {...propsGetter(active === item[2])}
              onClick={() => setActive(item[2])}
            >
              {item[0]}
            </Component>
          )
        )}
    </nav>
  )
}

export const SubAccordion = (props) => <BaseAccordion {...props} propsGetter={getSubProps} />
export const Accordion = (props) => <BaseAccordion {...props} propsGetter={getProps} />
