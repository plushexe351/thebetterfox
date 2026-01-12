import PageEditDrawer from "@/components/PageEditDrawer";
import Search from "@/components/Search";
import Clock from "@/components/widgets/Clock";

type Props = {};

const NewPage = (props: Props) => {
  return (
    <>
      <PageEditDrawer />
      <div className="new-page-main-content">
        <Search/>
      </div>
    </>
  );
};

export default NewPage;
