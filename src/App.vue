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
      <modal name="info-modal" height="auto" :scrollable="true"></modal>
      <!-- <modal name="comic-modal" height="auto" :scrollable="true"></modal> -->
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

      rows: [
        {
          name: 'alan',
          description: 'test',
          comicsArr: [{name: 'test', id:'123'}, {name: 'test1', id:'234'}],
        }
      ]
    };
  },

  components: {
    MarvelTable,
    VueGoodTable
  },

  created() {
    this.getCharacters(0);
    this.$root.$on('comic-click', item => {
      this.openComicModal(item);
    });
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
            <h3> {{this.data.name}} </h3>
            <img :src=this.data.image>
            <h3>Comics featuring {{this.data.name}}</h3>
            <ul>
              <li v-for="item in this.data.comicsArr" v-on:click="$root.$emit('comic-click', item)">
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
        },
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
        // need to move result.id into the comicsArr
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

    openComicModal: function(item) {
      console.log(item);
      // make api call with id
      this.$modal.hide('info-modal');
      this.$modal.show({
        template: `
          <div>
            <h3>{{this.data.name}}</h3>
            <h3>Image?</h3>
            <h3>Characters in {{this.data.name}}</h3>
          </div>
        `,
          props: ["data"]
        },
        {
          data: item,
        });
      // show new modal
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
