import PropTypes from 'prop-types';

export const WhatIDo = (props) => {
    const { styles, displayTitle, pageSubtitle, blocks, Icon } = props;

    return (
        <>
            {
                displayTitle &&
                    <div className="col-12">
                        {pageSubtitle}
                    </div>
            }

            {
                blocks.map((block, index) =>
                    (
                        <div className={`col-12 col-sm-6 ${styles.aboutWidBlock}`} key={index}>
                            <div className={styles.aboutWidTitle}>
                                <Icon icon={block.icon} />
                                <h4>{block.title}</h4>
                            </div>
                            <p>{block.text}</p>
                        </div>
                    )
                )
            }
        </>
    )
}

WhatIDo.propTypes = {
    styles: PropTypes.object.isRequired,
    displayTitle: PropTypes.bool.isRequired,
    pageSubtitle: PropTypes.object.isRequired,
    blocks: PropTypes.array.isRequired,
    Icon: PropTypes.object.isRequired
}