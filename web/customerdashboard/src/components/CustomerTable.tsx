import React, { useState, useEffect } from "react";
import axios from "axios";
import { BsArrowUp, BsArrowDown } from "react-icons/bs";
import { parseDateTime } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input"

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Customer {
  sno: number;
  customer_name: string;
  age: number;
  phone: string;
  location: string;
  created_at: string;
}

const CustomerTable: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortDirections, setSortDirections] = useState<Record<string, string>>({
    sno: "asc",
    customer_name: "asc",
    age: "asc",
    phone: "asc",
    location: "asc",
    date: "asc", // Default sort direction for date
    time: "asc", // Default sort direction for time
  });
  const [searchInput, setSearchInput] = useState<string>("");
  const customersPerPage: number = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Customer[]>(
          "http://localhost:3000/customers"
        );
        setCustomers(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const indexOfLastCustomer: number = currentPage * customersPerPage;
  const indexOfFirstCustomer: number = indexOfLastCustomer - customersPerPage;
  let currentCustomers: Customer[] = customers.slice(
    indexOfFirstCustomer,
    indexOfLastCustomer
  );

  // Search functionality
  if (searchInput) {
    currentCustomers = customers.filter(
      (customer) =>
        customer.customer_name
          .toLowerCase()
          .includes(searchInput.toLowerCase()) ||
        customer.location.toLowerCase().includes(searchInput.toLowerCase())
    );
  }

  const paginate = (pageNumber: number): void => setCurrentPage(pageNumber);

  const sortByColumn = (columnKey: keyof Customer | "date" | "time"): void => {
    const direction: string = sortDirections[columnKey];
    const sortedCustomers: Customer[] = [...customers].sort((a, b) => {
      if (columnKey === "date" || columnKey === "time") {
        // Sort by parsed date values
        const dateA = new Date(a.created_at).getTime();
        const dateB = new Date(b.created_at).getTime();
        return direction === "asc" ? dateA - dateB : dateB - dateA;
      } else {
        // Sort by other columns
        return direction === "asc"
          ? a[columnKey] > b[columnKey]
            ? 1
            : -1
          : a[columnKey] < b[columnKey]
          ? 1
          : -1;
      }
    });
    setCustomers(sortedCustomers);
    setSortDirections({
      ...sortDirections,
      [columnKey]: direction === "asc" ? "desc" : "asc",
    });
  };
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-semibold mb-6">Customers Table</h1>
      <div className="flex items-center mb-4">
        <Input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search by name or location"
        />
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="w-[100px]"
                onClick={() => sortByColumn("sno")}
              >
                Sno{" "}
                {sortDirections.sno === "asc" ? <BsArrowUp /> : <BsArrowDown />}
              </TableHead>
              <TableHead onClick={() => sortByColumn("customer_name")}>
                Customer Name{" "}
                {sortDirections.customer_name === "asc" ? (
                  <BsArrowUp />
                ) : (
                  <BsArrowDown />
                )}
              </TableHead>
              <TableHead onClick={() => sortByColumn("age")}>
                Age{" "}
                {sortDirections.age === "asc" ? <BsArrowUp /> : <BsArrowDown />}
              </TableHead>
              <TableHead onClick={() => sortByColumn("phone")}>
                Phone{" "}
                {sortDirections.phone === "asc" ? (
                  <BsArrowUp />
                ) : (
                  <BsArrowDown />
                )}
              </TableHead>
              <TableHead onClick={() => sortByColumn("location")}>
                Location{" "}
                {sortDirections.location === "asc" ? (
                  <BsArrowUp />
                ) : (
                  <BsArrowDown />
                )}
              </TableHead>
              <TableHead onClick={() => sortByColumn("date")}>
                Date{" "}
                {sortDirections.date === "asc" ? (
                  <BsArrowUp />
                ) : (
                  <BsArrowDown />
                )}
              </TableHead>
              <TableHead onClick={() => sortByColumn("time")}>
                Time{" "}
                {sortDirections.time === "asc" ? (
                  <BsArrowUp />
                ) : (
                  <BsArrowDown />
                )}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentCustomers.map((customer, index) => (
              <TableRow
                key={index}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <TableCell>{customer.sno}</TableCell>
                <TableCell>{customer.customer_name}</TableCell>
                <TableCell>{customer.age}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>{customer.location}</TableCell>
                <TableCell>{parseDateTime(customer.created_at).date}</TableCell>
                <TableCell>{parseDateTime(customer.created_at).time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-center mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              {currentPage !== 1 ? (
                <PaginationPrevious
                  href="#"
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                />
              ) : (
                <PaginationPrevious href="#" />
              )}
            </PaginationItem>
            {[...Array(Math.ceil(customers.length / customersPerPage))].map(
              (_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink href="#" onClick={() => paginate(index + 1)}>
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              )
            )}
            <PaginationItem>
              {currentPage !==
              Math.ceil(customers.length / customersPerPage) ? (
                <PaginationNext
                  href="#"
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                />
              ) : (
                <PaginationNext href="#" />
              )}
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default CustomerTable;
