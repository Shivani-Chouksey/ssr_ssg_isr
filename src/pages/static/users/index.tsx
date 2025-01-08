import React from "react";
type IndexProps = {
  users: any[];
};
const index: React.FC<IndexProps> = ({ users }) => {
  return (
    <div className="p-4">
      <h2>Static site Generation</h2>
      {users.map((data, index) => (
        <li>{data.firstName}</li>
      ))}
    </div>
  );
};

// Fetch data during build time (Static Site Generation)
export const getStaticProps = async () => {
  try {
    const response = await fetch("https://dummyjson.com/users", {
      next: { revalidate: 3600 },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch User -- Static Site Generation");
    }

    const data = await response.json();
    const users = data.users;
    return { props: { users } };
  } catch (error) {
    console.log("Failed to fetch User :", error);
    return { props: { users: [] } };
  }
};

export default index;
