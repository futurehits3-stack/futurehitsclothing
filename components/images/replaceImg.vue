<template>
    <v-img :src="replaceImgString(image)"></v-img>
</template>
<script setup>
    const props =  defineProps({
        image: {
            type: String,
        required: true
        }
        
    })
    const { image } = props;
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
</script>