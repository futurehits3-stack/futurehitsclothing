<template>
<div>
    <v-btn block variant="outlined" rounded="xl" @click="isFormActive = true">Sign In</v-btn>
    <v-dialog max-width="400" v-model="isFormActive" >
        <v-card class="rounded-xl">
            <v-container>
                <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn @click="isFormActive = false" ><v-icon icon="mdi-close" size="x-large"></v-icon></v-btn>
            </v-card-actions>
                
            <v-card-text>
                <h4 class="font-weight-bold text-h5 text-primary">Sign In</h4>
                <v-form class="my-5" v-model="signInForm">
                    <v-text-field label="Email" variant="outlined" v-model="signInFormOBJ.email" :rules="[formRules.emailRules, formRules.email,formRules.emailCounter]" required></v-text-field>

                    <v-text-field label="Password" type="password" variant="outlined" v-model="signInFormOBJ.password" :rules="[formRules.passwordRules, formRules.passwordCounter, formRules.passwordCounterLess]" required></v-text-field>
                    <v-row>
                        <v-col cols="6" md="6">
                            <span class="text-caption">8-25 characters</span>
                        </v-col>
                        <v-col cols="6" md="6" class="text-right">
                            <span class="text-caption ">Forgot Password</span>
                        </v-col>
                    </v-row>
                    <div class="my-4">
                        <v-btn text="Sign In" block rounded="xl" color="black" dark size="large" @click="signIn"></v-btn>
                    </div>
                </v-form>
            </v-card-text>
            </v-container>
            
        </v-card>
    </v-dialog>
</div>
</template>

<script setup>
let isFormActive = ref(false)
let signInForm = ref(false)
let signInFormOBJ = ref({
    email: '',
    password: ''
})
const formRules = ref({
    emailRules: value => !!value || 'Email is required', 
    passwordRules: value => !!value || 'Password is required', 
    email: value => {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return pattern.test(value) || 'Invalid e-mail.'
    },
    emailCounter: value => value.length <= 20 || 'Max 20 characters',
    passwordCounter: value => value.length <= 25 || 'Max 25 characters',
    passwordCounterLess: value => value.length > 8 || 'Need At Least 8 characters',
})

const signIn = () => {
    
    if(signInForm.value){
        console.log(signInForm.value)
    }else{
        console.log('error')
    }
}
</script>
