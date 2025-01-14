import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import { Redirect } from "@/components/Redirect";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return <Redirect to={"/signin"} />;
  }

  return (
    <>
      <h1>Homepage</h1>
      <PrimaryButton />
    </>
  );
}
