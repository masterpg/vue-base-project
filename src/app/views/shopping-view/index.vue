<style lang="stylus" scoped>
  @import '../../../assets/styles/_variables.styl';

  .title-text {
    @extend .app-font-title;
  }

  .product-item {
    @extend .app-pa-3;

    &.iron-selected {
      background-color: $app-grid-selected-activ-item;
    }

    .title {
      @extend .app-font-subhead;
    }

    .detail {
      @extend .app-font-body1;
      color: $app-secondary-text-color;
    }
  }

  .error-text {
    @extend .app-font-body1;
    color: $app-error-text-color;
  }
</style>


<template>
  <div class="layout vertical" :class="{ 'app-ma-12': pc, 'app-ma-6': tab, 'app-ma-3': sp }">

    <div>
      <div class="layout horizontal center">
        <div class="title-text">Products</div>
      </div>
      <hr style="width: 100%;">
      <div
        v-for="(product, index) in products"
        class="layout horizontal center product-item"
      >
        <div class="layout vertical center-justified">
          <div class="title">{{ product.title }}</div>
          <div class="detail">
            <span>Price</span> &mdash; {{ product.price | currency }},&nbsp;
            <span>Stock</span> &mdash; {{ product.inventory }}
          </div>
        </div>
        <div class="flex"></div>
        <button @click="addProductToCart(product)">＋</button>
      </div>
    </div>

    <div class="app-mt-5">
      <div class="layout horizontal center">
        <div class="title-text">Your Cart</div>
        <div class="flex"></div>
      </div>
      <hr style="width: 100%;">
      <div
        v-for="(product, index) in cartProducts"
        class="layout horizontal center product-item"
      >
        <div class="layout vertical center-justified">
          <div class="title">{{ product.title }}</div>
          <div class="detail">
            <span>Price</span> &mdash; {{ product.price | currency }} x {{ product.quantity }}
          </div>
        </div>
      </div>
      <div class="layout horizontal center">
        <div class="flex error-text">{{ checkoutStatus.message }}</div>
        <button
          v-show="!cartIsEmpty"
          @click="checkout">Checkout
        </button>
      </div>
    </div>

  </div>
</template>


<script lang="ts">
import { CartProduct, CheckoutStatus, Product } from '../../stores/types';
import { Component } from 'vue-property-decorator';
import { ElementComponent } from '../../components';
import { mixins } from 'vue-class-component';

@Component
export default class ShoppingView extends mixins(ElementComponent) {
  //----------------------------------------------------------------------
  //
  //  Variables
  //
  //----------------------------------------------------------------------

  private get cartIsEmpty(): boolean {
    return this.cartProducts.length === 0;
  }

  private get products(): Product[] {
    return this.$stores.product.allProducts;
  }

  private get cartProducts(): CartProduct[] {
    return this.$stores.cart.cartProducts;
  }

  private get cartTotalPrice(): number {
    return this.$stores.cart.cartTotalPrice;
  }

  private get checkoutStatus(): { result: boolean; message: string } {
    const result =
      this.$stores.cart.checkoutStatus === CheckoutStatus.None ||
      this.$stores.cart.checkoutStatus === CheckoutStatus.Successful;
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

  private addProductToCart(product: Product): void {
    this.$stores.cart.addProductToCart(product.id);
  }

  private async checkout(): Promise<void> {
    await this.$stores.cart.checkout(this.cartProducts);
  }
}
</script>
