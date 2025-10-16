<template>
<v-main>
    <v-container>
        <h1 class="text-h5 font-weight-bold">Shopping Bag</h1>
        <section class="numberOfItem pa-3">
            <p class="text-subtitle font-weight-bold">{{numberOfBagItems}} items</p>
        </section>
        <v-row>
            <v-col cols="12" md="8" xs="12">
                <section id="products">
                    <v-card >
                        <v-row v-for="(b,bKey) in bagStore.bag" :key="bKey" >
                        <v-col cols="6" md="3" xs="12">
                            <v-img :src="replaceImgString(b.productImage)" height="160" cover top></v-img>
                        </v-col>
                        <v-col cols="6" xs="12">
                            <v-card class="pa-2" flat>
                                <p class="text-caption font-weight-bold">{{ b.productTitle }}</p>
                                <p class="text-body-1 font-weight-normal text-grey-darken-3">${{ b.productPrice }}</p>
                                <p class="text-caption font-weight-normal text-grey-darken-1">Color: {{ b.productVariantColor }}</p>
                                <p class="text-caption font-weight-normal text-grey-darken-1">Quantity: {{ b.productQuantity }}</p>
                                <p class="text-caption font-weight-normal text-grey-darken-1">Size: {{ b.productSize }}</p>
                            </v-card>
                            
                        </v-col>
                        <v-divider></v-divider>
                    </v-row>
                    </v-card>
                    
                </section>
            </v-col>
            <v-col cols="12" md="4" xs="12">
                <h3>Offers</h3>
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
