const SplitTakeAway = (note:string, sperator = ',') => {
  const isTakeAway = note.includes('TAKE AWAY')
  let getNote = note === 'TAKE AWAY' ? ' ' : note
  if (isTakeAway) {
    getNote = getNote.slice(note.indexOf(sperator) + 1).trim()
  }

  return {
    isTakeAway,
    getNote
  }
}

export default SplitTakeAway
