<template>
    <section class="mt-3">
            <h3 class="text-subtitle-1 font-weight-bold mb-3 text-primary">Order Summary</h3>
            <v-card id="orderSummary" class="border-thin pa-5" rounded="lg" flat>
                <v-row>
                    <v-col cols="6" md="8" xs="9">
                        <p class="text-subtitle-2 font-weight-bold text-primary">Bag:</p>
                    </v-col>
                    <v-col cols="6" md="4" xs="3">
                        <p class="text-subtitle-2 font-weight-bold text-right">{{bagTotal}}</p>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6" md="8" xs="9">
                        <p class="text-subtitle-2 font-weight-bold text-primary">Savings:</p>
                        <div v-for="(save,sK) in savingsArray" :key="sK">
                            <p class="px-2 py-1 text-green text-caption">-${{save}} <span class="text-grey-lighten-1 ">item discounts</span></p>
                        </div>
                    </v-col>
                    <v-col cols="6" md="4" xs="3">
                        <p class="text-subtitle-2 font-weight-bold text-green text-right">{{savingsTotal}}</p>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6" md="8" xs="9">
                        <p class="text-subtitle-2 font-weight-bold text-primary">Shipping:</p>
                    </v-col>
                    <v-col cols="6" md="4" xs="3">
                        <p class="text-subtitle-2 font-weight-bold text-right">$5.95</p>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6" md="8" xs="9">
                        <p class="text-subtitle-2 font-weight-bold text-primary">SubTotal:</p>
                    </v-col>
                    <v-col cols="6" md="4" xs="3">
                        <p class="text-subtitle-2 font-weight-bold text-right"><span class="text-grey text-decoration-line-through">{{bagWithoutSavingsTotal}}</span> {{ bagTotal }}</p>
                    </v-col>
                </v-row>
            </v-card>
        </section>
</template>
<script setup>
    const props = defineProps({
        orderData: {
            type: Array,
            required: true
        }
    })
    const { orderData } = props;
    let savingsArray = ref([])
    const bagTotal = computed(() => {
        let total = 0
        for (let i = 0; i < orderData.length; i++) {
            const e = orderData[i];
            total += Number(e.productPrice)
        }
        return `$${total}`
    })
    const bagWithoutSavingsTotal = computed(() => {
        let total = 0
        for (let i = 0; i < orderData.length; i++) {
            const e = orderData[i];
            total += Number(e.productComparePrice)
        }
        return `$${total}`
    })
    const savingsTotal = computed(() => {
        let bagTotal = 0
        let bagSaved = 0
        for (let i = 0; i < orderData.length; i++) {
            const e = orderData[i];
            bagTotal += Number(e.productPrice)
            bagSaved += Number(e.productComparePrice)
            savingsArray.value.push(Math.round(Number(e.productPrice - e.productComparePrice)))
        }
        return `$${Math.round(bagTotal - bagSaved)}`
    })
</script>