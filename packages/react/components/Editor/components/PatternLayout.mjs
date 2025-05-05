import React from 'react'
import { useDesignTranslation } from '@freesewing/react/hooks/useDesignTranslation'
import { ZoomContextProvider } from './ZoomablePattern.mjs'
import {
  HeaderMenu,
  HeaderMenuDraftViewDesignOptions,
  HeaderMenuDraftViewCoreSettings,
  HeaderMenuDraftViewUiPreferences,
  HeaderMenuDraftViewFlags,
} from './HeaderMenu.mjs'
import { DesignOptionsMenu } from './menus/DesignOptionsMenu.mjs'
import { CoreSettingsMenu } from './menus/CoreSettingsMenu.mjs'
import { UiPreferencesMenu } from './menus/UiPreferencesMenu.mjs'
import { Accordion } from './Accordion.mjs'

/**
 * A layout for views that include a drafted pattern
 *
 * @param {object} config - The editor configuration
 * @param {object} settings - The pattern settings/state
 * @param {object} ui - The UI settings/state
 * @param {object} update - Object holding methods to manipulate state
 * @param {function} Design - The Design contructor
 * @param {object] pattern - The drafted pattern
 */
export const PatternLayout = (props) => {
  const { menu = null, Design, pattern, update, config, state } = props
  const i18n = useDesignTranslation(Design.designConfig.data.id)
  const flags = props.pattern?.setStores?.[0]?.plugins?.['plugin-annotations']?.flags

  return (
    <ZoomContextProvider>
      <div className="tw:flex tw:flex-col tw:h-full">
        <HeaderMenu
          state={props.state}
          {...{ update, Design, pattern, config, strings: props.strings }}
        />
        <div className="tw:flex tw:lg:flex-row tw:grow tw:lg:max-h-[90vh] tw:max-h-[calc(100vh-3rem)] tw:h-full tw:py-2 tw:lg:mt-2">
          <div className="tw:lg:w-2/3 tw:flex tw:flex-col tw:h-full tw:grow tw:p-2 tw:shadow tw:mx-2">
            {props.output}
          </div>
          {state.ui?.aside ? (
            <div
              className={`tw:hidden tw:md:block tw:w-1/3 tw:shrink tw:grow-0 tw:lg:p-4 tw:max-w-2xl tw:h-full tw:overflow-scroll`}
            >
              <h5 className="tw:capitalize">{pattern.designConfig.data.id} Options</h5>
              <SideMenuUl>
                <DesignOptionsMenu {...props} />
              </SideMenuUl>
              <h5>Core Settings</h5>
              <SideMenuUl>
                <CoreSettingsMenu {...props} />
              </SideMenuUl>
              <h5>UI Preferences</h5>
              <SideMenuUl>
                <UiPreferencesMenu {...props} />
              </SideMenuUl>
            </div>
          ) : null}
        </div>
      </div>
    </ZoomContextProvider>
  )
}

export const SideMenuUl = ({ children }) => (
  <ul
    className="tw:daisy-menu tw:daisy-dropdown-content tw:flex-nowrap tw:bg-base-200 tw:rounded-box tw:z-1 tw:w-full tw:p-0 tw:pl-0"
    style={{ padding: 0 }}
  >
    {children}
  </ul>
)
