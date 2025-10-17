import { defineStore } from "pinia";

// import { collection, addDoc,updateDoc,doc } from "firebase/firestore"; 
export const useBagStore = defineStore('cartStore', {
    state: () => ({
        bag: [],
        bagQuantity: 0
    }),
    actions: {
        async addToBag (productID, quantity,data,size,swatchColor,image, productComparePrice){
            const bagLocal = localStorage.getItem("bagLocal")
            let productFound = false
            const passObj = {
                productID,
                productQuantity: quantity,
                productSlug: data.slug,
                productPrice: data.productPrice,
                productComparePrice: productComparePrice,
                productTitle: data.productTitle,
                productSlug: data.slug.current,
                productSize: size,
                productDesc: data.productDescription[0].children[0].text,
                productType: data.productType,
                isProductAvailable: data.isProductAvailable,
                productVariantColor: swatchColor,
                productImage: image
            }
            if(bagLocal){
                const theirCurrentBag = JSON.parse(bagLocal)
                for (let i = 0; i < theirCurrentBag.length; i++) {
                    const b = theirCurrentBag[i];
                    if(b.productTitle === data.productTitle && b.productSize === size && b.productVariantColor === swatchColor){
                        productFound = true
                        b.productQuantity = b.productQuantity + quantity
                    }
                    
                }
                if(!productFound){
                    theirCurrentBag.push(passObj)
                }
                localStorage.setItem('bagLocal', JSON.stringify(theirCurrentBag))
                // //set Localstorage
                this.bag = theirCurrentBag
                this.updateBagCounter(theirCurrentBag)
            }else{
                let finalBagOBJ = []
                this.bag.push(passObj)
                finalBagOBJ.push(passObj)
                localStorage.setItem('bagLocal', JSON.stringify(finalBagOBJ))
                this.updateBagCounter(this.bag)
            }
            return true

            //later use when i have the auth working
            //const bag = localStorage.getItem("bagID");
            // const db = useFirestore()
            // if(bag){

            // }else{
            //     const docRef = await addDoc(collection(db, "cities"), {
            //         name: "Tokyo",
            //         country: "Japan"
            //     });
            //     localStorage.setItem("bagID", 'FHID-'+docRef.id);
            //     const washingtonRef = doc(db, "cities", docRef.id);
            // }
            
            

            // // Set the "capital" field of the city 'DC'
            // await updateDoc(washingtonRef, {
            // bagID: docRef.id
            // });

        },
        updateBagCounter(bag){
            let bagCounter = 0
            if(bag){
                for (let i = 0; i < bag.length; i++) {
                    const ele = bag[i];
                    bagCounter += ele.productQuantity
                }
                this.getBagQuantity()
            }
        },
        getBagQuantity(){
            const bagLocal = localStorage.getItem("bagLocal")
            let parsedBagCounter = 0
            if(bagLocal){
                const parsedBAG = JSON.parse(bagLocal)
                for (let i = 0; i < parsedBAG.length; i++) {
                    const el = parsedBAG[i];
                    parsedBagCounter += el.productQuantity
                }
                this.bag = parsedBAG
                return this.bagQuantity = parsedBagCounter
            }
        }
    }
})