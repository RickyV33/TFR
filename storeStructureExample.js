let store = {
  user: {
    currentNetworkId: 0,
    currentChannelId: 1 // will have to validate it exists within the current network's channels
  },
  entities: {
    videos: {
      byId: {
        0: {
          id: 0,
          domain: 'youtube.com',
          title: 'video title',
          url: 'youtube.com/url'
        }
      },
      fetchingStatus: 'FETCHED/FETCHING'
    },
    networks: {
      byId: {
        0: {
          id: 0,``
          name: 'videos',
          channels: [0, 1, 2, 3, 4, 5, 6, 7, 8] // then use these to grab the name for tabs
        },
        1: {
          id: 1,
          name: 'rickandmorty',
          channels: [9, ...]
        },
      }
      allIds: [0, 1]
    },
    //For every new network, create nine new networks that increment from the highest existing Id.
    // Should be dropped in a for loop and should match up with the existing channelNames
    channels: {
      byId: {
        0: {
          channelNameId: 0,
    		  previous: [],
          current: '',
          next: [],
          after: ''
          id: 0
        },
        1: {
          channelNameId: 1,
    		  previous: [],
          current: '',
          next: [],
          after: ''
          id: 1
        },
        2: {
          channelNameId: 2,
    		  previous: [],
          current: '',
          next: [],
          after: ''
          id: 2
        },
        3: {
          channelNameId: 3,
    		  previous: [],
          current: '',
          next: [],
          after: ''
          id: 3
        },
        4: {
          channelNameId: 4,
    		  previous: [],
          current: '',
          next: [],
          after: ''
          id: 4
        },
        5: {
          channelNameId: 5,
    		  previous: [],
          current: '',
          next: [],
          after: ''
          id: 5
        },
        6: {
          channelNameId: 6,
    		  previous: [],
          current: '',
          next: [],
          after: ''
          id: 6
        },
        7: {
          channelNameId: 7,
    		  previous: [],
          current: '',
          next: [],
          after: ''
          id: 7
        },
        8: {
          channelNameId: 8,
    		  previous: [],
          current: '',
          next: [],
          after: ''
          id: 8
        }
      }
    },
    channelNames: {
      byId: {
        0: {
          name: 'hot',
          url: 'hot',
          id: 0
        },
        1: {
          name: 'new',
          url: 'new',
          id: 1
        },
        2: {
          name: 'rising',
          url: 'rising',
          id: 2
        },
        3: {
          name: 'top of the hour',
          url: 'top/?sort=top&t=hour',
          id: 3
        },
        4: {
          name: 'top of the day',
          url: 'top/?sort=top&t=day',
          id: 4
        },
        5: {
          name: 'top of the week',
          url: 'top/?sort=top&t=week',
          id: 5
        },
        6: {
          name: 'top of the month',
          url: 'top/?sort=top&t=month',
          id: 6
        },
        7: {
          name: 'top of the year',
          url: 'top/?sort=top&t=year',
          id: 7
        },
        8: {
          name: 'top of all time',
          url: 'top/?sort=top&t=all',
          id: 8
        }
      }
      allIds: [0, 1, 2, 3, 4, 5, 6, 7, 8]
    }
  }
}
