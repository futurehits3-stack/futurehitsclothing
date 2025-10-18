<template>
<div>
    <v-main v-if="data">
        <v-container >
            <v-row >
                <v-col cols="12" md="8">
                    <v-img :src="replaceImgString(productMainIMG)" class="rounded-lg"></v-img>
                    
                </v-col>
                <v-col cols="12" md="4" class="px-3">

                    <div class="my-3">
                        <p class="text-caption">
                            <v-icon icon="mdi-arrow-left" size="x-small"></v-icon> {{ data[0].productType }}
                        </p>
                    </div>
                    <h1 class="text-h4">{{ data[0].productTitle }}</h1>
                    <p class="text-caption text-grey-darken-2 my-2">{{data[0].productDescription[0].children[0].text}}</p>
                    <section id="priceSection" class="my-1">
                        <p class="price text-subtitle-1 font-weight-bold">${{productPrice}} <span class="text-red text-decoration-line-through">${{ productComparePrice}}</span> </p>
                        <v-chip color="green" label size="small" density="comfortable" v-if="productComparePrice">Save {{savings}}</v-chip>
                    </section>

                    <section id="rating" class="mt-1 mb-2">
                        <v-rating v-model="productRating" active-color="black" color="black" size="17" density="comfortable" readonly :model-value="4"></v-rating>
                        <span class="text-caption ml-2">(5 reviews)</span>
                    </section>
                    <v-divider></v-divider>
                    <section class="product-colors my-3">
                        <p class="sizechart text-caption font-weight-bold mb-2">Color: {{swatchColor}}</p>
                        <ul id="swatches">
                            <client-only>
                            <li v-for="(p, k) in data[0].productVariants" :key="k" class="mr-3" @click="swatchClicked(p)">
                                <v-avatar :image="replaceImgString(p.variantPhoto.asset._ref)"></v-avatar>
                            </li>
                            </client-only>
                        </ul>
                    </section>
                    <v-divider></v-divider>
                    <section id="tabs" class="mb-4 mt-6">
                        <p class="sizechart text-caption font-weight-bold mb-2">Size: {{swatchSizeText}}</p>
                        <v-row>
                            <v-col cols="6" md="7" xs="7">
                                <v-select label="Select A Size" :items="swatchSizes" variant="outlined" v-model="selectedSize" @update:modelValue="selectASize(selectedSize)" :error="selectedSizeError"></v-select>
                            </v-col>
                            <v-col cols="6" md="5" xs="5">
                                <v-number-input :max="10" :min="1" control-variant="split" v-model="selectedQuantity" variant="outlined" @update:model-value="selectAQuantity($event)"></v-number-input>
                            </v-col>
                        </v-row>
                    </section>
                    <v-divider></v-divider>
                    <section id="addToBag" class="mb-3 mt-4">
                        <v-btn rounded="xl" size="large" block color="primary" prepend-icon="mdi-shopping" @click="addToBag(data[0])">Add To Bag</v-btn>
                    </section>
                    <section id="saveToFav" class="my-4">
                        <v-btn rounded="xl" size="large" variant="outlined" block color="grey-darken-3" @click="saveToFavorites(data[0])" prepend-icon="mdi-heart-outline">Save To Favorites</v-btn>
                    </section>
                    <v-divider></v-divider>
                    <section id="info-panels" class="mt-4">
                        <div class="pa-2">
                            <p class="text-subtitle-1 my-3 text-decoration-underline" @click="goToTarget('#details')">The Details</p>
                            <v-divider></v-divider>
                            <p class="text-subtitle-1 my-3 text-decoration-underline" @click="goToTarget('#productFit')">Product Fit</p>
                            <v-divider></v-divider>
                            <p class="text-subtitle-1 my-3 text-decoration-underline" @click="goToTarget('#productCare')">Care & Materials</p>
                            <v-divider></v-divider>
                            
                        </div>
                    </section>
                </v-col>
            </v-row>
            <section id="details" class="pa-4 mt-3 bg-white">
                <h3 class="text-subtitle-1">The Details</h3>
                <ul class="ml-5">
                    <li class="text-caption" v-for="(dets,dK) in data[0].productDetails" :key="dK">
                        {{dets.productDetail}}
                    </li>
                </ul>
            </section>
            <v-divider></v-divider>
            <section id="productFit" class="pa-4 bg-white">
                <h3 class="text-subtitle-1">Product Fit</h3>
                <ul class="ml-5">
                    <li class="text-caption" v-for="(pf,pK) in data[0].productFit" :key="pK">
                        {{pf.productFit}}
                    </li>
                </ul>
            </section>
            <v-divider></v-divider>
            <section id="productCare" class="pa-4 bg-white">
                <h3 class="text-subtitle-1">Care & Materials</h3>
                <ul class="ml-5">
                    <li class="text-caption" v-for="(care,cK) in data[0].productCareMat" :key="cK">
                        {{care.productCareAndMaterials}}
                    </li>
                </ul>
            </section>
        </v-container>
        <client-only>
        <v-navigation-drawer location="right" temporary v-model="openDrawer" width="350">
            <v-container>
                <v-card flat>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn flat @click="openDrawer = false"><v-icon icon="mdi-close"></v-icon></v-btn>
                    </v-card-actions>
                    <v-card-title class="px-0">
                        <h5 class="text-h5 font-weight-bold">Added To Bag!</h5>
                    </v-card-title>
                    <section id="panel-info" class="border-sm pa-2 rounded-lg">
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
                    </section>
                   
                    <section id="panelButtons" class="my-3">
                        <v-row>
                        <v-col cols="6" md="6">
                            <v-btn rounded="xl" size="small" variant="outlined" block>Keep Shopping</v-btn>
                        </v-col>
                        <v-col cols="6" md="6">
                            <v-btn rounded="xl" color="primary" size="small" block to="/cart/">View Bag</v-btn>
                        </v-col>
                    </v-row>
                    </section>
                    
                </v-card>
            </v-container>
            
            <!-- <template v-slot:prepend>
                <v-list-item lines="two" prepend-avatar="https://randomuser.me/api/portraits/women/81.jpg" subtitle="Logged in" title="Jane Smith"></v-list-item>
            </template>

            <v-divider></v-divider>

            <v-list density="compact" nav>
                <v-list-item prepend-icon="mdi-home-city" title="Home" value="home"></v-list-item>
                <v-list-item prepend-icon="mdi-account" title="My Account" value="account"></v-list-item>
                <v-list-item prepend-icon="mdi-account-group-outline" title="Users" value="users"></v-list-item>
            </v-list> -->
        </v-navigation-drawer>
        </client-only>
    </v-main>
    <v-dialog max-width="400" v-model="errorWishlistDialog" >
        <v-card class="rounded-xl">
            <v-container>
                <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn @click="errorWishlistDialog = false" ><v-icon icon="mdi-close" size="x-large"></v-icon></v-btn>
            </v-card-actions>
                
            <v-card-text>
                <h4 class="font-weight-bold text-h5 text-red">Error</h4>  
                <p class="body-1">This item is already in favorites.</p>  
            </v-card-text>
            <v-card-actions>
                <v-btn text="View Favorites" rounded="lg" color="black" to="/wishlist/"></v-btn>
                <v-btn text="Close" rounded="lg" color="black" @click="errorWishlistDialog = false"></v-btn>
            </v-card-actions>
            </v-container>
            
        </v-card>
    </v-dialog>
