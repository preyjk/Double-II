import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import BookingPage from "../views/BookingPage.vue";
import PersonalProfilePage from "../views/PersonalProfilePage.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: '/online-booking/:clinicId/:clinicName',
    name: 'OnlineBooking',
    component: BookingPage,
    props: true,
  },
  {
    path: "/profile",
    name: "PersonalProfile",
    component: PersonalProfilePage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
