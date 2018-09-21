<template>
  <div id="character">
    <router-link to="/">Home</router-link>
     <div>
       <h3>Comics featuring {{this.data.name}}</h3>
       <ul>
         <li v-for="(item, index) in formattedData" :key=index v-on:click="getCharacterData(item)">
           {{ item.title }}
         </li>
       </ul>
     </div>
  </div>
</template>
<script>
export default {
  name: "character",
  async created() {
    this.data = this.$route.params.data;
    this.formattedData = this.$route.params.formattedData;
  },

  methods: {
    getCharacterData: async function(item) {
      const id = item.id;
      let characterData = [];

      // make api call with comic id to get characters of that comic
      const marvelPublicKey = "244f518b9b870e77c5aa4f0e9d5fa957";
      try {
        const response = await fetch(
          `https://gateway.marvel.com:443/v1/public/comics/${id}/characters?apikey=${marvelPublicKey}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
        if (response.ok) {
          const responseJson = await response.json();
          characterData = this.formatCharacterData(responseJson.data.results);
        }
      } catch (e) {
        console.error("Api call failed", e);
      }

      this.$router.push({name: 'comic', params: { characterData: characterData, title: item.title }});
    },

    formatCharacterData: function(results) {
      const characterData = [];
      results.forEach(result => {
        let characterObj = {};
        characterObj.id = result.id;
        characterObj.name = result.name;
        characterData.push(characterObj);
      });
       return characterData;
    },
  }
}
</script>

<style lang="scss">
  li:hover {
    cursor: pointer;
  }
</style>  