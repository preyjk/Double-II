import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import BookingPage from "../views/BookingPage.vue";
import AdminPage from '../views/AdminPage.vue';

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/online-booking/:clinicId/:clinicName",
    name: "OnlineBooking",
    component: BookingPage,
    props: true,
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
