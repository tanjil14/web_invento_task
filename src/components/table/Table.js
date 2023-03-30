import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import { useGetPostsQuery } from "../../features/post/postApi";
import FormModal from "../FormModal";
import Item from "./Item";
const TableData = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { data: posts, isLoading } = useGetPostsQuery();
  return (
    <Container>
      <h1 className="text-center my-5">CURD APP</h1>
      <div className="d-flex justify-content-end my-4">
        <Button variant="primary" onClick={handleShow}>
          Add
        </Button>
      </div>
      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Post Title</th>
            <th>Post Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading
            ? "Loading..."
            : posts?.length > 0 &&
              posts.map((post, index) => (
                <Item key={post.id} index={index + 1} post={post} />
              ))}
        </tbody>
      </Table>
      <FormModal
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
        post="null"
      />
    </Container>
  );
};

export default TableData;
