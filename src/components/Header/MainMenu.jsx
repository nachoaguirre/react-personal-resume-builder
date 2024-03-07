import { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { MenuItem } from './MenuItem';

export const MainMenu = (props) => {
    const { sectionsConfig, handleMainMenuClick, styles } = props;

    const { i18n } = useTranslation();

    const [menuItems, setMenuItems] = useState([]);

    const [validSections, setValidSections] = useState([]);

    const updateMainMenuBasedOnLanguage = useCallback(() => {
        return validSections.map((section, index) => (
            <MenuItem
                key={index}
                section={section}
                styles={styles}
            />
        ));
    }, [validSections, styles]);

    useEffect(() => {
        const validSections = sectionsConfig.filter(section => {
            return section.display;
        });

        setValidSections(validSections);
    }, [sectionsConfig]);

    useEffect(() => {
        setMenuItems(updateMainMenuBasedOnLanguage(i18n.language));
    }, [i18n, updateMainMenuBasedOnLanguage]);

    return (
        <ul className={`${styles.mainMenu} mt-4 mt-lg-0`} onClick={handleMainMenuClick}>
            { menuItems }
        </ul>
    )
}

MainMenu.propTypes = {
    sectionsConfig: PropTypes.array.isRequired,
    handleMainMenuClick: PropTypes.func.isRequired,
    styles: PropTypes.object.isRequired,
}