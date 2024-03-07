import PropTypes from 'prop-types';
import { PersonalInfoWidget } from "./PersonalInfoWidget";

export const BioWidget = (props) => {
    const {
        displayTitle,
        pageSubtitle,
        styles,
        configPersonalInfo,
        configAboutPersonalInfo,
        displayPersonalInfo,
        bioTexts,
        Trans
    } = props;

    return (
        <>
            {
                displayTitle &&
                    <div className="col-12">
                        {pageSubtitle}
                    </div>
            }

            <div className={`biotexts-wrapper col-12 ${displayPersonalInfo ? 'col-sm-7' : ''}`}>
                <Trans i18nKey="about.bio" tOptions={{ returnObjects: true, joinArrays: '' }}>
                    {
                        bioTexts.map((text, index) => {
                            return <p key={index}>{text}</p>
                        })
                    }
                </Trans>
            </div>

            {
                displayPersonalInfo && (
                    <PersonalInfoWidget
                        configAboutPersonalInfo={configAboutPersonalInfo}
                        configPersonalInfo={configPersonalInfo}
                        styles={styles}
                    />
                )
            }
        </>
    )
}

BioWidget.propTypes = {
    displayTitle: PropTypes.bool.isRequired,
    pageSubtitle: PropTypes.object.isRequired,
    styles: PropTypes.object.isRequired,
    configPersonalInfo: PropTypes.object.isRequired,
    configAboutPersonalInfo: PropTypes.object.isRequired,
    displayPersonalInfo: PropTypes.bool.isRequired,
    bioTexts: PropTypes.array.isRequired,
    Trans: PropTypes.func.isRequired
}