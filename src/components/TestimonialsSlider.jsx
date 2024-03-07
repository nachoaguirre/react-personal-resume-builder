import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Splide from '@splidejs/splide';
import '@splidejs/splide/css/core';

export const TestimonialsSlider = (props) => {
    const { icons, styles, blocks } = props;

    useEffect(() => {
        new Splide('.splide', {
            type: 'loop',
            perPage: 2,
            perMove: 1,
            autoHeight: true,
            arrows: true,
            pagination: false,
            breakpoints: {
                1090: {
                    perPage: 1,
                }
            },
            gap: '1rem',

        }).mount();
    }, []);

    return (
        <section className="splide" aria-label="Testimonials">
            <div className={`splide__track ${styles.splideTrackOverflow}`}>
                <div className='splide__list'>
                    {
                    blocks.map((testimonial, index) => {
                        return (
                             <div className={`splide__slide ${styles.testimonial}`} key={index} >
                                 <img src={testimonial.picture} alt={testimonial.author}/>
                                 <div className={styles.text}><p>{testimonial.quote}</p></div>
                                 <div className={styles.authorInfo}>
                                     <h4 className={styles.author}><a href={testimonial.link}>{testimonial.author}</a></h4>
                                     <h5 className={styles.role}>{testimonial.role}</h5>
                                     <div className={styles.icon}>{ icons['quote-right'] }</div>
                                 </div>
                             </div>
                        )
                    })
                    }
                </div>
            </div>

            <div className={`splide__arrows ${styles.testimonialControls}`}>
                <button className={`splide__arrow splide__arrow--prev me-5 ${styles.btnPrev}`}>{ icons['angle-left'] }</button>
                 <button className={`splide__arrow splide__arrow--next ${styles.btnNext}`}>{ icons['angle-right'] }</button>
            </div>
        </section>
    )
}

TestimonialsSlider.propTypes = {
    icons: PropTypes.object.isRequired,
    styles: PropTypes.object.isRequired,
    blocks: PropTypes.array.isRequired,
}