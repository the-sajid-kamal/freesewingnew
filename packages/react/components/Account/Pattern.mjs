// Dependencies
import orderBy from 'lodash/orderBy.js'
import {
  cloudflareImageUrl,
  capitalize,
  shortDate,
  horFlexClasses,
  newPatternUrl,
  patternUrlFromState,
} from '@freesewing/utils'
import { urls, control as controlConfig } from '@freesewing/config'

// Context
import { LoadingStatusContext } from '@freesewing/react/context/LoadingStatus'
import { ModalContext } from '@freesewing/react/context/Modal'

// Hooks
import React, { useState, useEffect, useContext } from 'react'
import { useAccount } from '@freesewing/react/hooks/useAccount'
import { useBackend } from '@freesewing/react/hooks/useBackend'
import { useSelection } from '@freesewing/react/hooks/useSelection'

// Components
import Markdown from 'react-markdown'
import {
  StringInput,
  MarkdownInput,
  PassiveImageInput,
  ListInput,
} from '@freesewing/react/components/Input'
import { Link as WebLink, AnchorLink } from '@freesewing/react/components/Link'
import {
  BoolNoIcon,
  BoolYesIcon,
  CloneIcon,
  EditIcon,
  FreeSewingIcon,
  OkIcon,
  NoIcon,
  PatternIcon,
  ShowcaseIcon,
  ResetIcon,
  UploadIcon,
} from '@freesewing/react/components/Icon'
import { DisplayRow } from './shared.mjs'
import { TimeAgo } from '@freesewing/react/components/Time'
import { Popout } from '@freesewing/react/components/Popout'
import { ModalWrapper } from '@freesewing/react/components/Modal'
import { KeyVal } from '@freesewing/react/components/KeyVal'

