import PropTypes from 'prop-types';

export const CertificatesWidget = (props) => {
    const { styles, pageSubtitle, blocks } = props;

    return (
        <>
            <div className="col-12">
                {pageSubtitle}
            </div>

            {
                blocks.map((item, index) => {
                    return (
                        <div className="col-12 col-sm-6" key={index}>
                            <div className={`${styles.certificateItem} clearfix`}>
                                <div className={styles.certiLogo}>
                                    <img src={item.logo} alt={item.title} />
                                </div>

                                <div className={styles.certiContent}>
                                    <div className={styles.certiTitle}>
                                        <h4>{item.title}</h4>
                                    </div>
                                    <div className={styles.certiDate}>
                                        <span>{item.date}</span>
                                    </div>
                                    <div className={styles.certiCompany}>
                                        <span><a href={item.link}>{item.place}</a></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}

CertificatesWidget.propTypes = {
    pageSubtitle: PropTypes.object.isRequired,
    styles: PropTypes.object.isRequired,
    blocks: PropTypes.array.isRequired
}