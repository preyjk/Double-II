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
import PatientRegisterPage from "@/pages/patients/PatientRegisterPage.vue";
import BasePage from "../pages/admin/BasePage.vue";
import WorkingSchedule from "../components/admin/WorkingSchedule.vue";
import ReservationCalendar from "../components/admin/ReservationCalendar.vue";
import AnalysisPage from "../components/admin/AnalysisPage.vue";
import PageLayout from "../pages/public/PageLayout.vue";
import Home from "../pages/public/Home.vue";
import AboutUs from "../pages/public/AboutUs.vue";
import Error404 from "../pages/Error404.vue";
import Login from "../pages/public/Login.vue";
import Signup from "../pages/public/Signup.vue";
import GoogleLogin from "../pages/public/GoogleLogin.vue";
import EmailVarification from "../pages/public/EmailVarification.vue";
import ResetPassword from "../pages/public/ResetPassword.vue";
import ForgetPassword from "../pages/public/ForgetPassword.vue";

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
    path: "/patient",
    name: "PatientRegister",
    component: PatientRegisterPage,
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
    component: PageLayout,
    children: [
      {
        path: "",
        component: EmailVarification,
      }
    ]
  },
  {
    path: "/reset-password",
    name: "ResetPasswordPage",
    component: ResetPassword,
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: ForgetPassword,
  },
  {
    path: "/login/google/callback",
    component: PageLayout,
    children: [
      {
        path: "",
        component: GoogleLogin,
      }]
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
    path: "/admin/console",
    component: BasePage,
    name: "console",
    children: [
      {
        path: "dashboard",
        component: DashboardPage,
      },
      {
        path: "appointments",
        component: ReservationCalendar,
      },
      {
        path: "schedule",
        component: WorkingSchedule,
      },
      {
        path: "analysis",
        component: AnalysisPage,
      }
    ]
  },

  {
    path: "/public",
    component: PageLayout,
    children: [
      { path: "", component: Home },
      { path: "about", component: AboutUs },
      { path: "/:pathMatch(.*)*", component: Error404 }
    ]
  },
  { path: "/login", component: Login },
  { path: "/sign-up", component: Signup },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
