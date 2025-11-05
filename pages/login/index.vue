<template>
    <v-main>
        <v-card>
            <v-form v-model="loginForm">
                <v-container>
                    <v-text-field  v-model="email" type="email" :rules="emailRules" label="Email" required></v-text-field>
                    <v-text-field v-model="password" type="password" :rules="passwordRules" label="Password" required></v-text-field>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn @click="submitLogin">Submit</v-btn>
                    </v-card-actions>
                </v-container>
            </v-form>
        </v-card>
    </v-main>
</template>
<script setup>
    import {
        getAuth,
        signInWithEmailAndPassword
    } from 'firebase/auth';
    const router = useRouter();
    const loginForm = ref(false)
    const email = ref('')
    const password = ref('')
    const emailRules =  ref([
        value => {
          if (value) return true

          return 'E-mail is required.'
        },
        value => {
          if (/.+@.+\..+/.test(value)) return true

          return 'E-mail must be valid.'
        },
      ])
      const passwordRules = ref([
        value => {
          if (value) return true

          return 'E-mail is required.'
        }
      ])

      const submitLogin = async() => {
        console.error('yo')
        if(loginForm){
            try{
                // loggingUserIn.value = true
                const auth = getAuth();
                const signIn = await signInWithEmailAndPassword(auth,email.value, password.value)
                console.log(signIn)
                // if(signIn.user){
                //     loggingUserIn.value = false
                //     router.push('/account/')
                // }else{
                    
                //     loggingUserIn.value = false
                // }
            }catch(error){
                console.error(error)
                // errorBanner.value = true
                // loggingUserIn.value = false
                // const errorCode = error.code;
                // const errorMessage = error.message;
            }
        }else{

        }
      }
</script>