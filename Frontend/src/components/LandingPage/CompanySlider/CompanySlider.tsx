import { Card, Container, Row, Col, Button, Form, FormControl } from "react-bootstrap";
import {intel, cisco, logitech, spotify, dell, nike, lenovo, nvidia, microsoft} from './ImgURL';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from './CompanySlider.module.css';
import "./CompanySlider.module.css";
import Slider from "react-slick";

const CompanySlider:React.FC = () => {
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        cssEase: "linear"
      };
    return(
        <Container fluid className={`${styles["bg_grad"]} text-center`}>
            <h2 className="text-center">Companies that trust us</h2>
            <Slider {...settings}>
            <img src={intel} alt=""  style={{ width: '50px', height: 'auto' }}/>
            <img src={cisco} alt="" />
            <img src={logitech} alt="" />
            <img src={spotify} alt="" />
            <img src={dell} alt="" />
            <img src={nike} alt="" />
            <img src={lenovo} alt="" />
            <img src={nvidia} alt="" />
            <img src={microsoft} alt="" />
            </Slider>
        </Container>
    )
}

export default CompanySlider;