import { BsHospital } from "react-icons/bs";
import {
  FaCalendarAlt,
  FaMoneyBillWave,
  FaUserFriends,
  FaFileInvoice,
  FaBuilding,
  FaUserTie,
  FaCubes,
  FaRegChartBar,
  FaMoneyBillAlt,
  FaShoppingCart,
  FaHryvnia,
  FaBook,
  FaFileMedical,
  FaAirbnb,
  FaBriefcase,
  FaAmbulance,
  FaHospital,
  FaPlaneDeparture,
  FaClipboardList,
  FaChartLine,
  FaRegCalendarAlt,
  FaPlus,
  FaHospitalUser,
} from "react-icons/fa";
import { FcComboChart } from "react-icons/fc";
import { GiTestTubes } from "react-icons/gi";
import { IoMdAdd } from "react-icons/io";
import {
  MdAddShoppingCart,
  MdFlightTakeoff,
  MdLocalPharmacy,
} from "react-icons/md";

const productLinks = [
  {
    name: "Show all products",
    link: "dashboard/employees",
    icon: <FcComboChart size={23} />,
  },
  {
    name: "Create new product",
    link: "dashboard/add-new-product",
    icon: <IoMdAdd size={23} />,
  },
];
const pharmacyLinks = [
  {
    name: "Show all pharmacies",
    link: "dashboard/pharmacies",
    icon: <FcComboChart size={23} />,
  },
  {
    name: "Create new price offer",
    link: "dashboard/add-new-pharmacy",
    icon: <IoMdAdd size={23} />,
  },
];
const departmentLinks = [
  {
    name: "Show all",
    link: "dashboard/departments",
    icon: <FcComboChart size={23} />,
  },
  {
    name: "Create new specialization",
    link: "dashboard/add-new-department",
    icon: <IoMdAdd size={23} />,
  },
];
const employeeLinks = [
  {
    name: "Show all",
    link: "dashboard/employees",
    icon: <FcComboChart size={23} />,
  },
  {
    name: "Create new employee",
    link: "dashboard/add-new-employee",
    icon: <IoMdAdd size={23} />,
  },
];

const expenseLinks = [
  {
    name: "Show all",
    link: "dashboard/expense",
    icon: <FcComboChart size={23} />,
  },
  {
    name: "Create new expense",
    link: "dashboard/add-new-expense",
    icon: <IoMdAdd size={23} />,
  },
];
const appointmentLinks = [
  {
    name: "Show all",
    link: "dashboard/appointments",
    icon: <FcComboChart size={23} />,
  },
  {
    name: "Create new holiday",
    link: "dashboard/add-new-appointment",
    icon: <IoMdAdd size={23} />,
  },
];

