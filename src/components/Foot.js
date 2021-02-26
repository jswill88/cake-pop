

import Typography from 'antd/es/typography';

const { Text } = Typography;

export default function Foot() {

  return (
    <>
      <Text
        style={{ color: '#ffffff' }}
      >
        &copy; 2021 Josh Williams
    </Text>
      <Text
        style={{ color: '#ffffff' }}
      >
        GitHub, LinkedIn, Portfolio, Polyrhythm generator
      </Text>
    </>
  )
}