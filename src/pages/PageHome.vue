<template>
  <div>
    <AppHero />
    <div class="container" v-if="dataLoaded">
      <section class="section">
        <div class="m-b-lg">
          <h1 class="title is-inline">Featured Meetups in "Location"</h1>
          <AppDropdown />
          <button class="button is-primary is-pulled-right m-r-sm">Create Meetups</button>
          <router-link
            class="button is-primary is-pulled-right m-r-sm"
            :to="{ name: 'PageMeetupFind'}"
          >All</router-link>
        </div>
        <div class="row columns is-multiline">
          <!-- meetups -->
          <MeetupItem v-for="meetup in meetups" :key="meetup._id" :meetup="meetup" />
        </div>
      </section>
      <section class="section">
        <div>
          <h1 class="title">Categories</h1>
          <div class="columns cover is-multiline is-mobile">
            <!-- categories -->
            <CategoryItem v-for="category in categories" :key="category._id" :category="category" />
          </div>
        </div>
      </section>
    </div>
    <div v-else>
      <Spinner />
    </div>
  </div>
</template>

<script>
import CategoryItem from "@/components/CategoryItem";
import MeetupItem from "@/components/MeetupItem";
import { mapActions, mapState } from "vuex";

export default {
  components: {
    CategoryItem,
    MeetupItem
  },
  data() {
    return {
      dataLoaded: false
    };
  },
  computed: {
    // meetups() {
    //   return this.$store.state.meetups
    // },
    // categories() {
    //   return this.$store.state.categories
    // },
    ...mapState({
      meetups: state => state.meetups.items,
      categories: state => state.categories.items
    })
  },
  created() {
    // this.$store.dispatch('fetchMeetups')
    // this.$store.dispatch('fetchCategories')
    Promise.all([this.fetchMeetups(), this.fetchCategories()])
      .then(() => this.dataLoaded = true)
  },
  methods: {
    ...mapActions("meetups", ["fetchMeetups"]),
    ...mapActions("categories", ["fetchCategories"])
  }
};
</script>

<style>
/* .is-rounded {
  border-radius: 10px !important;
} */
</style>
