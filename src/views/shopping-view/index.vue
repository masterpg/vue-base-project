<style scoped>
@import '../../styles/variables.pcss';
@import '../../styles/typography.pcss';

.title-text {
  @extend %comm-font-title;
}

.product-item,
.cart-item {
  padding: 12px;

  & .title {
    @extend %comm-font-subhead;
  }

  & .detail {
    @extend %comm-font-body1;
    color: var(--app-secondary-text-color);
  }
}

.error-text {
  @extend %comm-font-body1;
  color: var(--app-error-text-color);
}

.checkout-button {
  color: var(--app-link-color);
}
</style>

<template>
  <div class="layout vertical" :class="{ 'comm-ma-48': f_pc, 'comm-ma-24': f_tab, 'comm-ma-12': f_sp }">
    <div>
      <div class="layout horizontal center">
        <div class="title-text">{{ $t('products') }}</div>
      </div>
      <hr style="width: 100%;" />
      <div v-for="(product, index) in m_products" class="layout horizontal center product-item">
        <div class="layout vertical center-justified">
          <div class="title">{{ product.title }}</div>
          <div class="detail">
            <span>{{ $t('price') }}</span> &mdash; {{ product.price | currency }},&nbsp; <span>{{ $t('stock') }}</span> &mdash;
            {{ product.inventory }}
          </div>
        </div>
        <div class="flex"></div>
        <paper-icon-button icon="icons:add-box" @click="m_addProductToCart(product);"></paper-icon-button>
      </div>
    </div>

    <div class="comm-mt-20">
      <div class="layout horizontal center">
        <div class="title-text">{{ $t('yourCurt') }}</div>
        <div class="flex"></div>
      </div>
      <hr style="width: 100%;" />
      <div v-for="(cartItem, index) in m_cartItems" class="layout horizontal center cart-item">
        <div class="layout vertical center-justified">
          <div class="title">{{ cartItem.title }}</div>
          <div class="detail">
            <span>{{ $t('price') }}</span> &mdash; {{ cartItem.price | currency }} x {{ cartItem.quantity }}
          </div>
        </div>
      </div>
      <div class="layout horizontal center">
        <div class="flex error-text">{{ m_checkoutStatus.message }}</div>
        <paper-button v-show="!m_cartIsEmpty" class="checkout-button" @click="m_checkout">{{ $t('checkout') }}</paper-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import '@polymer/paper-button/paper-button';
import '@polymer/paper-card/paper-card';
import '@polymer/paper-icon-button/paper-icon-button';

import { BaseComponent } from '@/base/component';
import { CartItem, CheckoutStatus, Product } from '@/stores';
import { Component } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';

@Component
export default class ShoppingView extends mixins(BaseComponent) {
  //----------------------------------------------------------------------
  //
  //  Variables
  //
  //----------------------------------------------------------------------

  get m_cartIsEmpty(): boolean {
    return this.m_cartItems.length === 0;
  }

  get m_products(): Product[] {
    return this.$stores.product.allProducts;
  }

  get m_cartItems(): CartItem[] {
    return this.$stores.cart.cartItems;
  }

  get m_cartTotalPrice(): number {
    return this.$stores.cart.cartTotalPrice;
  }

  get m_checkoutStatus(): { result: boolean; message: string } {
    const result = this.$stores.cart.checkoutStatus === CheckoutStatus.None || this.$stores.cart.checkoutStatus === CheckoutStatus.Successful;
    return {
      result,
      message: result ? '' : 'Checkout failed.',
    };
  }

  //----------------------------------------------------------------------
  //
  //  Lifecycle hooks
  //
  //----------------------------------------------------------------------

  created() {}

  //----------------------------------------------------------------------
  //
  //  Internal methods
  //
  //----------------------------------------------------------------------

  m_addProductToCart(product: Product): void {
    this.$stores.cart.addProductToCart(product.id);
  }

  async m_checkout(): Promise<void> {
    await this.$stores.cart.checkout();
  }
}
</script>

<i18n>
en:
  products: "Products"
  yourCurt: "Your Curt"
  price: "Price"
  stock: "Stock"
  checkout: "Checkout"
ja:
  products: "商品一覧"
  yourCurt: "あなたのカート"
  price: "価格"
  stock: "在庫"
  checkout: "チェックアウト"
</i18n>
