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
  try {
    const response = await fetch("https://dummyjson.com/users");
    if (!response.ok) {
      throw new Error("Error While Fetching User ");
    }
    const { users } = await response.json();

    // Pass user data to the page via props
    return { props: { users } };
  } catch (error) {
    console.log("Error While Fetching USer Server Side Rendering ", error);

    return { props: { users: [] } };
  }
};

export default index;
