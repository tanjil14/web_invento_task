import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

const Nav = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">WEV INVENTO</Navbar.Brand>
        </Container>
      </Navbar>
      <br />
    </>
  );
};

export default Nav;
