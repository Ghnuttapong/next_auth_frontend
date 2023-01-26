import {
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { AiOutlineShopping } from "react-icons/ai";
import React from "react";

function CardReport({icon = <AiOutlineShopping />, title = 'shopping', percent = '50', bg = 'bg-base1'}) {

  return (
    <Card className="border-2 shadow-md" >
      <CardContent>
        <div className="grid grid-cols-2">
          <div className="center">
            <div className={'rounded-full p-3 text-4xl text-white ' + bg}>
              {icon}
            </div>
          </div>
          <div className="center flex-col">
            <Typography variant="h5" className="font-bold">{percent}%</Typography>
            <Typography variant="overline" >{title}</Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CardReport;
