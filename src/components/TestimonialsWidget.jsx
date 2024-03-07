import PropTypes from 'prop-types';
import { TestimonialsSlider } from './TestimonialsSlider';

export const TestimonialsWidget = (props) => {
    const { pageSubtitle, styles, blocks, icons, displayTitle } = props;

    return (
        <>
            {
                displayTitle &&
                    <div className="col-12">
                        { pageSubtitle }
                    </div>
            }

            <div className="col-12">
                <TestimonialsSlider
                    blocks={ blocks }
                    icons={ icons }
                    styles={styles}
                />
            </div>
        </>
    )
}

TestimonialsWidget.propTypes = {
    pageSubtitle: PropTypes.object.isRequired,
    styles: PropTypes.object.isRequired,
    blocks: PropTypes.array.isRequired,
    icons: PropTypes.object.isRequired,
    displayTitle: PropTypes.bool.isRequired
}