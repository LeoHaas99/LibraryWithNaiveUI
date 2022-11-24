<template>
    <main>
    <n-button strong secondary type="tertiary" @click="$router.back()">← Zurück</n-button>
  <h1>Autor erfassen</h1>
  <n-divider></n-divider>
<form >
    <n-form-item label="Autor">
        <n-input v-model:value="author" type="text" />
    </n-form-item>
    
    <n-form-item>
      <n-button @click="services.createAuthor(author)" type="info">
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

let author = ref()

let services = new Services()
const message = useMessage()
</script>
    <style>
        form{
            width:40%
        }
</style>