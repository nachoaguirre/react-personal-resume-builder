import { useTranslation, Trans } from 'react-i18next';
import PropTypes from 'prop-types';

export const PersonalInfo = (props) => {
    const { itemKey, itemDisplay, configKey, className } = props;
    const { i18n } = useTranslation();

    if(!itemDisplay) return null;

    return (
        <li className={className}>
            <span className='title personal-info-item-title'>{i18n.t(`about.personal_info.${itemKey}.title`)}:</span>
            <>
                <Trans
                    i18nKey={`about.personal_info.${itemKey}.value`}
                    tOptions={{ val: configKey }}
                    components={{
                        span: <span />,
                        EmailLink: <a href={`mailto:${configKey}`} />,
                        PhoneLink: <a href={`tel:${configKey}`} />
                    }}
                >
                    {configKey}
                </Trans>
            </>
        </li>
    )
}

PersonalInfo.propTypes = {
    itemKey: PropTypes.string.isRequired,
    itemDisplay: PropTypes.bool.isRequired,
    configKey: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired
}