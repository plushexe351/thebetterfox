import { SettingsProvider } from "./lib/SettingsContext";
import StartContent from "./components/StartContent";

export const metadata = {
  title: "New tab",
  description:
    "A minimalistic, customizable start page that makes every new tab feel like home.",
  icons: {
    icon: "/favicon.png",
  },
};
const Start = () => {
  return (
    <SettingsProvider>
      <StartContent />
    </SettingsProvider>
  );
};

export default Start;
