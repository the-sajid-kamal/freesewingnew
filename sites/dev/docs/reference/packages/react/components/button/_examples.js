import React from 'react'
import { Highlight } from '@freesewing/react/components/Highlight'
import { FingerprintIcon, WarningIcon } from '@freesewing/react/components/Icon'
import { IconButton } from '@freesewing/react/components/Button'
import { MiniNote } from '@freesewing/react/components/Mini'

export const IconButtonExample = () => (
  <>
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
  </>
)

