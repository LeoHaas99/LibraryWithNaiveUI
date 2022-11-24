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
import { ComponentProps } from "./__VLS_types.js";
let services = new Services();
let loading = ref(true);
let books = ref([]);
const tableRef = ref()
let table = tableRef
function clearSorterAndFilter () {
    tableRef.value.sort(null)
    tableRef.value.filter(null)
    bookFilter.value = ''
    getBooks()
}
const years = [];
const d = new Date();
const thisYear = d.getFullYear();
for (let i = 2019; i <= Number(thisYear); i++) {
  years.push({
    label: String(i),
    value: i,
  });
}
let bookFilter = ref();
let count = ref()
function getFilteredBooks() {
  if (bookFilter.value) {
    loading.value = true;
    services
      .get("/library/filter/" + bookFilter.value, null)
      .then((response: any) => {
        books.value = response.data;
        count.value = books.value.length
        loading.value = false;
        console.log(books.value);
      });
  } else {
    getBooks()
  }
}
function getBooks(){
    loading.value = true;
    services.get("/library", null).then((response: any) => {
      books.value = response.data;
      count.value = books.value.length
      loading.value = false;
      console.log(books.value);
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
const columns:DataTableColumns<RowData> = [
  {
    title: "",
    key: "BuchId",
    sorter: "default",
    render: (row: RowData) => {
      return h("p", {}, "")
    }
  },
  {
    title: "Buchtitel",
    key: "Buchtitel",
    sorter: "default",
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
            onClick: () => {},
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
    title: "Seitenzahl",
    key: "Seitenzahl",
    sorter: "default",
  },
  {
    title: "Jahr",
    key: "Jahr",
    sorter: "default",
    defaultFilterOptionValues: [],
    filterOptions: years,
    filter(value: any, row: any) {
      return row.Jahr == value;
    },
  },
  {
    title: "Cover",
    key: "cover",
    render: (row: RowData) => {
      if (row.BildUrl) {
        return h(
          NImage,
          {
            width: "60",
            src: `${row.BildUrl}`,
            onClick: () => {},
            lazy: true,
          },
        );
      } else {
        return h("p", {}, "—");
      }
    },
  },{
    title: 'Details',
    key: 'details',
    render(row: RowData) {
      return h(
        RouterLink,
        {
          to: `/book/details/${row.BuchId}`
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
services.get("/library", null).then((response: any) => {
  books.value = response.data;
  count.value = books.value.length
  loading.value = false;
  console.log(books.value);
});
</script>
    
    <template>
  <main>
    <n-space justify="space-between" align="center">
      <h1>Bücher</h1>
      <router-link to="/book/new">
        <n-button type="primary">
          <template #icon>
            <n-icon :component="Add" />
          </template>
          Buch erfassen
        </n-button>
      </router-link>
    </n-space>
    <n-divider />
    <n-space justify="space-between" align="center">
      <n-space align="center">
      <n-form-item class="filter" label="Nach Buchtitel oder Autor filtern">
        <n-input
          clearable
          v-model:value="bookFilter"
          type="text"
          placeholder="Leo Tolstoi"
          id="bookFilter"
          name="bookFilter"
          @update:value="getFilteredBooks()"
        >
          <template #clear-icon>
            <n-icon :component="TrashCan" />
          </template>
        </n-input>
      </n-form-item>
      <p v-if="count>0">{{count}} Bücher</p>
    </n-space>
      <n-button dashed type="primary" @click="clearSorterAndFilter()">
          <template #icon>
            <n-icon :component="FilterReset" />
          </template>
          Filter zurücksetzten
        </n-button>
    </n-space>
    <n-data-table
      ref="table"
      :columns="columns"
      :data="books"
      size="large"
      :loading="loading"
    />
  </main>
</template>
    
    <style>
.filter {
  width: 400px;
}

</style>