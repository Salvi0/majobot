import { ArrowDownTrayIcon, ArrowTopRightOnSquareIcon, ExclamationTriangleIcon, FolderArrowDownIcon } from "@heroicons/react/24/outline";
import { getFlags } from "@majoexe/util/functions";
import { getSession } from "lib/session";
import Link from "next/link";
import { redirect } from "next/navigation";
import DeleteAccount from "@/components/blocks/client/settings/DeleteUserData";
import Image from "@/components/blocks/client/shared/Image";
import { Tooltip } from "@/components/blocks/client/shared/Tooltip";
import { PrimaryButton } from "@/components/buttons/server/Primary";
import { Emojis } from "@/components/decorations/emojis";

export default async function Profile() {
 const user = await getSession();
 if (!user) return redirect("/auth/login");

 return (
  <div className="flex w-full flex-col items-center px-8 pb-8 pt-16 antialiased md:px-16 md:py-16">
   <div className="flex flex-col justify-center gap-4">
    <div className="bg-background-navbar relative overflow-hidden rounded-lg border border-neutral-800 md:w-full">
     <>
      <div
       className="h-[100px] w-full bg-cover bg-center bg-no-repeat"
       style={{
        backgroundColor: "#" + (!user.accent_color ? "5c64f4" : user.accent_color.toString(16)),
        backgroundImage: `url(${user.banner})`,
       }}
      />
      <div className="bg-background-navbar flex h-[72px] w-auto flex-row justify-between gap-6 p-12">
       <div className="ml-[-16px] mt-[-20px] box-content flex items-center rounded-full">
        <Tooltip content="Click to see full size">
         <Link href={`${user.image}?size=2048`} target="_blank" className="min-w-24 min-h-24 h-24 w-24">
          <Image quality={100} src={user.image} alt={user.username} width={94} height={94} className="!border-background-navbar rounded-full !border-4 !border-solid backdrop-blur-sm duration-200 hover:opacity-75" />
         </Link>
        </Tooltip>
        <div className="ml-2 flex items-center text-lg font-bold">
         {user.discriminator === "0" ? (
          <>
           {user.global_name && user.username && <Tooltip content={`@${user.username}`} />}
           <div className="text-white">{user.global_name}</div>
          </>
         ) : (
          <>
           <div className="text-white">{user.username}</div>
           <div className="text-white/60">#{user.discriminator}</div>
          </>
         )}

         {user.nitro > 0 && <Tooltip content="Nitro">{Emojis["nitro"]}</Tooltip>}

         {getFlags(user.public_flags) &&
          getFlags(user.public_flags).map((flag, i) => {
           return (
            <Tooltip key={i} content={flag.content}>
             {Emojis[flag.name]}
            </Tooltip>
           );
          })}
        </div>
       </div>
       <div className="mb-[-14px] hidden w-full items-end justify-end font-semibold md:flex">
        <Link href={`https://discord.com/users/${user.id}`} target="_blank" className="bg-button-primary hover:bg-button-primary-hover flex h-[40px] cursor-pointer items-center rounded px-4 py-0 font-normal text-white duration-200 motion-reduce:transition-none">
         <ArrowTopRightOnSquareIcon className="min-h-4 min-w-4 mr-2 h-4 w-4" aria-hidden="true" role="img" /> See global profile
        </Link>
       </div>
      </div>
      <div className="bg-background-menu-button/70 m-[8px_16px_16px] rounded-lg border border-neutral-800 p-4">Note: By default your banner and accent color are taken from Discord</div>
     </>
    </div>

    <div className="bg-background-navbar relative overflow-hidden rounded-lg border border-neutral-800 p-4 md:w-full">
     <p className="text-xl font-semibold text-white">
      <ArrowDownTrayIcon className="mr-2 inline-block h-5 w-5 stroke-2" aria-hidden="true" role="img" />
      Download data
     </p>
     <p className="mt-2 leading-none text-white/70">
      Download all your data in a <code>.json</code> file. This includes your profile, data from all servers you are in and more.
     </p>
     <PrimaryButton className="mt-4 w-fit" href="/api/user/download" target="_blank">
      <FolderArrowDownIcon className="mr-2 inline-block h-5 w-5 " aria-hidden="true" role="img" />
      Download data
     </PrimaryButton>
    </div>

    <div className="bg-background-navbar relative overflow-hidden rounded-lg border border-red-400/50 p-4 md:w-full">
     <p className="text-xl font-semibold text-red-400">
      <ExclamationTriangleIcon className="mr-2 inline-block h-5 w-5 stroke-2" aria-hidden="true" role="img" />
      Delete account
     </p>
     <p className="mt-2 text-white/70">If you want to delete all your data and your account, click the button below. This action is irreversible.</p>
     <DeleteAccount userId={user.id} />
    </div>
   </div>
  </div>
 );
}
