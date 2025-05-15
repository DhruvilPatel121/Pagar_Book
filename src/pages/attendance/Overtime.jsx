import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaSave, FaSearch } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { colors, componentStyles, typography, spacing } from '../../theme.js';
import staffData from '../../data/staff.json';

function Overtime() {
    const location = useLocation();
    const {
        selectedStaff: initialSelectedStaff = [],
        overtimeCounts: initialOvertimeCounts = {},
        totalOvertimeClicks = 0
    } = location.state || {};

    const [overtimeCounts, setOvertimeCounts] = useState(initialOvertimeCounts);


    const [staffList, setStaffList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [overtimeHours, setOvertimeHours] = useState('01:00');
    const [overtimeRate, setOvertimeRate] = useState('1.5x');
    const [overtimeReason, setOvertimeReason] = useState('');

    // Add the missing selectedStaff state
    const [selectedStaff, setSelectedStaff] = useState(initialSelectedStaff);

    // Load staff data
    useEffect(() => {
        setStaffList(staffData);
    }, []);

    // Get staff with overtime entries
    const getStaffOvertimeEntries = () => {
        return staffList
            .filter(staff => overtimeCounts[staff.id] && overtimeCounts[staff.id] > 0)
            .map(staff => ({
                staff,
                overtimeCount: overtimeCounts[staff.id] || 0,
                entries: Array.from({ length: overtimeCounts[staff.id] || 0 }, (_, i) => ({
                    id: `${staff.id}-${i}`,
                    date: new Date(Date.now() - i * 86400000).toISOString(), // One day apart
                    hours: '01:00',
                    overtimeRate: '1.5x',
                    shift: staff.shift || 'PRODUCTION SHIFT'
                }))
            }));
    };

    useEffect(() => {
        setStaffList(staffData);

        if (location.state) {
            if (location.state.selectedStaff) {
                setSelectedStaff(location.state.selectedStaff);
            }
            if (location.state.OvertimeCounts) {
                setOverttimeCounts(location.state.OvertimeCounts);
            }
        }
    }, [location.state]);

    const getStaffFineEntries = () => {
        const staffWithFines = staffList.filter(staff => OvertimeCounts[staff.id] && OvertimeCounts[staff.id] > 0);

        return staffWithFines.map(staff => ({
            staff,
            fineCount: OvertimeCounts[staff.id] || 0,
            // Generate sample entries based on fine count
            entries: Array.from({ length: Counts[staff.id] || 0 }, (_, i) => ({
                id: `${staff.id}-${i}`,
                date: new Date(Date.now() - i * 86400000).toISOString(),
                hours: '00:12',
                fineType: '1x Salary',
                shift: 'PRODUCTION SHIFT'
            }))
        }));
    };

    // Format date for display
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0].replace(/-/g, '-');
    };

    // Format time for display
    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toTimeString().split(' ')[0];
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className="w-full bg-gray-50 min-h-screen">
            <header className={componentStyles.header}>
                <div className="flex justify-between items-center">
                    <h1 className={typography.header}>Review Overtime</h1>
                </div>
            </header>

            <div className={componentStyles.finePage.container}>
                <div className={componentStyles.finePage.header}>
                    <Link to="/attendance" className={componentStyles.finePage.backButton}>
                        <FaArrowLeft className="mr-2" /> Back
                    </Link>
                    <h2 className={componentStyles.finePage.title}>Review Overtime</h2>
                </div>

                {/* Staff Overtime Summary */}
                <div className="mb-6 bg-white rounded-lg shadow-sm p-4">
                    <h3 className="text-lg font-medium text-gray-800 mb-3">Staff Overtime Summary</h3>

                    {getStaffOvertimeEntries().length > 0 ? (
                        <>
                            <div className="flex justify-between items-center mb-4">
                                <div className="text-sm text-gray-500">
                                    {getStaffOvertimeEntries().length} staff member{getStaffOvertimeEntries().length !== 1 ? 's' : ''} with overtime
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        className="px-3 py-1.5 text-sm bg-gray-50 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
                                        onClick={() => {
                                            // 1) clear the selected staff
                                            setSelectedStaff([]);

                                            // 2) reset every overtime count to zero
                                            const cleared = {};
                                            Object.keys(overtimeCounts).forEach(id => {
                                                cleared[id] = 0;
                                            });

                                            // 3) update the state properly
                                            setOvertimeCounts(cleared);
                                        }}
                                    >
                                        Clear
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {getStaffOvertimeEntries().map(({ staff, overtimeCount }) => (
                                    <div
                                        key={staff.id}
                                        className="flex items-center p-3 border rounded-md transition-all cursor-pointer bg-gray-50 border-gray-200 hover:bg-gray-100"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3 overflow-hidden">
                                            {staff.image ? (
                                                <img src={staff.image} alt={staff.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="text-blue-800 font-medium">{staff.name.charAt(0)}</span>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-medium text-gray-800">{staff.name}</div>
                                            <div className="text-sm text-gray-500 flex items-center">
                                                {staff.department || 'No Department'}
                                                {staff.shift && staff.shift !== staff.department && (
                                                    <>
                                                        <span className="mx-1">•</span>
                                                        {staff.shift}
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium text-sm">
                                                {overtimeCount} {overtimeCount === 1 ? 'Hour' : 'Hours'}
                                            </div>
                                            {overtimeCount > 1 && (
                                                <div className="text-xs text-gray-500 mt-1">
                                                    Last: {formatDate(new Date().toISOString())}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-8 text-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                                <span className="text-gray-400 text-2xl">!</span>
                            </div>
                            <h4 className="text-gray-700 font-medium mb-1">No Overtime Applied</h4>
                            <p className="text-gray-500 text-sm max-w-md">
                                No staff members have been marked with overtime. Return to the attendance page to apply overtime.
                            </p>
                            <Link
                                to="/attendance"
                                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                            >
                                Go to Attendance
                            </Link>
                        </div>
                    )}
                </div>

                {/* Overtime entries list */}
                <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-800 mb-3">Overtime Details</h3>

                    {getStaffOvertimeEntries().length > 0 ? (
                        <div className="grid grid-cols-1 gap-4">
                            {getStaffOvertimeEntries().map(({ staff, entries }) => (
                                <div key={staff.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2 overflow-hidden">
                                                {staff.image ? (
                                                    <img src={staff.image} alt={staff.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <span className="text-blue-800 font-medium">{staff.name.charAt(0)}</span>
                                                )}
                                            </div>
                                            <div className="font-medium text-gray-800">{staff.name}</div>
                                        </div>
                                        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium text-sm">
                                            {entries.length} {entries.length === 1 ? 'Hour' : 'Hours'}
                                        </div>
                                    </div>

                                    {entries.map((entry, index) => (
                                        <div key={entry.id} className={`${index > 0 ? 'mt-4 pt-4 border-t border-gray-100' : ''}`}>
                                            <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-100">
                                                <div className="text-gray-700">
                                                    <span className="font-medium">in:</span> {formatTime(entry.date).substring(0, 5)}
                                                    <span className="mx-2 font-medium">out:</span> {formatTime(new Date(new Date(entry.date).getTime() + 2 * 60 * 60 * 1000)).substring(0, 5)}
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-sm text-gray-700">{formatDate(entry.date)}</div>
                                                    <div className="text-sm text-blue-600">{entry.shift}</div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-3 gap-2">
                                                <div>
                                                    <label className="block text-xs text-gray-500 mb-1">Hours</label>
                                                    <div className="flex">
                                                        <input
                                                            type="text"
                                                            value={entry.hours}
                                                            className="w-full p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-300"
                                                            readOnly
                                                        />
                                                        <span className="bg-gray-100 border border-l-0 border-gray-300 rounded-r-md px-2 flex items-center text-gray-600">
                                                            hrs
                                                        </span>
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-xs text-gray-500 mb-1">Overtime Rate</label>
                                                    <select
                                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-300"
                                                        value={entry.overtimeRate}
                                                        readOnly
                                                    >
                                                        <option>1.5x Salary</option>
                                                        <option>2x Salary</option>
                                                    </select>
                                                </div>

                                                <div>
                                                    <label className="block text-xs text-gray-500 mb-1">Per Hour</label>
                                                    <div className="flex">
                                                        <span className="bg-gray-100 border border-r-0 border-gray-300 rounded-l-md px-2 flex items-center text-gray-600">
                                                            ₹
                                                        </span>
                                                        <input
                                                            type="text"
                                                            defaultValue={(staff.salary || 100) / 8}
                                                            className="w-full p-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-1 focus:ring-blue-300"
                                                            readOnly
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex justify-end mt-3">
                                                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center">
                                                    <FaSave className="mr-1" /> Save
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-lg p-6 text-center">
                            <p className="text-gray-500">No overtime entries available. Select staff members to apply overtime.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
export default Overtime;
