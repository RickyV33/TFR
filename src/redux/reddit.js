import axios from 'axios'
import qs from 'qs'

import configureStore from './configureStore'

const normalize = (accum, video) => {
  accum.mappedToId[video.id] = video
  accum.sortedById.push(video.id)
  return accum
}

const request = (path, accessToken) => {
  const redditUrl = 'https://oauth.reddit.com/r/'
  const options = {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  }

  return axios(`${redditUrl}${path}`, options).then(response => {
    const initialValue = { mappedToId: {}, sortedById: [] }
    return response.data.data.children
      .map(entry => entry.data)
      .filter(video => video.domain.match(/^(youtube.com|youtu.be)$/))
      .reduce(normalize, initialValue)
  }).catch(error => { console.error('request -> ', error) })
}

export const fetchHotVideos = (subreddit, accessToken) => {
  return request(`${subreddit}/hot`, accessToken)
}

export const fetchRisingVideos = (subreddit, accessToken) => {
  return request(`${subreddit}/rising`, accessToken)
}

export const fetchNewVideos = (subreddit, accessToken) => {
  return request(`${subreddit}/new`, accessToken)
}

export const fetchTopOfDayVideos = (subreddit, accessToken) => {
  return request(`${subreddit}/top/day`, accessToken)
}

export const fetchTopOfWeekVideos = (subreddit, accessToken) => {
  return request(`${subreddit}/top/week`, accessToken)
}

export const fetchTopOfMonthVideos = (subreddit, accessToken) => {
  return request(`${subreddit}/top/month`, accessToken)
}

export const fetchTopOfYearVideos = (subreddit, accessToken) => {
  return request(`${subreddit}/top/year`, accessToken)
}

export const fetchTopOfAllTimeVideos = (subreddit, accessToken) => {
  return request(`${subreddit}/top/all`, accessToken)
}

export function authorize () {
  const url = 'https://www.reddit.com/api/v1/access_token'
  const data = qs.stringify({
    'device_id': 'DO_NOT_TRACK_THIS_DEVICE',
    'grant_type': 'https://oauth.reddit.com/grants/installed_client'
  })
  const options = {
    headers: {
      // Basic (ClientId + SecretId) -> SecretId is empty string
      Authorization: 'Basic MWVqUU8wU0swZzlpZnc6'
    }
  }

  return axios.post(url, data, options).then(response => response.data).catch(error => error)
}
