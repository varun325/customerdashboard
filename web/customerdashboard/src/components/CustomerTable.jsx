import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsArrowUp, BsArrowDown } from 'react-icons/bs';

const CustomerTable = () => {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortDirections, setSortDirections] = useState({
    sno: 'asc',
    customer_name: 'asc',
    age: 'asc',
    phone: 'asc',
    location: 'asc',
    date: 'asc',
    time: 'asc',
  });
  const [searchInput, setSearchInput] = useState('');
  const customersPerPage = 20;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/customers');
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  let currentCustomers = customers.slice(indexOfFirstCustomer, indexOfLastCustomer);

  // Search functionality
  if (searchInput) {
    currentCustomers = customers.filter(
      customer =>
        customer.customer_name.toLowerCase().includes(searchInput.toLowerCase()) ||
        customer.location.toLowerCase().includes(searchInput.toLowerCase())
    );
  }

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const sortByColumn = columnKey => {
    const sortedCustomers = [...currentCustomers].sort((a, b) => {
      const direction = sortDirections[columnKey];
      if (direction === 'asc') {
        return a[columnKey] > b[columnKey] ? 1 : -1;
      } else {
        return a[columnKey] < b[columnKey] ? 1 : -1;
      }
    });
    setCustomers(sortedCustomers);
    setSortDirections({ ...sortDirections, [columnKey]: sortDirections[columnKey] === 'asc' ? 'desc' : 'asc' });
  };

  const parseDateTime = dateTimeString => {
    const dateTime = new Date(dateTimeString);
    const date = dateTime.toLocaleDateString();
    const time = dateTime.toLocaleTimeString();
    return { date, time };
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-semibold mb-6">Customers Table</h1>
      <div className="flex items-center mb-4">
      <input
        type="text"
        value={searchInput}
        onChange={e => setSearchInput(e.target.value)}
        className="px-4 py-3 border rounded-md mr-2 text-lg" // Adjust padding and font size here
        placeholder="Search by name or location"
      />
    </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase border-b cursor-pointer" onClick={() => sortByColumn('sno')}>
                Sno {sortDirections.sno === 'asc' ? <BsArrowUp /> : <BsArrowDown />}
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase border-b cursor-pointer" onClick={() => sortByColumn('customer_name')}>
                Customer Name {sortDirections.customer_name === 'asc' ? <BsArrowUp /> : <BsArrowDown />}
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase border-b cursor-pointer" onClick={() => sortByColumn('age')}>
                Age {sortDirections.age === 'asc' ? <BsArrowUp /> : <BsArrowDown />}
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase border-b cursor-pointer" onClick={() => sortByColumn('phone')}>
                Phone {sortDirections.phone === 'asc' ? <BsArrowUp /> : <BsArrowDown />}
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase border-b cursor-pointer" onClick={() => sortByColumn('location')}>
                Location {sortDirections.location === 'asc' ? <BsArrowUp /> : <BsArrowDown />}
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase border-b cursor-pointer" onClick={() => sortByColumn('date')}>
                Date {sortDirections.date === 'asc' ? <BsArrowUp /> : <BsArrowDown />}
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase border-b cursor-pointer" onClick={() => sortByColumn('time')}>
                Time {sortDirections.time === 'asc' ? <BsArrowUp /> : <BsArrowDown />}
              </th>
            </tr>
          </thead>
          <tbody>
            {currentCustomers.map((customer, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                <td className="px-4 py-2 border">{customer.sno}</td>
                <td className="px-4 py-2 border">{customer.customer_name}</td>
                <td className="px-4 py-2 border">{customer.age}</td>
                <td className="px-4 py-2 border">{customer.phone}</td>
                <td className="px-4 py-2 border">{customer.location}</td>
                <td className="px-4 py-2 border">{parseDateTime(customer.created_at).date}</td>
                <td className="px-4 py-2 border">{parseDateTime(customer.created_at).time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        <button
          className="px-4 py-2 mx-1 rounded-md bg-gray-200 text-gray-800"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {[...Array(Math.ceil(customers.length / customersPerPage))].map((_, index) => (
          <button
            key={index}
            className={`px-4 py-2 mx-1 rounded-md ${currentPage === index + 1 ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'}`}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="px-4 py-2 mx-1 rounded-md bg-gray-200 text-gray-800"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === Math.ceil(customers.length / customersPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CustomerTable;
