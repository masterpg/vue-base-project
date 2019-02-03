<style scoped>
@import '../../styles/placeholder/typography.css';

.title-text {
  @extend %comm-font-title;
}

.product-item,
.cart-item {
  padding: 12px;

  & .title {
    @extend %comm-font-subhead1;
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
  <div class="layout vertical" :class="{'comm-ma-48': f_pc, 'comm-ma-24': f_tab, 'comm-ma-12': f_sp}">
    <div>
      <div class="layout horizontal center">
        <div class="title-text">{{ $t('products') }}</div>
      </div>
      <hr style="width: 100%;" />
      <div v-for="product in m_allProducts" :key="product.id" class="layout horizontal center product-item">
        <div class="layout vertical center-justified">
          <div class="title">{{ product.title }}</div>
          <div class="detail">
            <span>{{ $t('price') }}</span> &mdash; {{ product.price | currency }},&nbsp; <span>{{ $t('stock') }}</span> &mdash;
            {{ product.inventory }}
          </div>
        </div>
        <div class="flex"></div>
        <paper-icon-button icon="icons:add-box" @click="m_addButtonOnClick(product)"></paper-icon-button>
      </div>
    </div>

    <div class="comm-mt-20">
      <div class="layout horizontal center">
        <div class="title-text">{{ $t('yourCurt') }}</div>
        <div class="flex"></div>
      </div>
      <hr style="width: 100%;" />
      <div v-for="cartItem in m_cartItems" :key="cartItem.id" class="layout horizontal center cart-item">
        <div class="layout vertical center-justified">
          <div class="title">{{ cartItem.title }}</div>
          <div class="detail">
            <span>{{ $t('price') }}</span> &mdash; {{ cartItem.price | currency }} x {{ cartItem.quantity }}
          </div>
        </div>
      </div>
      <div class="layout horizontal center">
        <div class="flex error-text">{{ m_status.message }}</div>
        <paper-button v-show="!m_cartIsEmpty" class="checkout-button" @click="m_checkout">{{ $t('checkout') }}</paper-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import '@polymer/paper-button/paper-button'
import '@polymer/paper-card/paper-card'
import '@polymer/paper-icon-button/paper-icon-button'

import {BaseComponent} from '@/base/component'
import {Component} from 'vue-property-decorator'
import {mixins} from 'vue-class-component'

import {namespace} from 'vuex-class'
import {CartTypes, CheckoutStatus, Product, ProductTypes} from '@/store'

const productModule = namespace(ProductTypes.PATH)
const cartModule = namespace(CartTypes.PATH)

@Component
export default class ShoppingView extends mixins(BaseComponent) {
  //----------------------------------------------------------------------
  //
  //  Store
  //
  //----------------------------------------------------------------------

  @productModule.Getter(ProductTypes.ALL_PRODUCTS) m_allProducts!: ProductTypes.allProducts

  @productModule.Action(ProductTypes.PULL_ALL_PRODUCTS) m_pullAllProducts!: ProductTypes.pullAllProducts

  @cartModule.Getter(CartTypes.CART_ITEMS) m_cartItems!: CartTypes.cartItems

  @cartModule.Getter(CartTypes.CHECKOUT_STATUS) m_checkoutStatus!: CartTypes.checkoutStatus

  @cartModule.Action(CartTypes.ADD_PRODUCT_TO_CART) m_addProductToCart!: CartTypes.addProductToCart

  @cartModule.Action(CartTypes.CHECKOUT) m_checkout!: CartTypes.checkout

  //----------------------------------------------------------------------
  //
  //  Variables
  //
  //----------------------------------------------------------------------

  get m_cartIsEmpty(): boolean {
    return this.m_cartItems.length === 0
  }

  get m_status(): {result: boolean; message: string} {
    const checkoutStatus = this.m_checkoutStatus
    const result = checkoutStatus === CheckoutStatus.None || checkoutStatus === CheckoutStatus.Successful
    return {
      result,
      message: result ? '' : 'Checkout failed.',
    }
  }

  //----------------------------------------------------------------------
  //
  //  Lifecycle hooks
  //
  //----------------------------------------------------------------------

  async created() {
    await this.m_pullAllProducts()
  }

  //----------------------------------------------------------------------
  //
  //  Event handlers
  //
  //----------------------------------------------------------------------

  async m_addButtonOnClick(product: Product): Promise<void> {
    await this.m_addProductToCart(product.id)
  }

  async m_checkoutButtonOnClick(): Promise<void> {
    await this.m_checkout()
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
