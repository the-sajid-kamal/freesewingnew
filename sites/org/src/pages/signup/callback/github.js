// Components
import DocusaurusLayout from '@theme/Layout'
import { DocusaurusPage } from '@freesewing/react/components/Docusaurus'
import { NoTitleLayout } from '@freesewing/react/components/Layout'
import { OauthCallback } from '@freesewing/react/components/SignIn'

/*
 * This is the Github Oauth callback page.
 * Each page MUST be wrapped in the DocusaurusPage component.
 * You also MUST pass in the DocusaurusLayout compoment.
 */
export default function GithubOauthCallbackPage() {
  return (
    <DocusaurusPage
      DocusaurusLayout={DocusaurusLayout}
      Layout={NoTitleLayout}
      title="Sign In"
      description="Sign In to your FreeSewing account to unlock all features"
    >
      <div className="tw-flex tw-flex-col tw-items-center tw-text-base-content tw-px-4">
        <div className="tw-max-w-lg tw-w-full">
          <OauthCallback provider="github" />
        </div>
      </div>
    </DocusaurusPage>
  )
}
