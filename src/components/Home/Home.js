import React from "react";
import { Container, Grow, Grid } from "@material-ui/core";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";

import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../actions/posts";
import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";

function Home(props) {
  const posts = useSelector((state) => state.posts);
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);
  return !posts.length ? (
    <Loading />
  ) : (
    <Grow in>
      <Container>
        <Grid
          className="app_postcontainer"
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={7}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
}

export default Home;
