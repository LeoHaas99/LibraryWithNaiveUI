<template>
    <main>
    <n-button strong secondary type="tertiary" @click="$router.back()">← Zurück</n-button>
  <h1>Buch bearbeiten</h1>
  <n-divider></n-divider>
<form >
    <n-form-item label="Buchtitel">
        <n-input v-model:value="book.Buchtitel" type="text" />
    </n-form-item>
    <n-form-item label="Autor">
        <n-select v-model:value="book.Autor" :options="authorOptions"/>
    </n-form-item>
    <n-form-item label="Seitenzahl">
        <n-input-number v-model:value="book.Seitenzahl" clearable />
    </n-form-item>
    <n-form-item label="Sprache">
        <n-select v-model:value="book.SpracheId" :options="languageOptions" />
    </n-form-item>
    <n-form-item label="Bild">
      <n-upload accept=".jpeg,.jpg,.png,.gif,.webp" :max="1" name="image" action="http://localhost:5000/upload"
        @finish="fileUploaded" @remove="fileRemoved"  v-model:file-list="imageList">
        <n-button>Bild hochladen</n-button>
      </n-upload>
    </n-form-item>
    <n-form-item>
      <n-button @click="services.editBook(book)">
        <template #icon>
          <n-icon>
            <SaveIcon />
          </n-icon>
        </template>
        Speichern
      </n-button>
    </n-form-item>
</form>  
    </main>

</template>
<script setup lang="ts">
import { defineComponent, ref } from "vue";
import { useRoute } from 'vue-router'
import { Services } from "../services/services";
import { NButton, NDivider, NSpace, NInput, useMessage, NFormItem, NIcon, NUpload,
        NSelect, NInputNumber, NSwitch, NCheckbox, FormInst, FormRules,
         UploadFileInfo, } from "naive-ui";
        import { Save as SaveIcon } from '@vicons/carbon'
        import type { OnFinish } from 'naive-ui/es/upload/src/interface'
        import axios from 'axios'
import Buch from "../interfaces/Buch";
let image = ref(null)
let title = ref(null)
let author = ref(null)
let pages = ref(null)
let language = ref(1)
let authorOptions = ref([])
const imageList = ref<UploadFileInfo[]>([])
let languageOptions = [
    {
        label: "Englisch",
        value: 1
    },
    {
        label: "Deutsch",
        value: 2
    }
]
let services = new Services()
let authors = ref([])
const message = useMessage()
const route = useRoute()
let bookId = route.params.id
let book = ref<Buch>({
    BuchId: -1,
    Buchtitel: "",
    AutorId: -1,
    Autor: "",
    Jahr: 0,
    Seitenzahl: 0,
    BildUrl: "",
    SpracheId: -1,
    Sprache: ""

  })


    services.get(`/library/${bookId}`,null).then((response: any) => {
      book.value = response.data;
      imageList.value = [{
    id: 'image',
    name: String(book.value.BildUrl.split('/').pop()),
    url: book.value.BildUrl,
    status: 'finished'
  }]
      console.log(book.value);
      console.log(imageList.value)
    });
    // handle file uploaded
const fileUploaded: OnFinish = ({ file, event }: { file: UploadFileInfo, event?: ProgressEvent }) => {
  if (event != null) {
    book.value.BildUrl = JSON.parse((event?.target as XMLHttpRequest).response).path
  }
}

// handle file removed
function fileRemoved() {
  console.log(book.value.BildUrl)

  book.value.BildUrl = book.value.BildUrl.replace("http://localhost:5000","")
  console.log(book.value.BildUrl)
  axios.delete(`http://localhost:5000/remove${book.value.BildUrl}`).then(res => {
    book.value.BildUrl = ''
  })
}
    services.get("/authors",null).then((response: any) => {
      authors = response.data;
      authorOptions.value = response.map((d: any) => {
    return {
      label: d.Autor,
      value: d.AutorId
    }
  })
    });

</script>
    <style>
        form{
            width:40%
        }
</style>