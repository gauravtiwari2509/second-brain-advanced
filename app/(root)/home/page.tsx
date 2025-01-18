import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import Content from "@/components/MainCont/Content";
import { Redirect } from "@/components/Redirect";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return <Redirect to={"/signin"} />;
  }

  return (
    <>
      <Content />
    </>
  );
}
