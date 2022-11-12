<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input v-model="searchQuery" @input="getSearchResults" type="text" placeholder="Procure por uma cidade ou estado"
        class="py-2 px-1 w-full bg-transparent border-b focus:border-dark20 focus:outline-none focus:shadow-[0px_1px_0_0_#191919]">
      <ul v-if="mapboxSearchResults" class="absolute bg-dark30 text-white w-full shadow-md top-[66px] rounded-lg">
        <p v-if="searchError" class="px-4 py-4">
          Algo deu errado! 😥 Tente novamente.
        </p>

        <p v-if="!searchError && mapboxSearchResults.length === 0" class="px-4 py-4">
          Nenhum resultado encontrado.
        </p>
        <template v-else>
          <li v-for="searchResult in mapboxSearchResults" :key="searchResult.id" @click="previewCity(searchResult)"
            class="px-4 py-4 cursor-pointer hover:text-[#a0a0a0] duration-200">
            {{ searchResult.place_name }}
          </li>
        </template>
      </ul>
    </div>

    <div class="flex flex-col gap-4">
      <Suspense>
        <CityList />
        <template #fallback>
          <CityCardSkeleton />
        </template>
      </Suspense>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import CityList from "@/components/CityList.vue";
import CityCardSkeleton from "@/components/CityCardSkeleton.vue";

const router = useRouter();

const previewCity = (searchResult) => {
  const [city, state] = searchResult.place_name.split(",");
  router.push({
    name: "city",
    params: { state: state.substring(1, state.length), city: city },
    query: {
      lat: searchResult.geometry.coordinates[1],
      lng: searchResult.geometry.coordinates[0],
      preview: true,
    },
  });
};

const searchQuery = ref('');
const queryTimeout = ref(null);
const mapboxSearchResults = ref(null);
const searchError = ref(null);

const MAPBOX_API_KEY = "";
const OPENWEATHERMAP_API_KEY = "";

const getSearchResults = () => {
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== '') {
      try {
        const result = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${MAPBOX_API_KEY}&types=place`);
        mapboxSearchResults.value = result.data.features;
      } catch {
        searchError.value = true;
      }
      return;
    };
    mapboxSearchResults.value = null;
  }, 300);
};
</script>