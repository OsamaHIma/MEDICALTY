import { BsHospital } from "react-icons/bs";
import {
  FaCalendarAlt,
  FaMoneyBillWave,
  FaFileInvoice,
  FaShoppingCart,
  FaHryvnia,
  FaBook,
  FaFileMedical,
  FaHospital,
  FaPlaneDeparture,
  FaClipboardList,
  FaChartLine,
  FaRegCalendarAlt,
  FaPlus,
  FaHospitalUser,
  FaUserPlus,
  FaUserMd,
  FaUserNurse,
} from "react-icons/fa";
import { FcComboChart } from "react-icons/fc";
import { FiUserPlus } from "react-icons/fi";
import { GiTestTubes } from "react-icons/gi";
import { IoMdAdd } from "react-icons/io";
import { MdLocalPharmacy } from "react-icons/md";
import { BiMessage, BiMessageDots, BiMessageSquare, BiSolidMessageDetail } from "react-icons/bi";

const productLinks = [
  {
    name: "Show all products",
    link: "dashboard/data/employees",
    icon: <FcComboChart size={20} />,
  },
  {
    name: "Create new product",
    link: "dashboard/data/add-new-product",
    icon: <IoMdAdd size={20} />,
  },
];
const pharmacyLinks = [
  {
    name: "Show all pharmacies",
    link: "dashboard/data/pharmacies",
    icon: <FcComboChart size={20} />,
  },
  {
    name: "Create new pharmacy",
    link: "dashboard/add-new-pharmacy",
    icon: <IoMdAdd size={20} />,
  },
];
const departmentLinks = [
  {
    name: "Show all",
    link: "dashboard/data/departments",
    icon: <FcComboChart size={20} />,
  },
  {
    name: "Create new department",
    link: "dashboard/add-new-department",
    icon: <IoMdAdd size={20} />,
  },
];
const employeeLinks = [
  {
    name: "Show all",
    link: "dashboard/data/employees",
    icon: <FcComboChart size={20} />,
  },
  {
    name: "Create new employee",
    link: "dashboard/add-new-employee",
    icon: <IoMdAdd size={20} />,
  },
];

const expenseLinks = [
  {
    name: "Show all",
    link: "dashboard/data/expense",
    icon: <FcComboChart size={20} />,
  },
  {
    name: "Create new expense",
    link: "dashboard/add-new-expense",
    icon: <IoMdAdd size={20} />,
  },
];
const appointmentLinks = [
  {
    name: "Show all",
    link: "dashboard/data/appointment",
    icon: <FcComboChart size={20} />,
  },
  {
    name: "Create new appointment",
    link: "dashboard/add-new-appointment",
    icon: <IoMdAdd size={20} />,
  },
];

const patientLinks = [
  {
    name: "Show all",
    link: "dashboard/data/patient",
    icon: <FcComboChart size={20} />,
  },
  {
    name: "Create new patient",
    link: "dashboard/add-new-patient",
    icon: <IoMdAdd size={20} />,
  },
];

const invoicesLinks = [
  {
    name: "Show all",
    link: "dashboard/data/invoices",
    icon: <FcComboChart size={20} />,
  },
  {
    name: "Create new invoices",
    link: "dashboard/add-new-invoice",
    icon: <IoMdAdd size={20} />,
  },
];

const diseaseLinks = [
  {
    name: "Show all",
    link: "dashboard/data/disease",
    icon: <FcComboChart size={23} />,
  },
  {
    name: "Add new disease",
    link: "dashboard/add-new-disease",
    icon: <IoMdAdd size={23} />,
  },
];
const doctorLinks = [
  {
    name: "Show all",
    link: "dashboard/data/doctor",
    icon: <FcComboChart size={23} />,
  },
  {
    name: "Create new doctor",
    link: "dashboard/add-new-doctor",
    icon: <IoMdAdd size={23} />,
  },
];
const insuranceLinks = [
  {
    name: "Show all",
    link: "dashboard/data/insurance-company",
    icon: <FcComboChart size={23} />,
  },
  {
    name: "Create new insurance company",
    link: "dashboard/add-new-insurance-company",
    icon: <IoMdAdd size={23} />,
  },
];
const centersLinks = [
  {
    name: "Show all",
    link: "dashboard/data/medical_center",
    icon: <FcComboChart size={23} />,
  },
  {
    name: "Create new medical_center",
    link: "dashboard/add-new-medical_center",
    icon: <IoMdAdd size={23} />,
  },
];

