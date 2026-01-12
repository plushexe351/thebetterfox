import Search from "@/components/Search";
import SideSheet from "@/components/SideSheet";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TheBetterFoxMain from "@/components/TheBetterFoxMain";

export default function Page() {
  return (
    <div className="App">
      <div className="fixed">
        <SideSheet />
      </div>
      <TheBetterFoxMain />
    </div>
  );
}
