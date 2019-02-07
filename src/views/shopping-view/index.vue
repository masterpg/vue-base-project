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
      <div v-for="product in allProducts" :key="product.id" class="layout horizontal center product-item">
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
      <div v-for="cartItem in cartItems" :key="cartItem.id" class="layout horizontal center cart-item">
        <div class="layout vertical center-justified">
          <div class="title">{{ cartItem.title }}</div>
          <div class="detail">
            <span>{{ $t('price') }}</span> &mdash; {{ cartItem.price | currency }} x {{ cartItem.quantity }}
          </div>
        </div>
      </div>
      <div class="layout horizontal center">
        <div class="flex error-text">{{ m_checkoutStatus.message }}</div>
        <paper-button v-show="!m_cartIsEmpty" class="checkout-button" @click="m_checkoutButtonOnClick">{{ $t('checkout') }}</paper-button>
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

import {mapActions, mapGetters, mapMutations} from 'vuex'
import {CartTypes, CheckoutStatus, Product, ProductTypes} from '@/store'

@Component({
  computed: {
    ...mapGetters(ProductTypes.PATH, [ProductTypes.ALL_PRODUCTS]),
    ...mapGetters(CartTypes.PATH, [CartTypes.CART_ITEMS, CartTypes.CHECKOUT_STATUS]),
  },
  methods: {
    ...mapActions(CartTypes.PATH, [CartTypes.ADD_PRODUCT_TO_CART, CartTypes.CHECKOUT]),
  },
})
export default class ShoppingView extends mixins(BaseComponent) {
  //----------------------------------------------------------------------
  //
  //  Store
  //
  //----------------------------------------------------------------------

  allProducts!: ProductTypes.allProducts

  cartItems!: CartTypes.cartItems

  checkoutStatus!: CartTypes.checkoutStatus

  addProductToCart!: CartTypes.addProductToCart

  checkout!: CartTypes.checkout

  //----------------------------------------------------------------------
  //
  //  Variables
  //
  //----------------------------------------------------------------------

  get m_cartIsEmpty(): boolean {
    return this.cartItems.length === 0
  }

  get m_checkoutStatus(): {result: boolean; message: string} {
    const checkoutStatus = this.checkoutStatus
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

  created() {}

  //----------------------------------------------------------------------
  //
  //  Event handlers
  //
  //----------------------------------------------------------------------

  async m_addButtonOnClick(product: Product): Promise<void> {
    await this.addProductToCart(product.id)
  }

  async m_checkoutButtonOnClick(): Promise<void> {
    await this.checkout()
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