export const navLinks = [
  {
    name: "Appointments",
    children: appointmentLinks,
    icon: <FaRegCalendarAlt size={23} />,
    access: ["pharmacy", "medical_center"],
  },
  {
    name: "Booking",
    link: "dashboard/add-new-booking",
    icon: <FaPlus size={20} />,
    access: ["doctor", "patient", "medical_center"],
  },
  {
    name: "Calendar",
    link: "dashboard/calendar",
    icon: <FaCalendarAlt size={20} />,
    access: [
      "doctor",
      "pharmacy",
      "lab",
      "insuranceCompany",
      "admin",
      "medical_center",
      "hospital",
    ],
  },
  {
    name: "Centers",
    children: centersLinks,
    icon: <BsHospital size={20} />,
    access: ["admin", "medical_center"],
  },
  {
    name: "Client",
    link: "dashboard/add-new-client",
    icon: <FiUserPlus size={20} />,
    access: ["insuranceCompany"],
  },
  {
    name: "Dashboard",
    link: "/dashboard",
    icon: <FaChartLine size={20} />,
    access: [
      "doctor",
      "pharmacy",
      "lab",
      "insuranceCompany",
      "admin",
      "medical_center",
      "hospital",
    ],
  },
  {
    name: "Department",
    children: departmentLinks,
    icon: <FaClipboardList size={20} />,
    access: ["admin"],
  },
  // {
  //   name: "Departures",
  //   link: "dashboard/departures",
  //   icon: <FaPlaneDeparture size={20} />,
  // },
  {
    name: "Diseases",
    children: diseaseLinks,
    icon: <FaHospitalUser size={20} />,
    access: [
      "doctor",
      "pharmacy",
      "lab",
      "insuranceCompany",
      "admin",
      "medical_center",
      "hospital",
    ],
  },
  {
    name: "Doctors",
    children: doctorLinks,
    icon: <FaUserMd size={20} />,
    access: ["admin"],
  },
  {
    name: "employee",
    children: employeeLinks,
    icon: <FaUserPlus size={20} />,
    access: ["insuranceCompany"],
  },
  {
    name: "Expense",
    children: expenseLinks,
    icon: <FaMoneyBillWave size={20} />,
    access: [
      "doctor",
      "pharmacy",
      "lab",
      "insuranceCompany",
      "admin",
      "medical_center",
      "hospital",
    ],
  },
  {
    name: "Invoices",
    children: invoicesLinks,
    icon: <FaFileInvoice size={20} />,
    access: ["doctor", "pharmacy", "insuranceCompany"],
  },
  {
    name: "Insurance",
    children: insuranceLinks,
    icon: <FaFileMedical size={20} />,
    access: ["insuranceCompany"],
  },
  {
    name: "Messages",
   link:"dashboard/messages",
    // icon: <BiMessage size={20} />,
    icon: <BiMessageDots size={20} />,
    access: ["pharmacy"],
  },

  {
    name: "New Lab",
    link: "dashboard/add-new-lab",
    icon: <GiTestTubes size={20} />,
    access: ["lab"],
  },
  {
    name: "Nurse",
    link: "dashboard/add-new-nurse",
    icon: <FaUserNurse size={20} />,
    access: ["admin"],
  },
  {
    name: "Patient",
    children: patientLinks,
    icon: <FaUserPlus size={20} />,
    access: [
      "doctor",
      "pharmacy",
      "lab",
      "insuranceCompany",
      "admin",
      "medical_center",
      "hospital",
    ],
  },
  {
    name: "Pharmacy",
    children: pharmacyLinks,
    icon: <MdLocalPharmacy size={20} />,
    access: ["pharmacy", "medical_center"],
  },
  {
    name: "Products",
    children: productLinks,
    icon: <FaShoppingCart size={20} />,
    access: [
      "doctor",
      "pharmacy",
      "lab",
      "insuranceCompany",
      "admin",
      "medical_center",
      "hospital",
    ],
  },
  {
    name: "New request",
    link: "dashboard/add-new-request",
    icon: <FaBook size={20} />,
    access: [
      "doctor",
      "pharmacy",
      "lab",
      "insuranceCompany",
      "admin",
      "medical_center",
      "hospital",
    ],
  },
  {
    name: "Section",
    link: "dashboard/add-new-section",
    icon: <FaHospital size={20} />,
    access: ["insuranceCompany"],
  },
];
