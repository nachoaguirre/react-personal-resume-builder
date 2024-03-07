import { useTranslation, Trans } from 'react-i18next';
import PropTypes from 'prop-types';

export const PersonalInfoItem = (props) => {
    const { itemKey, configKey, itemClassName, itemTitleClassName, itemValueClassName } = props;
    const { i18n } = useTranslation();

    return (
        <li className={`${itemClassName} personal-info-item-${itemKey} overflow-hidden`}>
            <span className={itemTitleClassName}>{i18n.t(`about.personal_info.${itemKey}.title`)}:</span>
            <span className={`${itemValueClassName} text-nowrap`}>
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
            </span>
        </li>
    )
}

PersonalInfoItem.propTypes = {
    itemKey: PropTypes.string.isRequired,
    configKey: PropTypes.string.isRequired,
    itemClassName: PropTypes.string.isRequired,
    itemTitleClassName: PropTypes.string.isRequired,
    itemValueClassName: PropTypes.string.isRequired
}