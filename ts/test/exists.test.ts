
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { NidApplicationSystemSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await NidApplicationSystemSDK.test()
    equal(null !== testsdk, true)
  })

})
