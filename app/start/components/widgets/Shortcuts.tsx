import React from "react";
import githubIcon from "./githubicon.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type Props = {};

const Shortcuts = (props: Props) => {
  return (
    <div className="shortcuts-main">
      <div className="shortcuts-content ">
        <div className="shortcut-container flex justify-center flex-wrap gap-4">
          <a href="">
            <Card className="w-[150px] p-3 items-center justify-center rounded-[1.5rem]">
              <CardContent className="shortcut-item flex flex-col items-center justify-center">
                <Image
                  src={githubIcon}
                  alt=""
                  className="shortcut-img h-10 w-10 object-cover"
                />
                <p className="shortcut-name mt-2 text-accent text-sm">GitHub</p>
              </CardContent>
            </Card>
          </a>
          <Card className="w-[150px] p-3 items-center justify-center rounded-[1.5rem] bg-accent-foreground">
            <CardContent>
              <Button
                className="add-shortcut h-10 w-10 cursor-pointer"
                variant="outline"
              >
                <Plus />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Shortcuts;
