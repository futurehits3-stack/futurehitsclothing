<template>
<div>
    <v-main>
        <pre>{{ data }}</pre>
    </v-main>
</div>
</template>

<script setup>
const params = useRoute().params
const queryG = groq `*[_type == "products"]`
const sanity = useSanity()
const {
    data
} = await useAsyncData('yo', () => sanity.fetch(queryG))

console.log(data)
// try {
//     await useSanityQuery(queryG)
// } catch (error) {
//     console.log(error)
// }

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
</style>
