import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaFilter, FaDownload, FaEdit, FaTrash, FaUserPlus, FaUsers } from 'react-icons/fa';

const CustomersList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [showAddOptions, setShowAddOptions] = useState(false);

  // Convert customersData to state so we can update it when deleting
  const [customersData, setCustomersData] = useState([
    {
      id: 1,
      name: 'nutan engineering industry',
      contactName: 'bakul patel',
      number: '+91 8155069928',
      address: '123, OCEL Rd, Makarpura GIDC...',
      email: '-',
      city: 'Vadodara',
      pincode: '390014',
      addedBy: 'HIREN BARIYA',
      addedOn: '22 May, 2025',
      visibleTo: 'HIREN BARIYA'
    },
    {
      id: 2,
      name: 'bhagwati spring manufacturing',
      contactName: 'jigar patel',
      number: '+91 9737497630',
      address: 'A2-620/1, INDUSTRIAL...',
      email: '-',
      city: 'Vadodara',
      pincode: '390011',
      addedBy: 'HIREN BARIYA',
      addedOn: '22 May, 2025',
      visibleTo: 'HIREN BARIYA'
    },
    {
      id: 3,
      name: 'hariome spring industries',
      contactName: 'divy patel',
      number: '+91 8866197604',
      address: '496/6, G.I.D.C, Maka...',
      email: '-',
      city: 'Vadodara',
      pincode: '390013',
      addedBy: 'HIREN BARIYA',
      addedOn: '22 May, 2025',
      visibleTo: 'HIREN BARIYA'
    },
    {
      id: 4,
      name: 'acme electronic',
      contactName: 'acme',
      number: '+91 8238008788',
      address: '780 C-1, Makarpura G...',
      email: '-',
      city: 'Vadodara',
      pincode: '390011',
      addedBy: 'HIREN BARIYA',
      addedOn: '22 May, 2025',
      visibleTo: 'HIREN BARIYA'
    },
    {
      id: 5,
      name: 'Accurate engineering',
      contactName: 'surendrashing',
      number: '+91 9898240294',
      address: '691/A, S KUMAR ENGIN...',
      email: '-',
      city: 'Vadodara',
      pincode: '390013',
      addedBy: 'HIREN BARIYA',
      addedOn: '22 May, 2025',
      visibleTo: 'HIREN BARIYA'
    },
    {
      id: 6,
      name: 'solitaire machine tools',
      contactName: 'smt',
      number: '+91 9099440114',
      address: 'Krishna Industrial E...',
      email: '-',
      city: 'Vadodara',
      pincode: '390003',
      addedBy: 'HIREN BARIYA',
      addedOn: '21 May, 2025',
      visibleTo: 'HIREN BARIYA'
    },
    {
      id: 7,
      name: 'Frank industries corporation',
      contactName: 'naresh sir',
      number: '+91 9426313113',
      address: 'Prakash House, Gorwa...',
      email: '-',
      city: 'Vadodara',
      pincode: '390003',
      addedBy: 'HIREN BARIYA',
      addedOn: '21 May, 2025',
      visibleTo: 'HIREN BARIYA'
    },
    {
      id: 8,
      name: 'Makarpura GIDC',
      contactName: 'TANNA',
      number: '+91 9426313114',
      address: 'Makarpura GIDC...',
      email: '-',
      city: 'Vadodara',
      pincode: '390014',
      addedBy: 'RAUNAKBHAI TANNA',
      addedOn: '17 May, 2025',
      visibleTo: 'RAUNAKBHAI TANNA'
    },
    {
        id: 1,
        name: 'nutan engineering industry',
        contactName: 'bakul patel',
        number: '+91 8155069928',
        address: '123, OCEL Rd, Makarpura GIDC...',
        email: '-',
        city: 'Vadodara',
        pincode: '390014',
        addedBy: 'HIREN BARIYA',
        addedOn: '22 May, 2025',
        visibleTo: 'HIREN BARIYA'
      },
      {
        id: 2,
        name: 'bhagwati spring manufacturing',
        contactName: 'jigar patel',
        number: '+91 9737497630',
        address: 'A2-620/1, INDUSTRIAL...',
        email: '-',
        city: 'Vadodara',
        pincode: '390011',
        addedBy: 'HIREN BARIYA',
        addedOn: '22 May, 2025',
        visibleTo: 'HIREN BARIYA'
      },
      {
        id: 3,
        name: 'hariome spring industries',
        contactName: 'divy patel',
        number: '+91 8866197604',
        address: '496/6, G.I.D.C, Maka...',
        email: '-',
        city: 'Vadodara',
        pincode: '390013',
        addedBy: 'HIREN BARIYA',
        addedOn: '22 May, 2025',
        visibleTo: 'HIREN BARIYA'
      },
      {
        id: 4,
        name: 'acme electronic',
        contactName: 'acme',
        number: '+91 8238008788',
        address: '780 C-1, Makarpura G...',
        email: '-',
        city: 'Vadodara',
        pincode: '390011',
        addedBy: 'HIREN BARIYA',
        addedOn: '22 May, 2025',
        visibleTo: 'HIREN BARIYA'
      },
      {
        id: 5,
        name: 'Accurate engineering',
        contactName: 'surendrashing',
        number: '+91 9898240294',
        address: '691/A, S KUMAR ENGIN...',
        email: '-',
        city: 'Vadodara',
        pincode: '390013',
        addedBy: 'HIREN BARIYA',
        addedOn: '22 May, 2025',
        visibleTo: 'HIREN BARIYA'
      },
      {
        id: 6,
        name: 'solitaire machine tools',
        contactName: 'smt',
        number: '+91 9099440114',
        address: 'Krishna Industrial E...',
        email: '-',
        city: 'Vadodara',
        pincode: '390003',
        addedBy: 'HIREN BARIYA',
        addedOn: '21 May, 2025',
        visibleTo: 'HIREN BARIYA'
      },
      {
        id: 7,
        name: 'Frank industries corporation',
        contactName: 'naresh sir',
        number: '+91 9426313113',
        address: 'Prakash House, Gorwa...',
        email: '-',
        city: 'Vadodara',
        pincode: '390003',
        addedBy: 'HIREN BARIYA',
        addedOn: '21 May, 2025',
        visibleTo: 'HIREN BARIYA'
      },
      {
        id: 8,
        name: 'Makarpura GIDC',
        contactName: 'TANNA',
        number: '+91 9426313114',
        address: 'Makarpura GIDC...',
        email: '-',
        city: 'Vadodara',
        pincode: '390014',
        addedBy: 'RAUNAKBHAI TANNA',
        addedOn: '17 May, 2025',
        visibleTo: 'RAUNAKBHAI TANNA'
      },
      {
        id: 1,
        name: 'nutan engineering industry',
        contactName: 'bakul patel',
        number: '+91 8155069928',
        address: '123, OCEL Rd, Makarpura GIDC...',
        email: '-',
        city: 'Vadodara',
        pincode: '390014',
        addedBy: 'HIREN BARIYA',
        addedOn: '22 May, 2025',
        visibleTo: 'HIREN BARIYA'
      },
      {
        id: 2,
        name: 'bhagwati spring manufacturing',
        contactName: 'jigar patel',
        number: '+91 9737497630',
        address: 'A2-620/1, INDUSTRIAL...',
        email: '-',
        city: 'Vadodara',
        pincode: '390011',
        addedBy: 'HIREN BARIYA',
        addedOn: '22 May, 2025',
        visibleTo: 'HIREN BARIYA'
      },
      {
        id: 3,
        name: 'hariome spring industries',
        contactName: 'divy patel',
        number: '+91 8866197604',
        address: '496/6, G.I.D.C, Maka...',
        email: '-',
        city: 'Vadodara',
        pincode: '390013',
        addedBy: 'HIREN BARIYA',
        addedOn: '22 May, 2025',
        visibleTo: 'HIREN BARIYA'
      },
      {
        id: 4,
        name: 'acme electronic',
        contactName: 'acme',
        number: '+91 8238008788',
        address: '780 C-1, Makarpura G...',
        email: '-',
        city: 'Vadodara',
        pincode: '390011',
        addedBy: 'HIREN BARIYA',
        addedOn: '22 May, 2025',
        visibleTo: 'HIREN BARIYA'
      },
      {
        id: 5,
        name: 'Accurate engineering',
        contactName: 'surendrashing',
        number: '+91 9898240294',
        address: '691/A, S KUMAR ENGIN...',
        email: '-',
        city: 'Vadodara',
        pincode: '390013',
        addedBy: 'HIREN BARIYA',
        addedOn: '22 May, 2025',
        visibleTo: 'HIREN BARIYA'
      },
      {
        id: 6,
        name: 'solitaire machine tools',
        contactName: 'smt',
        number: '+91 9099440114',
        address: 'Krishna Industrial E...',
        email: '-',
        city: 'Vadodara',
        pincode: '390003',
        addedBy: 'HIREN BARIYA',
        addedOn: '21 May, 2025',
        visibleTo: 'HIREN BARIYA'
      },
      {
        id: 7,
        name: 'Frank industries corporation',
        contactName: 'naresh sir',
        number: '+91 9426313113',
        address: 'Prakash House, Gorwa...',
        email: '-',
        city: 'Vadodara',
        pincode: '390003',
        addedBy: 'HIREN BARIYA',
        addedOn: '21 May, 2025',
        visibleTo: 'HIREN BARIYA'
      },
      {
        id: 8,
        name: 'Makarpura GIDC',
        contactName: 'TANNA',
        number: '+91 9426313114',
        address: 'Makarpura GIDC...',
        email: '-',
        city: 'Vadodara',
        pincode: '390014',
        addedBy: 'RAUNAKBHAI TANNA',
        addedOn: '17 May, 2025',
        visibleTo: 'RAUNAKBHAI TANNA'
      },
      {
        id: 1,
        name: 'nutan engineering industry',
        contactName: 'bakul patel',
        number: '+91 8155069928',
        address: '123, OCEL Rd, Makarpura GIDC...',
        email: '-',
        city: 'Vadodara',
        pincode: '390014',
        addedBy: 'HIREN BARIYA',
        addedOn: '22 May, 2025',
        visibleTo: 'HIREN BARIYA'
      },
      {
        id: 2,
        name: 'bhagwati spring manufacturing',
        contactName: 'jigar patel',
        number: '+91 9737497630',
        address: 'A2-620/1, INDUSTRIAL...',
        email: '-',
        city: 'Vadodara',
        pincode: '390011',
        addedBy: 'HIREN BARIYA',
        addedOn: '22 May, 2025',
        visibleTo: 'HIREN BARIYA'
      },
      {
        id: 3,
        name: 'hariome spring industries',
        contactName: 'divy patel',
        number: '+91 8866197604',
        address: '496/6, G.I.D.C, Maka...',
        email: '-',
        city: 'Vadodara',
        pincode: '390013',
        addedBy: 'HIREN BARIYA',
        addedOn: '22 May, 2025',
        visibleTo: 'HIREN BARIYA'
      },
      {
        id: 4,
        name: 'acme electronic',
        contactName: 'acme',
        number: '+91 8238008788',
        address: '780 C-1, Makarpura G...',
        email: '-',
        city: 'Vadodara',
        pincode: '390011',
        addedBy: 'HIREN BARIYA',
        addedOn: '22 May, 2025',
        visibleTo: 'HIREN BARIYA'
      },
      {
        id: 5,
        name: 'Accurate engineering',
        contactName: 'surendrashing',
        number: '+91 9898240294',
        address: '691/A, S KUMAR ENGIN...',
        email: '-',
        city: 'Vadodara',
        pincode: '390013',
        addedBy: 'HIREN BARIYA',
        addedOn: '22 May, 2025',
        visibleTo: 'HIREN BARIYA'
      },
      {
        id: 6,
        name: 'solitaire machine tools',
        contactName: 'smt',
        number: '+91 9099440114',
        address: 'Krishna Industrial E...',
        email: '-',
        city: 'Vadodara',
        pincode: '390003',
        addedBy: 'HIREN BARIYA',
        addedOn: '21 May, 2025',
        visibleTo: 'HIREN BARIYA'
      },
      {
        id: 7,
        name: 'Frank industries corporation',
        contactName: 'naresh sir',
        number: '+91 9426313113',
        address: 'Prakash House, Gorwa...',
        email: '-',
        city: 'Vadodara',
        pincode: '390003',
        addedBy: 'HIREN BARIYA',
        addedOn: '21 May, 2025',
        visibleTo: 'HIREN BARIYA'
      },
      {
        id: 8,
        name: 'Makarpura GIDC',
        contactName: 'TANNA',
        number: '+91 9426313114',
        address: 'Makarpura GIDC...',
        email: '-',
        city: 'Vadodara',
        pincode: '390014',
        addedBy: 'RAUNAKBHAI TANNA',
        addedOn: '17 May, 2025',
        visibleTo: 'RAUNAKBHAI TANNA'
      },
  ]);

  // Handle edit customer - navigate to edit page
  const handleEditCustomer = (id) => {
    navigate(`/geo/customers/edit/${id}`);
  };

  // Handle navigation to add single customer page
  const handleAddSingleCustomer = () => {
    navigate('/geo/customers/add');
    setShowAddOptions(false);
  };

  // Handle navigation to bulk management page
  const handleManageCustomersBulk = () => {
    navigate('/geo/customers/bulk');
    setShowAddOptions(false);
  };

  // Handle navigation to customertemplate page
  const handleCustomersTemplate = () => {
    navigate('/geo/customers/template');
    setShowAddOptions(false);
  };

  // Handle delete customer
  const handleDeleteCustomer = (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      // Filter out the customer with the matching id
      const updatedCustomers = customersData.filter(customer => customer.id !== id);

      // Update the state with the filtered customers
      setCustomersData(updatedCustomers);

      // Update localStorage
      localStorage.setItem('customers', JSON.stringify(updatedCustomers));

      // If we're deleting the last item on the current page, go to previous page
      if (currentCustomers.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  // Handle checkbox selection
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedCustomers(currentCustomers.map(customer => customer.id));
    } else {
      setSelectedCustomers([]);
    }
  };

  const handleSelectCustomer = (id) => {
    if (selectedCustomers.includes(id)) {
      setSelectedCustomers(selectedCustomers.filter(customerId => customerId !== id));
    } else {
      setSelectedCustomers([...selectedCustomers, id]);
    }
  };

  // Filter customers based on search term
  const filteredCustomers = customersData.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.number.includes(searchTerm)
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredCustomers.length / rowsPerPage);
  const indexOfLastCustomer = currentPage * rowsPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - rowsPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);

  // Close dropdown when clicking outside
  // Add a new state for the overlay
  const [showOverlay, setShowOverlay] = useState(false);
  
  // Update the useEffect to handle both dropdowns and set overlay
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showAddOptions && !event.target.closest('.add-customer-dropdown')) {
        setShowAddOptions(false);
      }
      if (showFilter && !event.target.closest('.filter-dropdown')) {
        setShowFilter(false);
      }
    };
  
    // Set overlay when either dropdown is open
    setShowOverlay(showAddOptions || showFilter);
  
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showAddOptions, showFilter]);
  
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm h-full">
      {/* Semi-transparent overlay */}
      {showOverlay && (
        <div className="fixed inset-0 bg-gray-900/40 z-50"></div>
      )}
      
      {/* Header section */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-xl font-semibold text-gray-800">Customers</h1>
            <p className="text-sm text-gray-600">Access your customer details, or add more from this page.</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => setShowAddOptions(!showAddOptions)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center text-sm shadow-sm"
            >
              <FaUserPlus className="mr-2" />
              Add Customer
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>

            {/* Add Customer Dropdown */}
            <div className="relative add-customer-dropdown">
              <button
                onClick={handleCustomersTemplate}
                className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex items-center text-sm shadow-sm"
              >
                Customers Template
              </button>

              {showAddOptions && (
                <div className="absolute flex w-80 right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Add Customer</h3>
                    <p className="text-sm text-gray-600 mb-4">Add a customer by filling in the details below.</p>

                    <div className="space-y-2">
                      <button
                        onClick={handleAddSingleCustomer}
                        className="w-full flex items-center justify-center py-3 px-4 border border-blue-500 rounded-md text-blue-600 hover:bg-blue-50 transition-colors"
                      >
                        <FaUserPlus className="mr-3 text-blue-500" />
                        Add single customer
                      </button>

                      <button
                        onClick={handleManageCustomersBulk}
                        className="w-full flex items-center justify-center py-3 px-4 border border-blue-500 rounded-md text-blue-600 hover:bg-blue-50 transition-colors"
                      >
                        <FaUsers className="mr-3 text-blue-500" />
                        Manage Customers in Bulk
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Search and filter bar */}
        <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
          <div className="relative flex-grow max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by customer name or phone"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex space-x-2">
            <div className="relative filter-dropdown">
              <button
                className="flex items-center px-4 py-2 text-sm bg-white border border-gray-300 rounded-md focus:outline-none hover:bg-gray-50 transition-colors"
                onClick={() => setShowFilter(!showFilter)}
              >
                <FaFilter className="mr-2 text-gray-500" />
                Filter
              </button>

              {showFilter && (
                <div className="fixed left-1/1.5 top-2/3 w-full max-w-[400px] -translate-x-1/2 -translate-y-1/2
                 rounded-lg bg-white p-6 z-50 space-y-6 shadow-2xl flex-col">
                  <div className="p-3">
                    <h3 className="font-medium text-gray-700 mb-2">Filter by</h3>
                    <div className="space-y-2">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">City</label>
                        <select className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm">
                          <option>Select City</option>
                          <option>Vadodara</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Added by</label>
                        <select className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm">
                          <option>Select creators</option>
                          <option>HIREN BARIYA</option>
                          <option>RAUNAKBHAI TANNA</option>
                        </select>
                      </div>
                      <div className="flex justify-end space-x-2 pt-2">
                        <button className="flex items-center gap-2 justify-center font-bold rounded-lg px-4 transition-all duration-100 ease-in-out bg-white text-blue-600 border border-blue-600 hover:bg-blue-50 focus:bg-blue-50 active:bg-blue-100 text-sm h-[38px] flex-1">
                          Clear All
                        </button>
                        <button className="flex items-center gap-2 justify-center font-bold rounded-lg px-4 transition-all duration-100 ease-in-out bg-blue-600 text-white border border-transparent hover:bg-blue-500 focus:bg-blue-500 active:bg-blue-700 text-sm h-[38px] flex-1">
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button className="flex items-center px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              <FaDownload className="mr-2" />
              Download
            </button>
          </div>
        </div>
      </div>

      {/* Customers table */}
      <div className="overflow-hidden">
        <div className="w-full overflow-x-auto">
          <div className="h-[calc(100vh-340px)] lg:max-w-[calc(150vh-1px)] overflow-x-visible ">
            <table className="w-full table-fixed divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  <th scope="col" className="px-3 py-3 text-left" style={{ width: '40px' }}>
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      onChange={handleSelectAll}
                      checked={selectedCustomers.length === currentCustomers.length && currentCustomers.length > 0}
                    />
                  </th>
                  <th scope="col" className="w-[250px] px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer Name
                  </th>
                  <th scope="col" className="w-[150px] px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact Name
                  </th>
                  <th scope="col" className="w-[150px] px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer Number
                  </th>
                  <th scope="col" className="w-[250px] px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Address
                  </th>
                  <th scope="col" className="w-[200px] px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email ID
                  </th>
                  <th scope="col" className="w-[120px] px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    City
                  </th>
                  <th scope="col" className="w-[100px] px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pincode
                  </th>
                  <th scope="col" className="w-[140px] px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Added by
                  </th>
                  <th scope="col" className="w-[120px] px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Added On
                  </th>
                  <th scope="col" className="w-[140px] px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Visible to
                  </th>
                  <th scope="col" className="w-[90px] px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-blue-50 transition-colors">
                    <td className="px-3 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        checked={selectedCustomers.includes(customer.id)}
                        onChange={() => handleSelectCustomer(customer.id)}
                      />
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-blue-600 hover:underline cursor-pointer">
                        {customer.name}
                      </span>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                      {customer.contactName}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                      {customer.number}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                      {customer.address}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                      {customer.email}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                      {customer.city}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                      {customer.pincode}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                      {customer.addedBy}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                      {customer.addedOn}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                      {customer.visibleTo}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <button
                          className="text-blue-600 hover:text-blue-800"
                          title="Edit"
                          onClick={() => handleEditCustomer(customer.id)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-800"
                          title="Delete"
                          onClick={() => handleDeleteCustomer(customer.id)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center px-4 py-3 bg-white border-gray-200">
        <div className="flex items-center">
          <span className="text-sm text-gray-700 mr-3">Rows Per Page</span>
          <select
            className="border border-gray-300 rounded-md text-sm px-2 py-1"
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(Number(e.target.value))}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>

        <div className="flex justify-between sm:hidden">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            Next
          </button>
        </div>

        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-end">
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
              >
                <span className="sr-only">First</span>
                «
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
              >
                <span className="sr-only">Previous</span>
                ‹
              </button>

              {/* Page numbers */}
              {[...Array(totalPages)].map((_, i) => {
                const pageNumber = i + 1;
                // Show current page, first page, last page, and pages around current
                if (
                  pageNumber === 1 ||
                  pageNumber === totalPages ||
                  (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => setCurrentPage(pageNumber)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === pageNumber
                        ? 'z-10 bg-blue-500 border-blue-500 text-blue-600'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        }`}
                    >
                      {pageNumber}
                    </button>
                  );
                } else if (
                  pageNumber === currentPage - 2 ||
                  pageNumber === currentPage + 2
                ) {
                  return (
                    <span
                      key={pageNumber}
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                    >
                      ...
                    </span>
                  );
                }
                return null;
              })}

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
              >
                <span className="sr-only">Next</span>
                ›
              </button>
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
              >
                <span className="sr-only">Last</span>
                »
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};


export default CustomersList;
