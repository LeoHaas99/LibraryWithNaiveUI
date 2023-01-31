<script setup lang="ts">
import {
  NButton,
  NDivider,
  NFormItem,
  NSelect,
  NDataTable,
  NTag,
  NIcon,
  NSwitch,
  NTooltip,
  NSpace,
  NPagination,
  NImage,
  DataTableColumns,
  NInput,
} from "naive-ui";
import { Add, UserAvatarFilled, TrashCan, FilterReset } from "@vicons/carbon";
import { BookOpen } from "@vicons/fa"
import { h, ref, Component } from "vue";
import type {
  RowData,
  TableColumn,
} from "naive-ui/es/data-table/src/interface";
import { RouterLink } from 'vue-router'
import { Services } from "../services/services";
import Buch from "../interfaces/Buch";
let services = new Services();
let loading = ref(true);
let authors = ref([]);
const tableRef = ref()
let table = tableRef

const currentPage = ref(1)
const pageCount = ref(1)

function clearSorterAndFilter() {
  tableRef.value.sort(null)
  tableRef.value.filter(null)
  authorFilter.value = ''
  getAuthors()
}

let authorFilter = ref();
let count = ref()
function getFilteredAuthors() {
  if (authorFilter.value) {
    loading.value = true;
    let params = {
    page: currentPage.value
  }
    services
      .get("/authors/books/filter/" + authorFilter.value, params)
      .then((response: any) => {
        authors.value = response.data;
        pageCount.value = response.meta.pageCount
        count.value = authors.value.length
        loading.value = false;
        console.log(authors.value);
      });
  } else {
    getAuthors()
  }
}
function getAuthors() {
  let params = {
    page: currentPage.value
  }
  loading.value = true;
  services.get("/authors/books", params).then((response: any) => {
    authors.value = response.data;
    pageCount.value = response.meta.pageCount
    loading.value = false;
    console.log(authors.value);
  });
}

// render an icon in a NIcon wrapper
function renderIcon(icon: Component, size: number = 24): Component {
  return () => h(NIcon, { size: size }, { default: () => h(icon) });
}
// sort bugs by creation date (new first)
function sortByAutor(a: RowData, b: RowData): number {
  return a.Autor.localeCompare(b.Autor);
}
const columns: DataTableColumns<RowData> = [
  {
    title: "",
    key: "AutorId",
    sorter: "default",
    render: (row: RowData) => {
      return h("p", {}, "")
    }
  },
  {
    title: "Autor",
    key: "Autor",
    sorter: sortByAutor,
    render: (row: RowData) => {
      if (row.Autor) {
        return h(
          NTag,
          {
            class: "user",
            round: true,
            onClick: () => { },
          },
          {
            default: () => row.Autor,
            avatar: renderIcon(UserAvatarFilled, 22),
          }
        );
      } else {
        return h("p", {}, "—");
      }
    },
  },
  {
    title: "Anzahl gelesener Bücher",
    key: "AnzahlBuecher",
    sorter: "default",

  },
  {
    title: "Anzahl Seiten",
    key: "AnzahlSeiten",
    sorter: (row1, row2) => row1.AnzahlSeiten - row2.AnzahlSeiten,
    render:(row: RowData)=>{
      if(row.AnzahlSeiten){
        return h("p", {}, row.AnzahlSeiten)
      }
      else{
        return h("p", {}, '0')
      }
    }
  },
  {
    title: "Ø Schnitt",
    key: "Schnitt",
    sorter: (row1, row2) => row1.Schnitt - row2.Schnitt,
    render:(row: RowData)=>{
      if(row.Schnitt){
        return h("p", {}, row.Schnitt)
      }
      else{
        return h("p", {}, '0')
      }
    }
  },
  {
    title: 'Details',
    key: 'details',
    render(row: RowData) {
      return h(
        RouterLink,
        {
          to: `/author/details/${row.AutorId}`
        },
        {
          default: () => h(NButton,
            {

            },
            { icon: renderIcon(BookOpen) }
          )
        }
      )
    }
  }
];
getAuthors()
function Test(){
  console.log("Poop")
}
</script>
    
<template>
  <main>
    <n-space justify="space-between" align="center">
      <h1>Autoren</h1>
      <router-link to="/author/new">
        <n-button type="info">
          <template #icon>
            <n-icon :component="Add" />
          </template>
          Autor erfassen
        </n-button>
      </router-link>
    </n-space>
    <n-divider />
    <n-space justify="space-between" align="center">
      <n-space align="center">
      <n-form-item class="filter" label="Nach Autor filtern">
        <n-input clearable v-model:value="authorFilter" type="text" placeholder="Leo Tolstoi" id="bookFilter"
          name="bookFilter" @update:value="getFilteredAuthors()">
          <template #clear-icon>
            <n-icon :component="TrashCan" />
          </template>
        </n-input>
      </n-form-item>
    </n-space>
      <n-button dashed type="info" @click="clearSorterAndFilter()">
        <template #icon>
          <n-icon :component="FilterReset" />
        </template>
        Filter zurücksetzten
      </n-button>
    </n-space>
    <n-data-table ref="table" :columns="columns" :data="authors" size="large" :loading="loading" id="table" />
    <n-space justify="space-around">
      <n-pagination v-model:page="currentPage" :page-count="pageCount" @update:page="getFilteredAuthors"/>
    </n-space>
  </main>
</template>
    
<style>
.filter {
  width: 400px;
}

.n-pagination {
  margin-top: 32px;
}
</style>