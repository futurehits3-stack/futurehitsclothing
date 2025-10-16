<template>
<v-main>
    <v-container>
        <v-row>

            <v-col cols="12" md="8" xs="12">
                <v-row class="my-3">
                    <v-col cols="12" md="9">
                    <h1 class="text-h5 font-weight-bold text-primary">Shopping Bag</h1>
                </v-col>
                <v-col cols="12" md="3">
                    
                    <DialogsSignUpDialog/>
                </v-col>
                </v-row>
                 <section class="numberOfItem pb-3">
            <p class="text-subtitle font-weight-bold">{{numberOfBagItems}} item(s)</p>
        </section>
                <div class="bg-grey-lighten-3 pa-3 rounded-lg mb-4">
                    <p class="text-caption text-grey-darken-2">
                        <v-icon icon="mdi-alarm"></v-icon> Items in bag are not reserved. Check out now before they sell out!
                    </p>
                </div>
                <section id="products">
                    <v-card flat class="border-sm">
                        <v-row v-for="(b,bKey) in bagStore.bag" :key="bKey">
                            <v-col cols="6" md="3" xs="12" class="pb-2">
                                <v-img :src="replaceImgString(b.productImage)" height="160" cover top></v-img>
                            </v-col>
                            <v-col cols="6" xs="12">
                                <v-card class="pa-2" flat>
                                    <p class="text-caption font-weight-bold">{{ b.productTitle }}</p>
                                    <p class="text-body-1 font-weight-bold text-grey-darken-3"><span class="text-red font-weight-bold text-decoration-line-through" v-if="b.productComparePrice != ''">${{ b.productComparePrice }}</span> ${{ b.productPrice }} </p>
                                    <p class="text-caption font-weight-normal text-grey-lighten-1">Color: {{ b.productVariantColor }}</p>
                                    <p class="text-caption font-weight-normal text-grey-lighten-1">Quantity: {{ b.productQuantity }}</p>
                                    <p class="text-caption font-weight-normal text-grey-lighten-1">Size: {{ b.productSize }}</p>
                                </v-card>

                            </v-col>
                            <v-col cols="12" xs="12" class="pa-1 mx-4 pb-5">
                                <v-btn density="compact" variant="text"><span class="text-caption text-grey-lighten-1 mx-2">Edit</span></v-btn>
                                <v-btn density="compact" variant="text"><span class="text-caption text-grey-lighten-1 mx-2">Remove</span></v-btn>
                            </v-col>

                            <v-divider></v-divider>

                        </v-row>
                    </v-card>

                </section>
            </v-col>
            <v-col cols="12" md="4" xs="12">
                <h3 class="text-subtitle mb-3 text-primary">Offers</h3>
                <v-btn variant="outlined" block rounded="xl" @click="showPromoField = true" v-show="!showPromoField">Apply Promo Code</v-btn>
                <section v-show="showPromoField">
                    <v-form>
                        <v-row>
                            <v-col cols="6" md="8" xs="9">
                                <v-text-field variant="outlined" label="Enter Promo Code"></v-text-field>
                            </v-col>
                            <v-col cols="6" md="4" xs="3">
                                <v-btn block rounded="xl" size="x-large" color="black">Apply</v-btn>
                            </v-col>
                        </v-row>

                    </v-form>
                </section>
                <section class="mt-3">
                    <h3 class="text-subtitle mb-3 text-primary">Order Summary</h3>
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
            </v-col>
        </v-row>

    </v-container>
    
</v-main>
</template>

<script setup>
import {
    useBagStore
} from '~/stores/bag'

const bagStore = useBagStore()
let numberOfBagItems = ref(0)
let cartData = ref(undefined)
let showPromoField = ref(false)
onMounted(() => {
    bagStore.getBagQuantity()
    numberOfBagItems.value = bagStore.bagQuantity

    cartData = bagStore.bag
    console.log(bagStore.bag)
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
