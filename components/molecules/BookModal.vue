<template>
  <Modal v-model="dialog" :closable="false" :mask-closable="false">
    <p slot="header" style="text-align:center">
      <span>{{ title }}</span>
    </p>
    <Form
      ref="formValidate"
      :model="formValidate"
      :rules="ruleValidate"
      :label-width="110"
      label="Name"
      prop="name"
    >
      <FormItem label="読書開始日" prop="readingStartDate">
        <DatePicker
          v-model="readingStartDate"
          type="date"
          placeholder="読書開始日"
          style="width: 200px"
        />
      </FormItem>
      <FormItem label="読書終了予定日" prop="readingEndExpectedDate">
        <DatePicker
          v-model="readingEndExpectedDate"
          type="date"
          placeholder="読書終了予定日"
          style="width: 200px"
        />
        <Tooltip max-width="200" content="読み終えられる日時を設定しましょう。">
          <Icon type="ios-information-circle-outline" />
        </Tooltip>
      </FormItem>
      <FormItem label="しおり" prop="title">
        <InputNumber v-model="currentPageCount" :max="10000" :min="0" />
        <Tooltip
          max-width="200"
          content="現在読み進めてるページ数を記録しましょう。"
        >
          <Icon type="ios-information-circle-outline" />
        </Tooltip>
      </FormItem>
      <FormItem label="総ページ数" prop="title">
        <InputNumber v-model="totalPageCount" :max="10000" :min="0" />
        <Tooltip
          max-width="200"
          content="総ページ数を登録することで、読了達成率が表示されます。"
        >
          <Icon type="ios-information-circle-outline" />
        </Tooltip>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button size="large" @click="cancel">
        キャンセル
      </Button>
      <Button
        type="primary"
        size="large"
        ghost
        @click="handleSubmit('formValidate')"
      >
        登録
      </Button>
    </div>
  </Modal>
</template>
<script>
import { fromTimeStampToDate } from '~/api/index'
export default {
  props: {
    okEmitName: {
      type: String,
      default: ''
    },
    dialog: {
      type: Boolean,
      default: false
    },
    item: {
      type: Object,
      default: () => ({})
    },
    title: {
      type: String,
      default: ''
    }
  },

  data: () => ({
    _totalPageCount: 0,
    formValidate: {
      readingStartDate: '',
      readingEndExpectedDate: '',
      currentPageCount: 0,
      item: []
    },
    ruleValidate: {
      readingStartDate: [
        {
          required: true,
          type: 'date',
          message: '読書開始日を選択してください。'
        }
      ],
      readingEndExpectedDate: [
        {
          required: true,
          type: 'date',
          message: '読書終了予定日を選択してください。'
        }
      ]
    }
  }),
  computed: {
    readingStartDate: {
      get() {
        if (this.item.readingStartDate) {
          return fromTimeStampToDate(this.item.readingStartDate)
        }
        return ''
      },
      set(readingStartDate) {
        this.formValidate.readingStartDate = readingStartDate
      }
    },
    readingEndExpectedDate: {
      get() {
        if (this.item.readingEndExpectedDate) {
          return fromTimeStampToDate(this.item.readingEndExpectedDate)
        }
        return ''
      },
      set(readingEndExpectedDate) {
        this.formValidate.readingEndExpectedDate = readingEndExpectedDate
      }
    },
    currentPageCount: {
      get() {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.formValidate.currentPageCount = this.item.currentPageCount || 0
        return this.item.currentPageCount || 0
      },
      set(currentPageCount) {
        this.formValidate.currentPageCount = currentPageCount
      }
    },
    totalPageCount: {
      get() {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.item.totalPageCount = this.item.totalPageCount
        return this.item.totalPageCount
      },
      set(totalPageCount) {
        this.item.totalPageCount = totalPageCount
      }
    }
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.item) {
            this.formValidate.item = this.item
          }
          this.$emit('update:dialog', false)
          this.$emit(this.okEmitName, this.formValidate)
        }
      })
      this.formValidateClear()
    },
    cancel() {
      this.$emit('update:dialog', false)
      this.formValidateClear()
    },
    formValidateClear() {
      this.formValidate.readingStartDate = ''
      this.formValidate.readingEndExpectedDate = ''
      this.formValidate.currentPageCount = 0
      this.formValidate.item = []
    }
  }
}
</script>
