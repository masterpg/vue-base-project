<style lang="stylus" scoped>
  @import '../../assets/styles/_variables.styl';

  app-drawer-layout {
    --app-drawer-width: 256px;
    &:not([narrow]) [drawer-toggle] {
      display: none;
    }
  }

  .container {
    height 100%;
  }

  .drawer {
    width 256px;
    background-color: $app-grey-100;
    border-right: 1px solid $app-default-border-color;
    .main-title {
      @extend .app-font-title;
      @extend .app-pa-5;
      img {
        width: 24px;
        height: 24px;
      }
    }

    .list {
      .item {
        display: block;
        padding: $app-spacer-2  $app-spacer-5;
        @extend .app-font-code1;
        color: $app-secondary-text-color;
        text-decoration none;
        &.router-link-active {
          color: $app-accent-text-color;
        }
      }
    }
  }
</style>


<template>
  <div class="layout horizontal container">
    <!--
      Drawer content
    -->
    <div class="layout vertical drawer">
      <div class="layout horizontal center main-title">
        <img src="assets/images/manifest/icon-48x48.png"/>
        <div class="app-ml-2">Vue WWW Base</div>
      </div>
      <div class="flex list">
        <template v-for="item in items">
          <router-link :to="item.path" class="item">{{ item.title }}</router-link>
        </template>
      </div>
    </div>
    <!--
      Main content
    -->
    <div class="flex">
      <router-view/>
    </div>
  </div>
</template>


<script lang="ts">
import * as sw from '../service-worker';
import { Component } from 'vue-property-decorator';
import { ElementComponent } from '../components';
import { mixins } from 'vue-class-component';

@Component
export default class AppView extends mixins(ElementComponent) {
  //----------------------------------------------------------------------
  //
  //  Variables
  //
  //----------------------------------------------------------------------

  private items: Array<{ title: string; path: string }> = [
    {
      title: 'ABC',
      path: '/abc',
    },
    {
      title: 'Shopping',
      path: '/shopping',
    },
  ];

  //----------------------------------------------------------------------
  //
  //  Lifecycle hooks
  //
  //----------------------------------------------------------------------

  created() {
    sw.addStateChangeListener(this.swOnStateChange);

    // 商品一覧のロード
    this.$stores.product.getAllProducts();
  }

  //----------------------------------------------------------------------
  //
  //  Event handlers
  //
  //----------------------------------------------------------------------

  private swOnStateChange(info: sw.StateChangeInfo) {
    // tslint:disable-next-line
    console.log(info);
  }
}
</script>
