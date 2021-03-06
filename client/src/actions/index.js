import axios from "axios";
import { FETCH_USER, FETCH_BLOGS, FETCH_BLOG } from "./types";

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = token => async dispatch => {
  const res = await axios.post("/api/stripe", token);
  dispatch({ type: FETCH_USER, payload: res.data });
};

// receive form value and image, later redirect user
export const submitBlog = (values, file, history) => async dispatch => {
  // make request to express server to get key, and get pre sign URL from aws s3
  const uploadConfig = await axios.get("/api/upload");

  // put image on AWS S3
  await axios.put(uploadConfig.data.url, file, {
    headers: {
      "Content-Type": file.type
    }
  });

  // create new post including image key(URL)
  const res = await axios.post("/api/blogs", {
    ...values,
    imageUrl: uploadConfig.data.key
  });

  history.push("/blogs"); // redirect user
  dispatch({ type: FETCH_BLOG, payload: res.data }); // react receive new blog we just created
};

export const fetchBlogs = () => async dispatch => {
  const res = await axios.get("/api/blogs");
  dispatch({ type: FETCH_BLOGS, payload: res.data });
};

export const fetchBlog = id => async dispatch => {
  const res = await axios.get(`/api/blogs/${id}`);
  dispatch({ type: FETCH_BLOG, payload: res.data });
};
