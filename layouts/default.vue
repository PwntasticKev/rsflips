<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" app fixed :mini-variant="miniVariant">
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          exact
          router
          :to="item.to"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app fixed>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer />
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Combination Sets',
          to: '/combinationItems'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Clean Herbs',
          to: '/cleanHerbs'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Deaths Coffer',
          to: '/deathscoffer'
        }
      ],
      miniVariant: false,
      title: 'Grand Exchange Flips'
    };
  },
  methods: {
    async handleSignIn() {
      try {
        try {
          const provider = new this.$fireModule.auth.GoogleAuthProvider();
          const user = await this.$fire.auth.signInWithPopup(provider);
          console.log(user); // here you can do what you want with the user data
          this.$router.push('/'); // that return from firebase
        } catch (e) {
          // handle the error
        } // Call the signIn function from the named export
      } catch (error) {
        console.error(error);
      }
    },
    async handleSignOut() {
      try {
        await this.$fire.auth.signOut();
        // User is now signed out
      } catch (e) {
        // Handle the error
      }
    }
  },
  computed: {
    // currentUser() {
    //   return getUser(); // Call the getUser function from the named export
    // }
  }
};
</script>