const ordersLinks = [
  {
    name: "Show all",
    link: "dashboard/orders",
    icon: <FcComboChart size={23} />,
  },
  {
    name: "Create new order",
    link: "dashboard/add-new-order",
    icon: <IoMdAdd size={23} />,
  },
];
const customersLinks = [
  {
    name: "Show all",
    link: "dashboard/customers",
    icon: <FcComboChart size={23} />,
  },
  {
    name: "Create new customer",
    link: "dashboard/add-new-customer",
    icon: <IoMdAdd size={23} />,
  },
];
const salariesLinks = [
  {
    name: "Show all",
    link: "dashboard/salaries",
    icon: <FcComboChart size={23} />,
  },
  {
    name: "Create new salaries",
    link: "dashboard/add-new-salaries",
    icon: <IoMdAdd size={23} />,
  },
];
const invoicesLinks = [
  {
    name: "Show all",
    link: "dashboard/invoices",
    icon: <FcComboChart size={23} />,
  },
  {
    name: "Create new invoices",
    link: "dashboard/add-new-invoices",
    icon: <IoMdAdd size={23} />,
  },
];
const tasksLinks = [
  {
    name: "Show all",
    link: "dashboard/tasks",
    icon: <FcComboChart size={23} />,
  },
  {
    name: "Create new task",
    link: "dashboard/add-new-task",
    icon: <IoMdAdd size={23} />,
  },
];
const diseaseLinks = [
  {
    name: "Show all",
    link: "dashboard/diseases",
    icon: <FcComboChart size={23} />,
  },
  {
    name: "Create new task",
    link: "dashboard/add-new-disease",
    icon: <IoMdAdd size={23} />,
  },
];
const doctorLinks = [
  {
    name: "Show all",
    link: "dashboard/doctors",
    icon: <FcComboChart size={23} />,
  },
  {
    name: "Create new task",
    link: "dashboard/add-new-doctor",
    icon: <IoMdAdd size={23} />,
  },
];
const insuranceLinks = [
  {
    name: "Show all",
    link: "dashboard/doctors",
    icon: <FcComboChart size={23} />,
  },
  {
    name: "Create new task",
    link: "dashboard/add-new-insurance-company",
    icon: <IoMdAdd size={23} />,
  },
];
const centersLinks = [
  {
    name: "Show all",
    link: "dashboard/centers",
    icon: <FcComboChart size={23} />,
  },
  {
    name: "Create new task",
    link: "dashboard/add-new-center",
    icon: <IoMdAdd size={23} />,
  },
];

export const navLinks = [
  {
    name: "Add product",
    children: tasksLinks,
    icon: <FaShoppingCart size={23} />,
  },
  {
    name: "Appointments",
    children: appointmentLinks,
    icon: <FaRegCalendarAlt size={23} />,
  },
  {
    name: "Booking",
    link: "dashboard/add-new-booking",
    icon: <FaPlus size={23} />,
  },
  {
    name: "Calendar",
    link: "dashboard/calendar",
    icon: <FaCalendarAlt size={23} />,
  },
  {
    name: "Centers",
    children: centersLinks,
    icon: <BsHospital size={23} />,
  },
  {
    name: "Customers",
    children: customersLinks,
    icon: <FaUserFriends size={23} />,
  },
  {
    name: "Dashboard",
    link: "/dashboard",
    icon: <FaChartLine size={23} />,
  },
  {
    name: "Department",
    children: departmentLinks,
    icon: <FaClipboardList size={23} />,
  },
  {
    name: "Departures",
    link: "dashboard/departures",
    icon: <FaPlaneDeparture size={23} />,
  },
  {
    name: "Diseases",
    children: diseaseLinks,
    icon: <FaHospitalUser size={23} />,
  },
  {
    name: "Doctors",
    children: doctorLinks,
    icon: <FaAmbulance size={23} />,
  },
  {
    name: "Employees",
    children: employeeLinks,
    icon: <FaUserTie size={23} />,
  },
  {
    name: "Experience",
    children: expenseLinks,
    icon: <FaBriefcase size={23} />,
  },
  {
    name: "Expense",
    link: "dashboard/add-new-expense",
    icon: <FaMoneyBillWave size={23} />,
  },
  {
    name: "Invoices",
    children: invoicesLinks,
    icon: <FaFileInvoice size={23} />,
  },
  {
    name: "Insurance",
    children: insuranceLinks,
    icon: <FaFileMedical size={23} />,
  },
  {
    name: "New request",
    link: "dashboard/add-new-request",
    icon: <FaBook size={23} />,
  },
  {
    name: "New Lab",
    link: "dashboard/add-new-lab",
    icon: <GiTestTubes size={23} />,
  },
  {
    name: "Orders",
    children: ordersLinks,
    icon: <FaShoppingCart size={23} />,
  },
  {
    name: "Pharmacy",
    children: pharmacyLinks,
    icon: <MdLocalPharmacy size={23} />,
  },
  {
    name: "Products",
    children: productLinks,
    icon: <FaShoppingCart size={23} />,
  },
  {
    name: "Spending",
    children: salariesLinks,
    icon: <FaMoneyBillAlt size={23} />,
  },
];
