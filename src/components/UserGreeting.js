
import { useContext } from 'react';
import { Context } from '../context/context'

import Typography from 'antd/es/typography'
const { Paragraph } = Typography;

export default function UserGreeting() {

  const {
    loggedIn,
    user
  } = useContext(Context)

  return (
    <Paragraph
      style={{ fontSize: '14px', margin: 0 }}
      ellipsis
    >
      {loggedIn ? `Hi, ${user}!` : 'Sign in to save'}
    </Paragraph>
  )
}