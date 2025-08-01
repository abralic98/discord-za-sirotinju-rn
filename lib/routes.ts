const auth = "/auth" as const;
const tabs = "/(tabs)" as const;
const settings = "/settings" as const;

const routes = {
  home: "/" as const,
  login: `${auth}/login` as const,
  register: `${auth}/register` as const,
  dashboard: `${tabs}/dashboard` as const,
  profile: "/profile" as const,
  settings: settings,
  notifications: `${settings}/notifications` as const,
  account: `${settings}/account` as const,
  voice: `${settings}/voice` as const,
  discover: `/discover` as const,
  serverSettings: `${tabs}/dashboard/server-settings` as const,
  dm: `/dm` as const,
  room: `${tabs}/dashboard/room`,
  serverUsers: `${tabs}/dashboard/room/users`,
  roomSearch: `${tabs}/dashboard/room/search`
} as const;

export default routes;
