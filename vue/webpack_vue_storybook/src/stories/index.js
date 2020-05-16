import { storiesOf } from '@storybook/vue'
import Modal from '../vue/components/Modal.vue'
import Thumbnail from '../vue/components/Thumbnail.vue'

storiesOf('UI', module)
  .add('Modal', () => ({
    components: { Modal },
    template: `<Modal/>`
  }))
  .add('Thumbnail', () => ({
    components: { Thumbnail },
    template: `<Thumbnail title="title0" inner-text="テキスト"></Thumbnail>`
  }))