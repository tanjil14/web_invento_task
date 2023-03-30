import { useEffect, useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useAddPostMutation, useEditPostMutation } from "../features/post/postApi";

const FormModal = ({ show, handleClose, handleShow, post }) => {
  const { title: initialTitle, body, id } = post || {};
  const [title, setTitle] = useState(initialTitle || "");
  const [desc, setDesc] = useState(body || "");
  const [editPost, { isLoading: editLoading, isSuccess: editSuccess }] =
    useEditPostMutation();
  const [addPost, { isLoading: addLoading, isSuccess: addSuccess }] =
    useAddPostMutation();
  const handleSubmit = () => {
    if (id) {
      editPost({ id, data: { title, body:desc } });
    } else {
        console.log("add")
      addPost({ title, body:desc });
    }
  };
  useEffect(() => {
    if (editSuccess || addSuccess) {
      handleClose();
    }
  }, [editSuccess, addSuccess, handleClose]);
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {post !== "null" ? "Edit Post" : "Add Post"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Post Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your title"
                autoFocus
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Post Description</Form.Label>
              <Form.Control
                as="textarea"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                rows={3}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            disabled={editLoading || addLoading}
            variant="primary"
            onClick={handleSubmit}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FormModal;
