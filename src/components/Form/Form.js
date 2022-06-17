import React, { useState, useEffect } from "react";
import { TextField, Button, Paper, Typography } from "@material-ui/core";
import "./Form.css";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";

function Form({ currentId, setCurrentId }) {
  const inputFileRef = React.useRef();
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const dispatch = useDispatch();
  const post = useSelector((state) =>
    currentId ? state.posts.find((pst) => pst._id === currentId) : null
  );
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    // populate form while updating
    if (post) {
      setPostData(post);
    }
  }, [post]);

  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();
      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };

  const handleFileInputChange = (e) => {
    let { selectedFile } = postData;

    selectedFile = e.target.files[0];

    getBase64(selectedFile)
      .then((result) => {
        selectedFile["base64"] = result;
        setPostData((prevState) => ({
          ...prevState,
          selectedFile: result,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onBtnClick = () => {
    /*Collecting node-element and performing click*/
    inputFileRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      ); // if we have id then we are updating post
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name })); // else we are creating post
    }
    clear();
  };

  const clear = () => {
    setCurrentId(null);
    setPostData({
      // creator: '',
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  if (!user?.result?.name) {
    return (
      <Paper className="form__paper">
        <Typography variant="h6" align="center">
          Please login to create Memories!
        </Typography>
      </Paper>
    );
  }
  return (
    <Paper className="form__paper">
      <h4 className="form__heading">
        {currentId ? "Editing" : "Creating"} Memory
      </h4>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        />
        {/* <FileBase
          type="file"
          multiple={false}
          onDone={({ base64 }) =>
            setPostData({ ...postData, selectedFile: base64 })
          }
        /> */}
        <input
          type="file"
          ref={inputFileRef}
          name="file"
          onChange={handleFileInputChange}
          style={{ display: "none" }}
        />
        <Button variant="contained" size="small" onClick={onBtnClick}>
          Upload Image
        </Button>
        {postData.selectedFile && (
          <img
            className="form__img"
            src={postData.selectedFile}
            alt="uploaded file"
          />
        )}
        <Button
          type="submit"
          className="form__btnSubmit"
          variant="contained"
          color="primary"
          size="small"
        >
          Submit
        </Button>
        <Button
          onClick={clear}
          className="form__btnSubmit"
          variant="contained"
          color="secondary"
          size="small"
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
}

export default Form;
