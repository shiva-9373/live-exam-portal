import React from "react";

function Footer(){
    return(
        <div>
            <footer class="  bg-light text-center text-lg-start ">
                <div className=" footer d-flex aligns-items-center justify-content-center">
  {/* <!-- Copyright --> */}
  <a class="text-dark" href="https://mdbootstrap.com/">Terms of Use</a>
  <a class="text-dark" href="https://mdbootstrap.com/">Privacy Policy</a>
  <a class="text-dark" href="https://mdbootstrap.com/">Support</a>
  <a class="text-dark" href="https://mdbootstrap.com/">contact</a>
  </div>


  <div class="text-center p-3" style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}>
    © 2020 Angular Minds Pvt Ltd,All rights reserved.
  </div>
  {/* <!-- Copyright --> */}
</footer>
        </div>
    )
}

export default Footer