import React from 'react'
// Components
import { ModalWrapper } from '@freesewing/react/components/Modal'

const Iframe = (props) => <iframe {...props} style={{ height: '90vh', width: '90vh' }} />

/*
 * A component to display inline help for a design option
 *
 * This is typically loaded as modal content as it returns an iframe.
 *
 * @component
 * @param {object} props - All component props
 * @param {string} props.design - The design name
 * @param {string} props.o - The option ID
 * @returns {JSX.Element}
 */
const DesignOptionHelp = ({ design, o }) =>
  design && o ? (
    <Iframe
      src={`https://freesewing.eu/docs/designs/${design.toLowerCase()}/options/${o.toLowerCase()}/index.html?docusaurus-data-fs-embed=true`}
      title="Design Option Help"
    />
  ) : (
    <p>Invalid props provided to DesignOptionHelp.</p>
  )

/*
 * A component to display inline help for a core setting
 *
 * This is typically loaded as modal content as it returns an iframe.
 *
 * @component
 * @param {object} props - All component props
 * @param {string} props.name - The core setting name/id
 * @returns {JSX.Element}
 */
const CoreSettingHelp = ({ name }) =>
  name ? (
    <Iframe
      src={`https://freesewing.eu/docs/about/site/draft/${name.toLowerCase()}/index.html?docusaurus-data-fs-embed=true`}
      title="Core Setting Help"
    />
  ) : (
    <p>Invalid props provided to CoreSettingsHelp.</p>
  )

/*
 * A component to display inline help for a UI preference
 *
 * This is typically loaded as modal content as it returns an iframe.
 *
 * @component
 * @param {object} props - All component props
 * @param {string} props.name - The core setting name/id
 * @returns {JSX.Element}
 */
const UiPreferenceHelp = ({ name }) =>
  name ? (
    <Iframe
      src={`https://freesewing.eu/docs/about/site/draft/${name.toLowerCase()}/index.html?docusaurus-data-fs-embed=true`}
      title="UI Preference Help"
    />
  ) : (
    <p>Invalid props provided to UiPreferenceHelp.</p>
  )

/*
 * A component to display inline help for a measurement.
 *
 * This is typically loaded as modal content as it returns an iframe
 *
 * @component
 * @param {object} props - All component props
 * @param {string} [props.m = undefined] - The measurment name (id)
 * @returns {JSX.Element}
 */
const MeasurementHelp = ({ m }) =>
  m ? (
    <iframe
      src={`https://freesewing.eu/docs/measurements/${m.toLowerCase()}/index.html?docusaurus-data-fs-embed=true`}
      title="Measurement Help"
      style={{ height: '90vh', width: '90vw' }}
    />
  ) : (
    <p>No measurement name provided in the m prop.</p>
  )

export function modalCoreSettingHelp(name, setModal) {
  setModal(
    <ModalWrapper fullWidth keepOpenOnClick>
      <CoreSettingHelp name={name} />
    </ModalWrapper>
  )
}

export function modalUiPreferenceHelp(name, setModal) {
  setModal(
    <ModalWrapper fullWidth keepOpenOnClick>
      <UiPreferenceHelp name={name} />
    </ModalWrapper>
  )
}

export function modalDesignOptionHelp(design, o, setModal) {
  setModal(
    <ModalWrapper fullWidth keepOpenOnClick>
      <DesignOptionHelp {...{ design, o }} />
    </ModalWrapper>
  )
}

export function modalMeasurementHelp(m, setModal) {
  console.log('in modalMeasurmentHelp', { m, setModal })
  setModal(
    <ModalWrapper fullWidth keepOpenOnClick>
      <MeasurementHelp m={m} />
    </ModalWrapper>
  )
}
