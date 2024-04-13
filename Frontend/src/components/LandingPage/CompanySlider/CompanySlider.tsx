
import { Container } from "react-bootstrap"; 
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 
import styles from "./CompanySlider.module.css"; 
import Slider from "react-slick"; 
import { Logo } from "../../../constant"; 
import { logos, mask } from "./ImgURL"; 


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
      {/* Slider container */}
      <div className="slider-container">
        <Slider {...settings}>
          {/* Mapping over logos array to display images */}
          {logos.map((logo: Logo, index: number) => (
            <div key={index} className={`${styles["img_container"]} `}>
              <img src={logo.url} className={`${styles["img_normal"]}`} />
            </div>
          ))}
        </Slider>
      </div>
    </Container>
  );
};


export default CompanySlider;


