import { NavLink } from "react-router-dom";
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

export const MenuItem = (props) => {
    const { section, styles} = props;
    const { t } = useTranslation();
    const lowerCaseSection = section.title.toLowerCase();

    return (
        section.display && (
            <li>
                <NavLink
                    to={lowerCaseSection}
                    className={ ({ isActive, isPending }) => isActive ? styles.active : isPending ? "pending" : "" }
                >
                    <Icon icon={section.icon} className={styles.menuIcon} />
                    <span className={`${styles.linkText} menu-item-text`}>{t(`menu.${lowerCaseSection}`)}</span>
                </NavLink>
            </li>
        )
    )
}

MenuItem.propTypes = {
    section: PropTypes.shape({
        title: PropTypes.string.isRequired,
        display: PropTypes.bool.isRequired,
        icon: PropTypes.string.isRequired,
    }).isRequired,
    styles: PropTypes.object.isRequired,
}