import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { BsPersonVcard } from 'react-icons/bs';
import { MdEmojiPeople } from 'react-icons/md';
import { TbReportMoney } from 'react-icons/tb';
import { AiOutlineFileText } from 'react-icons/ai';
import { RiMoneyDollarBoxLine } from 'react-icons/ri';
import { GiPayMoney } from 'react-icons/gi';

const ProfileSidebar = () => {

   const { id } = useParams(); // Get the staff ID from URL

  const menuItems = [
    { icon: <BsPersonVcard className="text-xl" />, label: 'Profile', path: 'personal' },
    { icon: <MdEmojiPeople className="text-xl" />, label: 'Attendance', path: 'attendance' },
    { icon: <TbReportMoney className="text-xl" />, label: 'Salary Overview', path: 'salary-overview' },
    { icon: <AiOutlineFileText className="text-xl" />, label: 'YTD Statement', path: 'ytd-statement' },
    { icon: <RiMoneyDollarBoxLine className="text-xl" />, label: 'Salary Structure', path: 'salary-structure' },
    { icon: <GiPayMoney className="text-xl" />, label: 'Loans', path: 'loans' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden sticky top-4 h-[550px]">
      {menuItems.map((item, index) => (
        <NavLink
          key={index}
          to={item.path}
          className={({ isActive }) =>
            `flex items-center gap-4 px-6 py-4 transition-all duration-200 ${
              isActive 
                ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' 
                : 'text-gray-600 hover:bg-gray-50 border-l-4 border-transparent'
            }`
          }
        >
          {item.icon}
          <span className="text-sm font-medium">{item.label}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default ProfileSidebar