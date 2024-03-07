const config = import.meta.env.VITE_SITE_CONFIG;

const homeLoader = () => ({
    name: config.name,
    configHome: config.home,
});

const aboutLoader = () => ({
    configAbout: config.about,
    configPersonalInfo: {
        birthDay: config.birthDay,
        location: config.location,
        email: config.email,
        phone: config.phone,
    }
});

const contactLoader = () => ({
    configContact: config.contact,
    configPersonalInfo: {
        location: config.location,
        email: config.email,
        phone: config.phone,
    },
});

const appLoader = () => ({
    configHeader: {
        sections: config.sections,
        header: config.header,
        name: config.name,
        role: config.role,
    },
    baseUrl: config.baseUrl,
});

export {
    homeLoader,
    aboutLoader,
    contactLoader,
    appLoader,
};
