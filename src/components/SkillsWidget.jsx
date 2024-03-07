import PropTypes from 'prop-types';

export const SkillsWidget = (props) => {
    const { pageSubtitle, styles, blocks, displayDescription = false } = props;

    const renderItem = (item, index) => {
        const itemValue = displayDescription ? item.skill : item;
        const description = displayDescription ? <div className={styles.itemDescription}>{item.description}</div> : null;

        return (
            <div className={`${styles.itemWrap} clearfix`} key={index}>
                <h4>{itemValue}</h4>
                {description}
            </div>
        )
    }

    return (
        <>
            { pageSubtitle }

            <div className={styles.widgetWrap}>
                {
                    blocks.map((item, index) => {
                        return renderItem(item, index)
                    })
                }
            </div>
        </>
    )
}

SkillsWidget.propTypes = {
    pageSubtitle: PropTypes.object.isRequired,
    styles: PropTypes.object.isRequired,
    blocks: PropTypes.array.isRequired,
    displayDescription: PropTypes.bool
}