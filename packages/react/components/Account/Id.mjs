// Hooks
import React, { useState } from 'react'
import { useAccount } from '@freesewing/react/hooks/useAccount'

// Components
import { Link as WebLink } from '@freesewing/react/components/Link'

/**
 * A component to display the user's ID
 *
 * @component
 * @param {object} props - All component props
 * @param {React.Component} props.Link - A framework specific Link component for client-side routing
 * @returns {JSX.Element}
 */
export const UserId = ({ Link = false }) => {
  if (!Link) Link = WebLink

  // Hooks
  const { account } = useAccount()
  const [id, setId] = useState(account.id)

  return id || null
}
