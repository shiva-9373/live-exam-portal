import React from "react";
import Navbar from "./Navbar";
function AddQuetion() {
  return (
    <div class=" text-left">
      {" "}
      <div class=" text-left mt-5 ">
        <h1>Edit Question</h1>
      </div>
      <div class="row  " style={{ textAlign: "left" }}>
        <div class="col-lg-10 mx-auto">
          <div class="card mt-2 mx-auto p-4 bg-light">
            <div class="card-body bg-light">
              <div class="container">
                <form id="contact-form" role="form">
                  <div class="controls">
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group formGrp">
                          {" "}
                          <label for="form_name"> Select Subject</label>{" "}
                          <input
                            id="form_name"
                            type="text"
                            list="select_quetion"
                            name="name"
                            class="form-control"
                            placeholder="Type to search Subject"
                            required="required"
                            data-error="Firstname is required."
                          />
                          <datalist id="select_quetion">
                            <option value="Web Designing" />
                            <option value="Web Development" />
                            <option value="IOS App Development" />
                            <option value="Wordpress Site" />
                            <option value="UI/UX Development" />
                          </datalist>{" "}
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          {" "}
                          <label for="form_lastname">Select Topic</label>{" "}
                          <input
                            id="form_lastname"
                            type="text"
                            name="surname"
                            list="select_topic"
                            class="form-control"
                            placeholder="Type to search Topic"
                            required="required"
                            data-error="Lastname is required."
                          />
                          <datalist id="select_topic">
                            <option value="Web Designing" />
                            <option value="Web Development" />
                            <option value="IOS App Development" />
                            <option value="Wordpress Site" />
                            <option value="UI/UX Development" />
                          </datalist>{" "}
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          {" "}
                          <label for="form_name"> Question Type</label>{" "}
                          <input
                            id="form_name"
                            type="text"
                            list="question_type"
                            name="name"
                            class="form-control"
                            placeholder="Type to search Question Type"
                            required="required"
                            data-error="Firstname is required."
                          />
                          <datalist id="question_type">
                            <option value="Web Designing" />
                            <option value="Web Development" />
                            <option value="IOS App Development" />
                            <option value="Wordpress Site" />
                            <option value="UI/UX Development" />
                          </datalist>{" "}
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          {" "}
                          <label for="form_name"> Difficulty Level</label>{" "}
                          <input
                            id="form_name"
                            type="text"
                            list="difficulty_level"
                            name="name"
                            class="form-control"
                            placeholder="Type to Search "
                            required="required"
                            data-error="Type to Search"
                          />
                          <datalist id="difficulty_level">
                            <option value="Web Designing" />
                            <option value="Web Development" />
                            <option value="IOS App Development" />
                            <option value="Wordpress Site" />
                            <option value="UI/UX Development" />
                          </datalist>{" "}
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group">
                            {" "}
                            <label for="form_name">Right Marks</label>{" "}
                            <input
                              id="form_name"
                              type="number"
                              // name="name"
                              class="form-control"
                              placeholder="Please enter Wrong Marks"
                              required="required"
                              data-error="Firstname is required."
                            />{" "}
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            {" "}
                            <label for="form_lastname">Wrong Marks</label>{" "}
                            <input
                              id="form_lastname"
                              type="number"
                              // name="surname"
                              class="form-control"
                              placeholder="Please enter Right Marks "
                              required="required"
                              data-error="Lastname is required."
                            />{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row " style={{ textAlign: "left" }}>
                      <div class="col-md-12">
                        <div class="form-group">
                          {" "}
                          <label for="form_message ">Question</label>{" "}
                          <textarea
                            id="form_message"
                            name="message"
                            class="form-control"
                            placeholder="Write your Question here."
                            rows="2"
                            required="required"
                            data-error="Please, leave us a message."
                          ></textarea>{" "}
                          <label for="basic-addon1 ">Question</label>{" "}
                          <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">
                              <input type="radio" />
                            </span>
                            <textarea
                              required="required"
                              type="text"
                              data-error="Please, leave us a message."
                              class="form-control"
                              placeholder="Username"
                              aria-label="Username"
                              aria-describedby="basic-addon1"
                            />
                          </div>
                          <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">
                              <input type="radio" />
                            </span>
                            <textarea
                              data-error="Please, leave us a message."
                              required="required"
                              type="text"
                              class="form-control"
                              placeholder="Username"
                              aria-label="Username"
                              aria-describedby="basic-addon1"
                            />
                          </div>
                          <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">
                              <input type="radio" />
                            </span>
                            <textarea
                              required="required"
                              data-error="Please, leave us a message."
                              type="text"
                              class="form-control"
                              placeholder="Username"
                              aria-label="Username"
                              aria-describedby="basic-addon1"
                            />
                          </div>
                         
                        </div>
                        
                      </div>
                      <div class="row " style={{ textAlign: "left" }}>
                        <div class="col-md-10">
                          {" "}
                          <button class="btn btn-outline-success btn-lg " type="submit">
                            Submit
                          </button>
                          <button
                            class="btn btn-outline-secondary btn-lg "
                            style={{ marginLeft: "20px" }}
                            type="cancel"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
                <button class="btn btn-outline-white  btn-lg ">  
                            + Add Option
                          </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddQuetion;