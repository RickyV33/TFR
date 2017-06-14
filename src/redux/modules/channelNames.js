export const channelNames = {
  byId: {
    0: {
      name: 'Hot',
      urlPath: 'hot',
      id: 0
    },
    1: {
      name: 'New',
      urlPath: 'new',
      id: 1
    },
    2: {
      name: 'Rising',
      urlPath: 'rising',
      id: 2
    },
    3: {
      name: 'Top of the Hour',
      urlPath: 'top/?sort=top&t=hour',
      id: 3
    },
    4: {
      name: 'Top of the Day',
      urlPath: 'top/?sort=top&t=day',
      id: 4
    },
    5: {
      name: 'Top of the Week',
      urlPath: 'top/?sort=top&t=week',
      id: 5
    },
    6: {
      name: 'Top of the Month',
      urlPath: 'top/?sort=top&t=month',
      id: 6
    },
    7: {
      name: 'Top of the Year',
      urlPath: 'top/?sort=top&t=year',
      id: 7
    },
    8: {
      name: 'Top of All Time',
      urlPath: 'top/?sort=top&t=all',
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
