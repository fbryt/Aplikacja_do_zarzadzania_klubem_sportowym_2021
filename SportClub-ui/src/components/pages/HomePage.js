import React from "react";
import {Link} from "react-router-dom";
import Footer from "../menu/Footer";
import Carousel, { slidesToShowPlugin, slidesToScrollPlugin, autoplayPlugin } from '@brainhubeu/react-carousel';
import "@brainhubeu/react-carousel/lib/style.css";
import Icon from 'react-fa';
import Image1 from "../../assets/a.jpg";
import Image2 from "../../assets/b.jpg";
import Image3 from "../../assets/c.jpg";
import Image4 from "../../assets/d.jpg";
import Image5 from "../../assets/e.jpg";

const HomePage = () => (
    <div>
        <div className="row bg-light">
            <div className="col-sm">
            </div>
            <div className="col-sm">
                <h1 className="">Sport club app</h1>
            </div>
            <div className="col-sm">
            </div>
        </div>
        <div className="row bg-light mt-8 pb-4">
            <div className="col-sm">
            </div>
            <div id="buttonHome" className="col-sm">
                    <Link  to="/login">
                    <button className="btn btn-dark btn-lg btn-block">Login form</button>
                    </Link>
            </div>
            <div className="col-sm">
            </div>
        </div>
        <Carousel   plugins={[
            'centered',
            'infinite',
            'arrows',
            {
                resolve: slidesToShowPlugin,
                options: {
                    numberOfSlides: 3,
                },
            },
            {
                resolve: slidesToScrollPlugin,
                options: {
                    numberOfSlides: 3,
                },
            },
            {
                resolve: autoplayPlugin,
                options: {
                    interval: 2000,
                }
            },
        ]}  animationSpeed={1000}>
            <img src={Image1} className="photo"/>
            <img src={Image2} className="photo"/>
            <img src={Image3} className="photo"/>
            <img src={Image4} className="photo"/>
            <img src={Image5} className="photo"/>
        </Carousel>
            <Footer />
    </div>
);

export default HomePage;