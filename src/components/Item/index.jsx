import React, { useState } from "react";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import Dailog from "@components/Dailog";

import s from "./item.module.scss";

export default function MediaCard(props) {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = useState(props.title || "default title");
  const [author, setAuthor] = useState(props.author || "default author");
  const [date, setDate] = useState(props.date || "default created date");
  const [data, setData] = useState(props.data || null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Card className={s.item} onClick={handleClickOpen}>
        <CardActionArea>
          <CardContent>
            <Typography variant="body1" color="textSecondary" component="p">
              {title}
            </Typography>

            <Typography variant="body2" color="textSecondary" component="p">
              {author} | {date}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      <Dailog data={data} open={open} onClose={handleClose} />
    </>
  );
}
