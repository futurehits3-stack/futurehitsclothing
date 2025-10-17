<template>
<v-main>
    <v-container>
        <v-row>
            <v-col cols="12" md="7" xs="12" class="px-3">
                <v-row class="my-3">
                    <v-col cols="12" md="9">
                        <h1 class="text-h5 font-weight-bold text-primary">Checkout</h1>
                        <p class="text-caption text-grey-darken-1">Sign in to enjoy faster checkout, track your order and earn rewards!</p>
                    </v-col>
                    <v-col cols="12" md="3">

                        <DialogsSignUpDialog  class="mt-3"/>
                    </v-col>
                </v-row>
                <DummyCartNotReserved/>

                <v-form v-model="checkoutForm">
                    <v-card flat class="pa-5">

                    
                    <v-text-field label="Email" type="email" variant="outlined"></v-text-field>
                    <span class="text-caption text-grey-darken-1">Order updates will be sent to this address.</span>

                    <div class="my-2">
                        <v-row>
                            <v-col cols="6" md="6" xs="12">
                                <v-text-field label="First Name" variant="outlined"></v-text-field>
                            </v-col>
                            <v-col cols="6" md="6" xs="12">
                                <v-text-field label="Last Name" variant="outlined"></v-text-field>
                            </v-col>
                        </v-row>
                         
                    </div>
                    <v-text-field label="Street Address" variant="outlined"></v-text-field>
                    <v-text-field label="APT #, Floor, etc. (optional)" variant="outlined"></v-text-field>
                    <div>
                        <v-row>
                            <v-col cols="6" md="6" xs="12">
                               <v-text-field label="City" variant="outlined"></v-text-field>
                            </v-col>
                            <v-col cols="6" md="6" xs="12">
                                <v-select
                                    label="Select A State"
                                    :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                                    variant="outlined"
                                    ></v-select>
                                <!-- <v-text-field label="State" variant="outlined"></v-text-field> -->
                            </v-col>
                        </v-row>
                    </div>
                    <div>
                        <v-row>
                            <v-col cols="6" md="6" xs="12">
                               <v-text-field label="Zip Code" variant="outlined"></v-text-field>
                            </v-col>
                        </v-row>
                    </div>
                    <section id="shippingMethod" class="mt-3">
                        <h3 class="text-h6 font-weight-bold text-primary">Shipping Method <v-icon icon="mdi-help-circle-outline" size="x-small"></v-icon></h3>
                        <p class="text-caption text-grey-darken-1">Order by 1PM EST to receive by estimated dates below.</p>
                        <v-card flat class="border-sm rounded-lg mt-3">
                            <div class="pa-5">
                                <v-row>
                                    <v-col cols="6" md="6" class="pb-1">
                                        <p class="text-subtitle-1 font-weight-bold">Standard</p>
                                    </v-col>
                                    <v-col cols="6" md="6" class="pb-1">
                                        <p class="text-subtitle-1 font-weight-bold text-right">$5.95</p>
                                    </v-col>
                                </v-row>
                                <span class="text-caption text-grey-darken-1">Arrives Oct. 21st - 24th</span>
                                
                            </div>
                            <v-divider></v-divider>
                        </v-card>
                    </section>
                    <section id="payment" class="mt-3">
                        <h3 class="text-h6 font-weight-bold text-primary">Payment</h3>
                        <v-card flat class="border-sm rounded-lg mt-3">
                            <div class="pa-5">
                                <div class="my-4">
                                    <p class="text-subtitle-1 font-weight-bold"><v-icon icon="mdi-credit-card"></v-icon>  Credit or Debit Card</p>
                                </div>
                                    
                                <div id="cardInfo">
                                    <v-text-field label="Phone Number" variant="outlined"></v-text-field>
                                    <span class="text-caption text-grey-darken-1">In case there's a billing issue <v-icon icon="mdi-help-circle-outline" size="small"></v-icon></span>
                                </div>                                
                            </div>
                            <v-divider></v-divider>
                        </v-card>
                    </section>
                    </v-card>
                </v-form>
            </v-col>
            <v-col cols="12" md="5" xs="12" class="px-5">
                <v-row>
                     <v-col cols="12" md="9">
                        <h1 class="text-subtitle-1 font-weight-bold text-primary">Shopping Bag</h1>
                    </v-col>
                    <v-col cols="12" md="3">
                        <p class="text-caption text-grey-darken-1 text-right mt-1">{{ checkoutnumberOfBagItems }} items</p>
                    </v-col>
                </v-row>
                <v-divider class="mt-3"></v-divider>

                <section id="productsCheckout">
                    <v-card flat>
                        <v-row v-for="(b,bKey) in bagStore.bag" :key="bKey">
                            <v-col cols="6" md="4" xs="12" class="pb-2">
                                <v-img :src="replaceImgString(b.productImage)" height="160" cover top></v-img>
                            </v-col>
                            <v-col cols="6" md="8" xs="12">
                                <v-card class="pa-2" flat>
                                    <p class="text-caption font-weight-bold">{{ b.productTitle }}</p>
                                    <p class="text-body-1 font-weight-bold text-grey-darken-3"><span class="text-red font-weight-bold text-decoration-line-through" v-if="b.productComparePrice != ''">${{ b.productComparePrice }}</span> ${{ b.productPrice }} </p>
                                    <p class="text-caption font-weight-normal text-grey-lighten-1">Color: {{ b.productVariantColor }}</p>
                                    <p class="text-caption font-weight-normal text-grey-lighten-1">Quantity: {{ b.productQuantity }}</p>
                                    <p class="text-caption font-weight-normal text-grey-lighten-1">Size: {{ b.productSize }}</p>
                                </v-card>

                            </v-col>
                            <!-- <v-col cols="12" xs="12" class="pa-1 mx-4 pb-5">
                                <v-btn density="compact" variant="text"><span class="text-caption text-grey-lighten-1 mx-2" @click="editProduct(b)">Edit</span></v-btn>
                                <v-btn density="compact" variant="text"><span class="text-caption text-grey-lighten-1 mx-2" @click="removeEditProduct(b)">Remove</span></v-btn>
                            </v-col> -->

                            <v-divider></v-divider>

                        </v-row>
                    </v-card>
                    <section class="my-3">
                    <h3 class="text-subtitle-1 font-weight-bold mb-3 text-primary">Order Summary</h3>
                    <v-card id="orderSummary" class="border-thin pa-5" rounded="lg" flat>
                        <v-row>
                            <v-col cols="12" md="9">
                                <p class="text-subtitle-2 font-weight-bold text-primary">Bag:</p>
                            </v-col>
                            <v-col cols="12" md="3">
                                <p class="text-subtitle-2 font-weight-bold text-right">$100</p>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" md="9">
                                <p class="text-subtitle-2 font-weight-bold text-primary">Savings:</p>
                                <p class="pa-2 text-green text-caption">-$10 <span class="text-grey-lighten-1 ">item discounts</span></p>
                            </v-col>
                            <v-col cols="12" md="3">
                                <p class="text-subtitle-2 font-weight-bold text-green text-right">-$100</p>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" md="9">
                                <p class="text-subtitle-2 font-weight-bold text-primary">Shipping:</p>
                            </v-col>
                            <v-col cols="12" md="3">
                                <p class="text-subtitle-2 font-weight-bold text-right">$5.95</p>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" md="9">
                                <p class="text-subtitle-2 font-weight-bold text-primary">SubTotal:</p>
                            </v-col>
                            <v-col cols="12" md="3">
                                <p class="text-subtitle-2 font-weight-bold text-right"><span class="text-grey text-decoration-line-through">$125</span> $95</p>
                            </v-col>
                        </v-row>
                    </v-card>
                </section>
                    <section class="my-5">
                        <v-btn text="Place Order" block color="primary" rounded="xl"></v-btn>
                    </section>
                </section>
                
            </v-col>
        </v-row>
    </v-container>
</v-main>
</template>

<script setup>
const bagStore = useBagStore()
let checkoutForm = ref(false)
let checkoutnumberOfBagItems = ref(0)
let checkoutCartData = ref(undefined)

onMounted(() => {
    bagStore.getBagQuantity()
    checkoutnumberOfBagItems.value = bagStore.bagQuantity

    checkoutCartData = bagStore.bag
})


const replaceImgString = (imgstring) => {

    let img = imgstring
    img = img.replace('image-', '')
    if (img.indexOf('-jpg') === -1) {
        img = img.replace('-webp', '.webp')
    } else {
        img = img.replace('-jpg', '.jpg')
    }
    img = img.replace('-jpg', '.jpg')
    return `https://cdn.sanity.io/images/129ldwfx/production/${img}`
}
</script>
