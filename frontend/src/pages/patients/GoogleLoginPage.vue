<template>
    <div></div>
</template>

<script>
import axios from 'axios';
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
    name: 'GoogleLoginPage',
    setup() {
        const route = useRoute();
        const router = useRouter();
        async function getGoogleToken(code) {
            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_API_ENDPOINT}/public/auth/google/token`, 
                    { code });
                if (response.status !== 200) {
                    throw new Error('Failed to get Google token');
                }
                localStorage.setItem("authToken", response.data.token)
                localStorage.setItem("refreshToken", response.data.refreshToken)
            } catch (error) {
                console.error(error);
            }
        }

        onMounted(async () => {
            const code = route.query.code;
            await getGoogleToken(code);
            router.push({ path: '/' });
        });
    },
};

</script>