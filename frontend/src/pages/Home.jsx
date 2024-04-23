import React, { useContext } from "react";
import "./Stylesheets/Home.css";
import homeImg from "../assests/images/logo.jfif";
import home1 from "../assests/images/home1.jpg";
import home2 from "../assests/images/home2.avif";
import { EmsContext } from "../context/EmsContext";

const Home = () => {
  const { user } = useContext(EmsContext);

  return (
    <div className="homeContainer">
      {user ? (
        <>
          {/* <h1 id="greetUser">Hello {user.employee_name} </h1> */}
          <div className="firstHomeContainer">
            <div>
              <p>Welcome to the </p>
              <h1>Angel Private Limited</h1>
              <h2>Employee Management System </h2>
            </div>
            <img src={homeImg} alt="" />
          </div>
          <p id="homePhar">
            We're thrilled to have you here. Our EMS is designed to streamline
            your experience, making managing tasks, projects, and your profile a
            breeze. Whether you're a seasoned manager or a new team member, our
            system is here to support you every step of the way.
          </p>
          <div className="secondHomeContainer">
            <img src={home1} alt="" />
            <ul>
              <li>Efficiency</li>
              <li>Collaboration</li>
              <li>Productivity</li>
              <li>Innovation</li>
              <li>Empowerment</li>
              <li>Simplicity</li>
            </ul>
          </div>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam,
            maxime sint! Iste dolorem consequatur voluptatem eligendi fuga
            numquam nam inventore sit quidem aspernatur, ipsa, similique modi
            veniam deleniti, assumenda non!
          </p>
          <div className="secondHomeContainer">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
              perferendis quam corrupti ad a iure accusantium amet fugit atque
              voluptas obcaecati similique, maiores et repellat sequi iusto
              incidunt impedit numquam! Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Nulla perferendis quam corrupti ad a iure
              accusantium amet fugit atque voluptas obcaecati similique, maiores
              et repellat sequi iusto incidunt impedit numquam!
            </p>
            <img src={home2} alt="" />
          </div>
        </>
      ) : (
        <h1> You are not a valid user. please login to the site again. </h1>
      )}
    </div>
  );
};

export default Home;