</div>
</template>

<script setup>
import {useBagStore} from '~/stores/bag'
import { useWishListStore } from '~/stores/wishlist'

const bagStore = useBagStore()
const  wishListStore = useWishListStore()

let productRating = ref('')
let swatchColor = ref('')
let swatchSizes = ref([])
let swatchSizeText = ref('')
let selectedSize = ref('')
let selectedSizeError = ref(false)
let selectedQuantity = ref(0)
let openDrawer = ref(false)
let productMainIMG = ref('')
let productPrice = ref('')
let productComparePrice = ref('')
let errorWishlistDialog = ref(false)
const params = useRoute().params
const queryG = groq `*[_type == "products" && slug.current == '${params.id}']`
const sanity = useSanity()
 import { useGoTo } from 'vuetify'
 const goTo = useGoTo()
const {
    data
} = await useAsyncData(`product:${params.id}`, () => sanity.fetch(queryG))
useHead({
  title: `${data.value[0].productTitle} | Future Hits Clothing`,
  meta: [
    { name: 'description', content: `${data.value[0].productDescription}` },
  ],
})
swatchColor.value = data.value[0].productVariants[0].variantColor
swatchSizes.value = data.value[0].productVariants[0].variantSizes
productMainIMG.value = data.value[0].productVariants[0].variantPhoto.asset._ref
swatchSizeText.value = 'Select A Size'
productPrice.value = data.value[0].productVariants[0].variantPrice
productComparePrice.value = data.value[0].productVariants[0].variantComparePrice
const swatchClicked = (p) => {
    if(p.variantColor != swatchColor.value){
        swatchColor.value = p.variantColor
        swatchSizes.value = p.variantSizes
        productMainIMG.value = p.variantPhoto.asset._ref
        productComparePrice.value = p.variantComparePrice
        productPrice.value = p.variantPrice
    }
    selectedSize.value = ''
    swatchSizeText.value = 'Select A Size'
}
const selectASize = (size) => {
    swatchSizeText.value = []
    swatchSizeText.value = size
}
const selectAQuantity = (quantity) => {
    selectedQuantity.value = quantity
}
const addToBag = async(data) => {
    if(data){
         if(selectedSize.value !== ''){
        //check data again
        
        const addToBagPromise = await bagStore.addToBag(data.productID, selectedQuantity.value, data, selectedSize.value, swatchColor.value, productMainIMG.value,productPrice.value, productComparePrice.value)
            
            if(addToBagPromise){
                openDrawer.value = true
            }

        }else{
            selectedSizeError.value = true
        }
    }
   
}
const savings = computed(() => {
    const difference = productComparePrice.value - productPrice.value;
    
    const percentage = Math.round((difference/productComparePrice.value) * 100);
    return percentage + '%'
})
const saveToFavorites = async(data) => {
    if(data){
        const saveToFav = await wishListStore.addToWishlist(data.productID, data)
        if(saveToFav === 'found'){
            errorWishlistDialog.value = true
        }else{
            wishListStore.getWishlistQuantity()
        }
    }
}
const options = computed(() => ({
    duration: 300,
    easing: 'easeInOutQuart',
    offset: 0,
  }))
const goToTarget = (target) => {
    console.log(target)
    goTo(target)
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
const shareData = {
    title: `${data?.value[0]?.productTitle || ''} | Future Hits Clothing`,
    text: `View ${data?.value[0]?.productTitle}! Brought to you by Future Hits Clothing`,
    url: `https://futurehitsclothing.com/product/${data?.value[0]?.slug.current || ''}/`,
}
const shareButton =  async() => {
    try {
        await navigator.share(shareData);

    } catch (err) {
        console.log(err)
    }
}
</script>

<style scoped>
#swatches,
#size-swatches {
    display: flex;
    flex-direction: row;
    list-style-type: none;
}

#size-swatches li {
    background: #E0E0E0;
}

#swatches li {
    border: 2px solid #213f27;
    border-radius: 50%;
    padding: 3px;
}
</style>
