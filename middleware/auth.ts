export default defineNuxtRouteMiddleware(async (to, from) => {
  try {
    const user = await getCurrentUser()
    // redirect the user to the login page
    
    if(import.meta.client){
      if(!user){
        return navigateTo({
          path: '/',
          query: {
            redirect: to.fullPath,
          },
        })
      }else{
        if (!user.uid) {
          return navigateTo({
            path: '/',
            query: {
              redirect: to.fullPath,
            },
          })
        }
      }
      
    }
    
   
  } catch (error) {
    console.log(error);
  }
    
  })