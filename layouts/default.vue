<template>
<div class="bg-white">
    <v-app>
        <v-app-bar fixed class="position-fixed" elevation="0" density="compact" color="white">
            <template v-slot:append>
                <div class="mr-5">
                    <v-btn to="/wishlist/" rounded>
                    <v-badge location="top right" :color="wishListFound? 'red' : 'black'" dot class="mx-2">
                    <v-icon icon="mdi-heart-outline" color="grey-darken-2"></v-icon>
                </v-badge>
                </v-btn>
                <v-btn to="/cart/" rounded>
                    <v-badge location="top right" color="red" :content="count" class="mx-2" >
                    <v-icon icon="mdi-shopping-outline" color="grey-darken-2"></v-icon>
                </v-badge>
                </v-btn>
                
                </div>
                
            </template>
        </v-app-bar>
        <v-app-bar fixed class="position-fixed" :elevation="2" color="white">
            <v-app-bar-title>FHClothing</v-app-bar-title>
            <template v-slot:prepend>
                <v-app-bar-nav-icon color="black" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            </template>
            
            <!-- <v-app-bar-title><span class="font-weight-black"><img :src="photoHighref2" id="profileHeadIMG"/></span></v-app-bar-title> -->
        </v-app-bar>

        <client-only>
            <v-navigation-drawer v-model="drawer" temporary>
                <v-list>
                    <v-list-item v-for="item in navItems" :key="item" :value="item" :to="item.link" link>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item>

                </v-list>
            </v-navigation-drawer>
        </client-only>
        <slot />
    </v-app>

</div>
</template>

<script setup>
import {useBagStore} from '~/stores/bag'
import {useWishListStore} from '~/stores/wishlist'
import { storeToRefs } from 'pinia';

const bagStore = useBagStore()
const wishStore = useWishListStore()
const { bagQuantity } = storeToRefs(bagStore);
const {wishListActive} = storeToRefs(wishStore)

let bagCounter = ref(0)
let wishListFound = ref(false)
let count = ref(0)
const drawer = ref(false)
const navItems = ref([{
    title: 'Home',
    value: 'home',
    link: '/'
}])
onMounted(() => {
    bagStore.getBagQuantity()
    bagCounter.value = bagStore.bagQuantity
    if(bagCounter === 0){
        count.value = 0
    } else{
            count.value = bagCounter.value
    }

    wishListFound.value = wishStore.getWishlistQuantity()

    watch(wishListActive, (c, p) => {
        wishListFound.value = c
    })
    watch(bagQuantity , (currentNumber, prevNumber) =>{
          count.value = currentNumber
      })
    
})
</script>
