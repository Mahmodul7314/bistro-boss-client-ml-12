import { NavLink, Outlet } from "react-router-dom";
import { FaBook, FaCalendar, FaCartShopping, FaHouse, FaList, FaListCheck, FaUser, FaUtensils} from "react-icons/fa6";
import { MdRateReview} from "react-icons/md";
import useCart from "../hooks/useCart";
import { FaVoicemail } from "react-icons/fa";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
    //TODO: get isAdmin value from the database
    const [isAdmin] = useAdmin();

    
    const [cart] = useCart()
    return (
        <div className="flex">
            {/* sidebar */}
            <div className=" w-64 min-h-screen bg-orange-400">
                <ul className="menu">
                    {
                        isAdmin? <>
                               <li>
                       
                       <NavLink to="/dashboard/adminHome"><FaHouse></FaHouse>Admin Home</NavLink>
                    </li>
                   <li>
                      
                       <NavLink to="/dashboard/addItems"><FaUtensils></FaUtensils>Add Items</NavLink>
                    </li>
                   <li>
                      
                       <NavLink to="/dashboard/manageItems"><FaList></FaList>Manage Items</NavLink>
                    </li>
                   <li>
                      
                       <NavLink to="/dashboard/bookings"><FaBook></FaBook>Manage Bookings</NavLink>
                    </li>
                   <li>
                      
                       <NavLink to="/dashboard/users"><FaUser></FaUser>All Users</NavLink>
                    </li>
                        </>
                        :
                        <>
                        <li>
                       <NavLink to="/dashboard/userHome"><FaHouse></FaHouse>User Home</NavLink>
                    </li>
                   <li>
                      
                       <NavLink to="/dashboard/reservation"><FaCalendar></FaCalendar>Reservation</NavLink>
                    </li>
                   <li>
                      
                       <NavLink to="/dashboard/cart"><FaCartShopping></FaCartShopping> My Cart ({cart.length})</NavLink>
                    </li>
                   <li>
                      
                       <NavLink to="/dashboard/review"><MdRateReview></MdRateReview>Add a Review</NavLink>
                    </li>
                   <li>
                      
                       <NavLink className="bg-yellow-400" to="/dashboard/paymentHistory"><FaList></FaList>Payment History</NavLink>
                    </li>
                        </>
                    }
                     {/* shared nav links */}
                     <div className="divider"></div> 
                     <li>
                       
                       <NavLink to="/"><FaHouse></FaHouse>Home</NavLink>
                    </li>
                     <li>
                       <NavLink to="/order/salad"><FaListCheck></FaListCheck>Menu</NavLink>
                    </li>
                     <li>
                       <NavLink to="/order/contact"><FaVoicemail></FaVoicemail>Conctact</NavLink>
                    </li>

                </ul>
            </div>
            {/* dashboard content */}
            <div className="flex-1 px-8">
                <Outlet></Outlet>
            </div>
            
        </div>
    );
};

export default Dashboard;