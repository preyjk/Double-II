import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/patients/HomePage.vue";
import BookingPage from "../views/patients/BookingPage.vue";
import PersonalProfilePage from "../views/patients/PersonalProfilePage.vue";
import ChatbotPage from "@/views/patients/ChatbotPage.vue";
import AdminPage from "../views/admin/AdminPage.vue";
import DashboardPage from "@/views/admin/DashboardPage.vue";
import AboutPage from "@/views/patients/AboutPage.vue";

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
    path: "/profile",
    name: "PersonalProfile",
    component: PersonalProfilePage,
  },
  {
    path: "/chatbot",
    name: "Chatbot",
    component: ChatbotPage,
  },
  {
    path: "/admin",
    name: "Admin",
    component: AdminPage,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: DashboardPage,
  },
  {
    path: "/about",
    name: "about",
    component: AboutPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
