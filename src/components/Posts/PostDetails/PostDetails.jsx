import { Card, CardContent, CardMedia, Chip, Grid } from "@material-ui/core";
import axios from "axios";
import moment from "moment";
import React from "react";
import Loading from "../../Loading/Loading";
import "./PostDetails.css";

export default function PostDetails(props) {
  const [loading, setLoading] = React.useState(false);
  const [post, setPost] = React.useState(false);
  React.useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://sweet-memories-node-v1.herokuapp.com/posts/${props.match.params.id}`
      )
      .then((res) => {
        setLoading(false);
        setPost(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);
  return (
    <React.Fragment>
      {loading ? (
        <Loading />
      ) : (
        <React.Fragment>
          {post && (
            <Grid container spacing={4}>
              <Grid item xs={12} sm={4}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    className="post_Details_img"
                    component="img"
                    height="140"
                    image={post.selectedFile}
                    alt={post.title}
                  />
                </Card>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Card className="post_Details_info">
                  <CardContent>
                    <h1 className="post_Details_title">{post?.title}</h1>
                    <div className="post_Details_tags">
                      {post?.tags.map((tag, index) => (
                        <Chip
                          size="small"
                          key={`${tag}_post-detail-tag-${index}`}
                          label={`#${tag}`}
                        />
                      ))}
                    </div>
                    <p className="post_Details_createdAt">
                      Created At:{" "}
                      <span>{moment(post.createdAt).fromNow()}</span>
                    </p>
                    <p className="post_Details_message">{post?.message}</p>
                  </CardContent>
                  <div className="post_Details_footer">
                    <p className="post_Details_creator">
                      Author: <span>{post?.name}</span>
                    </p>
                  </div>
                </Card>
              </Grid>
            </Grid>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
