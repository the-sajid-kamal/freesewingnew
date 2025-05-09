import React from 'react'
import {
  AccountStatus,
  Apikeys as ApikeysExample,
  Avatar as AvatarExample,
  Bio as BioExample,
  BookmarkButton,
  Bookmarks as BookmarksExample,
  Compare as CompareExample,
  Consent as ConsentExample,
  Control as ControlExample,
  Email as EmailExample,
  EmailChangeConfirmation as EmailChangeConfirmationExample,
  Export as ExportExample,
  Github as GithubExample,
  ImportSet as ImportSetExample,
  Instagram as InstagramExample,
  Links as LinksExample,
  Mastodon as MastodonExample,
  Mfa as MfaExample,
  MsetCard,
  NewSet as NewSetExample,
  Newsletter as NewsletterExample,
} from '@freesewing/react/components/Account'

const AccountStatusExample = () => (
  <table>
    <thead>
      <tr>
        <th>Status</th>
        <th>Preview</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>-2</td><td><AccountStatus status={-2} /></td></tr>
      <tr><td>-1</td><td><AccountStatus status={-1} /></td></tr>
      <tr><td>0</td><td><AccountStatus status={0} /></td></tr>
      <tr><td>1</td><td><AccountStatus status={1} /></td></tr>
    </tbody>
  </table>
)

const BookmarkButtonExample = () => (
  <BookmarkButton
    slug="https://freesewing.dev/reference/packages/react/components/account/#bookmarkbutton"
    title="BookmarkButton Example"
    type="custom"
  />
)

const MsetCardExample = () => (
  <MsetCard set={{ name: 'Example Set'}} />
)

export {
  AccountStatusExample,
  ApikeysExample,
  AvatarExample,
  BioExample,
  BookmarkButtonExample,
  BookmarksExample,
  CompareExample,
  ConsentExample,
  ControlExample,
  EmailExample,
  EmailChangeConfirmationExample,
  ExportExample,
  GithubExample,
  ImportSetExample,
  InstagramExample,
  LinksExample,
  MastodonExample,
  MfaExample,
  MsetCardExample,
  NewSetExample,
  NewsletterExample,
}

