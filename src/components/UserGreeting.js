import { useLoggedIn } from '../context/loggedInContext/'
import Typography from 'antd/es/typography'
const { Paragraph } = Typography;

export default function UserGreeting() {

  const { loggedIn, user } = useLoggedIn()

  return (
    <Paragraph
      style={{ fontSize: '14px', margin: 0 }}
      ellipsis
    >
      {loggedIn ? `Hi, ${user}!` : 'Sign in to save'}
    </Paragraph>
  )
}