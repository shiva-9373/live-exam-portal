import React from "react";

function Navbar() {
  return (
    <div >
      <nav className=" navbarCss navbar navbar-expand-lg navbar-dark bg-dark ">
        <div class="container-fluid">
         
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <a class="nav-link active" aria-current="page" href="#">
                Quetions
              </a>
              <a class="nav-link" href="#">
                Subjects
              </a>
              <a class="nav-link" href="#">
                Topics
              </a>
              
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
