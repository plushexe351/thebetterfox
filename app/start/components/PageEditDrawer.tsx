import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

type Props = {};

const PageEditDrawer = (props: Props) => {
  return (
    <div className="page-edit-drawer fixed">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="fixed bottom-6 right-6">
            <Edit />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default PageEditDrawer;
