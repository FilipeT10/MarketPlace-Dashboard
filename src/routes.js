/*!

=========================================================
* Material Dashboard React - v1.10.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import TableList from "views/TableList/TableList.js";
import Typography from "views/Typography/Typography.js";
import Icons from "views/Icons/Icons.js";
import Maps from "views/Maps/Maps.js";
import NotificationsPage from "views/Notifications/Notifications.js";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
  },
  {
    path: "/categorias",
    name: "Categorias",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "class",
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "/produtos",
    name: "Produtos",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "add_shopping_cart",
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "/vendas",
    name: "Vendas",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "shopping_basket",
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "/promocoes",
    name: "Promoções",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "paid",
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "/premios",
    name: "Prêmios",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "redeem",
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "/aplicacoes",
    name: "Aplicações",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "important_devices",
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "/cargos",
    name: "Cargos",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "supervised_user_circle",
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "/user",
    name: "User Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "/table",
    name: "Table List",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: TableList,
    layout: "/admin",
  },
  {
    path: "/typography",
    name: "Typography",
    rtlName: "طباعة",
    icon: LibraryBooks,
    component: Typography,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Icons",
    rtlName: "الرموز",
    icon: BubbleChart,
    component: Icons,
    layout: "/admin",
  },
  {
    path: "/maps",
    name: "Maps",
    rtlName: "خرائط",
    icon: LocationOn,
    component: Maps,
    layout: "/admin",
  },
  {
    path: "/notifications",
    name: "Notifications",
    rtlName: "إخطارات",
    icon: Notifications,
    component: NotificationsPage,
    layout: "/admin",
  },
];

export default dashboardRoutes;
