export const channelNames = {
  byId: {
    0: {
      name: 'Hot',
      url: 'hot',
      id: 0
    },
    1: {
      name: 'New',
      url: 'new',
      id: 1
    },
    2: {
      name: 'Rising',
      url: 'rising',
      id: 2
    },
    3: {
      name: 'Top of the Hour',
      url: 'top/?sort=top&t=hour',
      id: 3
    },
    4: {
      name: 'Top of the Day',
      url: 'top/?sort=top&t=day',
      id: 4
    },
    5: {
      name: 'Top of the Week',
      url: 'top/?sort=top&t=week',
      id: 5
    },
    6: {
      name: 'Top of the Month',
      url: 'top/?sort=top&t=month',
      id: 6
    },
    7: {
      name: 'Top of the Year',
      url: 'top/?sort=top&t=year',
      id: 7
    },
    8: {
      name: 'Top of All Time',
      url: 'top/?sort=top&t=all',
      id: 8
    }
  },
  allIds: [0, 1, 2, 3, 4, 5, 6, 7, 8]
}

export default function reducer (state = channelNames, action) {
  switch (action.type) {
    default:
      return state
  }
}
