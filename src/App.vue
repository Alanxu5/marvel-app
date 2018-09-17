<template>
  <div id="app">
    <marvel-table></marvel-table>
    <vue-good-table
      id="vue-table"
      :columns="columns"
      v-bind:rows= "rows"
      :lineNumbers="true"
      @on-page-change="onPageChange"
      @on-row-click="onRowClick"
      :pagination-options="{
        enabled: true,
        perPageDropdown: [10],
      }"/>
      <modal name="hello-world" height="auto" :scrollable="true" v-on:comic-click="toggleComicModal"></modal>
      <modal name="comic-characters" height="auto" :scrollable="true"></modal>
  </div> 
</template>

<script>
import MarvelTable from "./components/MarvelTable";
import { VueGoodTable } from "vue-good-table";
import "vue-good-table/dist/vue-good-table.css";

export default {
  name: "app",
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

  components: {
    MarvelTable,
    VueGoodTable
  },

  created() {
    this.getCharacters(0);
  },

  methods: {
    onPageChange: function(e) {
      console.log(e);
      if (e.currentPage == e.total) {
        const offset = e.currentPerPage * e.currentPage;
        this.getCharacters(offset);
      }
    },

    onRowClick: function(e) {
      console.log(e);
      this.$modal.show({
        template: `
          <div>
            <h3>Comics</h3>
            <img :src=this.data.image>
            <ul>
              <li v-for="item in this.data.comicsArr" v-on:click="$emit('comic-click', item)">
                {{ item.name }}
              </li>
            </ul>
          </div>
        `,
          props: ["data"]
        },
        {
          data: e.row,
        }, {
          height: 'auto'
        }
      );
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
          console.log(responseJson);
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
        charObj.discription = result.description;
        charObj.comics = result.comics.available;
        charObj.stories = result.stories.available;
        charObj.series = result.series.available;
        rows.push(charObj);
      });

      this.rows = [...this.rows, ...rows];
    },

    toggleComicModal: function(e) {
      console.log(e);
    },
  }
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
