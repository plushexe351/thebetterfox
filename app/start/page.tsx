import { SettingsProvider } from "./lib/SettingsContext";
import StartContent from "./components/StartContent";

export const metadata = {
  title: "New tab",
  description: "Start page | Thebetterfox - Your perfect New Tab Experience",
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
