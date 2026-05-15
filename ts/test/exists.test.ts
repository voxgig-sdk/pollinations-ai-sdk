
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { PollinationsAiSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await PollinationsAiSDK.test()
    equal(null !== testsdk, true)
  })

})
