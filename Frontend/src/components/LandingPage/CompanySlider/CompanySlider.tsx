import { Container } from "react-bootstrap";
import {
  cisco,
  facebook,
  google,
  spotify,
  amazon,
  microsoft,
  visa,
  netflix,
  mask,
} from "./ImgURL";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./CompanySlider.module.css";
import Slider from "react-slick";

const CompanySlider: React.FC = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };

  return (
    <Container
  fluid
  className={`${styles["bg_grad"]} `}
  style={{
    backgroundImage: `linear-gradient(to bottom, rgba(8, 79, 199, 1) 0%, rgba(8, 79, 199, 0.2) 100%), url(${mask})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>

      <div className="slider-container">
        <Slider {...settings}>
          <div className={`${styles["img_container"]} `}>
            <img src={amazon} alt="" className={`${styles["img_normal"]} `} />
          </div>
          <div className={`${styles["img_container"]} `}>
            <img src={cisco} alt="" className={`${styles["img_normal"]} `} />
          </div>
          <div className={`${styles["img_container"]} `}>
            <img src={facebook} alt="" className={`${styles["img_normal"]} `} />
          </div>
          <div className={`${styles["img_container"]} `}>
            <img
              src={spotify}
              alt=""
              className={`${styles["img_normal"]} ${styles["white-svg "]}`}
            />
          </div>
          <div className={`${styles["img_container"]} `}>
            <img src={visa} alt="" className={`${styles["img_normal"]} `} />
          </div>
          <div className={`${styles["img_container"]} `}>
            <img src={netflix} alt="" className={`${styles["img_normal"]} `} />
          </div>
          <div className={`${styles["img_container"]} `}>
            <img src={google} alt="" className={`${styles["img_normal"]} `} />
          </div>
          <div className={`${styles["img_container"]} `}>
            <img
              src={microsoft}
              alt=""
              className={`${styles["img_normal"]} `}
            />
          </div>
        </Slider>
      </div>
    </Container>
  );
};

export default CompanySlider;
