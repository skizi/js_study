import { storiesOf } from '@storybook/vue'
import Modal from '../vue/components/Modal.vue'

storiesOf('Modal', module)
  .add('default', () => ({
    components: { Modal },
    template: `<Modal/>`
  }))