<template>
    <main>
    <n-button strong secondary type="tertiary" @click="$router.back()">← Zurück</n-button>
  <h1>Buch erfassen</h1>
  <n-divider></n-divider>
<form >
    <n-form-item label="Buchtitel">
        <n-input v-model:value="title" type="text" />
    </n-form-item>
    <n-form-item label="Autor">
        <n-select v-model:value="author" :options="authorOptions"/>
    </n-form-item>
    <n-form-item label="Seitenzahl">
        <n-input-number v-model:value="pages" clearable />
    </n-form-item>
    <n-form-item label="Sprache">
        <n-select v-model:value="language" :options="languageOptions" />
    </n-form-item>
    <n-form-item label="Bild">
      <n-upload accept=".jpeg,.jpg,.png,.gif,.webp" :max="1" name="image" action="http://localhost:5000/upload"
        @finish="fileUploaded" @remove="fileRemoved">
        <n-button>Bild hochladen</n-button>
      </n-upload>
    </n-form-item>
    <n-form-item>
      <n-button @click="services.createBook(title, author, pages, language, image)" type="primary">
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
import { Services } from "../services/services";
import { NButton, NDivider, NSpace, NInput, useMessage, NFormItem, NIcon, NUpload,
        NSelect, NInputNumber, NSwitch, NCheckbox,  FormInst, FormRules,
         UploadFileInfo, } from "naive-ui";
        import { Save as SaveIcon } from '@vicons/carbon'
        import type { OnFinish } from 'naive-ui/es/upload/src/interface'
        import axios from 'axios'
let image = ref()
let title = ref()
let author = ref()
let pages = ref()
let language = ref(1)
let authorOptions = ref([])
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

    // handle file uploaded
const fileUploaded: OnFinish = ({ file, event }: { file: UploadFileInfo, event?: ProgressEvent }) => {
  if (event != null) {
    image.value = JSON.parse((event?.target as XMLHttpRequest).response).path
  }
}

// handle file removed
function fileRemoved() {
  axios.delete(`http://localhost:5000/remove${image.value}`).then(res => {
    image.value = ''
  })
}
services.get("/authors", null).then((response: any) => {
      authors = response.data;
      authorOptions.value = response.data.map((d: any) => {
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