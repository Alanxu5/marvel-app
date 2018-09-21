<template>
  <div id="home">
    <vue-good-table
      id="vue-table"
      :columns="columns"
      v-bind:rows= "rows"
      :lineNumbers="true"
      @on-page-change="onPageChange"
      @on-row-click="characterRowClick"
      :pagination-options="{
        enabled: true,
        perPageDropdown: [10],
      }"/>
  </div>
</template>

<script>
import { VueGoodTable } from "vue-good-table";
import "vue-good-table/dist/vue-good-table.css";

export default {
  name: "home",

  components: {
    VueGoodTable
  },  

  data() {
    return {
      columns: [
        {
          label: "Name",
          field: "name",
          type: "string",
          filterOptions: {
            enabled: true,
            placeholder: "Search characters"
          }
        },
        {
          label: "Description",
          field: "description",
          type: "string"
        },
        {
          label: "Number of comics featured in",
          field: "comics",
          type: "number"
        },
        {
          label: "Number of stories featured in",
          field: "stories",
          type: "number"
        },
        {
          label: "Number of series featured in",
          field: "series",
          type: "number"
        }
      ],

      rows: []
    };
  },

  created() {
    this.getCharacters(0);
    this.$root.$on('character-row-click', item => {
      this.characterRowClick(item);
    });
  },

  methods: {
    onPageChange: function(e) {
      if (e.currentPage == e.total) {
        const offset = e.currentPerPage * e.currentPage;
        this.getCharacters(offset);
      }
    },

    // when a row in the table is clicked show the modal with character and the comics it is featured in
    characterRowClick: async function(e) {
      const data = {};
      
      // normalize data
      if (e.row) {
        data.id = e.row.id;
        data.name = e.row.name;
      } else {
        data.id = e.id;
        data.name = e.name;
      }

      // call api to get comics for particular character and the comic's ids
      const marvelPublicKey = "244f518b9b870e77c5aa4f0e9d5fa957";
      let formattedData = [];
      try {
        const response = await fetch(
          `https://gateway.marvel.com:443/v1/public/characters/${data.id}/comics?apikey=${marvelPublicKey}`,
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
      this.$router.push('info')
    },

    getCharacters: async function(offset) {
      const marvelPublicKey = "244f518b9b870e77c5aa4f0e9d5fa957";
      try {
        const response = await fetch(
          `https://gateway.marvel.com:443/v1/public/characters?limit=20&offset=${offset}&apikey=${marvelPublicKey}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
        if (response.ok) {
          const responseJson = await response.json();
          this.formatData(responseJson);
        }
      } catch (e) {
        console.error("Api call failed", e);
      }
    },

    formatData: function(response) {
      const rows = [];

      response.data.results.forEach(result => {
        let charObj = {};
        charObj.id = result.id;
        charObj.comicsArr = result.comics.items;
        charObj.name = result.name;
        charObj.image = `${result.thumbnail.path}/standard_medium.${result.thumbnail.extension}`;
        charObj.description = result.description;
        charObj.comics = result.comics.available;
        charObj.stories = result.stories.available;
        charObj.series = result.series.available;
        rows.push(charObj);
      });

      this.rows = [...this.rows, ...rows];
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
};
</script>

<style lang="scss">
</style>
