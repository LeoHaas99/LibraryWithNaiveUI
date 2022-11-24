<script setup lang="ts">
import Nav from './components/Nav.vue'
import { darkTheme, NConfigProvider, NMessageProvider } from 'naive-ui'
import { h, ref, Component } from 'vue'
import { RouterLink } from 'vue-router'
import { NImage, NSpace, NLayout, NLayoutSider, NIcon, NMenu, MenuOption, NLayoutContent } from 'naive-ui'
import { Person, Activity, Book, Add } from '@vicons/carbon'
import { useRouter} from 'vue-router'
let activeKey = ref<string | null>(null)
const router = useRouter()
setTimeout(() => {

    activeKey.value = String(router.currentRoute.value.name)
}, 1);

// render an icon in an NIcon wrapper
function renderIcon(icon: Component) {
    return () => h(NIcon, null, { default: () => h(icon) })
}


// states for nav

let collapsed = ref(true)


// menu options
const menuOptions: MenuOption[] = [
    {
        key: 'divider-1',
        type: 'divider'
    },
    {
        label: () =>
            h(
                RouterLink,
                { to: '/books' },
                { default: () => 'Bücher' }
            ),
        key: 'books',
        icon: renderIcon(Book)
    },
    {
        label: () =>
            h(
                RouterLink,
                { to: '/authors' },
                { default: () => 'Autoren' }
            ),
        key: 'authors',
        icon: renderIcon(Person)
    },
    {
        label: () =>
            h(
                RouterLink,
                { to: '/statistics' },
                { default: () => 'Statistiken' }
            ),
        key: 'statistics',
        icon: renderIcon(Activity)
    }
]
</script>

<template>
    <n-config-provider :theme="darkTheme">
      <n-message-provider>
        <n-layout hasSider>

          <n-layout-sider collapse-mode="width" show-trigger="arrow-circle" :collapsed="collapsed"
        :width="240" :collapsed-width="64" @collapse="collapsed = true" @expand="collapsed = false" bordered>
        <div class="image-container">
          <n-image preview-disabled src="/logo.svg" object-fit="contain" width="96" :collapsed-width="64" />
        </div>
        <n-menu v-model:value="activeKey" :collapsed="collapsed" :collapsed-width="64" :collapsed-icon-size="22"
          :options="menuOptions"></n-menu>
      </n-layout-sider>

<n-layout-content :class="collapsed ? 'collapsed' : ''" id="main-content">
  <RouterView />
</n-layout-content>

</n-layout>
</n-message-provider>
  </n-config-provider>
</template>

<style scoped>
.full-width {
  padding: 2rem 6rem;
}

.nlayout {
  width: 100%;
}

.n-layout-content {
  --body-padding: 64px;
  padding: var(--body-padding) var(--body-padding) var(--body-padding) calc(var(--body-padding) + 240px);
  transition: padding .3s;
}

.n-layout-content.collapsed {
  padding: var(--body-padding) var(--body-padding) var(--body-padding) calc(var(--body-padding) + 64px);
}

.n-space {
  z-index: 10;
}

.n-layout-sider .n-image {
  box-sizing: border-box;
  margin: 16px auto;
  padding: 16px 32px 0 32px;
  transition: padding .3s var(--n-bezier);
}

.image-container {
  text-align: center;
}

.n-layout-sider--collapsed .n-image {
  padding: 0 16px;
}

.n-space,
.n-layout-sider {
  position: fixed;
  top: 0;
  left: 0;
}

.n-menu {
  height: 100vh;
}
</style>
