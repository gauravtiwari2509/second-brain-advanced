import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import Content from "@/components/MainCont/Content";
import { Redirect } from "@/components/Redirect";
import { ContentProvider } from "@/context/ContentContext";
import { GroupProvider } from "@/context/GroupContext";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return <Redirect to={"/signin"} />;
  }

  return (
    <>
      <GroupProvider>
        <ContentProvider>
          <Content />
        </ContentProvider>
      </GroupProvider>
    </>
  );
}
