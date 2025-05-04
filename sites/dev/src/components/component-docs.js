import React from 'react'
import { Highlight } from '@freesewing/react/components/Highlight'
import { Tabs, Tab } from '@freesewing/react/components/Tab'
import { FingerprintIcon, WarningIcon } from '@freesewing/react/components/Icon'
import { IconButton } from '@freesewing/react/components/Button'
import { MiniNote } from '@freesewing/react/components/Mini'

export const ComponentDocs = ({ docs }) => {
  return (
    <>
      <p>{docs.desc}</p>
      <Tabs tabs="Import, Props, Example, Source">
        <Tab>
          <p>
            You can import the <code>{docs.name}</code> component from the <b>{docs.family}</b>{' '}
            component family in the <code>@freesewing/react</code> package:
          </p>
          <Highlight language="js">{docs.importAs}</Highlight>
        </Tab>
        <Tab>
          <p>
            The <code>{docs.name}</code> component takes the following props:
          </p>
          <PropsTable docs={docs} />
        </Tab>
        <Tab>
          <MiniNote>
            Note that this component will take up the full width made available to it.
          </MiniNote>
          <Highlight language="js">
            {[
              `import { FingerprintIcon, WarningIcon } from '@freesewing/react/components/Icon'`,
              `import { IconButton } from '@freesewing/react/components/Button'`,
              ``,
              `<IconButton>`,
              `  <FingerprintIcon />`,
              `  Primary (default)`,
              `</IconButton>`,
              `<br />`,
              `<IconButton color="warning">`,
              `  <WarningIcon />`,
              `  Warning`,
              `</IconButton>`,
            ].join('\n')}
          </Highlight>
          <IconButton>
            <FingerprintIcon />
            Primary (default)
          </IconButton>
          <br />
          <IconButton color="warning">
            <WarningIcon />
            Warning
          </IconButton>
        </Tab>
        <Tab>
          <p>
            The <code>{docs.name}</code> component is defined{' '}
            <a
              href={`https://codeberg.org/freesewing/freesewing/src/branch/develop/${docs.file}#L${docs.line}`}
            >
              on{' '}
              <b>
                line
                {docs.line}
              </b>{' '}
              in <b>{docs.file}</b>
            </a>
            .
          </p>
        </Tab>
      </Tabs>
    </>
  )
}

const PropsTable = ({ docs }) => (
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Description</th>
        <th>Optional</th>
        <th>Default Value</th>
      </tr>
    </thead>
    <tbody>
      {docs.params.map((prop, i) => (
        <tr key={i}>
          <td>{prop.name}</td>
          <td>{prop.type.names}</td>
          <td>{prop.description}</td>
          <td>{prop.optional ? 'yes' : 'no'}</td>
          <td>
            <code>{prop.defaultvalue}</code>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)
