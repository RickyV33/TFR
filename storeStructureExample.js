let store = {
  user: {
    currentNetworkId: '',
    currentChannelId: '' // has to be in the channels for the current network
  },
  entities: {
    videos: {
      byId: {}
    },
    networks: {
      byId: {
        0: {
          name: 'videos',
          channels: [0, 1, 2], // then use these to grab the name for tabs
          lastChannel: '',
          id: 0
        },
        1: {
          name: 'rickandmorty',
          channels: [],
          lastChannel: '',
          id: 1
        },
      }
    },
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
      }
    }
    channelNames: {
      byId: {
        0: {
          name: 'hot',
          id: 0
        },
        1: {
          name: 'new',
          id: 1
        },
        2: {
          name: 'rising',
          id: 2
        }
      }
    }
  }
}
