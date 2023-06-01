import { useRouter } from "next/router";
import useSWR from "swr";
import Card from "../../components/Card";
import Layout from "../../components/Layout";

// Fetcher function that fetches data from API and handles errors
const fetcher = async (url) => {
  const res = await fetch(url);

  // If there's an error, throw an error with status
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    error.status = res.status;
    throw error;
  }

  // Return fetched data
  return res.json();
};

// Character component
export default function Character() {
  // Access router object to get id from query parameters
  const router = useRouter();
  const { id } = router.query;

  // Use SWR hook to fetch data using id from query parameters
  const { data, error } = useSWR(
    id ? `https://swapi.dev/api/people/${id}/` : null,
    fetcher
  );

  // If there's an error, return error message
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // While data is being fetched, display loading message
  if (!data) {
    return <div>Loading...</div>;
  }

  // Render Card component with fetched data
  return (
    <Layout>
      <Card
        id={id}
        name={data.name}
        height={data.height}
        eyeColor={data.eye_color}
        birthYear={data.birth_year}
      />
    </Layout>
  );
}
