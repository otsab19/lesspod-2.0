<template>
  <div>
    <Navbar :menus="menus"/>
    <div class="container">
    </div>
    <Footer/>
  </div>
</template>

<script>
// import Logo from '~/components/Logo.vue'
import Navbar from '~/components/NavbarM.vue'
import Footer from '~/components/Footer.vue'
import { mapMutations } from 'vuex'
export default {
  components: {
    // Logo,
    Navbar,
    Footer
  },
  computed: {
    menus() {
      // return this.$store.state.menus.menuItems
      return this.$store.state.menus.menuItems
    },
    posts() {
      // return this.$store.state.menus.menuItems
      return this.$store.state.posts.posts
    }
  },
  methods: {

  },
  asyncData(context) {
    // called every time before loading the component
    // as the name said, it can be async
    // Also, the returned object will be merged with your data object
    return {
    }
  }
}
</script>
<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
</style>
