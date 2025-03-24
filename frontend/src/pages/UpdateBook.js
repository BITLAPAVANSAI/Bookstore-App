import React, { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import axios from "axios";
import Spinner from "../components/Spinner";
import { useNavigate, useParams } from "react-router-dom";

function UpdateBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/books/${id}`)
      .then((res) => {
        console.log(res);
        setAuthor(res.data.auther);
        setPublishYear(res.data.publishYear);
        setTitle(res.data.title);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert("An error Happend.Please check the console");
        console.log(error);
      });
  }, []);

  const HandleEditBook = async () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    console.log("saving the Book:", data);
    const res = await axios
      .put(`http://localhost:5000/books/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        alert("An error Happend.Please check the console");
        console.log(error);
      });
    console.log(res);
  };
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl">Edit Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-x-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-y-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-y-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input
            type="text"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 border-y-gray-500 px-4 py-2 w-full"
          />
        </div>
        <button className="p-2 bg-sky-300 " onClick={HandleEditBook}>
          Save
        </button>
      </div>
    </div>
  );
}

export default UpdateBook;
