import React, { useEffect, useState } from "react";
import { Container, Spinner, Row, Col, Pagination } from "react-bootstrap";
import Cardpage from "../components/Card";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";

function ListPokemon({ ref }) {
  const navigate = useNavigate();
  const [pagination, setPagination] = useState(0);
  const [ofset, setOfset] = useState(0);
  const [pokemonList, setPokemonList] = useState([]);

  const limit = 18;

  let { data = [], isLoading } = useQuery(
    ["pokemonCache", pagination],
    async () => {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?offset=${ofset}&limit=${limit}`
      );
      console.log(response.data.results);
      return response.data.results;
    }
  );

  useEffect(() => {
    const newData = data.map((item, index) => {
      const url = item.url;
      const pokeIndex = url.split("/")[url.split("/").length - 2];
      return {
        ...item,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeIndex}.png`,
      };
    });
    setPokemonList(newData);
  }, [data]);

  const onChangePagination = (number) => {
    document.getElementById("pokelist").scrollIntoView();
    getOffset(number);
    setPagination(number);
  };

  const getOffset = (number) => {
    const page = number;
    const offset = (page - 1) * limit;
    setOfset(offset);
  };

  const PaginationItem = () => {
    let active = pagination;
    let items = [];
    for (let number = 1; number <= 10; number++) {
      items.push(
        <Pagination.Item
          onClick={() => onChangePagination(number)}
          key={number}
          active={number === active}
        >
          {number}
        </Pagination.Item>
      );
    }
    return items;
  };

  return (
    <div id="listpoke">
      {isLoading ? (
        <div className="App">
          <Spinner animation="border" variant="warning" />
        </div>
      ) : (
        <Container>
          <div className="listText">
            <h3 className="wrapText text-center fw-bold px-3">List Pokemon</h3>
          </div>
          <Container className="listPoke pt-2 " id="pokelist">
            <Row className="d-flex">
              {pokemonList.map((item, index) => {
                return (
                  <Col
                    md={2}
                    sm={3}
                    xs={6}
                    className="d-flex justify-content-center align-items-center"
                  >
                    <Cardpage
                      image={item.image}
                      text={item.name}
                      onClick={() => navigate("/detail?id=" + item.url)}
                    />
                  </Col>
                );
              })}
            </Row>
            <Pagination size="sm" className="justify-content-end py-2">
              {PaginationItem()}
            </Pagination>
          </Container>
        </Container>
      )}
    </div>
  );
}

export default ListPokemon;
