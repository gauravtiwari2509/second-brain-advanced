import PrimaryButton from "@/components/Buttons/PrimaryButton";
import { Redirect } from "@/components/Redirect";
import { getServerSession } from "next-auth";
export default async function Home() {
  const session = await getServerSession();

  if (!session?.user) {
    return <Redirect to={"/"} />;
  }

  return (
    <>
      <h1>Homepage</h1>
      <PrimaryButton />
    </>
  );
}
