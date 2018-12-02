<style scoped>
@import '../styles/typography.css';

app-drawer-layout {
  --app-drawer-width: 256px;
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
      <app-drawer ref="drawer" slot="drawer" :swipe-open="m_narrow">
        <app-toolbar class="drawer-toolbar">
          <iron-icon src="assets/images/manifest/icon-48x48.png"></iron-icon>
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
      <paper-button v-show="m_swUpdateIsRequired" class="link-button" @click="m_reload">
        再読み込み
      </paper-button>
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

import * as sw from '../base/service-worker';
import { BaseComponent } from '../base/component';
import { Component } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';

@Component
export default class AppView extends mixins(BaseComponent) {
  //----------------------------------------------------------------------
  //
  //  Variables
  //
  //----------------------------------------------------------------------

  m_narrow: boolean = false;

  m_items: Array<{ title: string; path: string }> = [
    {
      title: 'ABC',
      path: '/abc',
    },
    {
      title: 'Shopping',
      path: '/shopping',
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
    this.m_swMessage = info.message;
    this.m_swUpdateIsRequired = info.state === sw.ChangeState.updateIsRequired;
    this.$nextTick(() => this.m_swToast.open());

    // tslint:disable-next-line
    console.log(info);
  }
}
</script>
