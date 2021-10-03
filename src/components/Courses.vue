<template>
  <div class="wrapper__courses">
    <div class="courses_header">
      <span>УСІ ВІДЕО</span>
      <div class="header-actions">
        <input 
          type="text"
          class="courses__search"
        >
        <div class="mode__btns">
          <button class="btn__grid"></button>
          <button class="btn__list"></button>
        </div>
        
      </div>
    </div>
    <div class="curses__list">
      <course-card 
        v-for="(item, index) in data" 
        :key="index"
        :course="item"
      >
      <!-- <img :src="item.covers.main" alt=""> -->

      </course-card>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'courses',
  props: {
    data: Array,
  }
}
</script>

<style lang="scss" scoped>
  .wrapper__courses{
    padding: 45px 30px;

    .courses_header{
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #232323;
      font-size: 25px;
      padding-bottom: 35px;

      .header-actions{
        display: flex;
        flex-wrap: wrap;
        
        .courses__search{
          background: url('../img/search.png') no-repeat center ;
          background-position: right 8px center;
          padding: 0 8px;
          background-color: #fff;
          height: 27px;
          width: 195px;
          border-radius: 5px;
        }
        .mode__btns{
          display: flex;
          
          .btn__grid, .btn__list{
            outline: none;
            width: 24px;
            height: 24px;
          }
          .btn__grid{
            margin-left:  21px;
            background: url('../img/grid.png') no-repeat ; 
          }

          .btn__list{
            margin-left:18px;
            background: url('../img/list.png') no-repeat ; 
          }
        }
        
      }
     
    }

    .curses__list{
      display: flex;
      align-content: center;
      flex-wrap: wrap;
      
    }
  }

@media only screen and (max-width: 500px) {
  .wrapper__courses {
    padding: 30px;
    
    .courses_header{
      flex-direction: column-reverse;
      padding: 0;
      padding-bottom: 30px;
    
      .header-actions{
        justify-content: center;
        align-items: center;

        .mode__btns {
          margin: 24px auto;
        }
      }

      .curses__list{
        padding: 0 30px;
      }
    }  
  }
}
</style>