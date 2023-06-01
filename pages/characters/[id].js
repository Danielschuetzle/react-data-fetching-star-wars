import { useRouter } from "next/router";
import useSWR from "swr";
import Card from "../../components/Card";
import Layout from "../../components/Layout";

const fetcher = async (url) => {
  const res = await fetch(url);

  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    error.status = res.status;
    throw error;
  }

  return res.json();
};

export default function Character() {
  const router = useRouter();
  const { id } = router.query; // Access id from router.query

  const { data, error } = useSWR(
    id ? `https://swapi.dev/api/people/${id}/` : null,
    fetcher
  );

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

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
