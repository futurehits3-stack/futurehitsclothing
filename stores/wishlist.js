import { defineStore } from "pinia";

export const useWishListStore = defineStore('wishlistStore', {

    state: () => ({
        wishList: [],
        wishListQuantity: 0,
        wishListActive : false
    }),
    actions: {
        async addToWishlist(id , data){
            const wishlistLocal = localStorage.getItem("FHWishlist")
            let productFound = false
            let passObj = {
                id,
                slug: data.slug.current,
                isProductAvailable: data.productVariants[0].isProductVariantAvailable,
                productPrice: data.productVariants[0].variantPrice,
                productTitle: data.productTitle,
                productImage: data.productVariants[0].variantPhoto.asset._ref,
                productComparePrice: data.productVariants[0].variantComparePrice
            }
            const theirCurrentWishList = JSON.parse(wishlistLocal)
            if(wishlistLocal){
                
                if(theirCurrentWishList.length > 0){
                    for (let i = 0; i < theirCurrentWishList.length; i++) {
                        const b = theirCurrentWishList[i];
                        
                        if(b.productTitle === data.productTitle){
                            productFound = true
                            // b.productQuantity = b.productQuantity + quantity
                        }
                        
                    }
                    if(!productFound){
                        theirCurrentWishList.push(passObj)
                        localStorage.setItem('FHWishlist', JSON.stringify(theirCurrentWishList))
                    }else{
                        return "found"
                    }
                }
                this.wishList = theirCurrentWishList
            }else{
                this.wishList = [passObj]
                localStorage.setItem('FHWishlist', JSON.stringify([passObj]))
            }
        },
        getWishlist(){
            const wishlistLocal = JSON.parse(localStorage.getItem("FHWishlist"))
            if(wishlistLocal){
                if(wishlistLocal.length === 0){
                    localStorage.setItem('FHWishlist', JSON.stringify([]))
                    this.wishList = []
                }else{
                    this.wishList = wishlistLocal
                }
            }else{
                this.wishList = []
            }
            
        },
        getWishlistQuantity(){
            const wishListLocal = localStorage.getItem("FHWishlist")
            // let parsedBagCounter = 0
            if(wishListLocal){
                const parsedList = JSON.parse(wishListLocal)
                if(parsedList.length > 0){
                    this.wishListActive = true
                    return true
                }else{
                    this.wishListActive = false
                    return false
                }
                // for (let i = 0; i < parsedBAG.length; i++) {
                //     const el = parsedBAG[i];
                //     parsedBagCounter += el.productQuantity
                // }
                // this.bag = parsedBAG
                // return this.bagQuantity = parsedBagCounter
            }else{
                
            }
        }
    }
})