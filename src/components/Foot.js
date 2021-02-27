
import GithubOutlined from '@ant-design/icons/GithubOutlined'
import LinkedinOutlined from '@ant-design/icons/LinkedinOutlined'
import LinkOutlined from '@ant-design/icons/LinkOutlined'

import Row from 'antd/es/row'
import Tag from 'antd/es/tag'
import Typography from 'antd/es/typography';

const { Text, Link } = Typography;

export default function Foot() {

  return (
    <>
      <Row>
        <Text
          style={{ color: '#ffffff' }}
        >
          Josh Williams &copy; 2021
        </Text>
      </Row>
      <Row>
        <Link
          href="https://www.joshwilliamsdeveloper.com/"
          style={{margin: '.2rem 0'}}
        >
          <Tag
            icon={<LinkOutlined />}
            color="cyan"
          >
            Portfolio
        </Tag>
        </Link>
        <Link
        style={{margin: '.2rem 0'}}
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
        style={{margin: '.2rem 0'}}
          href="https://www.linkedin.com/in/joshua-s-williams/"
        >
          <Tag
            icon={<LinkedinOutlined />}
            color="blue"
          >
            LinkedIn
        </Tag>
        </Link>
      </Row>
    </>
  )
}