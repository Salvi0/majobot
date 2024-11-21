import { globalConfig } from "@majoexe/config";
import { getPermissionNames } from "../user/checkPermissions.js";
import { APIGuild } from "discord-api-types/v10";

interface ExtendedAPIGuild extends APIGuild {
 permissions_names: string[];
 bot: boolean;
}

export async function getServers(token: String) {
 try {
  const res = await fetch(`https://discord.com/api/v${globalConfig.apiVersion}/users/@me/guilds`, {
   headers: {
    Authorization: `Bearer ${token}`,
   },
  });
  if (!res.ok) return null;
  const json: ExtendedAPIGuild[] = await res.json();

  for (const server of json) {
   server.permissions_names = getPermissionNames(BigInt(server.permissions || 0)) || [];
  }
  return json;
 } catch (_e) {
  return null;
 }
}