"use client";
import { useEffect, useState } from "react";
import { FiSearch, FiBell, FiMenu } from "react-icons/fi";
import { useSession, signOut } from "next-auth/react";
import { useProSidebar } from "react-pro-sidebar";
import { BiChevronLeft } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { navLinks } from "@/constants";
import Link from "next/link";
import LanguageSelector from "@/components/LanguageSelector";
import { FaUserCheck } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";
import ConfirmModal from "@/components/ConfirmModal";
import Translate from "@/components/Translate";
import Loading from "@/components/Loading";
import { toast } from "react-toastify";

const Navbar = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { data: session } = useSession();
  const [user, setUser] = useState({ name: "loading...", email: "loading..." });
  const { selectedLanguage } = useLanguage();
  useEffect(() => {
    if (session) {
      setUser(session.user);
      console.log(session);
    }
  }, [session]);
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();

    if (searchTerm.trim() === "") return;

    router.push(`/dashboard/${encodeURIComponent(searchTerm.trim())}`);
  };
  const [suggestions, setSuggestions] = useState([]);

  const handleSearchChange = (value) => {
    setSearchTerm(value);

    if (value.trim() === "") {
      setSuggestions([]);
      return;
    }

    const searchSuggestions = navLinks
      .flatMap((navItem) => (navItem.children ? navItem.children : [navItem]))
      .filter((navItem) =>
        navItem.name.toLowerCase().includes(value.trim().toLowerCase())
      )
      .slice(0, 5);

    setSuggestions(searchSuggestions);
  };

  const { collapseSidebar, collapsed } = useProSidebar();
  const [showMenu, setShowMenu] = useState(false);

  const handleMenu = () => {
    setShowMenu(!showMenu);
  };

  // handel sign out

  const handleSignOut = async () => {
    setLoading(true);
    try {
      // await signOut({ userType,token });
      await signOut();
      setLoading(false);
      setShowModal(false);
      location.reload();
    } catch (error) {
      console.log("Error signing out:", error);
    }
  };

  const handleConfirm = () => {
    setShowModal(false);
    handleSignOut();
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleSignOutClick = () => {
    setShowModal(true);
  };

  const confirmModal = (
    <ConfirmModal
      message="Are you sure you want to sign out?"
      onConfirm={handleConfirm}
      onCancel={handleCancel}
      // loading={loading}
    />
  );
  useEffect(() => {
    if (showModal) {
      toast.warning(confirmModal, {
        // loading:loading,
        className: "dark:bg-slate-800",
        onClose: () => setShowModal(false), // close the modal when the toast is closed
      });
    }
  }, [showModal]);

  return (
    <nav className="relative flex flex-col flex-wrap items-center justify-between gap-5 px-10 py-2 lg:flex-row lg:flex-nowrap lg:gap-0">
      {/* SearchBar */}
      <div className="mt-2 flex w-full flex-1 justify-center md:w-auto md:flex-[0.4]">
        <button
          onClick={() => collapseSidebar()}
          className={`
        mr-3 rtl:ml-3`}
        >
          {collapsed ? (
            <FiMenu className="text-2xl text-gray-500 dark:text-green-200" />
          ) : (
            <BiChevronLeft className="text-2xl text-gray-500 dark:text-green-200" />
          )}
        </button>
        <input
          type="search"
          className={`flex-1 ${
            selectedLanguage === "ar" ? "rounded-r-md" : "rounded-l-md"
          } bg-gray-100 px-3 focus:outline-blue-400 dark:text-slate-900`}
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
        {searchTerm && (
          <div className="absolute top-[77%] z-10 mt-1 rounded-md bg-slate-200 p-2 shadow-md dark:bg-slate-800 dark:text-slate-50">
            {suggestions.length === 0 ? (
              <p className="p-1">No suggestions found</p>
            ) : (
              suggestions.map((navItem, index) => (
                <Link href={navItem.link} key={index}>
                  <button
                    className="block w-full rounded-md p-1 text-left transition-all hover:bg-gray-100 dark:text-slate-50 dark:hover:bg-slate-700"
                    onClick={() => {
                      setSearchTerm("");
                      setSuggestions([]);
                    }}
                  >
                    {navItem.icon}
                    <span>{navItem.name}</span>
                  </button>
                </Link>
              ))
            )}
          </div>
        )}
        <button
          type="button"
          className={`flex items-center justify-center bg-green-500 p-2 ${
            selectedLanguage === "ar" ? "rounded-l-md" : "rounded-r-md"
          }`}
          onClick={handleSearch}
        >
          <FiSearch className="text-[35px] text-slate-50" />
        </button>
      </div>
      {/* Icons */}
      <LanguageSelector />

      <div className="flex w-full justify-end gap-4 md:w-auto md:justify-normal">
        <button className="relative">
          <FiBell className="relative text-[21px]  md:text-[27px]" />
          <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-600"></span>
        </button>
        <button className="relative w-12" onClick={handleMenu}>
          <img
            src={user.image ? user.image : "/assets/jhone.svg"}
            className="rounded-full"
            alt="admin"
          />
        </button>
        <div className="flex flex-col">
          <p className="text-lg capitalize">
            {user ? user.name : "loading..."}
          </p>
          <p className="text-sm">{user ? user.email : "loading..."}</p>
        </div>
        {showMenu && (
          <div className="absolute ltr:right-[10%] rtl:left-[10%] top-[80%] z-10 mt-2 rounded-md bg-gradient-to-tr from-slate-50 to-slate-200 p-2 shadow-md dark:text-slate-900">
            <div className="flex w-full items-center gap-3 rounded-md p-1 text-left capitalize hover:bg-green-100">
              <FaUserCheck />
              <span>{user ? user.userType : "loading..."}</span>
            </div>
            {/* <Link href="/dashboard/profile">
              <button className="block w-full rounded-md p-1 text-left hover:bg-green-100">
                Profile
              </button>
            </Link> */}
            <Link href="/dashboard/account">
              <button className="block w-full rounded-md p-1 text-left hover:bg-green-100">
                <Translate>My account</Translate>
              </button>
            </Link>
            <button
              className="block w-full rounded-md p-1 text-left hover:bg-green-100"
              onClick={handleSignOutClick}
            >
              <Translate> {loading ? <Loading /> : "Logout"}</Translate>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
