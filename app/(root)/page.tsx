import Landing from "@/components/Landing/Landing";
import { Redirect } from "@/components/Redirect";
import { getServerSession } from "next-auth";
export default async function Home() {
  const session = await getServerSession();

  if (session?.user) {
    return <Redirect to={"/home"} />;
  }
  return (
    <>
      <Landing />
    </>
  );
}
