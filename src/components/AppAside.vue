<template>
  <aside class="app-aside">
    <filter-block
      icon="video"
      title="Відео"
      :items="videoTypes"
      multiple
      :selected.sync="syncVideo"
    />
    <filter-block
      icon="list2"
      title="Теми"
      :items="themeTypes"
      :selected.sync="syncTheme"
    />
  </aside>
</template>

<script>
export default {
  name: 'app-aside',
  props: {
    courses: Array,
    filterByVideoTypes: Array,
    filterByThemeTypes: String
  },
  created() {
  },
  methods: {
   
    filterInOption(key) {
      return this.courses.filter(item => item.options[key])
    },

    filterByDate() {
      return this.courses.filter(item => {
        let date =  new Date(item.date)
        return date.getMonth() == 6
      })
    },
    filterByTheme(value) {
      return this.courses.filter(item => item.theme == value)
    }
  },
  computed: {
    videoTypes() {
      let video = [
        {value: 'sale', title: 'Акція', count: 0},
        {value: 'popular', title: 'Популярні', count: 0},
        {value: 'new', title: 'Новинки', count: 0},
      ]
      video.forEach(item => {
        if (item.value == 'new') {
          item.count = this.filterByDate().length
        } else {            
          item.count = this.filterInOption(item.value).length
        }
      })
      return video
    },
    themeTypes() {
      let themes = [
        {value: 'All', title: 'Всі теми', count: 0},
        {value: 'business_trips', title: 'Відрядження', count: 0},
        {value: 'currency', title: 'Валюта', count: 0},
        {value: 'production', title: 'Виробництво і собівартість', count: 0},
        {value: 'vacation', title: 'Відпустки', count: 0},
        {value: 'excise_tax', title: 'Акцизний податок', count: 0}
      ]
      themes.forEach(item => {
        if (item.value == 'All') {
          item.count = this.courses.length
        } else {
          item.count = this.filterByTheme(item.value).length
        }
      })
      return themes
    },
    syncTheme: {
      get() {
        return this.filterByThemeTypes
      },
      set(val) {
        this.$emit('update:filterByThemeTypes', val)
      }
    },
    syncVideo: {
      get() {
        return this.filterByVideoTypes
      },
      set(val) {
        this.$emit('update:filterByVideoTypes', val)
      }
    }
  }

}
</script>
<style lang="scss" scoped>
  .app-aside{

    z-index: 9999;
    min-height: 100%;
    padding: 30px 15px;
    background-color: #ffffff;
    max-width: 280px;
    min-width: 280px;
    box-shadow: 3px 3px 50px 0px rgba(0,0,0, .2);
  }


@media only screen and (max-width: 1185px) {
  .app-aside{
    position: absolute;
    left: 0;
  }
}
 
</style>