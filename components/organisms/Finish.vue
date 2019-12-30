<template>
  <div>
    <!-- <Refine
      :display-criteria="bookCriteria"
      :default-criteria="defaultBookCriteria"
    />
    <br />
    <br /> -->
    <BookList :items="tsundokuData" flag="hoge" loading-flag="false" />
    <!-- <BookModal
      :dialog.sync="dialog"
      :item="item"
      title="積み本の編集"
      ok-emit-name="tsundokuOk"
      @tsundokuOk="editOk"
    />
    <RemoveModal
      :dialog.sync="removeDialog"
      :item="removeItem"
      remove-name="積み本"
      remove-emit-name="tsundokuRemove"
      @tsundokuRemove="remove"
    /> -->
  </div>
</template>
