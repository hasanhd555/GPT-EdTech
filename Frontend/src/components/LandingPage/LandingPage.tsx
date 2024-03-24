import Hero from './HeroSection/Hero';
import Features_Courses from './FeaturedCourses/Features_Courses';
import LearningPitch from './LearningPitch/LearningPitch';
import styles from './LandingPage.module.css'
import CompanySlider from './CompanySlider/CompanySlider';

const LandingPage:React.FC = () => {
    return (
        <div className={styles['landing-page']}>
            <Hero />
            <CompanySlider />
            <Features_Courses />
            <LearningPitch />
        </div>
    );
}

export default LandingPage;
