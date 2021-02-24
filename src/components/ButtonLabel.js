export default function ButtonLabel ({ beat, note, active }) {
  return (
    <div
      style={{
        boxSizing: 'border-box',
        backgroundColor: !beat.length ? 'pink'
          : active ? 'white' : 'lightblue',
        border: active ? '2px solid black' : 'none',
        width: '100%',
        height: '100%',
        borderRadius:'50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '.7em'
      }}
    >
      {note}
    </div>
  )
}