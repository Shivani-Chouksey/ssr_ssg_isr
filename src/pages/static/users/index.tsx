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

export const getStaticProps = async () => {
  const response = await fetch("https://dummyjson.com/users");
  const { users } = await response.json();
  // Pass user data to the page via props
  return { props: { users } };
};

export default index;
