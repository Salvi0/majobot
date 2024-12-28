import { GuildLogType } from "@majoexe/database";
import { capitalize, splitCamelCase } from "@majoexe/util/functions/util";

export function handleLogText(log: GuildLogType, toUpperCase = true): string {
 let transformedLog = splitCamelCase(log).toLowerCase();
 if (transformedLog.startsWith("guild")) transformedLog = transformedLog.slice(6);

 return toUpperCase ? capitalize(transformedLog) : transformedLog;
}
