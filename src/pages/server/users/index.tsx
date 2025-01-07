type IndexProps = {
  users: any[];
};
const index: React.FC<IndexProps> = (props) => {
  return (
    <div>
      <h1>SSR</h1>

      {props.users.map((user, i) => (
        <li key={i}>{user.firstName}</li>
      ))}
    </div>
  );
};

export const getServerSideProps = async () => {
  const response = await fetch("https://dummyjson.com/users");
  const { users } = await response.json();

  // Pass user data to the page via props
  return { props: { users } };
};

export default index;
