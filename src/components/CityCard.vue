<template>
    <div class="flex py-6 px-3 bg-dark10 rounded-lg shadow-md cursor-pointer">
        <div class="flex flex-col flex-1 gap-2">
            <h2 class="text-3xl">{{ city.city }}</h2>
            <h3 class="capitalize">{{ city.state }}</h3>
        </div>

        <div class="flex flex-col items-center">
            <div class="flex flex-wrap">
                <img class="w-[50px] h-auto" :src="`http://openweathermap.org/img/wn/${city.weather.weather[0].icon}@4x.png`"
                    :alt="`${city.weather.weather[0].description}`">
                <p class="text-3xl self-end">
                    {{ Math.round(city.weather.main.temp) }}&deg;
                </p>
            </div>
            <div class="flex">
                <span class="text-sm">
                    {{ Math.round(city.weather.main.temp_max) }}&deg; / {{ Math.round(city.weather.main.temp_min) }}&deg;
                </span>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    city: {
        type: Object,
        default: () => { },
    }
});
</script>