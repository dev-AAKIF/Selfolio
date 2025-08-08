import React, { useState } from "react";
import { useUserInfoQuery } from "../../../redux/Slice/userSlice";
import PortFolio from "../../Portfolio/Portfolio";

function Card() {
  const [open, setOpen] = useState(false);
  const { data: users, isLoading, error } = useUserInfoQuery();

  const getFullName = (firstName = '', lastName = '') => {
  return `${firstName} ${lastName}`.trim();
  };

  const formatDate = (isoDate) => {
    if (!isoDate) return "";
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching user data</div>;

  return (
    <div className="h-[90vh] flex flex-col items-center shadow-3xl justify-center bg-gray-200">
      <div className="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto bg-white shadow-xl rounded-lg text-gray-900">
        <div className="rounded-t-lg h-32 overflow-hidden">
          <img
            className="object-cover object-top w-full"
            src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
            alt="Mountain"
          />
        </div>

        <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
          <img
            className="object-cover object-center h-32 w-32"
            src={users?.data?.profilePhoto}
            alt="Profile Picture"
          />
        </div>

        <div className="text-center mt-2 flex flex-row justify-center items-center gap-2">
          <h2 className="font-semibold">{getFullName(users?.data?.firstName, users?.data?.lastName)}</h2>
        </div>

        <div className="text-left mt-10 ml-10">
          <p className="text-gray-700 mb-1">
            <span className="font-medium text-black">Email :</span> {users?.data?.email}
          </p>
          <p className="text-gray-700 mb-1">
            <span className="font-medium text-black">Phone :</span> {users?.data?.phoneNumber}
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-medium text-black">DOB :</span> {formatDate(users?.data?.dateOfBirth)}
          </p>
        </div>

        <div className="p-4 border-t mx-10">
          <button className="block rounded-full bg-gray-900 hover:shadow-lg font-semibold text-white -ml-4 px-6 py-2 w-[22.5vw]" onClick={() => setOpen(true)}>
            View Portfolio
          </button>
        </div>
      </div>
      <PortFolio visible={open} onClose={() => setOpen(false)} />
      </div>
    );
}

export default Card;
