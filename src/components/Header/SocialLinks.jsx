import { Icon } from '@iconify/react';
import PropTypes from 'prop-types';

export const SocialLinks = (props) => {
    const { socialIcons, styles } = props;

    return (
        <div className={styles.socialLinks}>
            <ul>
                {
                    socialIcons.map((socialLink, index) => (
                        <li key={index}>
                            <a href={socialLink.url} target="_blank" rel='noreferrer' title={socialLink.title}>
                                <Icon icon={socialLink.icon} height="1em" width="1em" style={{ verticalAlign: '-0.125em', display: 'inline-block' }} />
                            </a>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

SocialLinks.propTypes = {
    socialIcons: PropTypes.arrayOf(PropTypes.shape({
        url: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
    })).isRequired,
    styles: PropTypes.object.isRequired
}