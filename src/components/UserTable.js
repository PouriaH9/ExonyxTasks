import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { FaEye, FaEdit, FaCheck } from "react-icons/fa";
import Modal from "./Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserTable = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [EditSelectedUser, setEditSelectedUser] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const columns = [
    {
      name: "ID",
      selector: "id",
      sortable: true,
    },
    {
      name: "Avatar",
      selector: "avatar",
      cell: (row) => (
        <img
          className="w-[100px] rounded-[50%] m-2 border boreder-2 border-green-200"
          src={row.avatar}
          alt={row.first_name}
        />
      ),
      sortable: false,
    },
    {
      name: "First Name",
      selector: "first_name",
      sortable: false,
    },
    {
      name: "Last Name",
      selector: "last_name",
      sortable: false,
    },
    {
      name: "Email",
      selector: "email",
      sortable: false,
    },
    {
      name: "Show",
      cell: (row) => (
        <FaEye
          className="cursor-pointer text-[25px]"
          onClick={() => handleShow(row)}
        />
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      pointerOnHover: true,
    },
    {
      name: "Edit",
      cell: (row) => (
        <FaEdit
          className="cursor-pointer text-[25px]"
          onClick={() => handleEdit(row)}
        />
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      pointerOnHover: true,
    },
  ];

  const handleShow = (row) => {
    setEditSelectedUser(null);
    setSelectedUser(row);
    setShowModal(true);
  };

  const handleEdit = (row) => {
    setSelectedUser(null);
    setEditSelectedUser(row);
    setShowModal(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowModal(null);
    setShowSuccessMessage(true);
  };

  const perPage = 6;

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://reqres.in/api/users?page=${currentPage}&per_page=${perPage}`
      )
      .then((response) => {
        setUsers(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setLoading(false);
      });
  }, [currentPage]);

  const handlePageChange = (page) => {
    setLoading(true);
    setCurrentPage(page);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = searchQuery
    ? users.filter(
        (user) =>
          user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.last_name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : users;

  return (
    <div className="xl:w-9/12 md:w-4/5 mx-auto">
      <ToastContainer />
      <input
        className=" bg-gray-100 p-2 text-ml rounded mt-3 w-[270px] focus:outline-none focus:ring focus:ring-violet-300"
        type="text"
        placeholder="Search by name or even last name"
        onChange={handleSearch}
      />
      <DataTable
        className="p-2 mt-3 bg-gray-50"
        columns={columns}
        data={filteredUsers}
        highlightOnHover
        pagination
        paginationServer
        paginationTotalRows={12}
        paginationPerPage={perPage}
        paginationComponentOptions={{
          rowsPerPageText: "Users per page:",
          rangeSeparatorText: "of",
          noRowsPerPage: true,
          selectAllRowsItem: false,
          selectAllRowsItemText: "All",
        }}
        onChangePage={handlePageChange}
        progressPending={loading}
      />

      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        {selectedUser && (
          <h3 className="p-5 font-bold text-xl">
            <FaCheck className="mr-3 inline text-green-400 text-[35px]" />
            {selectedUser.first_name} {selectedUser.last_name}
          </h3>
        )}
        {EditSelectedUser && (
          <div>
            <h3 className=" text-center pt-3 p-6 text-xl ">
              Edit{" "}
              <span className="font-bold">{EditSelectedUser.first_name}'s</span>{" "}
              email and password
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6" action="#">
              <div>
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Email
                </label>
                <input
                  type="any"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="name@company.com"
                />
              </div>
              <div>
                <label
                  for="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  type="any"
                  name="password"
                  id="password"
                  placeholder="**********"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>
              <button
                onClick={() => toast.success("Success!")}
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Edit email and password
              </button>
            </form>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default UserTable;
