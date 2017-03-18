import axios from 'axios'
import qs from 'qs'

export const fetchHotVideos = subreddit => axios(`/${subreddit}/hot`)

export function fetchRisingVideos (subreddit) {
  return axios(`/${subreddit}/rising`)
}

export function fetchNewVideos (subreddit) {
  return axios(`/${subreddit}/hot`)
}

export function fetchTopOfDayVideos (subreddit) {
  return axios(`/${subreddit}/top/day`)
}

export function fetchTopOfWeekVideos (subreddit) {
  return axios(`/${subreddit}/top/week`)
}

export function fetchTopOfMonthVideos (subreddit) {
  return axios(`/${subreddit}/top/month`)
}

export function fetchTopOfYearVideos (subreddit) {
  return axios(`/${subreddit}/top/year`)
}

export function fetchTopOfAllTimeVideos (subreddit) {
  return axios(`/${subreddit}/top/all`)
}

export function authorize () {
  const url = 'https://www.reddit.com/api/v1/access_token'
  const data = qs.stringify({
    'device_id': 'DO_NOT_TRACK_THIS_DEVICE',
    'grant_type': 'https://oauth.reddit.com/grants/installed_client'
  })
  const options = {
    headers: {
      authorization: 'Basic MWVqUU8wU0swZzlpZnc6'
    }
  }

  return axios.post(url, data, options).then(response => response.data).catch(error => error)
}
