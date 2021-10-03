<template>
  <div class="layout">
    
      <div class="app-header__wrapper">
        <header class="app-header">
          <div>
            <img src="../img/logo.png" alt="">
          </div>
          <button
            v-if="mobileView" 
            @click="show"
            class="menu__btn"
          >
            <img src="../img/menu.png" alt="">
            <span>Меню</span>
          </button>
        </header>
      </div>
      <div class="wrapper">
        <overlay/>
      <div class="layout__wrapper">
        <transition name="slide-menu">
          <app-aside
            v-if="!mobileView || showMenu"
            :courses="data"
            :filterByVideoTypes.sync="filterByVideoTypes"
            :filterByThemeTypes.sync="filterByThemeTypes"
          ></app-aside>
          </transition>
        <courses
          :data="filtred"
        ></courses>
      </div> 
      <footer
        class="app__footer"
      >
      </footer>   
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'layout',
  data: () => ({
    data: [],
    filtred: [],
    showMenu: false,
    width: '',
    filterByThemeTypes: 'All',
    filterByVideoTypes: []
  }),
  async created() {
    this.data = await import ('../api/data.json').then( res => res.default)
    this.filtred = this.data.slice(0)
    
    window.addEventListener('resize', this.updateWidth)
    this.updateWidth()
  },
  computed: {
    mobileView() {
      return this.width <= 1185
    }
  },
  methods: {
    filter(byTheme, byVideo) {
      let items = this.data
      if (byTheme || byVideo.length) {
        items = items.filter(item => {
          let theme = !byTheme || byTheme == 'All' || (item.theme == byTheme),
            video = !byVideo.length || byVideo.some(el => {
              if (el == 'new') {
                let date =  new Date(item.date)
                return date.getMonth() == 6
              } else {
                return item.options[el]
              }            
            })
          return theme && video
        })
      }
      this.filtred = items
      this.show()
    },
    updateWidth() {
      this.width = window.innerWidth
    },
    show() {
      if (!this.mobileView) {
        return
      }
      if ( this.showMenu) {
        this.$root.$emit('hideOverlay')        
      } else {
        this.$root.$emit('showOverlay', () => this.showMenu = false)
        setTimeout(() => {
          this.showMenu = true
        })
      }
    }
  },
  watch: {
    filterByThemeTypes(val) {
      this.filter(val, this.filterByVideoTypes)
    },
    filterByVideoTypes(val) {
      this.filter(this.filterByThemeTypes, val)
    }
  } 
}
</script>

<style lang="scss" scoped >

  .layout{
    overflow:hidden;
    height: 100vh;

    .app-header__wrapper{
        display: flex;
        align-items: center;
        background-color: #232323;
        height: 45px;

        .app-header{
          display: flex;
          justify-content:space-between ;
          width: 1170px;
          margin: 0 auto;

          .menu__btn{ 
            margin-right: 15px;
            height: 34px; 
            padding: 0 12px;
            border: 1px solid #ffffff;
            border-radius: 17px;
            font-size: 14px;
            background-color: transparent;
            text-transform: uppercase;
            color: #fff;
            span{
              margin-left: 5px;
            }
          }
        }
      }

    .wrapper{
      height: 100vh;
      overflow: auto;

      

      .layout__wrapper{
        display: flex;
        justify-content: center;
        max-width: 1175px;
        min-height: 100vh;
        margin: 0 auto;
  
      }

      .app__footer{
        height: 240px;
        background-color: #434343;
      }
    }
  }
  .slide-menu-enter-active, .slide-menu-leave-active{
    transition: all .3s ease;
  }
  .slide-menu-enter, .slide-menu-leave-to  {
    left: -1000px;
  }
</style>
<style >
  
</style>