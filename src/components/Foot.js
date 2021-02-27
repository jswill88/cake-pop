
import GithubOutlined from '@ant-design/icons/GithubOutlined'
import LinkedinOutlined from '@ant-design/icons/LinkedinOutlined'

import Tag from 'antd/es/tag'
import Typography from 'antd/es/typography';

const { Text, Link } = Typography;

export default function Foot() {

  return (
    <>
      <Text
        style={{ color: '#ffffff' }}
      >
        Josh Williams &copy; 2021
    </Text>
      <Text
        style={{ color: '#ffffff' }}
      >
        {' '}Portfolio, Polyrhythm Generator{' '}
      </Text>
      <Link
        href="https://github.com/jswill88"
      >
        <Tag
          icon={<GithubOutlined />}
          color="purple"
        >
          GitHub
        </Tag>
      </Link>
      <Link
        href="https://www.linkedin.com/in/joshua-s-williams/"
      >
        <Tag
          icon={<LinkedinOutlined />}
          color="blue"
        >
          LinkedIn
        </Tag>
      </Link>
    </>
  )
}