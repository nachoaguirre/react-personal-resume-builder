import PropTypes from 'prop-types';

export const TimelineWidget = (props) => {

    const { pageSubtitle, styles, blocks, type } = props;

    const getTypeValues = (item) => {
        switch (type) {
            case "experience":
                return {
                    company: item.company,
                    title: item.role,
                    description: item.description.map((description, index) => (<p key={index}>{description}</p>))
                }
            case "education":
                return {
                    company: item.place,
                    title: item.grade,
                    description: <p>{item.description}</p>
                }
            default:
                return {
                    company: item.company,
                    title: item.role,
                    description: item.description.map((description, index) => (<p key={index}>{description}</p>))
                }
        }
    }

    return (
        <>
            { pageSubtitle }

            <div className={`${styles.timeline} clearfix`}>
                {
                    blocks.map((item, index) => {
                        const { company, title, description } = getTypeValues(item);

                        return (
                            <div className={styles.timelineItem} key={index}>
                                <div className={`${styles.leftPart} col-12 col-md-4`}>
                                    <h5 className={styles.itemPeriod}>{item.period}</h5>
                                    <span className={styles.itemCompany}>{company}</span>
                                </div>

                                <div className={styles.divider}></div>

                                <div className={`${styles.rightPart} col-12 col-md-8`}>
                                    <h4 className={styles.itemTitle}>{title}</h4>
                                    { description }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

TimelineWidget.propTypes = {
    pageSubtitle: PropTypes.object.isRequired,
    styles: PropTypes.object.isRequired,
    blocks: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired
}