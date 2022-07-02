import React from "react";
import { Container, Card, Row, Col } from "react-bootstrap";

function Cardpage(props) {
  return (
    <div>
      {" "}
      <Card
        className="cardList mt-2"
        onClick={props.onClick}
        style={{ cursor: "pointer" }}
      >
        <img src={props.image} className="imageCard mt-3" />
        <p className="wrapText mt-4 fw-bold px-3">{props.text}</p>
      </Card>
    </div>
  );
}

export default Cardpage;
