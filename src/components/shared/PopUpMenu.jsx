import { IconLogout2, IconPlayerPlayFilled } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { logOut } from "../../store/slices/user.slice";
import { useDispatch } from "react-redux";

const PopUpMenu = ({ isPopUpMenuShow }) => {
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logOut());
  };

  return (
    <div
      className={`fixed bg-primary-light grid gap-2 p-4 rounded-md border border-secondary top-20  ${
        isPopUpMenuShow ? "sm:right-32 right-3" : "-right-52 sm:-right-full"
      } transition-all duration-200`}
    >
      <Link
        to="/playlists"
        className="uppercase font-semibold hover:text-[#3E14B5] flex  items-center gap-2 text-sm"
      >
        <IconPlayerPlayFilled size={20} />
        Mis grabaciones
      </Link>
      <button
        onClick={handleLogOut}
        className="uppercase font-semibold hover:text-[#3E14B5] flex  items-center gap-2 text-sm"
      >
        <IconLogout2 />
        Cerrar sesión
      </button>
    </div>
  );
};
export default PopUpMenu;
