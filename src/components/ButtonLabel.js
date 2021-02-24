import { InlineIcon } from '@iconify/react';
import musicClefTreble from '@iconify-icons/mdi/music-clef-treble';
import musicClefBass from '@iconify-icons/mdi/music-clef-bass';
import drumIcon from '@iconify-icons/la/drum';

export default function ButtonLabel ({ beat, note, active, noteRow }) {
  return (
    <div
      style={{
        // boxSizing: 'border-box',
        backgroundColor: !beat ? 'pink'
          : active ? 'white' : 'lightblue',
        border: active ? '2px solid black' : 'none',
        width: '100%',
        height: '100%',
        borderRadius:'50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // fontSize: '.7em'
      }}
    >
      <Icon noteRow={noteRow} />
    </div>
  )
}
function Icon({noteRow}) {
  switch (noteRow) {
    case 'high':
    case 'low':
    case 'mid':
      return <InlineIcon
        style={{ fontSize: '1rem' }}
        icon={musicClefTreble} />
    case 'bassHigh':
    case 'bassLow':
      return <InlineIcon
        style={{ fontSize: '1rem' }}
        icon={musicClefBass} />
    case 'bassDrum':
    case 'snareDrum':
    case 'cymbal':
      return <InlineIcon
        style={{ fontSize: '1rem' }}
        icon={drumIcon} />
    default:
      return null
  }
}