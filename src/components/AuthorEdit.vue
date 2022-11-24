<template>
    <main>
    <n-button strong secondary type="tertiary" @click="$router.back()">← Zurück</n-button>
  <h1>Autor erfassen</h1>
  <n-divider></n-divider>
<form >
    <n-form-item label="Autor">
        <n-input v-model:value="autor.Autor" type="text" />
    </n-form-item>
    
    <n-form-item>
      <n-button @click="services.editAuthor(autor)" type="info">
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
        import { useRoute } from 'vue-router'
        import type Autor from '../interfaces/Autor'
const route = useRoute()
let autorId = route.params.id
let autor = ref<Autor>({
    AutorId: -1,
    Autor: "",
    AnzahlBuecher: 0,
    AnzahlSeiten: 0,
    Schnitt: 0

  })
  let services = new Services()
services.get(`/authors/books/${autorId}`,null).then((response: any) => {
      autor.value = response.data;
      console.log(autor.value);
    });

const message = useMessage()
</script>
    <style>
        form{
            width:40%
        }
</style>