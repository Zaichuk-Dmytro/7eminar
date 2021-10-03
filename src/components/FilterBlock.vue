<template>
  <div class="filter-block">
    <div class="filter__header">
      <div class="filter-name__wrapper">
        <div 
          class="filter__icon"  
          :class="icon"          
        >
        </div>
        <div class="filter-name">
          {{title}}
        </div>
      </div>
      <div 
        class="filter-header__chevron"
      > 
        <button
          @click="open = !open"
        >
          <img src="../img/chevron.png" alt="">
        </button>
      </div>
    </div>
    <div 
      class="filter__content"
      v-if="open"  
    >
      <ul class="filter__list">
        <li
          v-for="(item, index) in items" 
          :key="index"
          class="filter__list-item"
          :class="{'active' : isSelected(item)}"
        >
          <input 
            v-if="multiple"
            v-model="syncSelected"
            :id="index + 'checkbox' + title"
            type="checkbox"
            :value="item.value"
          > 
          
            <label 
              :for="index + 'checkbox' + title"
              @click="select(item)"  
            >
              {{item.title}} ({{item.count}})
            </label>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'filter-block',
  data: () => ({
    open: true,
  }),
  props: {
    icon: {
      type: String,
      required: true
    },
    title: String,
    items: Array,
    multiple: Boolean,
    selected: [Array, String] 
  },
  methods: {
    select(item) {
      if (!this.multiple) {
        this.syncSelected = item.value
      }
    },
    isSelected(item) {
      if (this.multiple) {
        return this.syncSelected.some(selected => selected == item.value)
      } else {
        return this.syncSelected == item.value
      }
    }
  },
  computed: {
    syncSelected: {
      get() {
        return this.selected
      },
      set(val) {
        this.$emit('update:selected', val)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .filter-block{
    border-radius: 10px;
    margin-bottom: 15px;

    .filter__header{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 15px;
      height: 40px;
      background-color: #e6e6e6;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;

      &:last-child{
        border-radius: 10px;
      }

      .filter-name__wrapper{
        display: flex;
        flex-grow: 1;

        .filter-name{
          display: flex;
          align-items: center;
          margin-left: 9px;
          font-size: 14px;
          font-weight: bold;
          text-transform: uppercase;
        }

        .filter__icon {
          width: 20px;
          height: 20px;

          &.video{
            background: url('../img/video.png') ;
          }

          &.list2{
            background: url('../img/list2.png') ;
          }
        }
      }

      .filter-header__chevron{
        width: 20px;
        height: 20px;

        button {
          background-color: transparent;
        }
      }
      
    }

    .filter__content{
      height: 178px;
      border: 1px solid #e6e6e6;
      padding: 15px;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;

      .filter__list{
        font-size: 14px;

        .filter__list-item{
          cursor: pointer; 

          &:not(:last-child) {
            margin-bottom: 10px;
          }


          label {
            cursor: pointer; 
            height: 16px;
          }

          &.active{
            color: red;
          }

          
          input:checked{
            display: none;
          }

          input:checked+label::before {
            content: '';
            display: inline-block;
            margin: 3px 3px 0px 4px;
            width: 13px;
            height: 13px;
            border-radius: 2px;
            background-size: 100%;
            background-repeat: no-repeat;
            background-position: center center;
            background-image: url("../img/custom-checkbox.png");
          }
        }
      }
    }
  }
</style>