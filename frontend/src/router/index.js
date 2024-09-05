import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/pages/patients/HomePage.vue";
import PersonalProfilePage from "@/pages/patients/PersonalProfilePage.vue";
import ChatbotPage from "@/pages/patients/ChatbotPage.vue";
import AdminPage from "@/pages/admin/AdminPage.vue";
import DashboardPage from "@/pages/admin/DashboardPage.vue";
import AboutPage from "@/pages/patients/AboutPage.vue";
import OnlineBookingPage from "@/pages/patients/OnlineBookingPage.vue";
import ConfirmationPage from "@/pages/patients/ConfirmationPage.vue";
import MyBooking from "@/pages/patients/MyBooking.vue";
import VerifEmailComponent from "@/pages/patients/VerifEmailComponent.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/online-booking",
    name: "OnlineBooking",
    component: OnlineBookingPage,
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
    path: "/my-booking",
    name: "MyBooking",
    component: MyBooking,
  },

  {
    path: "/verify-email",
    name: "VerifyEmail",
    component: VerifEmailComponent,
  },
  
  /*
    admin routers
  */
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
  {
    path: "/confirmation",
    name: "ConfirmationPage",
    component: ConfirmationPage,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
