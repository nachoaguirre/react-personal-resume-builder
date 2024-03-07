import PropTypes from 'prop-types';
import { useAgeCalculator } from "../hooks/useAgeCalculator";
import { PersonalInfoItem } from "./PersonalInfoItem";

export const PersonalInfoWidget = (props) => {
    const { configAboutPersonalInfo, configPersonalInfo, styles } = props;

    const { calculateAge } = useAgeCalculator();

    if(configAboutPersonalInfo.age.display) {
        const currentAge = calculateAge(configPersonalInfo.birthDay);

        if(currentAge === '') {
            configAboutPersonalInfo.age.display = false;
        }

        configPersonalInfo.age = currentAge.toString();
    }

    return (
        <div className="col-12 col-sm-5 mt-sm-0 mt-4 overflow-hidden personal-info-widget-wrapper">
            <ul className={styles.personalInfo}>
                {
                    Object.entries(configAboutPersonalInfo).map(([key, item], index) => {
                        if(!item.display) return null;

                        return (
                            <PersonalInfoItem
                                key={index}
                                itemKey={key}
                                configKey={configPersonalInfo[key]}
                                itemClassName={styles.personalInfoItem}
                                itemTitleClassName={styles.personalInfoTitle}
                                itemValueClassName={styles.personalInfoValue}
                            />
                        )
                    })
                }
            </ul>
        </div>
    )
}

PersonalInfoWidget.propTypes = {
    configAboutPersonalInfo: PropTypes.object.isRequired,
    configPersonalInfo: PropTypes.object.isRequired,
    styles: PropTypes.object.isRequired
}