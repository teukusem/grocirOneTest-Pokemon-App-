import React from "react";
import JumboText from "../assets/image/textpoke.png";
import ListPokemon from "./ListPokemon";

function Home() {
  const title = "Home";
  document.title = `Pokemon | ${title}`;

  return (
    <div>
      <div className="jumboTron ">
        <img src={JumboText} alt="Jumbotron Image" className="img-fluid" />
        <h4 className=" fw-bold ">
          <span className="wrapText px-3">
            Play pokemon with your friends and catch all existing pokemon <br />
          </span>
        </h4>
        <h4 className=" fw-bold ">
          <div>
            <span className="wrapText px-3 ">
              become the ruler of the world
            </span>
          </div>
        </h4>
      </div>
      <ListPokemon />
    </div>
  );
}

export default Home;
