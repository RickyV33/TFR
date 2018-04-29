/* eslint-env mocha */
import chai, { expect } from 'chai'
import dirtyChai from 'dirty-chai'
import rewire from 'rewire'
import sinon from 'sinon'

import authorization, { getAccessToken } from '../../../src/redux/modules/authorization'
import * as reddit from '../../../src/redux/reddit'
import { FETCHED, FETCHING } from '../../../src/redux/modules/entityHelper'

chai.use(dirtyChai)

describe('authorization module', () => {
  let authorizationRewire = rewire('../../../src/redux/modules/authorization')
  describe('reducer function', () => {
    describe('Default type', () => {
      it('should return the same payload with a "FETCHED" status', () => {
        const accessToken = ''
        const initialState = {
          accessToken,
          fetchingStatus: FETCHING
        }
        const payload = {
          type: 'type that does not exist'
        }
        expect(authorization(initialState, payload)).to.deep.equal(initialState)
      })
    })
    describe('SET_ACCESS_TOKEN type', () => {
      it('should return the accessToken with a "FETCHED" status', () => {
        const accessToken = '123-abc'
        const initialState = {
          accessToken: '',
          fetchingStatus: FETCHING
        }
        const payload = {
          type: authorizationRewire.__get__('SET_ACCESS_TOKEN'),
          accessToken
        }
        const expected = {
          accessToken,
          fetchingStatus: FETCHED
        }
        expect(authorization(initialState, payload)).to.deep.equal(expected)
      })
    })
    describe('FETCHING_ACCESS_TOKEN type', () => {
      it('should return the same payload with a "FETCHING" status', () => {
        const accessToken = ''
        const initialState = {
          accessToken,
          fetchingStatus: FETCHED
        }
        const payload = {
          type: authorizationRewire.__get__('FETCHING_ACCESS_TOKEN')
        }
        const expected = {
          accessToken,
          fetchingStatus: FETCHING
        }
        expect(authorization(initialState, payload)).to.deep.equal(expected)
      })
    })
    describe('FETCHED_ACCESS_TOKEN type', () => {
      it('should return the same payload with a "FETCHED" status', () => {
        const accessToken = ''
        const initialState = {
          accessToken,
          fetchingStatus: FETCHING
        }
        const payload = {
          type: authorizationRewire.__get__('FETCHED_ACCESS_TOKEN')
        }
        const expected = {
          accessToken,
          fetchingStatus: FETCHED
        }
        expect(authorization(initialState, payload)).to.deep.equal(expected)
      })
    })
  })
  describe('getAccessToken thunk', () => {
    let authorizeStub
    afterEach(() => {
      authorizeStub.restore()
    })
    it('should set the access token and status when successful', done => {
      const accessToken = 'abc-123'
      authorizeStub = sinon.stub(reddit, 'authorize').resolves({ access_token: accessToken })
      const dispatchSpy = sinon.spy()
      getAccessToken()(dispatchSpy)
        .then(() => {
          expect(dispatchSpy.calledWith({
            type: authorizationRewire.__get__('FETCHING_ACCESS_TOKEN')
          })).to.be.true()
          expect(dispatchSpy.calledWith({
            type: authorizationRewire.__get__('SET_ACCESS_TOKEN'),
            accessToken
          })).to.be.true()
          expect(dispatchSpy.calledWith({
            type: authorizationRewire.__get__('FETCHED_ACCESS_TOKEN')
          })).to.be.true()
          authorizeStub.restore()
          done()
        })
    })
    it('should not set the access token when an error occurs', done => {
      authorizeStub = sinon.stub(reddit, 'authorize').rejects()
      const dispatchSpy = sinon.spy()
      const consoleError = console.error
      console.error = () => {}
      getAccessToken()(dispatchSpy)
        .then(() => {
          expect(dispatchSpy.calledWith({
            type: authorizationRewire.__get__('FETCHING_ACCESS_TOKEN')
          })).to.be.true()
          expect(dispatchSpy.calledWith({
            type: authorizationRewire.__get__('FETCHED_ACCESS_TOKEN')
          })).to.be.true()
          console.error = consoleError
          done()
        })
    })
  })
})
