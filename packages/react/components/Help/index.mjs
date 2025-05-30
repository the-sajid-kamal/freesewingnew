import React from 'react'
// Components
import { ModalWrapper } from '@freesewing/react/components/Modal'

/**
 * A component to display inline help for a measurement.
 *
 * This is typically loaded as modal content as it returns an ifram
 *
 * @component
 * @param {object} props - All component props
 * @param {string} [props.m = undefined] - The measurment name (id)
 * @returns {JSX.Element}
 */
export const DesignOptionHelp = ({ design, o }) =>
  design && o ? (
    <iframe
      src={`https://freesewing.eu/docs/designs/${design.toLowerCase()}/options/${o.toLowerCase()}/index.html?docusaurus-data-fs-embed=true`}
      title="Design Option Help"
      style={{ height: '90vh', width: '90vw' }}
    />
  ) : (
    <p>Invalid props provided to DesignOptionHelp.</p>
  )

/**
 * A component to display inline help for a measurement.
 *
 * This is typically loaded as modal content as it returns an ifram
 *
 * @component
 * @param {object} props - All component props
 * @param {string} [props.m = undefined] - The measurment name (id)
 * @returns {JSX.Element}
 */
export const MeasurementHelp = ({ m }) =>
  m ? (
    <iframe
      src={`https://freesewing.eu/docs/measurements/${m.toLowerCase()}/index.html?docusaurus-data-fs-embed=true`}
      title="Measurement Help"
      style={{ height: '90vh', width: '90vw' }}
    />
  ) : (
    <p>No measurment name provided in the m prop.</p>
  )

export function modalDesignOptionHelp(design, o, setModal) {
  setModal(
    <ModalWrapper fullWidth>
      <DesignOptionHelp {...{ design, o }} />
    </ModalWrapper>
  )
}

export function modalMeasurementHelp(m, setModal) {
  console.log('in modalMeasurmentHelp', { m, setModal })
  setModal(
    <ModalWrapper fullWidth>
      <MeasurementHelp m={m} />
    </ModalWrapper>
  )
}
