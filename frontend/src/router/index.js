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
import UserPageLayout from "../pages/user/PageLayout.vue";
import BookAppointment from "../pages/public/BookAppointment.vue";
import UserAppointments from "../pages/user/UserAppointments.vue";
import LinkAppointment from "../pages/user/LinkAppointment.vue";
import UserBookAppointment from "../pages/user/BookAppointment.vue";
import DoctorPageLayout from "../pages/doctor/PageLayout.vue";
import DoctorAppointments from "../pages/doctor/Appointments.vue";
import AdminPageLayout from "../pages/admin/PageLayout.vue";
import AdminAppointments from "../pages/admin/Appointments.vue";
import AdminLogin from "../pages/admin/Login.vue";
import DoctorLogin from "../pages/doctor/Login.vue";
import ChatPanel from "@/components/patients/chatbot/ChatPanel.vue";

const routes = [
  /*
    user routers
  */
  // {
  //   path: "/",
  //   name: "Home",
  //   component: HomePage,
  // },

  // {
  //   path: "/about",
  //   name: "about",
  //   component: AboutPage,
  // },

  // {
  //   path: "/patient",
  //   name: "PatientRegister",
  //   component: PatientRegisterPage,
  // },

  // {
  //   path: "/profile",
  //   name: "PersonalProfile",
  //   component: PersonalProfilePage,
  // },

  // {
  //   path: "/my-booking",
  //   name: "MyBooking",
  //   component: MyBooking,
  // },

  // {
  //   path: "/online-booking",
  //   name: "OnlineBooking",
  //   component: OnlineBookingPage,
  //   props: true,
  // },

  // {
  //   path: "/confirmation",
  //   name: "ConfirmationPage",
  //   component: ConfirmationPage,
  // },

  {
    path: "/chatbot",
    name: "Chatbot",
    component: ChatbotPage,
  },
  // {
  //   path: "/my-booking",
  //   name: "MyBooking",
  //   component: MyBooking,
  // },

  {
    path: "/verify-email",
    component: PageLayout,
    children: [
      {
        path: "",
        name: "verify-email",
        component: EmailVarification,
      }
    ]
  },
  {
    path: "/reset-password",
    name: "reset-password",
    component: ResetPassword,
  },
  {
    path: "/forgot-password",
    name: "forgot-password",
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

  {
    path: "/admin/login",
    name: "admin-login",
    component: AdminLogin,
  },

  {
    path: "/admin",
    component: AdminPageLayout,
    children: [
      { path: "appointments", name: "admin-appointment", component: AdminAppointments, },
      { path: "schedule", name: "admin-schedule", component: WorkingSchedule, },
      { path: "analysis", name: "admin-analysis", component: AnalysisPage, },
      { path: "/admin/:pathMatch(.*)*", component: Error404 }
    ]
  },

  {
    path: "/",
    component: PageLayout,
    children: [
      { path: "", name: "home", component: Home },
      { path: "about", name: "aboutus", component: AboutUs },
      { path: "booking", name: "booking", component: BookAppointment },
      { path: "/:pathMatch(.*)*", component: Error404 }
    ]
  },
  { path: "/login", name: "login", component: Login },
  { path: "/sign-up", name: "sign-up", component: Signup },

  {
    path: "/user",
    component: UserPageLayout,
    children: [
      { path: "appointment", name: "user-appointment", component: UserAppointments },
      { path: "family", name: "user-family", },
      { path: "link-appointment", name: "link-appointment", component: LinkAppointment },
      { path: "new-appointment", name: "new-appointment", component: UserBookAppointment },
      { path: "chatbot", name: "user-ai", component: ChatPanel, props: {isDarkMode: false} },
      { path: "/user/:pathMatch(.*)*", component: Error404 }
    ]
  },
  { path: "/doctor/login", name: "doctor-login", component: DoctorLogin },
  {
    path: "/doctor",
    component: DoctorPageLayout,
    children: [
      { path: "appointment", name: "doctor-appointment", component: DoctorAppointments },
      { path: "/doctor/:pathMatch(.*)*", component: Error404 }
    ]
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
