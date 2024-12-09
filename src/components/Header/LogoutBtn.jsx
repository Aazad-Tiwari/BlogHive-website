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
      className="inline-block xlg:px-8 xlg:py-3 xlg:ml-12 px-2 py-1 font-semibold border-2 border-blog_blue text-blog_black duration-200 hover:bg-blue-100 rounded-full"
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
