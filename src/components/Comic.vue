<template>
  <div id="comic">
    <router-link to="/">Home</router-link>
      <h3>Characters in {{ this.title }}</h3>
      <ul>
        <li v-for="(item, index) in characterData" :key=index v-on:click="getCharacterData(item)">
          {{ item.name }}
        </li>
      </ul>
  </div>
</template>
<script>
export default {
  name: "comic",
  created() {
    this.characterData = this.$route.params.characterData;
    this.title = this.$route.params.title;
  },

  methods: {
    getCharacterData: async function(item) {
      const marvelPublicKey = "244f518b9b870e77c5aa4f0e9d5fa957";
      let formattedData = [];
      try {
        const response = await fetch(
          `https://gateway.marvel.com:443/v1/public/characters/${item.id}/comics?apikey=${marvelPublicKey}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
        if (response.ok) {
          const responseJson = await response.json();
          formattedData = this.formatComicData(responseJson.data.results);
        }
      } catch (e) {
        console.error("Api call failed", e);
      }

      // go to component that shows the comics the specific character is in
      this.$router.push({name: 'character', params: { data: item, formattedData: formattedData }});      
    },

    formatComicData: function(results) {
      const comicData = [];

      results.forEach(result => {
        let comicObj = {};
        comicObj.id = result.id;
        comicObj.title = result.title;
        comicData.push(comicObj);
      });

      return comicData;
    },      
  }
}
</script>

<style lang="scss">
  li:hover {
    cursor: pointer;
  }
</style>
