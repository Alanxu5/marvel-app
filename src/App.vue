<template>
  <div id="app">
    <p>
      <!-- <router-link to="/">Go to home</router-link> -->
      <!-- <router-link to="/table">Go to table</router-link> -->
    </p>
    <router-view></router-view>
    <!-- <modal name="info-modal" height="auto" :scrollable="true"></modal>  -->
  </div>
</template>

<script>
import VueRouter from 'vue-router'

export default {
  name: "app",
  created() {
    this.$root.$on('comic-click', item => {
      this.openComicModal(item);
    });
  },

  methods: {
// <img :src=this.data.image>
    //   this.$modal.show({
    //     template: `
    //       <div>
    //         <h3> {{this.data.name}} </h3>
    //         <h3>Comics featuring {{this.data.name}}</h3>
    //         <ul>
    //           <li v-for="item in comicData" v-on:click="$root.$emit('comic-click', item)">
    //             {{ item.title }}
    //           </li>
    //         </ul>
    //       </div>
    //     `,
    //       props: ["data", "comicData"]
    //     },
    //     {
    //       data: data,
    //       comicData: formattedData,
    //     }, {
    //       height: 'auto'
    //     },
    //   );
    // },
    // formatCharacterData: function(results) {
    //   const characterData = [];
    //   results.forEach(result => {
    //     let characterObj = {};
    //     characterObj.id = result.id;
    //     characterObj.name = result.name;
    //     characterData.push(characterObj);
    //   });

    //   return characterData;
    // },

    // openComicModal: async function(item) {
    //   console.log(item);

    //   let characterData = [];
    //   // make api call with comic id to get characters of that comic
    //   const marvelPublicKey = "244f518b9b870e77c5aa4f0e9d5fa957";
    //   try {
    //     const response = await fetch(
    //       `https://gateway.marvel.com:443/v1/public/comics/${item.id}/characters?apikey=${marvelPublicKey}`,
    //       {
    //         method: "GET",
    //         headers: {
    //           "Content-Type": "application/json"
    //         }
    //       }
    //     );
    //     if (response.ok) {
    //       const responseJson = await response.json();
    //       characterData = this.formatCharacterData(responseJson.data.results);
    //     }
    //   } catch (e) {
    //     console.error("Api call failed", e);
    //   }

    //   this.$modal.show({
    //     template: `
    //       <div>
    //         <h3>Characters in {{this.comicData.title}}</h3>
    //         <ul>
    //           <li v-for="item in characterData" v-on:click="$root.$emit('character-click', item)">
    //             {{ item.name }}
    //           </li>
    //         </ul>
    //       </div>
    //     `,
    //       props: ["characterData", "comicData"]
    //     },
    //     {
    //       characterData: characterData,
    //       comicData: item
    //     });
      // show new modal
    },
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}
</style>
