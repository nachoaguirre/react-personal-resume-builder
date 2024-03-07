export default {
    name: 'My Name',
    role: 'My Role',
    email: 'my@email.com',
    phone: '+5699 123 4567',
    birthDay: '1990-01-01',
    location: 'My Location',

    baseUrl: 'https://my-website.com',

    siteTitle: 'My Site | Resume',
    siteDescription: 'Resume of [My Name], a [my role] from [my location]. I have experience in a, b, and c. I am [a role] with a passion for [things]. I am a team player and I love to learn new things. I am always looking for new challenges and opportunities.',
    siteKeywords: "Keyword 1, Keyword 2, Keyword 3",
    useAnalytics: false,
    useAnalyticsInDev: false,

    sections: [
        {
            title: 'Home',
            display: true,
            icon: 'fa6-solid:house',

        },
        {
            title: 'About',
            display: true,
            icon: 'fa6-solid:user',

        },
        {
            title: 'Resume',
            display: true,
            icon: 'fa6-solid:graduation-cap',
        },
        {
            title: 'Contact',
            display: true,
            icon: 'fa6-solid:envelope',
        }
    ],

    initialPage: 'home',

    header: {
        displayPhoto: true,
        photoPath: 'img/header_photo.jpg',
        displayName: true,
        displayRole: false,
        displaySocialIcons: true,
        displayDownloadCVButton: true,
        displayChangeLanguageButton: true,
        socialIcons: [
            {
                icon: 'fa6-brands:linkedin-in',
                url: 'https://www.linkedin.com/',
                title: 'LinkedIn'
            },
            {
                icon: 'fa6-brands:github',
                url: 'https://github.com/',
                title: 'GitHub'
            },
            {
                icon: 'fa6-brands:stack-overflow',
                url: 'https://stackoverflow.com/',
                title: 'Stack Overflow'
            },
            {
                icon: 'fa6-brands:codepen',
                url: 'https://codepen.io/',
                title: 'CodePen'
            },
        ]
    },

    home: {
        displayAnimatedBackground: true,
        animatedBackgroundItems: 10,
        displayDownloadCVButton: true,
        displayDownloadCVButtonOnlyOnMobile: true,
    },

    about: {
        displayPersonalInfo: true,
        personalInfo: {
            age: {
                display: true,
            },
            location: {
                display: true,
            },
            email: {
                display: true,
            },
            phone: {
                display: true,
            }
        },
        order: [
            'bio',
            'whatIDo',
            'testimonials',
        ],
        components: {
            bio: {
                display: true,
                displayTitle: false,
            },
            whatIDo: {
                display: true,
                displayTitle: true,
            },
            testimonials: {
                display: true,
                displayTitle: true,
            }
        }
    },

    contact: {
        displayContactForm: true,
        useRecaptcha: false,
        personalInfo: {
            location: {
                display: true,
            },
            email: {
                display: true,
            },
            phone: {
                display: true,
            },
            openToWork: {
                display: true,
            }
        }
    }
}