import React, { useState } from "react";
import { Col, Container, Modal, Row, Spinner, Button } from "react-bootstrap";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import usePersistentContext from "../utils/usePersistentContext";

function Detail() {
  const title = "Detail Pokemon";
  document.title = `Pokemon | ${title}`;
  const [myPoke, setMypoke] = usePersistentContext("mypoke");
  const [isWin, setWin] = useState(false);

  const navigate = useNavigate();

  const search = useLocation().search;
  const id = new URLSearchParams(search).get("id");
  console.log("..", id);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  let { data: detailPoke = [], isLoading } = useQuery(
    ["detailCache"],
    async () => {
      const response = await axios.get(id);
      console.log(response.data);
      return response.data;
    }
  );

  const urlImage = (id) => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  };

  const probability = () => {
    return Math.random() < 0.5;
  };

  const gatcha = async () => {
    if (probability() === false) {
      setWin(false);
      setShow(true);
    } else {
      // const myGatcha = myPoke ? JSON.parse(myPoke) : [];
      const savedData = {
        id: detailPoke.id,
        image: urlImage(detailPoke.id),
        name: detailPoke.name,
        type: detailPoke.types.map((item) => item.type),
        height: detailPoke.height,
        weight: detailPoke.weight,
        ability: detailPoke.abilities.map((item) => item.ability.name),
        forms: id,
      };
      await setMypoke(JSON.stringify([...myPoke, savedData]));
      setWin(true);
      setShow(true);
      // navigate("/mypokemon");
    }
  };

  return (
    <div>
      {isLoading ? (
        <Spinner animation="border" variant="warning" />
      ) : (
        <Container>
          <h2 className="mt-3 d-flex ">
            <div>
              <BsArrowLeftCircleFill
                className="iconClr"
                size={35}
                onClick={() => navigate("/")}
                style={{ cursor: "pointer" }}
              />
            </div>
            <span className="wrapText px-3 ms-3">Detail Pokemon :</span>
          </h2>
          <div className="detailPage mt-3">
            <Row>
              <Col sm lg xl className="ms-4 mt-5">
                <h5 className="responWrap wrapText px-3 mt-4 fw-bold">{`Name : ${detailPoke.name}`}</h5>
                <div className="d-flex ">
                  <h5 className="responWrap wrapText px-3 mt-4 fw-bold">
                    Type Element :
                  </h5>
                  {detailPoke.types.map((item, index) => {
                    return (
                      <h5 className="responWrap wrapText px-2  mt-4 fw-bold">
                        {`${index !== 0 ? "," : ""} ${item.type.name}`}
                      </h5>
                    );
                  })}
                </div>

                <h5 className="responWrap wrapText px-3 mt-4 fw-bold">{`Height : ${detailPoke.height} Cm`}</h5>
                <h5 className="responWrap wrapText px-3 mt-4 fw-bold">{`Weight : ${detailPoke.weight} Kg`}</h5>
                <div className="  d-flex">
                  <h5 className="responWrap wrapText px-3 mt-4 fw-bold">
                    Ability :
                  </h5>
                  {console.log("..", detailPoke)}
                  {detailPoke.abilities.map((item, index) => {
                    return (
                      <h5 className="responWrap wrapText px-2 mt-4 fw-bold">
                        {`${index !== 0 ? "," : ""} ${item.ability.name}`}
                      </h5>
                    );
                  })}
                </div>
              </Col>
              <Col sm lg xl className="mt-5">
                <div className="d-flex justify-content-center  ">
                  <img
                    src={urlImage(detailPoke.id)}
                    className="detailImg img-fluid"
                  />
                </div>
                <div
                  className="d-flex justify-content-center"
                  onClick={() => gatcha()}
                >
                  <h6 className="wrapText2 px-3 py-2">Catch Pokemon</h6>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      )}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isWin ? <h3>Selamat Kamu Menang</h3> : <h3>Coba Lagi Ya !</h3>}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isWin ? (
            <div className="text-center">
              <img
                src={urlImage(detailPoke.id)}
                className="detailImg img-fluid"
              />{" "}
              <h6>{`Kamu Mendapatkan Pokemon ${detailPoke.name}`}</h6>
            </div>
          ) : (
            <div className="text-center">
              <img
                src={urlImage(detailPoke.id)}
                className="detailImg img-fluid"
              />{" "}
              <h6>{`Kamu Gagal Mendapatkan Pokemon ${detailPoke.name}, Coba Lagi ya`}</h6>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <div
            className="wrapText"
            onClick={handleClose}
            style={{ cursor: "pointer" }}
          >
            <h5 className="px-3">Coba Lagi</h5>
          </div>
          <div
            className="wrapText"
            onClick={() => navigate("/mypokemon")}
            style={{ cursor: "pointer" }}
          >
            <h5 className="px-3"> Go to My Pokemon</h5>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Detail;
