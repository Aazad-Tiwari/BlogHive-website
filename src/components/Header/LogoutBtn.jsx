import React from "react";
import authService from "../../appwrite/auth_service";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout()
    .then(dispatch(logout()))
    .catch((error) => console.log("error in logoutBtn", error))
  };

  return (
    <button
      onClick={logoutHandler}
      className="inline-block px-8 py-3 ml-12 font-semibold text-blog_black duration-200 hover:bg-blue-100 rounded-full"
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
