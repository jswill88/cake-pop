export default function ButtonLabel ({ beat, note, active }) {
  return (
    <span
      style={{
        boxSizing: 'border-box',
        backgroundColor: !beat ? 'pink'
          : active ? 'white' : 'lightblue',
        border: active ? '2px solid black' : 'none',
        width: '30px',
        height: '30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '.9em'
      }}
    >
      {note}
    </span>
  )
}