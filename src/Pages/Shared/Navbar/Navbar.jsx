import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import { FaCartShopping } from "react-icons/fa6";
import useCart from "../../../hooks/useCart";
const Navbar = () => {
   const [cart] = useCart()
  const {user,logOut} = useContext(AuthContext)
  const handleLogOut =()=>{
        logOut()
         .then(()=>{ })
         .catch(error =>console.log(error))
  }
const navOptions = <>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/menu">Our Menu</Link></li>
      <li><Link to="/order/salad">Order Food</Link></li>
      <li><Link to="/login">Login</Link></li>
      <li><Link to="/secret">Secret</Link></li>
      <li><Link to="/dashboard">
      <button className="btn">
     <FaCartShopping className="mr-2"></FaCartShopping>
        <div className="badge badge-secondary">+{cart.length}</div>
      </button>
       </Link></li>
      {
        user? <>
               <div className="flex items-center gap-6"><span>{user?.displayName}</span> <span><img className="w-10 h-10 rounded-full" src={user.photoURL} alt="" /></span></div> 
                <button onClick={handleLogOut} className="btn btn-ghost">Log Out</button>
              </> :
              <>
                <li><Link to="/login">Login</Link></li>
              </>
      
      }
   </>
    return (
        <>
        <div className="navbar fixed z-10 bg-opacity-30 max-w-screen-xl bg-black text-white">
  <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-secondary lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
    
        {navOptions}

      </ul>
    </div>
    <a className=" text-xl">daisyUI</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">

        {navOptions}

    </ul>
  </div>
  <div className="navbar-end">
    <a className="btn">Button</a>
  </div>
</div>
</>
    );
};

export default Navbar;