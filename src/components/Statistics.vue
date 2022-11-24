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
let years = ref<any>([]);
const tableRef = ref()
let table = tableRef
let book = ref([]);


// render an icon in a NIcon wrapper
function renderIcon(icon: Component, size: number = 24): Component {
  return () => h(NIcon, { size: size }, { default: () => h(icon) });
}
// sort bugs by creation date (new first)
function sortByAutor(a: RowData, b: RowData): number {
  return a.Autor.localeCompare(b.Autor);
}
const yearsColumns:DataTableColumns<RowData> = [
  {
    title: "Jahr",
    key: "Jahr",
    sorter: "default",
  },
  {
    title: "Anzahl Bücher",
    key: "Anzahl",
    sorter: "default",
  },
  {
    title: "Total Seiten",
    key: "TotalSeiten",
    sorter: (row1, row2) => row1.TotalSeiten - row2.TotalSeiten,
  },
  {
    title: "Ø Schnitt",
    key: "Schnitt",
    sorter: "default",
  },

];
let Jahr = ref("Total")
let Anzahl = ref(0)
let TotalSeiten = ref(0)
let Schnitt = ref(0)
services.get("/statistics/years", null).then((response: any) => {
  years.value = response.data;
  years.value.forEach((element: any) => {
    console.log(element.Anzahl)
    Anzahl.value+=element.Anzahl
    TotalSeiten.value+=Number(element.TotalSeiten)
    Schnitt.value+=element.Schnitt
  });
  years.value.push({
    Jahr: Jahr.value,
    Anzahl: Anzahl.value,
    TotalSeiten: TotalSeiten.value,
    Schnitt: Math.round(TotalSeiten.value/Anzahl.value)
  })
  loading.value = false;
  console.log(years.value);
});
const columns:DataTableColumns<RowData> = [
{
    title: "Buchtitel",
    key: "Buchtitel",
  },
  {
    title: "Autor",
    key: "Autor",
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
  },
  {
    title: "Jahr",
    key: "Jahr",

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
services.get("/library/last", null).then((response: any) => {
  book.value = response.data;
  loading.value = false;
  console.log(book.value);
});
</script>
    
    <template>
  <main>
    <n-space justify="space-between" align="center">
      <h1>Statistiken</h1>
      <n-space>
        <router-link to="/book/new" id="button">
        <n-button type="primary">
          <template #icon>
            <n-icon :component="Add" />
          </template>
          Buch erfassen
        </n-button>
      </router-link>
      <router-link to="/author/new">
        <n-button type="info">
          <template #icon>
            <n-icon :component="Add" />
          </template>
          Autor erfassen
        </n-button>
      </router-link>
      </n-space>
    </n-space>
    <n-divider />
    <h2>Letzter Eintrag</h2>
    <n-data-table
      ref="table"
      :columns="columns"
      :data="book"
      size="large"
      :loading="loading"
    />
    <n-divider />
    <h2>Jahr in Büchern</h2>
    <n-data-table
      ref="table"
      :columns="yearsColumns"
      :data="years"
      size="large"
      :loading="loading"
    />

  </main>
</template>
    
    <style>

</style>