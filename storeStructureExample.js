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
          channels: [9, 10, 11, 12, 13, 14, 15, 16, 17]
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
        },
        9: {
          channelNameId: 8,
    		  previous: [],
          current: '',
          next: [],
          after: ''
          id: 9
        },
        10: {
          channelNameId: 8,
    		  previous: [],
          current: '',
          next: [],
          after: ''
          id: 10
        },
        11: {
          channelNameId: 8,
    		  previous: [],
          current: '',
          next: [],
          after: ''
          id: 11
        },
        12: {
          channelNameId: 8,
    		  previous: [],
          current: '',
          next: [],
          after: ''
          id: 12
        },
        13: {
          channelNameId: 8,
    		  previous: [],
          current: '',
          next: [],
          after: ''
          id: 13
        },
        14: {
          channelNameId: 8,
    		  previous: [],
          current: '',
          next: [],
          after: ''
          id: 14
        },
        15: {
          channelNameId: 8,
    		  previous: [],
          current: '',
          next: [],
          after: ''
          id: 15
        },
        16: {
          channelNameId: 8,
    		  previous: [],
          current: '',
          next: [],
          after: ''
          id: 16
        },
        17: {
          channelNameId: 8,
    		  previous: [],
          current: '',
          next: [],
          after: ''
          id: 17
        },
      }
    },
    channelNames: {
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
      }
      allIds: [0, 1, 2, 3, 4, 5, 6, 7, 8]
    }
  }
}
