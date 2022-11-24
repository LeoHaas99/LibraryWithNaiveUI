<template>
    <a @click="$router.back()">
      <n-button strong secondary type="tertiary">← Zurück</n-button>
    </a>
    <n-space justify="space-between" align="center">
      <n-space align="center">
        <h1>{{ autor.Autor }}</h1>
      </n-space>
      <n-space>
        <n-button type="info" @click="$router.push(`/author/edit/${route.params.id}`)">
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
            <n-icon size="24" :component="Book" />
            <h3>Anzahl gelesener Bücher</h3>
          </n-space>
          <p class="infofield">{{ autor.AnzahlBuecher
          }} Bücher</p>
        </div>
        <div v-if="autor.AnzahlSeiten">
          <n-space align="center">
            <n-icon size="24" :component="DocumentOnePage20Regular" />
            <h3>Anzahl Seiten</h3>
          </n-space>
          <p class="infofield">{{ autor.AnzahlSeiten
          }} Seiten</p>
        </div>
      </div>
      <div>
        <div v-if="autor.Schnitt">
          <n-space align="center">
            <n-icon size="24" :component="ChartAverage" />
            <h3>Durchschnittliche Seitenanzahl</h3>
          </n-space>
          <p class="infofield">{{ autor.Schnitt
          }} Seiten</p>
        </div>

      </div>
    </n-space>
  </section>

  
    <n-modal v-model:show="showModal">
      <n-card style="width: 600px" title="Modal" :bordered="false" size="huge" role="dialog" aria-modal="true">
        <template #header>Möchten Sie diesen Bug wirklich löschen?</template>
        Diese Aktion ist permanent und kann nicht rückgängig gemacht werden.
        <template #footer>
          <n-space justify="space-between">
            <n-button @click="showModal = false">Abbrechen</n-button>
            <n-button type="error" @click="services.delete('/authors/' + autorId, null)">Löschen</n-button>
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
  import { Edit, UserAvatarFilled, Delete, ChartAverage } from "@vicons/carbon";
  import { Person24Regular, LocalLanguage24Filled, DocumentOnePage20Regular } from '@vicons/fluent'
  import { BookReader, Book } from '@vicons/fa'
  import type Autor from '../interfaces/Autor'
  const services = new Services()
  const route = useRoute()
  const message = useMessage()
  let autorId = route.params.id
  let autor = ref<Autor>({
    AutorId: -1,
    Autor: "",
    AnzahlBuecher: 0,
    AnzahlSeiten: 0,
    Schnitt: 0

  })
  
  // show/hide delete modal
  const showModal = ref(false)
  
services.get(`/authors/books/${autorId}`,null).then((response: any) => {
      autor.value = response.data;
      console.log(autor.value);
    });

  </script>