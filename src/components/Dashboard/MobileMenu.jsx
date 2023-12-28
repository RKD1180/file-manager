import { ListGroup, Modal } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

const MobileMenu = ({ openMenu, setOpenMenu }) => {
  return (
    <Modal
      show={openMenu}
      onClose={() => setOpenMenu(false)}
      popup
      position="top-right"
    >
      <Modal.Header />
      <Modal.Body>
        <div className="flex justify-center w-full">
          <ListGroup className="w-full">
            <ListGroup.Item>
              <Link to={"/"} onClick={() => setOpenMenu(!openMenu)}>
                Profile
              </Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link to={"/files"} onClick={() => setOpenMenu(!openMenu)}>
                Files
              </Link>
            </ListGroup.Item>
          </ListGroup>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default MobileMenu;
