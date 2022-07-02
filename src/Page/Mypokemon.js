import React from "react";
import { Container, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import usePersistentContext from "../utils/usePersistentContext";

function Mypokemon() {
  const title = "My Pokemon";
  document.title = `Pokemon | ${title}`;
  const [myPoke = []] = usePersistentContext("mypoke");

  const navigate = useNavigate();

  console.log("..", myPoke);

  return (
    <Container>
      <h2 className="mt-5 d-flex ">
        <div>
          <BsArrowLeftCircleFill
            className="iconClr"
            size={35}
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          />
        </div>
        <span className="wrapText px-3 ms-3">My Pokemon :</span>
      </h2>

      <ListGroup key={myPoke.length} className="my-3">
        {myPoke &&
          Array.isArray(myPoke) &&
          myPoke.map((item, index) => {
            return (
              <ListGroup.Item
                variant="warning"
                action
                onClick={() => navigate("/detail?id=" + item.forms)}
              >
                <img src={item.image} height={40} />
                {item.name}
              </ListGroup.Item>
            );
          })}
      </ListGroup>
    </Container>
  );
}

export default Mypokemon;
