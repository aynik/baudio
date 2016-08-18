export function isToggle (action) {
  return !action.type.indexOf('TOGGLE')
}

export function toggle (type) {
  return { type: 'TOGGLE_' + type.toUpperCase(), target: type }
}
