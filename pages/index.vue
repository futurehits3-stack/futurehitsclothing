<template>
<div>
    <v-main>
        <v-container>
            <!-- <pre>{{ data }}</pre> -->
             <v-row>
                <v-col cols="6" md="3" xs="6" v-for="(card,dk) in data" :key="dk">
                    <v-card flat>
                        
                        <nuxt-link :to="`/product/${card.slug.current}/`">
                            <ImagesReplaceImg :image="card.productImage.asset._ref"/>
                            
                        </nuxt-link>
                        <v-card-actions class="py-2">
                                    <v-spacer></v-spacer>
                                    <v-btn color="grey" size="small" :to="'/product/'+card.slug.current+'/'">
                                        <v-icon icon="mdi-bag-personal-outline" ></v-icon>
                                    </v-btn>
                                </v-card-actions>
                        <v-card-text class="pt-1">
                                <p class="text-subtitle-1 text-grey-darken-3">{{card.productTitle}}</p>
                                <p class="text-caption font-weight-bold text-grey-darken-3"><span class="text-red text-decoration-line-through">${{ card.productVariants[0].variantComparePrice }}</span> ${{card.productVariants[0].variantPrice}} </p>
                            </v-card-text>
                    </v-card>
                </v-col>
             </v-row>
            

        </v-container>
        
    </v-main>
</div>
</template>

<script setup>
const params = useRoute().params
const queryG = groq `*[_type == "products"]`
const sanity = useSanity()
const {
    data
} = await useAsyncData(`product:${params.id}`, () => sanity.fetch(queryG))


// const shareData = {
//     title: `${data?.value[0]?.title || ''} | Cinematics Through My Eyes`,
//     text: `View ${data?.value[0]?.title}'s Videos and Photos!`,
//     url: `https://cinematicsthroughmyeyes.com/clients/${data?.value[0]?.slug.current || ''}/`,
// };
</script>

<style scoped>
.photos {
    cursor: pointer;
}

video {
    width: 100%;
    height: 100%;
}

.videoHolder .bg {
    position: absolute;
    width: 97%;
    z-index: 1;
    height: 50px;
    top: 12px;
    left: 4px;
    background: rgba(000, 000, 000, .5);
}

.profileImageView img {
    width: 50px;
    border-radius: 50%;
}
.v-card-actions{
        min-height: 22px;
    }
</style>
