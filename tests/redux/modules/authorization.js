/* eslint-env mocha */

import { expect } from 'chai'
import authorization from '../../../src/redux/modules/authorization'

describe('authorization module', () => {
  describe('reducer function', () => {
    describe('SET_ACCESS_TOKEN type', () => {
      it('should return the accessToken with "FETCHED" status in state', () => {
        const initialState = {
          accessToken: '',
          fetchingStatus: 'FETCHING'
        }
        const payload = {
          type: 'TelevisionForReddit/authorization/SET_ACCESS_TOKEN',
          accessToken: '123'
        }
        const expected = {
          accessToken: '123',
          fetchingStatus: 'FETCHED'
        }
        expect(authorization(initialState, payload)).to.deep.equal(expected)
      })
    })
  })
})
