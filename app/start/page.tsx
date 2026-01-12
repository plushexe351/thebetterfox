import PageEditDrawer from "@/app/start/components/PageEditDrawer";
import SearchBar from "@/app/start/components/widgets/SearchBar";
import Clock from "@/app/start/components/widgets/Clock";
import Shortcuts from "./components/widgets/Shortcuts";

type Props = {};

const Start = (props: Props) => {
  return (
    <>
      <PageEditDrawer />
      <div className="new-page-main-content h-screen w-full flex flex-col items-center justify-center gap-4">
        <div className="new-page-main-content-container container h-full flex flex-col items-center justify-start gap-20 p-3 pt-30">
          <Clock />
          <SearchBar />
          <Shortcuts />
        </div>
      </div>
    </>
  );
};

export default Start;
