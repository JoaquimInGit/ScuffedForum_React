import React from 'react';
import './About.css';

function About() {
  return (
    <div className="About">
      <header className="About-header">
      <h2 className="text-warning mt-5">  Instituto Politecnico de Tomar - Escola Superior de Tecnologia de Tomar</h2>
      <h3 className="text-warning"> Joaquim Tomás - Nº21214</h3>
      <h4 className="text-light" >Bibliotecas usadas : </h4>
      <h6 className="text-light" >Front-End :
        <a target="_blank" rel="noopener noreferrer" href="https://react-bootstrap.github.io/">ReactJs</a>&nbsp; | &nbsp;
        <a target="_blank" rel="noopener noreferrer" href="https://react-bootstrap.github.io/getting-started/introduction/">bootstrap-ReactJS</a>&nbsp; | &nbsp;
        <a target="_blank" rel="noopener noreferrer" href="https://fontawesome.com/how-to-use/on-the-web/using-with/react">FontAwesomeIcons</a>
 </h6>
      <h6 className="text-light" >Back-End :
        <a target="_blank" rel="noopener noreferrer" href="https://nodejs.org/en/">Node.js LTS</a>&nbsp; | &nbsp;
        <a target="_blank" rel="noopener noreferrer" href="https://www.mongodb.com/try">MongoDB</a>&nbsp; | &nbsp;
        <a target="_blank" rel="noopener noreferrer" href="https://expressjs.com/">Express</a>
 </h6>
 <h6>Credenciais username: admin | password: 123qweASD</h6>
      </header>
    </div>
  );
}

export default About;
