<template>
  <div class="main-container">
    <!-- <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh" /> -->
    <van-swipe :autoplay="3000" class="swipe">
      <van-swipe-item>
        <img @click="goto_href()" class="swipe-item" src="../assets/img/docks.jpg" />
      </van-swipe-item>
      <van-swipe-item>
        <img @click="goto_href()" class="swipe-item" src="../assets/img/section.jpg" />
      </van-swipe-item>
      <van-swipe-item>
        <img @click="goto_href()" class="swipe-item" src="../assets/img/sunshine.jpg" />
      </van-swipe-item>
      <van-swipe-item>
        <img @click="goto_href()" class="swipe-item" src="../assets/img/house.jpg" />
      </van-swipe-item>
    </van-swipe>
    <v-card color="grey darken-3">
      <v-container fluid style=" min-height: 0; " grid-list-md>
        <v-layout row wrap>
          <v-flex xs12 v-for="card in datas " :key="card.id ">
            <v-card ripple color="grey darken-4" class="white--text " @click.native="goto_href(card.href)">
              <v-container fluid grid-list-lg>
                <v-layout row>
                  <v-flex xs5>
                    <v-card-media :src="card.src" height="60px" contain></v-card-media>
                  </v-flex>
                  <v-flex xs7>
                    <div>
                      <div class="subheading">{{card.title}}</div>
                      <div class="caption van-ellipsis">{{new Date().toLocaleString()}}</div>
                    </div>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
    <!-- <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore" style="color:white" loadingText="正在加载"></mu-infinite-scroll> -->
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'News',
  data() {
    return {
      is_loading: false,
      loading: false,
      refreshing: false,
      trigger: null,
      scroller: null
    }
  },
  computed: {
    ...mapGetters('news', [
      'datas'
    ]),
  },
  mounted() {
    this.trigger = this.$el,
      this.scroller = this.$el
  },
  created() {
    this.get_datas();
  },
  methods: {
    get_datas() {
      this.is_loading = true;
      this.getDatas().then(() => {
        this.is_loading = false
      });
    },
    ...mapActions('news', [
      'getDatas',
    ]),
    goto_href(href) {
      if (!href) {
        this.$router.push({
          name: 'Article'
        })
      } else {
        this.$router.push({
          name: href
        })
      }
    },
    refresh() {
      this.refreshing = true
      setTimeout(() => {
        this.refreshing = false
      }, 2000)
    },
    loadMore() {
      this.loading = true
      setTimeout(() => {
        this.getDatas().then(() => {
          this.loading = false
        });
      }, 2000)
    }
  }
}

</script>
<style scoped>
.main-container {
  background-color: #424242;
}

.swipe {
  height: 200px;
  line-height: 210px;
  text-align: center;
}

.swipe-item {
  width: 100%;
}

.head-stroke {
  -webkit-text-stroke: 0.4px grey;
  font-weight: bold;
}

.sub-stroke {
  -webkit-text-stroke: 0.1px black;
}

</style>
