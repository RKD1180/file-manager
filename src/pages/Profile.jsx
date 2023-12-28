import { Badge, Spinner, Table } from "flowbite-react";
import profile from "./../assets/images/profile.png";
import { useEffect, useState } from "react";
import axios from "../axios/axios";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

const Profile = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    axios.get(`/auth/users`).then((res) => {
      if (res?.data?.status == 200) {
        setUsers(res?.data?.users);
        setIsLoading(false);
      } else {
        toast.error(res?.data?.error?.message);
      }
    });
  }, []);

  return (
    <div className="px-5 my-5">
      <ToastContainer />
      <h2 className="font-bold text-[20px]">Recent users</h2>
      <p className="text-gray-500">A page to see all of your users</p>

      <div className="overflow-x-auto my-5">
        <Table>
          <Table.Head>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Address</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Role</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {users?.map((user, idx) => (
              <Table.Row
                key={idx}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>
                  <Link
                    to={`/profile/${user?._id}`}
                    className="flex gap-3 items-center"
                  >
                    <img src={user?.picture || profile} alt="" />
                    <div>
                      <h2 className="font-semibold text-black capitalize">
                        {user?.name}
                      </h2>
                      <p>{user?.email}</p>
                    </div>
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <div>
                    <h2 className="font-semibold text-black">
                      {user?.address}
                    </h2>
                    <p>{user?.state}</p>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  {user?.isActive ? (
                    <Badge color="success" className="rounded-lg w-fit">
                      Active
                    </Badge>
                  ) : (
                    <Badge color="failure" className="rounded-lg w-fit">
                      InActive
                    </Badge>
                  )}
                </Table.Cell>
                <Table.Cell>{user?.isAdmin ? "Admin" : "User"}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      {isLoading && (
        <div className="flex justify-center mx-auto w-full">
          <Spinner aria-label="Default status example" />
        </div>
      )}
    </div>
  );
};

export default Profile;
