<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      app
      :clipped="clipped"
      fixed
      :mini-variant="miniVariant"
    >
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
    <v-app-bar app :clipped-left="clipped" fixed>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer />
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <template>
        <div>
          <v-btn @click="handleSignIn">Sign In</v-btn>
          <v-btn @click="handleSignOut">Sign Out</v-btn>
          <!--          <p v-if="getUser">Logged in as: {{ getUser.displayName }}</p>-->
        </div>
      </template>
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
import { signIn, signOut } from '../firebase';

export default {
  name: 'DefaultLayout',
  data() {
    return {
      clipped: false,
      drawer: true,
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
        }
      ],
      miniVariant: false,
      title: 'Grand Exchange Flips'
    };
  },
  methods: {
    async handleSignIn() {
      try {
        await signIn(); // Call the signIn function from the named export
      } catch (error) {
        console.error(error);
      }
    },
    async handleSignOut() {
      try {
        await signOut(); // Call the signOut function from the named export
      } catch (error) {
        console.error(error);
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
