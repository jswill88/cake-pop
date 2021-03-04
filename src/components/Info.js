
import { useContext, useEffect } from 'react';
import { Context } from '../context/context'
import Typography from 'antd/es/typography'
import List from 'antd/es/list'
import { createFromIconfontCN } from '@ant-design/icons';
import { InlineIcon } from '@iconify/react';
import musicClefBass from '@iconify-icons/mdi/music-clef-bass';
import drumIcon from '@iconify-icons/la/drum';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2398042_9b3z0yk2zqe.js',
});

const { Title, Link, Paragraph, Text } = Typography;

export default function Info() {
  const { setSelectedMenuItem } = useContext(Context)

  useEffect(() => setSelectedMenuItem('info'), [setSelectedMenuItem])

  const pStyle = {
    fontSize: '1rem'
  }

  const progs = [
    {
      title: 'Pop',
      chords: 'I - V - vi - IV',
    },
    {
      title: 'Minor',
      chords: 'ii - ii - vi - vi',
    },
    {
      title: 'Ascending',
      chords: 'I - ii - iii - IV',
    },
    {
      title: 'Jazz',
      chords: 'ii - V - I - vi',
    }
  ]

  const StyledParagraph = ({ children }) => (
    <Paragraph style={pStyle}>
      {children}
    </Paragraph>
  )
  return (
    <div
      style={{ maxWidth: '1000px', margin: '0 auto' }}
    >
      <Title level={2}>About</Title>
      <StyledParagraph>
        Cake Pop is a fun and easy way to make music. Use keyboard, bass, and drum sounds to create loops of different lengths and with different chord progressions. Sign in and save your creations to listen to your creations later.
      </StyledParagraph>
      <StyledParagraph
        style={pStyle}
      >
        If you enjoy making music online, please also check out the{' '}
        <Link href="https://polyrhythmgenerator.netlify.app/">Polyrhythm Generator</Link>.
      </StyledParagraph>

      <Title level={2}>Controls</Title>

      <Title level={4}>Main Buttons</Title>
      <StyledParagraph>
        Click on buttons in the body of the loop to toggle that note or drum sound on and off. See what each button does below:
      </StyledParagraph>
      <StyledParagraph>
        <IconFont type="icon-piano" style={{ fontSize: '1.2rem' }} /> - Piano. The notes will be the chord tones.
      </StyledParagraph>
      <StyledParagraph>
        <InlineIcon style={{ fontSize: '1.2rem' }} icon={musicClefBass} /> - Bass. The notes will be the one and five of the chord.
      </StyledParagraph>
      <StyledParagraph>
        <IconFont type="icon-Cymbal" style={{ fontSize: '1.2rem' }} /> - Cymbal
      </StyledParagraph>
      <StyledParagraph>
        <InlineIcon style={{ fontSize: '1.2rem' }} icon={drumIcon} /> - Snare Drum
      </StyledParagraph>
      <StyledParagraph>
        <IconFont type="icon-Drum-" style={{ fontSize: '1.2rem' }} /> - Bass Drum
      </StyledParagraph>

      <Title level={4}>Tempo</Title>
      <StyledParagraph>
        Tempo is measured in BPM, and each button column represents an eighth note. The tempo must be between 50 and 320.
      </StyledParagraph>
      <Title level={4}>Length</Title>
      <StyledParagraph>
        The length is how moany eighth notes the song is. Each chord in the progression will last for at least one quarter of the song length.
      </StyledParagraph>
      <Title level={4}>Chord Progression</Title>
      <StyledParagraph>
        The dropdowns with roman numerals represent the chord for that section of the song. If you don't understand this, you do not have to change anything. If you want to plug something in, try an example progression:
      </StyledParagraph>
      <List
        dataSource={progs}
        renderItem={item =>
          <List.Item>
            <List.Item.Meta 
              title={item.title}
              description={<Text style={{color: '#FFFFFF'}}>{item.chords}</Text>}
            />
          </List.Item>
        }
        size="large"
        bordered
        style={{maxWidth: '500px'}}
      ></List>
    </div>
  )
}