<template>
 <div>
    <client-only>
        <v-navigation-drawer location="right" temporary v-model="openEditCartDrawer" width="350">
            <v-container>
                <v-card flat>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn flat @click="openEditCartDrawer = false"><v-icon icon="mdi-close"></v-icon></v-btn>
                    </v-card-actions>
                    <v-card-title class="px-0">
                        <h5 class="text-h5 font-weight-bold">Edit Item</h5>
                    </v-card-title>
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
        </v-navigation-drawer>
        </client-only>
 </div>
</template>
<script setup>
    const props = defineProps({
        editData: {
            type: Object,
            required: false
        }
    })
    let openEditCartDrawer = ref(false)

    
    watch(() => props.editData, (newValue, oldValue) => {
    console.log('Message changed from:', oldValue, 'to:', newValue);
    // Perform actions based on the new message value
    });
</script>