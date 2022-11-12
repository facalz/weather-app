<template>
    <header class="sticky top-0 bg-dark30 shadow-lg">
        <nav class="container flex flex-col sm:flex-row items-center gap-4 text-white py-6">
            <RouterLink :to="{ name: 'home' }">
                <div class="flex items-center gap-3 hover:text-[#a0a0a0] duration-200">
                    <img src='/favicon.ico' class="h-9" alt="Logo" />
                    <p class="text-2xl">Clima</p>
                </div>
            </RouterLink>

            <div class="flex gap-3 flex-1 justify-end">
                <i @click="toggleModal"
                    class="fa-solid fa-circle-info text-xl hover:text-[#a0a0a0] duration-200 cursor-pointer"></i>
                <i @click="addCity" v-if="route.query.preview"
                    class="fa-solid fa-plus text-xl hover:text-[#a0a0a0] duration-200 cursor-pointer"></i>
            </div>

            <BaseModal :modalActive="modalActive" @close-modal="toggleModal">
                <div class="text-black">
                    <h1 class="text-2xl mb-1">Sobre:</h1>
                    <p class="mb-4">
                        O site permite que você acompanhe o clima atual e futuro das cidades de sua escolha.
                    </p>
                    <h2 class="text-2xl">Como funciona:</h2>
                    <ol class="list-decimal list-inside mb-4">
                        <li>
                            Pesquise uma cidade digitando o nome na barra de pesquisa.
                        </li>
                        <li>
                            Selecione a cidade nos resultados, isso o levará ao clima atual para sua seleção.
                        </li>
                        <li>
                            Acompanhe a cidade clicando no ícone "+" no canto superior direito. Isso salvará a cidade
                            para ver mais tarde na página
                            inicial.
                        </li>
                    </ol>

                    <h2 class="text-2xl">Removendo uma cidade:</h2>
                    <p>
                        Se você não deseja mais rastrear uma cidade, basta selecionar a cidade na página inicial. Na
                        parte inferior da página,
                        haverá uma opção para excluir a cidade.
                    </p>
                </div>
            </BaseModal>
        </nav>
    </header>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { uid } from 'uid';
import BaseModal from './BaseModal.vue';

const route = useRoute();
const router = useRouter();

const savedCities = ref([]);

const addCity = () => {
    if (localStorage.getItem("savedCities")) {
        savedCities.value = JSON.parse(localStorage.getItem("savedCities"));
    };

    const locationObj = {
        id: uid(),
        state: route.params.state,
        city: route.params.city,
        coords: {
            lat: route.query.lat,
            lng: route.query.lng,
        },
    };

    savedCities.value.push(locationObj);

    localStorage.setItem("savedCities", JSON.stringify(savedCities.value));

    let query = Object.assign({}, route.query);

    delete query.preview;

    query.id = locationObj.id;

    router.replace({ query });
};

const modalActive = ref(null);
const toggleModal = () => {
    modalActive.value = !modalActive.value;
};
</script>