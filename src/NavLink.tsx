import { Link as RouterLink, useLocation } from "react-router-dom";

const NavLink = ({ to, children, ...props }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <div
      className={`mb-2 px-4 ${
        isActive ? "text-blue-800 cursor-default" : "hover:text-blue-800"
      }`}
    >
      {isActive ? (
        <span {...props}>{children}</span>
      ) : (
        <RouterLink to={to} {...props}>
          {children}
        </RouterLink>
      )}
    </div>
  );
};

export default NavLink;
