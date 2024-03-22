import Hero from './HeroSection/Hero';
import Features_Courses from './FeaturedCourses/Features_Courses';
import styles from './LandingPage.module.css'

const LandingPage:React.FC = () => {
    return (
        <div className={styles['landing-page']}>
            <Hero />
            <Features_Courses />
        </div>
    );
}

export default LandingPage;
