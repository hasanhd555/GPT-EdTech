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
        cssEase: "linear",
        useCSS: true,
        adaptiveHeight: false
    };
    return(
        <Container fluid className={`${styles["bg_grad"]} `}>
            <div className={`${styles["padding"]} `}>
            <Slider {...settings} >
                <img src={intel} alt=""  className={`${styles["img_normal"]} `}/>
                <img src={cisco} alt="" className={`${styles["img_normal"]} `}/>
                <img src={logitech} alt="" className={`${styles["img_normal"]} `}/>
                <img src={spotify} alt="" className={`${styles["img_normal"]} `}/>
                <img src={dell} alt="" className={`${styles["img_normal"]} `}/>
                <img src={nike} alt="" className={`${styles["img_normal"]} `}/>
                <img src={lenovo} alt="" className={`${styles["img_normal"]} `}/>
                <img src={nvidia} alt="" className={`${styles["img_normal"]} `}/>
                <img src={microsoft} alt="" className={`${styles["img_normal"]} `}/>
            </Slider>
            </div>
        </Container>
    )
}

export default CompanySlider;
