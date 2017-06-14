export const FETCHED = 'FETCHED'
export const FETCHING = 'FETCHING'

export function addToById (state, payload) {
  return {
    ...state,
    [payload.id]: {
      ...state[payload.id],
      ...payload
    }
  }
}

export function addToAllIds (state, id) {
  return [...state, id]
}
