import React from 'react'
import { CopyToClipboardButton } from '@freesewing/react/components/CopyToClipboardButton'

export const CopyToClipboardButtonExample = () => (
  <>
    <CopyToClipboardButton content="I am the regular example" label="Regular Example">Regular Example</CopyToClipboardButton>
    <CopyToClipboardButton content="I am the sup example" label="Sup Example" sup>Sup Example</CopyToClipboardButton>
  </>
)
