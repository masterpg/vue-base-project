<style scoped>
@import './styles/variables.pcss';
@import './styles/typography.pcss';

app-drawer-layout {
  &:not([narrow]) [drawer-toggle] {
    display: none;
  }
}

.drawer-toolbar {
}

.content-toolbar {
  background-color: var(--comm-indigo-a200);
  color: #fff;
}

.drawer-list {
  & .item {
    display: block;
    padding: 8px 20px;
    @extend %comm-font-code1;
    color: var(--app-secondary-text-color);
    text-decoration: none;
  }

  & .item.router-link-active {
    color: var(--app-accent-text-color);
  }
}

.link-button {
  color: var(--comm-light-blue-a400);
}
</style>

<template>
  <div>
    <app-drawer-layout responsive-width="960px">
      <!-- Drawer content -->
      <app-drawer ref="drawer" slot="drawer" class="app-view-app-drawer" :swipe-open="m_narrow">
        <app-toolbar class="drawer-toolbar">
          <iron-icon src="img/icons/manifest/icon-48x48.png"></iron-icon>
          <div main-title class="comm-ml-8">Vue WWW Base</div>
        </app-toolbar>
        <div class="drawer-list">
          <template v-for="item in m_items">
            <router-link :to="item.path" class="item">{{ item.title }}</router-link>
          </template>
        </div>
      </app-drawer>

      <!-- Main content -->
      <app-toolbar class="content-toolbar">
        <paper-icon-button icon="menu" drawer-toggle></paper-icon-button>
        <div main-title>View name</div>
      </app-toolbar>

      <router-view />
    </app-drawer-layout>

    <paper-toast ref="swToast" :duration="m_swUpdateIsRequired ? 0 : 5000" :text="m_swMessage">
      <paper-button v-show="m_swUpdateIsRequired" class="link-button" @click="m_reload">{{ $t('reload') }}</paper-button>
    </paper-toast>
  </div>
</template>

<script lang="ts">
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout';
import '@polymer/app-layout/app-drawer/app-drawer';
import '@polymer/app-layout/app-header-layout/app-header-layout';
import '@polymer/app-layout/app-header/app-header';
import '@polymer/app-layout/app-toolbar/app-toolbar';
import '@polymer/iron-icon/iron-icon';
import '@polymer/iron-icons/iron-icons';
import '@polymer/iron-pages/iron-pages';
import '@polymer/iron-selector/iron-selector';
import '@polymer/paper-button/paper-button';
import '@polymer/paper-icon-button/paper-icon-button';
import '@polymer/paper-toast/paper-toast';

import * as sw from '@/base/service-worker';
import { BaseComponent } from '@/base/component';
import { Component } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';

@Component
export default class AppView extends mixins(BaseComponent) {
  //----------------------------------------------------------------------
  //
  //  Polymer style
  //
  //----------------------------------------------------------------------

  f_polymerStyle = `
    <style>
      .app-view-app-drawer {
        --app-drawer-content-container: {
          background-color: var(--comm-grey-100);
        }
      }

      @media (min-width: 600px) {
        .app-view-app-drawer {
          --app-drawer-content-container: {
            background-color: var(--comm-grey-100);
            border-right: 1px solid var(--comm-grey-300);
          }
        }
      }
    </style>
  `;

  //----------------------------------------------------------------------
  //
  //  Variables
  //
  //----------------------------------------------------------------------

  m_narrow: boolean = false;

  m_items: Array<{ title: string; path: string }> = [
    {
      title: 'ABC',
      path: '/pages/abc',
    },
    {
      title: 'Shopping',
      path: '/pages/shopping',
    },
  ];

  m_swMessage: string = '';

  m_swUpdateIsRequired: boolean = false;

  //--------------------------------------------------
  //  Elements
  //--------------------------------------------------

  get m_swToast(): { open: () => void } {
    return this.$refs.swToast as any;
  }

  //----------------------------------------------------------------------
  //
  //  Lifecycle hooks
  //
  //----------------------------------------------------------------------

  created() {
    sw.addStateChangeListener(this.m_swOnStateChange);
  }

  //----------------------------------------------------------------------
  //
  //  Internal methods
  //
  //----------------------------------------------------------------------

  m_reload(): void {
    window.location.reload();
  }

  //----------------------------------------------------------------------
  //
  //  Event handlers
  //
  //----------------------------------------------------------------------

  m_swOnStateChange(info: sw.StateChangeInfo) {
    this.m_swUpdateIsRequired = false;

    if (info.state === sw.ChangeState.updated) {
      this.m_swUpdateIsRequired = true;
      this.m_swMessage = info.message;
      this.$nextTick(() => this.m_swToast.open());
    } else if (info.state === sw.ChangeState.cached) {
      this.m_swMessage = info.message;
      this.$nextTick(() => this.m_swToast.open());
    }

    if (info.state === sw.ChangeState.error) {
      console.error(info.message);
    } else {
      // tslint:disable-next-line
      console.log('Service Worker:\n', info);
    }
  }
}
</script>

<i18n>
en:
  reload: "Reload"
ja:
  reload: "再読み込み"
</i18n>
