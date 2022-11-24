<template>
    <a @click="$router.back()">
      <n-button strong secondary type="tertiary">← Zurück</n-button>
    </a>
    <n-space justify="space-between" align="center">
      <n-space align="center">
        <h1>{{ book.Buchtitel }}</h1>
      </n-space>
      <n-space>
        <n-button type="primary" @click="$router.push(`/book/edit/${route.params.id}`)">
          <template #icon>
            <n-icon :component="Edit" />
          </template>
          Bearbeiten
        </n-button>
        <n-button secondary type="error" @click="showModal = true">
          <template #icon>
            <n-icon :component="Delete" />
          </template>
          Löschen
        </n-button>
      </n-space>
    </n-space>

    <n-divider></n-divider>
    <section>
    <n-space class="infofieldcontainer">
      <div>
        <div>
          <n-space align="center">
            <n-icon size="24" :component="Person24Regular" />
            <h3>Autor</h3>
          </n-space>
          <n-tag :round='true' class="infofield">
            <template #icon>
              <n-icon :component="UserAvatarFilled" />
            </template>
            {{ book.Autor }}
          </n-tag>
        </div>
        <div>
          <n-space align="center">
            <n-icon size="24" :component="LocalLanguage24Filled" />
            <h3>Sprache</h3>
          </n-space>
          <p class="infofield">{{ book.Sprache
          }}</p>
        </div>
      </div>
      <div>
        <div>
          <n-space align="center">
            <n-icon size="24" :component="Book" />
            <h3>Seitenzahl</h3>
          </n-space>
          <p class="infofield">{{ book.Seitenzahl
          }}</p>
        </div>
        <div>
          <n-space align="center">
            <n-icon size="24" :component="BookReader" />
            <h3>Gelesen im Jahr</h3>
          </n-space>
          <p class="infofield">{{ book.Jahr
          }}</p>
        </div>
      </div>
    </n-space>
  </section>

    <section>
      <h3 v-if="book.BildUrl">Cover</h3>
      <n-image v-if="book.BildUrl" :src="book.BildUrl" width="200" />
    </section>
  
    <n-modal v-model:show="showModal">
      <n-card style="width: 600px" title="Modal" :bordered="false" size="huge" role="dialog" aria-modal="true">
        <template #header>Möchten Sie dieses Buch wirklich löschen?</template>
        Diese Aktion ist permanent und kann nicht rückgängig gemacht werden.
        <template #footer>
          <n-space justify="space-between">
            <n-button @click="showModal = false">Abbrechen</n-button>
            <n-button type="error" @click="services.delete('/library/' + bookId, book.BildUrl)">Löschen</n-button>
          </n-space>
        </template>
      </n-card>
    </n-modal>
  </template>
  
  <style scoped>
.infofield {
  margin-top: -4px;
  margin-left: 36px;
}

h3 {
  margin: 4px 0 12px 0;
}

.infofieldcontainer div:first-of-type {
  margin-right: 64px;
}

section {
  margin-bottom: 4em;
}
  </style>
  
  <script setup lang="ts">
  import { useMessage, NModal, NCard, NImage, NTag, NDivider, NSpace, NButton, NIcon } from 'naive-ui'
  import axios from 'axios'
  import { ref } from 'vue'
  import { useRoute } from 'vue-router'
  import { Services } from "../services/services";
  import Buch from "../interfaces/Buch"
  import { Edit, UserAvatarFilled, Delete, Book } from "@vicons/carbon";
  import { Person24Regular, LocalLanguage24Filled } from '@vicons/fluent'
  import { BookReader } from '@vicons/fa'
  
  const services = new Services()
  const route = useRoute()
  const message = useMessage()
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
  
  // show/hide delete modal
  const showModal = ref(false)
  
services.get(`/library/${bookId}`,null).then((response: any) => {
      book.value = response.data;
      console.log(book.value);
    });

  </script>