
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { NidApplicationSystemSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = NidApplicationSystemSDK.test()
    equal(testsdk instanceof NidApplicationSystemSDK, true,
      'NidApplicationSystemSDK.test() must return a client synchronously')
  })

})
