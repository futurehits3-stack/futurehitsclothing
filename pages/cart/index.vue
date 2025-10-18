<template>
<v-main>
    <v-container v-if="numberOfBagItems > 0">
        <v-row>
            <v-col cols="12" md="8" xs="12">
                <v-row class="my-3">
                    <v-col cols="12" md="9">
                        <h1 class="text-h5 font-weight-bold text-primary">Shopping Bag</h1>
                    </v-col>
                    <v-col cols="12" md="3">

                        <DialogsSignUpDialog />
                    </v-col>
                </v-row>
                <section class="numberOfItem pb-3">
                    <p class="text-subtitle font-weight-bold">{{numberOfBagItems}} item(s)</p>
                </section>
                <DummyCartNotReserved />
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
                                <v-btn density="compact" variant="text"><span class="text-caption text-grey-lighten-1 mx-2" @click="editProduct(b)">Edit</span></v-btn>
                                <v-btn density="compact" variant="text"><span class="text-caption text-grey-lighten-1 mx-2" @click="removeEditProduct(b)">Remove</span></v-btn>
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
                <section class="my-3">
                    <v-btn text="Let's Checkout" block color="primary" rounded="xl" append-icon="mdi-chevron-right" to="/checkout/"></v-btn>
                </section>
            </v-col>
        </v-row>

    </v-container>
    <v-container>
        <v-row class="my-3">
            <v-col cols="12" md="9">
                <h1 class="text-h5 font-weight-bold text-primary">Shopping Bag</h1>
            </v-col>
            <v-col cols="12" md="3">
                <DialogsSignUpDialog />
            </v-col>
        </v-row>
        <v-card flat class="border-sm text-center pa-5 rounded-lg">
            <v-card-text>
                <v-icon icon="mdi-shopping-outline" color="grey-darken-2" size="80"></v-icon>
            <p class="text-h5 font-weight-bold my-3 ">Your bag is empty. Find something you love!</p>
            </v-card-text>
            
            <v-card-actions>
            <v-btn text="T-shirts" variant="tonal" color="black"></v-btn>
        </v-card-actions>
        </v-card>
        
    </v-container>
    <client-only>
        <v-navigation-drawer location="right" temporary v-model="openEditCartDrawer" width="350">
            <v-container>
                <v-card flat>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn flat @click="openEditCartDrawer = false">
                            <v-icon icon="mdi-close"></v-icon>
                        </v-btn>
                    </v-card-actions>
                    <v-card-title class="px-0">
                        <h5 class="text-h5 font-weight-bold">Edit Item</h5>

                    </v-card-title>
                    <v-card-text class="px-0">
                        <h5 class="text-h6 font-weight-bold">Bad News</h5>
                        <p class="text-caption font-weight-normal text-grey-lighten-1">Your new essential travel outfit. Designed in our newest, drapey fleece–this jogger will take you places.</p>
                        <div class="my-3">
                            <v-img src="https://cdn.sanity.io/images/129ldwfx/production/f3b500974b04f011414d796f64e7bf344ffba73f-563x722.jpg" height="100"></v-img>
                        </div>
                        <div>
                            <v-row>
                                <v-col cols="6" md="7" xs="7">
                                    <v-select label="Select A Size" variant="outlined" density="compact"></v-select>
                                </v-col>
                                <v-col cols="6" md="5" xs="5">
                                    <v-number-input :max="10" :min="1" control-variant="split" density="compact" variant="outlined"></v-number-input>
                                </v-col>
                            </v-row>
                        </div>
                    </v-card-text>
                    <!-- <section id="panel-info" class="border-sm pa-2 rounded-lg">
                         <v-row>
                        <v-col cols="6" md="5">
                            <v-img :src="replaceImgString(productMainIMG)" class="rounded-lg"></v-img>
                        </v-col>
                        <v-col cols="6" md="7">
                            <p>BadNews Shirt</p>
                            <p class="cartPrice font-weight-bold text-red text-caption">${{productPrice}} <span class="text-black text-decoration-line-through">${{ productComparePrice }}</span></p>
                            <section>
                                <p class="text-caption text-grey-lighten-1">Color: {{swatchColor}}</p>
                                <p class="text-caption text-grey-lighten-1">Size: {{selectedSize}}</p>
                                <p class="text-caption text-grey-lighten-1">Quantity: {{selectedQuantity}}</p>
                            </section>
                        </v-col>
                    </v-row>
                    </section> -->

                    <section id="editPanelButtons" class="my-1">
                        <v-btn rounded="xl" size="x-large" color="black" block>Update Bag</v-btn>
                    </section>

                </v-card>
            </v-container>
        </v-navigation-drawer>
    </client-only>
    <v-dialog max-width="400" v-model="removeProductDialog">
        <v-card class="rounded-xl">
            <v-container>
                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn @click="removeProductDialog = false">
                        <v-icon icon="mdi-close" size="x-large"></v-icon>
                    </v-btn>
                </v-card-actions>

                <v-card-text>
                    <h4 class="font-weight-bold text-h5 text-primary">Remove Product?</h4>
                    <p class="text-bpdy-1">Are you sure you want to remove this product from your shopping bag?</p>
                </v-card-text>
                <v-card-actions>
                    <v-row>
                        <v-col cols="6">
                            <v-btn text="cancel" rounded="xl" block @click="removeProductDialog = false"></v-btn>
                        </v-col>
                        <v-col cols="6">
                            <v-btn text="remove" rounded="xl" block></v-btn>
                        </v-col>
                    </v-row>
                </v-card-actions>
            </v-container>

        </v-card>
    </v-dialog>
    <!-- <DrawersEditCartDrawer :editData="passedEditProductData.value" v-if="passedEditProductData"/> -->
    <!-- <DialogsSignUpDialog/> -->
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
let passedEditProductData = ref(null)
let openEditCartDrawer = ref(false)
let removeProductDialog = ref(false)
useHead({
    title: `Cart | Future Hits Clothing`,
    meta: [{
        name: 'description',
        content: 'View your bag!'
    }, ],
})
onMounted(() => {
    bagStore.getBagQuantity()
    numberOfBagItems.value = bagStore.bagQuantity
    cartData = bagStore.bag
})
const editProduct = (data) => {

    console.log(data)

    passedEditProductData.value = data
    openEditCartDrawer.value = true
}
const removeEditProduct = (data) => {
    console.log(data)
    removeProductDialog.value = true
}
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
