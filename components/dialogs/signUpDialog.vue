<template>
<div>
    <v-btn block variant="outlined" rounded="xl" @click="isActive = true">Sign In</v-btn>
    <v-dialog max-width="400" v-model="isActive" >
        <v-card class="rounded-xl">
            <v-container>
                <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn @click="isActive = false" ><v-icon icon="mdi-close" size="x-large"></v-icon></v-btn>
            </v-card-actions>
                
            <v-card-text>
                <h4 class="font-weight-bold text-h5 text-primary">Sign In</h4>
                <v-form class="my-5">
                    <v-text-field label="Email" variant="outlined"></v-text-field>

                    <v-text-field label="Password" type="password" variant="outlined"></v-text-field>
                    <v-row>
                        <v-col cols="6" md="6">
                            <span class="text-caption">8-25 characters</span>
                        </v-col>
                        <v-col cols="6" md="6" class="text-right">
                            <span class="text-caption ">Forgot Password</span>
                        </v-col>
                    </v-row>
                    <div class="my-4">
                        <v-btn text="Sign In" block rounded="xl" color="black" dark size="large"></v-btn>
                    </div>
                </v-form>
            </v-card-text>
            </v-container>
            
        </v-card>
    </v-dialog>
</div>
</template>

<script setup>
let isActive = ref(true)
</script>
