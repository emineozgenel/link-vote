import { shallowMount, mount } from '@vue/test-utils';
import Modal from '@/components/Modal.vue';

describe('Modal.vue', () => {
  it('test the content of the modal', () => {
    const wrapper = shallowMount(Modal, {
      propsData: {
        modalHeadline: 'Delete',
        deleteMessage: 'Vue.js'
      }
    })
    expect(wrapper.find('#modal-headline').text()).toBe('Delete')
    expect(wrapper.find('#modal-title').text()).toBe('Vue.js')
  });
  it('should render modal', () => {
    const wrapper = mount(Modal, {
      propsData: {
        modalHeadline: 'Delete',
        deleteMessage: 'Vue.js'
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  });
});