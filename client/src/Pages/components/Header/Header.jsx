// import React, { useState } from 'react';
// import { useUserInfoQuery } from "../../../redux/Slice/userSlice";
// import { useLogoutUserMutation } from "../../../redux/Slice/authSlice.js";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";
// import { logoutResetToken } from "../../../redux/Slice/tokenSlice.js";
// import { toast } from "sonner";

// function Header() {
//   const { data: users, isLoading, error } = useUserInfoQuery();
//   const [logoutUser] = useLogoutUserMutation();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [showModal, setShowModal] = useState(false); // modal state

//   const handleLogout = async () => {
//     try {
//       await logoutUser().unwrap();
//       Cookies.remove("token");
//       dispatch(logoutResetToken());
//       toast.success("User Logged out successfully");
//       navigate("/login");
//     } catch (err) {
//       toast.error("Logout failed");
//       console.error("Logout failed:", err);
//     }
//   };

//   const getInitials = (firstName = '', lastName = '') => {
//     return `${firstName[0] || ''}${lastName[0] || ''}`.toUpperCase();
//   };

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error fetching user data</div>;

//   return (
//     <div>
//       {/* Header */}
//       <div className="w-full h-16 bg-gray-200 flex flex-row justify-end items-center text-center">
//         <div>
//           <img src={users?.data?.profilePhoto} className='w-12 h-12 rounded-3xl' />
//         </div>
//         <div className="min-w-16 font-semibold mx-3">
//           {getInitials(users?.data?.firstName, users?.data?.lastName)}
//         </div>
//         <div>
//           <button
//             className="bg-gray-900 text-white font-semibold h-10 w-28 rounded-lg mr-8"
//             onClick={() => setShowModal(true)}
//           >
//             Logout
//           </button>
//         </div>
//       </div>

//       {/* Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center text-center z-50">
//           <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
//             <h2 className="text-lg font-semibold mb-4">Confirm Logout</h2>
//             <p className="mb-6 text-sm text-gray-700">Are you sure you want to log out?</p>
//             <div className="flex justify-between w-full">
//               <button
//                 className="px-4 py-2 bg-gray-400 rounded hover:bg-gray-700 text-sm"
//                 onClick={() => setShowModal(false)}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-800 text-sm"
//                 onClick={() => {
//                   setShowModal(false);
//                   handleLogout();
//                 }}
//               >
//                 Yes, Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Header;

import React, { useState } from 'react';
import { useUserInfoQuery } from "../../../redux/Slice/userSlice";
import { useLogoutUserMutation } from "../../../redux/Slice/authSlice.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { logoutResetToken } from "../../../redux/Slice/tokenSlice.js";
import { toast } from "sonner";

function Header() {
  const { data: users, isLoading, error } = useUserInfoQuery();
  const [logoutUser] = useLogoutUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showImagePreview, setShowImagePreview] = useState(false); // 🔴 NEW STATE

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      Cookies.remove("token");
      dispatch(logoutResetToken());
      toast.success("User Logged out successfully");
      navigate("/login");
    } catch (err) {
      toast.error("Logout failed");
      console.error("Logout failed:", err);
    }
  };

  const getInitials = (firstName = '', lastName = '') => {
    return `${firstName[0] || ''}${lastName[0] || ''}`.toUpperCase();
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching user data</div>;

  const profilePhoto = users?.data?.profilePhoto;

  return (
    <div>
      {/* Header */}
      <div className="w-full h-16 bg-gray-200 flex flex-row justify-end items-center text-center">
        <div className="cursor-pointer" onClick={() => setShowImagePreview(true)}>
          <img src={profilePhoto} className='w-12 h-12 rounded-3xl' />
        </div>
        <div className="min-w-16 font-semibold mx-3">
          {getInitials(users?.data?.firstName, users?.data?.lastName)}
        </div>
        <div>
          <button
            className="bg-gray-900 text-white font-semibold h-10 w-28 rounded-lg mr-8"
            onClick={() => setShowLogoutModal(true)}
          >
            Logout
          </button>
        </div>
      </div>

      {/* 🔴 Image Preview Modal */}
      {showImagePreview && (
        <div
          className="fixed w-80vw h-80vh inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setShowImagePreview(false)}
        >
          <div
            className="bg-white p-4 rounded shadow-lg relative max-w-[90%] max-h-[90%]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={profilePhoto}
              alt="Profile Preview"
              className="max-w-full max-h-[80vh] rounded"
            />
            <button
              className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded text-xs"
              onClick={() => setShowImagePreview(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* 🔴 Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center text-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
            <h2 className="text-2xl font-semibold mb-4">Confirm Logout</h2>
            <p className="mb-6 text-lg text-gray-700">Are you sure you want to log out?</p>
            <div className="flex justify-between w-full">
              <button
                className="px-4 py-2 bg-gray-600 font-semibold rounded text-white hover:bg-gray-900 text-sm"
                onClick={() => setShowLogoutModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-800 text-sm"
                onClick={() => {
                  setShowLogoutModal(false);
                  handleLogout();
                }}
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
