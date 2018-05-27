<template>
  <v-app class="main-container" style="background-color: #212121;">
    <v-content>
      <transition :name="transitionName" mode="out-in">
        <!-- <transition name="slide-fade" mode="out-in"> -->
        <router-view></router-view>
      </transition>
    </v-content>
    <v-bottom-nav fixed app shift :value="true" :active.sync="current_tab" color="grey darken-4" style="z-index:999">
      <v-btn flat dark v-for="tab in tabs" :key="tab.name" color="amber lighten-3">
        <span>{{tab.name}}</span>
        <v-icon>{{tab.icon}}</v-icon>
      </v-btn>
    </v-bottom-nav>
  </v-app>
</template>
<script>
export default {
  name: 'Start',
  data() {
    return {
      transitionName: 'slide-left',
      current_tab: +window.sessionStorage.hometab || 0,
      tabs: [{
          name: '首页',
          icon: 'home',
          color: 'teal',
          href: 'Home'
        },
        {
          name: '业务',
          icon: 'mdi-bitcoin',
          color: 'blue-grey',
          href: 'Business'
        },
        // {
        //   name: '交易',
        //   icon: 'mdi-currency-usd',
        //   color: 'brown',
        //   href: 'Market'
        // }, {
        //   name: '媒体',
        //   icon: 'local_activity',
        //   color: 'brown',
        //   href: 'News'
        // },
        {
          name: '我的',
          icon: 'account_circle',
          color: 'indigo',
          href: 'Profile'
        }
      ]
    }
  },
  computed: {
    color() {
      return this.tabs[this.current_tab].color
    }
  },
  watch: {
    '$route' (to, from) {
      const toDepth = to.meta.index
      const fromDepth = from.meta.index
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    },
    current_tab: {
      handler: function(n, o) {
        window.sessionStorage.hometab = n;
        this.$router.push({
          name: this.tabs[n].href
        });
      },
      immediate: true
    }
  },
  methods: {
    goto_tab() {

    },
    login() {
      this.$router.push({
        name: 'Login'
      });
    },
    check() {
      this.$router.push({
        name: 'Test'
      });
    }
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main-container {
  background-color: #212121;
}

.application .theme--light.list,
.theme--light .list {
  background-color: rgba(0, 0, 0, 0.87);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}


.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all .1s;
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.1s;
}

.slide-left-leave-to,
.slide-right-enter {
  transform: translateX(-30px);
  opacity: 0;
}

.slide-left-enter,
.slide-right-leave-to {
  transform: translateX(30px);
  opacity: 0;
}

</style>
