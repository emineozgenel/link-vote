import { mount } from '@vue/test-utils'
import Add from '@/views/Add.vue'

describe('Add.vue', () => {
  it('should render', () => {
    const wrapper = mount(Add)
    expect(wrapper.html()).toMatchSnapshot()
  });
})
