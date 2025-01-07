import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

type User = any;

const UserDetail: React.FC<User> = ({ user }) => {
  const router = useRouter();
  //   const [userInfo, setUserInfo] = useState<User | null>(null);

  //   // Extracting the `id` parameter from the router
  //   const userId = router.query?.id as string;

  //   useEffect(() => {
  //     async function getUserDetail() {
  //       if (userId) {
  //         const response = await fetch(`https://dummyjson.com/users/${userId}`);
  //         const data = await response.json();
  //         setUserInfo(data);
  //       }
  //     }
  //     getUserDetail();
  //   }, [userId]);

  return (
    <div>
      <h3>User Detail</h3>
      {user ? (
        <div>
          <p>
            <strong>Name:</strong> {user.firstName} {user.lastName}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
};

// Pre-fetch user data at build time
export const getStaticProps = async (context: { params: { id: string } }) => {
  const { id } = context.params;
  const response = await fetch(`https://dummyjson.com/users/${id}`);
  const user = await response.json();

  return {
    props: { user },
    // revalidate: 10, // ISR: Revalidate every 10 seconds
  };
};

// Specify dynamic paths to pre-render
export const getStaticPaths = async () => {
  const response = await fetch(`https://dummyjson.com/users`);
  const { users } = await response.json();

  const paths = users.map((user: User) => ({
    params: { id: user.id.toString() },
  }));

  return { paths, fallback: false };
  //   return {
  //     paths: [{ params: { id: "1" } }],
  //     fallback: true,
  //   };
};

export default UserDetail;
