<template>
    <v-main>
        <v-container>
            <div>
                <h1 class="text-h5 text-primary">My Favorites</h1>
                <p class="text-caption text-grey-darken-1">If you are not signed in, your wishlist is only available on this device and will expire at the end of the session.</p>
                <p class="text-caption text-grey-darken-1"><nuxt-link to="/" class="font-weight-bold text-primary">Sign In</nuxt-link> or <nuxt-link to="/" class="font-weight-bold text-primary">Create an account.</nuxt-link></p>
                <!-- {{ wishlistArr }} -->
                <div v-if="wishlistArr">
                    <section v-if="wishlistArr.length === 0" class="my-3">
                    <v-btn text="Shop Now" rounded="x-large" color="primary" size="large"></v-btn>
                    </section>
                <section v-else class="mt-4">
                    <v-row>
                        <v-col cols="3" md="3" v-for="(wish,wk) in wishlistArr" :key="wk">
                            <v-img :src="replaceImgString(wish.productImage)" height="160" cover top></v-img>
                            <v-card>
                                <v-card-actions class="py-2">
                                    <v-spacer></v-spacer>
                                    <v-btn color="primary" size="small" :to="'/product/'+wish.slug+'/'">
                                        <v-icon icon="mdi-bag-personal-outline" ></v-icon>
                                        <v-tooltip
                                                activator="parent"
                                                location="top"
                                            >Go to Product</v-tooltip>
                                    </v-btn>
                                </v-card-actions>
                                <v-card-text class="pt-1">
                                    <p class="text-body-1 text-grey-darken-4 font-weight-bold text-primary">{{ wish.productTitle }}</p>
                                    <p class="text-subtitle-2 text-grey-darken-2 font-weight-bold"><span class="text-red text-decoration-line-through">${{ wish.productComparePrice }}</span> ${{ wish.productPrice }}</p>
                                    <p class="text-caption text-grey-darken-4"><span v-if="wish.isProductAvailable"><v-icon icon="mdi-circle" size="x-small" color="green"></v-icon> In stock</span><span v-else><v-icon icon="mdi-circle" size="x-small" color="red"></v-icon>  Out Of Stock</span></p>
                                </v-card-text>
                                
                            </v-card>
                        </v-col>
                    </v-row>
                </section>
                </div>
                
            </div>
        </v-container>
    </v-main>
</template>
<script setup>
    import {useWishListStore}  from '~/stores/wishlist'

    const wishListStore = useWishListStore()

    let wishlistArr = ref(null)

    useHead({
        title: `Wishlist | Future Hits Clothing`,
        meta: [{
            name: 'description',
            content: 'View Your wishlist!'
        }, ],
    })

    onMounted(() => {
        wishListStore.getWishlist()
       wishlistArr.value = wishListStore.wishList
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
<style scoped>
    .v-card-actions{
        min-height: 22px;
    }
</style>