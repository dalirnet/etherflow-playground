import { mount } from '@vue/test-utils'
import TxnResult from '@/components/TxnResult.vue'

describe('TxnResult', () => {
    test('Is a Vue instance', () => {
        const wrapper = mount(TxnResult)
        expect(wrapper.vm).toBeTruthy()
    })
})
