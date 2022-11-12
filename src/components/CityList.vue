<template>
    <div v-for="city in savedCities" :key="city.id">
        <CityCard @click="goCityView(city)" :city="city" />
    </div>

    <p v-if="savedCities.length === 0">
    Nenhuma localização foi salva ainda.
    </p>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import CityCard from './CityCard.vue';

const MAPBOX_API_KEY = "";
const OPENWEATHERMAP_API_KEY = "";

const savedCities = ref([]);

const getCities = async () => {
    if (localStorage.getItem('savedCities')) {
        savedCities.value = JSON.parse(localStorage.getItem('savedCities'));

        const requests = [];
        savedCities.value.forEach((city) => {
            requests.push(
                axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${city.coords.lat}&lon=${city.coords.lng}&appid=${OPENWEATHERMAP_API_KEY}&units=metric&lang=pt_br`)
            )
        });

        const weatherData = await Promise.all(requests);

        await new Promise((res) => setTimeout(res, 1000));

        weatherData.forEach((value, index) => {
            savedCities.value[index].weather = value.data;
        });
    };
};

await getCities();

const router = useRouter();
const goCityView = (city) => {
    router.push({
        name: 'city',
        params: {
            state: city.state,
            city: city.city
        },
        query: {
            id: city.id,
            lat: city.coords.lat,
            lng: city.coords.lng
        }
    });
};
</script>