export const Pattern = ({ id, Link }) => {
  if (!Link) Link = WebLink
  // Hooks
  const { account, control } = useAccount()
  const { setLoadingStatus } = useContext(LoadingStatusContext)
  const backend = useBackend()

  // Context
  const { setModal } = useContext(ModalContext)

  const [edit, setEdit] = useState(false)
  const [pattern, setPattern] = useState()
  // Set fields for editing
  const [name, setName] = useState(pattern?.name)
  const [image, setImage] = useState(pattern?.image)
  const [isPublic, setIsPublic] = useState(pattern?.public ? true : false)
  const [notes, setNotes] = useState(pattern?.notes || '')

  // Effect
  useEffect(() => {
    const getPattern = async () => {
      setLoadingStatus([true, 'Loading pattern from backend'])
      const [status, body] = await backend.getPattern(id)
      if (status === 200) {
        setPattern(body.pattern)
        setName(body.pattern.name)
        setImage(body.pattern.image)
        setIsPublic(body.pattern.public ? true : false)
        setNotes(body.pattern.notes)
        setLoadingStatus([true, 'Loaded pattern', true, true])
      } else setLoadingStatus([true, 'An error occured. Please report this', true, false])
    }
    if (id) getPattern()
  }, [id])

  const save = async () => {
    setLoadingStatus([true, 'Gathering info'])
    // Compile data
    const data = {}
    if (name || name !== pattern.name) data.name = name
    if (image || image !== pattern.image) data.img = image
    if (notes || notes !== pattern.notes) data.notes = notes
    if ([true, false].includes(isPublic) && isPublic !== pattern.public) data.public = isPublic
    setLoadingStatus([true, 'Saving pattern'])
    const [status, body] = await backend.updatePattern(pattern.id, data)
    if (status === 200 && body.result === 'success') {
      setPattern(body.pattern)
      setEdit(false)
      setLoadingStatus([true, 'Nailed it', true, true])
    } else setLoadingStatus([true, 'An error occured. Please report this.', true, false])
  }

  const clone = async () => {
    setLoadingStatus([true, 'Cloning pattern'])
    // Compile data
    const data = { ...pattern }
    delete data.id
    delete data.createdAt
    delete data.data
    delete data.userId
    delete data.img
    data.settings = JSON.parse(data.settings)
    const [status, body] = await backend.createPattern(data)
    if (status === 201 && body.result === 'created') {
      setLoadingStatus([true, 'Loading newly created pattern', true, true])
      window.location = `/account/data/patterns/pattern?id=${body.pattern.id}`
    } else setLoadingStatus([true, 'We failed to create this pattern', true, false])
  }

  const togglePublic = async () => {
    setLoadingStatus([true, 'Updating pattern'])
    // Compile data
    const data = { public: !pattern.public }
    const [status, body] = await backend.updatePattern(pattern.id, data)
    if (status === 200 && body.result === 'success') {
      setPattern(body.pattern)
      setLoadingStatus([true, 'Nailed it', true, true])
    } else setLoadingStatus([true, 'An error occured. Please report this.', true, false])
  }
  if (!pattern) return null

  const header = (
    <PatternHeader {...{ pattern, Link, account, setModal, setEdit, togglePublic, save, clone }} />
  )

  if (!edit)
    return (
      <div className="tw-w-full">
        {pattern.public ? (
          <Popout note>
            <h5>This is the private view of your pattern</h5>
            <p>
              Everyone can access the public view since this is a public pattern.
              <br />
              But only you can access this private view.
            </p>
            <p className="tw-text-right">
              <Link
                className={`tw-daisy-btn tw-daisy-btn-secondary hover:tw-text-secondary-content hover:tw-no-underline`}
                href={`/pattern?id=${pattern.id}`}
              >
                <PatternIcon />
                Public View
              </Link>
            </p>
          </Popout>
        ) : null}
        {header}
        {control >= controlConfig.account.patterns.notes && (
          <>
            <h3>Notes</h3>
            <Markdown>{pattern.notes}</Markdown>
          </>
        )}
      </div>
    )

  return (
    <div className="tw-w-full">
      <h2>Edit pattern {pattern.name}</h2>

      {/* Name is always shown */}
      <span id="name"></span>
      <StringInput
        id="pattern-name"
        label="Name"
        update={setName}
        current={name}
        original={pattern.name}
        placeholder="Maurits Cornelis Escher"
        valid={(val) => val && val.length > 0}
      />

      {/* img: Control level determines whether or not to show this */}
      <span id="image"></span>
      {account.control >= controlConfig.account.sets.img ? (
        <PassiveImageInput
          id="pattern-img"
          label="Image"
          update={setImage}
          current={image}
          valid={(val) => val.length > 0}
        />
      ) : null}

      {/* public: Control level determines whether or not to show this */}
      <span id="public"></span>
      {account.control >= controlConfig.account.patterns.public ? (
        <ListInput
          id="pattern-public"
          label="Public"
          update={setIsPublic}
          list={[
            {
              val: true,
              label: (
                <div className="tw-flex tw-flex-row tw-items-center tw-flex-wrap tw-justify-between tw-w-full">
                  <span>Public Pattern</span>
                  <OkIcon
                    className="tw-w-8 tw-h-8 tw-text-success tw-bg-base-100 tw-rounded-full tw-p-1"
                    stroke={4}
                  />
                </div>
              ),
              desc: 'Public patterns can be shared with other FreeSewing users',
            },
            {
              val: false,
              label: (
                <div className="tw-flex tw-flex-row tw-items-center tw-flex-wrap tw-justify-between tw-w-full">
                  <span>Private Pattern</span>
                  <NoIcon
                    className="tw-w-8 tw-h-8 tw-text-error tw-bg-base-100 tw-rounded-full tw-p-1"
                    stroke={3}
                  />
                </div>
              ),
              desc: 'Private patterns are yours and yours alone',
            },
          ]}
          current={isPublic}
        />
      ) : null}

      {/* notes: Control level determines whether or not to show this */}
      <span id="notes"></span>
      {account.control >= controlConfig.account.patterns.notes ? (
        <MarkdownInput id="pattern-notes" label="Notes" update={setNotes} current={notes} />
      ) : null}
      <div className="tw-flex tw-flex-row tw-items-center tw-align-end tw-gap-2 tw-mt-8">
        <button
          onClick={() => setEdit(false)}
          className={`tw-daisy-btn tw-daisy-btn-primary tw-daisy-btn-outline`}
        >
          <ResetIcon />
          Cancel
        </button>
        <button onClick={save} className="tw-daisy-btn tw-daisy-btn-primary tw-grow">
          <UploadIcon />
          Save Pattern
        </button>
      </div>
    </div>
  )
}

