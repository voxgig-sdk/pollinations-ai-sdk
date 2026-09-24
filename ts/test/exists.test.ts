
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { PollinationsAiSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = PollinationsAiSDK.test()
    equal(testsdk instanceof PollinationsAiSDK, true,
      'PollinationsAiSDK.test() must return a client synchronously')
  })

})
