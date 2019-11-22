<template>
  <Card>
    <Form
      ref="formValidate"
      :model="formValidate"
      :rules="ruleValidate"
      :label-width="80"
      label="Name"
      prop="name"
    >
      <FormItem label="タイトル" prop="title">
        <Input v-model="formValidate.title" placeholder="タイトルを入力" />
      </FormItem>
      <FormItem label="著者" prop="author">
        <Input v-model="formValidate.mail" placeholder="著者を入力" />
      </FormItem>
      <FormItem label="出版社" prop="publisher">
        <Input placeholder="出版社を入力" />
      </FormItem>
      <FormItem label="分類" prop="bookStatus">
        <RadioGroup v-model="formValidate.bookStatus">
          <Radio label="tsundoku">
            積み本
          </Radio>
          <Radio label="wishlist">
            気になる本
          </Radio>
        </RadioGroup>
      </FormItem>
      <FormItem v-if="formValidate.bookStatus == 'tsundoku'" label="読書期間">
        <Row>
          <i-col :xs="{ span: 24 }" :lg="{ span: 6 }">
            <FormItem prop="readingStartDate">
              <DatePicker
                v-model="formValidate.readingStartDate"
                type="date"
                placeholder="読書開始日"
              />
            </FormItem>
          </i-col>
          <i-col :xs="{ span: 24 }" :lg="{ span: 6 }">
            <FormItem prop="readingEndDate">
              <DatePicker
                v-model="formValidate.readingEndDate"
                type="date"
                placeholder="読書終了予定日"
              />
              <Tooltip
                max-width="200"
                content="読み終えられる日時を設定しましょう。"
              >
                <Icon type="ios-information-circle-outline" />
              </Tooltip>
            </FormItem>
          </i-col>
        </Row>
      </FormItem>
      <FormItem v-if="formValidate.bookStatus == 'tsundoku'" label="ページ記録">
        <Row>
          <i-col :xs="{ span: 24 }" :lg="{ span: 6 }">
            <span>しおり</span>
            <InputNumber
              v-model="formValidate.currentPageCount"
              placeholder="しおり"
              size="small"
            />
            <Tooltip
              max-width="200"
              content="現在読み進めてるページ数を記録しましょう。"
            >
              <Icon type="ios-information-circle-outline" />
            </Tooltip>
          </i-col>
          <i-col :xs="{ span: 0 }" :lg="{ span: 0 }" style="text-align: center">
            <Divider type="vertical" />
          </i-col>
          <i-col :xs="{ span: 24 }" :lg="{ span: 6 }">
            <span>総ページ数</span>
            <InputNumber
              v-model="formValidate.totalPageCount"
              placeholder="総ページ数"
              size="small"
            />
            <Tooltip
              max-width="200"
              content="総ページ数を登録することで、読了達成率が表示されます。"
            >
              <Icon type="ios-information-circle-outline" />
            </Tooltip>
          </i-col>
        </Row>
      </FormItem>
      <FormItem label="メモ" prop="desc">
        <i-input
          v-model="formValidate.desc"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 5 }"
          placeholder="メモを入力"
        />
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formValidate')">
          登録
        </Button>
      </FormItem>
    </Form>
  </Card>
</template>
<script>
export default {
  props: {
    okEmitName: {
      type: String,
      default: ''
    }
  },

  data: () => ({
    formValidate: {
      title: '',
      author: '',
      publisher: '',
      bookStatus: '',
      readingStartDate: '',
      readingEndDate: '',
      currentPageCount: 0,
      totalPageCount: 0,
      desc: ''
    },

    ruleValidate: {
      title: [
        { required: true, message: 'タイトルは必須です。', trigger: 'blur' },
        { type: 'string', max: 100, message: '100文字以下にしてください。' }
      ],
      author: [
        { required: false, trigger: 'blur' },
        { type: 'string', max: 100, message: '100文字以下にしてください。' }
      ],
      publisher: [
        { required: false, trigger: 'change' },
        { type: 'string', max: 100, message: '100文字以下にしてください。' }
      ],
      bookStatus: [
        {
          required: true,
          message: '『積み本』か『気になる本』を選択してください。',
          trigger: 'change'
        }
      ],
      readingStartDate: [
        {
          required: true,
          type: 'date',
          message: '読書開始日を選択してください。',
          trigger: 'change'
        }
      ],
      readingEndDate: [
        {
          required: true,
          type: 'date',
          message: '読書終了予定日を選択してください。',
          trigger: 'change'
        }
      ],
      desc: [
        { required: false, trigger: 'blur' },
        {
          type: 'string',
          max: 200,
          message: '200文字以下にしてください。',
          trigger: 'blur'
        }
      ]
    }
  }),

  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success('Success!')
          this.$emit(this.okEmitName, this.formValidate)
        } else {
          this.$Message.error('Fail!')
        }
      })
    }
  }
}
</script>
