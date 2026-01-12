import PageEditDrawer from "@/app/start/components/PageEditDrawer";
import SearchBar from "@/app/start/components/widgets/SearchBar";
import Clock from "@/app/start/components/widgets/Clock";

type Props = {};

const Start = (props: Props) => {
  return (
    <>
      <PageEditDrawer />
      <div className="new-page-main-content h-screen w-full flex flex-col items-center justify-center gap-4">
        <div className="new-page-main-content-container container bg-slate-100 h-full flex flex-col items-center justify-center gap-4 p-3">
          <SearchBar />
        </div>
      </div>
    </>
  );
};

export default Start;