export const PatternCard = ({
  pattern,
  href = false,
  onClick = false,
  useA = false,
  size = 'md',
  Link = false,
}) => {
  if (!Link) Link = WebLink
  const sizes = {
    lg: 96,
    md: 52,
    sm: 36,
    xs: 20,
  }
  const s = sizes[size]

  const wrapperProps = {
    className: `tw-bg-base-300 tw-w-full tw-mb-2 tw-mx-auto tw-flex tw-flex-col tw-items-start tw-text-center tw-justify-center tw-rounded tw-shadow tw-py-4 tw-w-${s} tw-aspect-square`,
    style: {
      backgroundImage: `url(${cloudflareImageUrl({ type: 'w1000', id: pattern.img })})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '50%',
    },
  }
  if (pattern.img === 'default-avatar') wrapperProps.style.backgroundPosition = 'bottom right'

  const inner = null

  // Is it a button with an onClick handler?
  if (onClick)
    return (
      <button {...wrapperProps} onClick={onClick}>
        {inner}
      </button>
    )

  // Returns a link to an internal page
  if (href && !useA)
    return (
      <Link {...wrapperProps} href={href}>
        {inner}
      </Link>
    )

  // Returns a link to an external page
  if (href && useA)
    return (
      <a {...wrapperProps} href={href}>
        {inner}
      </a>
    )

  // Returns a div
  return <div {...wrapperProps}>{inner}</div>
}

const BadgeLink = ({ label, href }) => (
  <a
    href={href}
    className="tw-daisy-badge tw-daisy-badge-secondary tw-font-bold tw-daisy-badge-lg hover:tw-text-secondary-content hover:tw-no-underline"
  >
    {label}
  </a>
)

/**
 * Helper component to show the pattern title, image, and various buttons
 */
const PatternHeader = ({
  pattern,
  Link,
  account,
  setModal,
  setEdit,
  togglePublic,
  save,
  clone,
}) => (
  <>
    <h2>{pattern.name}</h2>
    <div className="tw-flex tw-flex-row tw-flex-wrap tw-gap-2 tw-text-sm tw-items-center tw-mb-2">
      <KeyVal k="ID" val={pattern.id} color="secondary" />
      <KeyVal k="Created" val={<TimeAgo iso={pattern.createdAt} />} color="secondary" />
      <KeyVal k="Updated" val={<TimeAgo iso={pattern.updatedAt} />} color="secondary" />
      <KeyVal k="Public" val={pattern.public ? 'yes' : 'no'} color="secondary" />
    </div>
    <div className="tw-flex tw-flex-wrap md:tw-flex-nowrap tw-flex-row tw-gap-2 tw-w-full">
      <div className="tw-w-full md:tw-w-96 tw-shrink-0">
        <PatternCard pattern={pattern} size="md" Link={Link} />
      </div>
      <div className="tw-flex tw-flex-col tw-justify-end tw-gap-2 tw-mb-2 tw-grow">
        {account.control > 3 && (pattern?.public || pattern.userId === account.id) ? (
          <div className="tw-flex tw-flex-row tw-gap-2 tw-items-center">
            <BadgeLink label="JSON" href={`${urls.backend}/patterns/${pattern.id}.json`} />
            <BadgeLink label="YAML" href={`${urls.backend}/patterns/${pattern.id}.yaml`} />
          </div>
        ) : (
          <span></span>
        )}
        <button
          onClick={() =>
            setModal(
              <ModalWrapper flex="col" justify="top lg:tw-justify-center" slideFrom="right">
                <img src={cloudflareImageUrl({ type: 'public', id: pattern.img })} />
              </ModalWrapper>
            )
          }
          className={`tw-daisy-btn tw-daisy-btn-secondary tw-daisy-btn-outline ${horFlexClasses}`}
        >
          <ShowcaseIcon />
          Show Image
        </button>
        {account.control > 3 ? (
          <button
            onClick={() => togglePublic()}
            className={`tw-daisy-btn tw-daisy-btn-${pattern.public ? 'error' : 'success'} tw-daisy-btn-outline ${horFlexClasses} hover:tw-text-${pattern.public ? 'error' : 'success'}-content`}
          >
            {pattern.public ? <BoolNoIcon /> : <BoolYesIcon />}
            Make pattern {pattern.public ? 'private' : 'public'}
          </button>
        ) : null}
        {pattern.userId === account.id && (
          <>
            <Link
              href={patternUrlFromState(pattern, true)}
              className={`tw-daisy-btn tw-daisy-btn-primary tw-daisy-btn-outline ${horFlexClasses}`}
            >
              <FreeSewingIcon /> Update Pattern
            </Link>
            <button
              className={`tw-daisy-btn tw-daisy-btn-primary tw-daisy-btn-outline ${horFlexClasses}`}
              onClick={clone}
            >
              <CloneIcon /> Clone Pattern
            </button>
            <button
              onClick={() => setEdit(true)}
              className={`tw-daisy-btn tw-daisy-btn-primary ${horFlexClasses}`}
            >
              <EditIcon /> Edit Pattern Metadata
            </button>
          </>
        )}
      </div>
    </div>
  </>
)
