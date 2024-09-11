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
import VerifyEmailPage from "@/pages/patients/VerifyEmailPage.vue";
import ResetPasswordPage from "@/pages/patients/ResetPasswordPage.vue";
import GoogleLoginPage from "../pages/patients/GoogleLoginPage.vue";

const routes = [
  /*
    user routers
  */
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },

  {
    path: "/about",
    name: "about",
    component: AboutPage,
  },

  {
    path: "/profile",
    name: "PersonalProfile",
    component: PersonalProfilePage,
  },

  {
    path: "/my-booking",
    name: "MyBooking",
    component: MyBooking,
  },

  {
    path: "/online-booking",
    name: "OnlineBooking",
    component: OnlineBookingPage,
    props: true,
  },

  {
    path: "/confirmation",
    name: "ConfirmationPage",
    component: ConfirmationPage,
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
    component: VerifyEmailPage,
  },
  {
    path: "/reset-password",
    name: "ResetPasswordPage",
    component : ResetPasswordPage,
  },
  {
    path: "/login/google/callback",
    name: "GoogleLogin",
    component: GoogleLoginPage,
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
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
