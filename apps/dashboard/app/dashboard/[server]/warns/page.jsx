import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import prismaClient from "@majoexe/database";
import { getGuildMember, getServer } from "@majoexe/util/functions";
import { getSession } from "lib/session";
import { redirect } from "next/navigation";
import { Block } from "@/components/blocks/Block";
import { Warns } from "@/components/blocks/client/lists/Warns";
import { Header1, Header5 } from "@/components/blocks/Headers";

export const metadata = {
 title: "Server warns",
 description: "View the warn logs of your server.",
};

export default async function ServerLogs({ params }) {
 const session = await getSession();
 if (!session || !session.access_token) redirect("/auth/login");
 const { server } = params;
 const serverDownload = await getServer(server);
 if (!serverDownload || serverDownload.code === 10004 || !serverDownload.bot) return redirect("/auth/error?error=It%20looks%20like%20the%20server%20you%20are%20trying%20to%20display%20does%20not%20exist");
 const serverMember = await getGuildMember(serverDownload.id, session.access_token);
 if (
  // prettier
  !serverMember ||
  !serverMember.permissions_names ||
  !serverMember.permissions_names.includes("ManageGuild") ||
  !serverMember.permissions_names.includes("Administrator")
 )
  return redirect("/auth/error?error=It%20looks%20like%20you%20do%20not%20have%20permission%20to%20access%20this%20page.");

 const guild = await prismaClient.guild.upsert({
  where: {
   guildId: serverDownload.id,
  },
  update: {},
  create: {
   guildId: serverDownload.id,
  },
  include: {
   guildWarns: {
    orderBy: {
     createdAt: "desc",
    },
    include: {
     user: {
      select: {
       discordId: true,
       name: true,
       avatar: true,
       discriminator: true,
      },
     },
    },
   },
  },
 });

 const data =
  guild.guildWarns?.map((warn) => {
   if (warn.createdAt instanceof Date) {
    warn.createdAt = warn.createdAt.toISOString();
   } else {
    warn.createdAt = new Date().toISOString();
   }
   warn.link = warn.user.discordId;

   return warn;
  }) || [];

 return (
  <>
   <Header1>
    <ExclamationTriangleIcon className="min-h-9 min-w-9 h-9 w-9" />
    Warns <span className="text-accent-primary">({data.length})</span>
   </Header1>
   <Header5 className="mb-4 !block !justify-start gap-1 !text-left">
    Here you can view all users warns issued by users with the <code>Manage Server</code> permission.
   </Header5>
   <Block className="flex w-full overflow-auto">
    {data.length === 0 && <h3 className="text-left">Hooray! No warns have been issued yet.</h3>}
    {data.length > 0 && (
     <div className="mt-4 w-full">
      <Warns data={data} />
     </div>
    )}
   </Block>
  </>
 );
}
