import { useContext } from 'react';
import { ScreenContext } from '../context/ScreenContext'

import GithubOutlined from '@ant-design/icons/GithubOutlined'
import LinkedinOutlined from '@ant-design/icons/LinkedinOutlined'
import LinkOutlined from '@ant-design/icons/LinkOutlined'

import Row from 'antd/es/row'
import Tag from 'antd/es/tag'
import Typography from 'antd/es/typography';

const { Text, Link } = Typography;

export default function Foot() {
  const { isMobile } = useContext(ScreenContext);

  return (
    <>
      <Row justify={isMobile ? "center" : "end"} style={{ maxWidth: '2000px', margin: '0 auto'}}>
        <Text
          style={{ color: '#ffffff' }}
        >
          Josh Williams &copy; 2021
        </Text>
      </Row>
      <Row justify={isMobile ? "center" : "end"} style={{ maxWidth: '2000px', margin: '0 auto'}}>
        <Link
          href="https://www.joshwilliamsdeveloper.com/"
          style={{ margin: '.2rem 0' }}
        >
          <Tag
            icon={<LinkOutlined />}
            color="cyan"
            style={{marginRight: '.4rem'}}
          >
            Portfolio
        </Tag>
        </Link>
        <Link
          style={{ margin: '.2rem 0' }}
          href="https://github.com/jswill88"
        >
          <Tag
            icon={<GithubOutlined />}
            color="magenta"
            style={{marginRight: '.4rem'}}
          >
            GitHub
        </Tag>
        </Link>
        <Link
          style={{ margin: '.2rem 0' }}
          href="https://www.linkedin.com/in/joshua-s-williams/"
        >
          <Tag
            icon={<LinkedinOutlined />}
            color="blue"
            style={{marginRight: 0}}
          >
            LinkedIn
        </Tag>
        </Link>
      </Row>
      
    </>
  )
}