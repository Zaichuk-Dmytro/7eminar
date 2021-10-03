<template>
  <div class="course-card">
    <div class="wrapper__img">
      <img :src="course.covers.main" alt="">
    </div>
    <div class="course-cart__content">
      <div class="course-card__title">
          <span v-html="course.title"></span> 
      </div>
      <div class="btn__wrapper">
        <button class="course-card__btn"
          :class="course.access? 'to-watch' : 'to-buy'"
        >
          <div class="btn__text">
            {{course.access? 'Дивитися' : 'Придбати'}}
          </div>
          <div class="right-chevron">
            <img src="../img/right-thin-chevron.png" alt="">
          </div>
        </button>   
      </div>
      
    </div>
  </div>
</template>

<script>
export default {
  name: 'course-card',
  props: {
    course: Object
  }
}
</script>

<style lang="scss" scoped>
  .course-card {
    width: 263px;
    height: 518px;
    margin-bottom: 21px;
    margin-right: 15px;

    .wrapper__img{
      width: 100%;
      height: 340px;

      img{
        max-width: 100%;
        min-height: 100%;
      }
    }

    .course-cart__content{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background-color: #ffffff;
      border: 1px solid #c7c7c7;
      border-top: none;
      height: 178px;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;

      .course-card__title{
        height: 61px;
        outline: hidden;
        padding: 20px 16px 0;
        font-size: 16px;
        font-weight: 500;
      }

      .btn__wrapper{
        display: flex;
        justify-content: center;

        .course-card__btn{
          display: flex;
          justify-content: space-between;
          align-items: stretch;
          width: 180px;
          height: 34px;
          border-radius: 17px;
          margin-bottom: 26px;
          font-size: 14px;
          font-weight: bold;

          text-transform: uppercase;

          &.to-watch{
            background-color: transparent;
            border: 1px solid #c7c7c7;
          }

          &.to-buy{
            color: #fff;
            background-color: #ed3434;
          }
          

          .btn__text{
            display: flex;
            align-items: center;
            flex-direction: row;
            flex-grow: 1;
            justify-content: center;
          }

          .right-chevron{
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #ed3434;
            height: 100%;
            width: 34px;
            border-radius: 17px;
          }
        }

      }
      
    }
  }
@media only screen and (max-width: 500px) {
  .course-card{
    margin-right: 0;
  }
}
</style>