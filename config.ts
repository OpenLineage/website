const siteMetadata = {
    title: `OpenLineage`,
    siteUrl: `http://localhost`,
    capitalizeTitleOnHome: false,
    logo: `/images/ol-logo.png`,
    icon: `/images/icon.png`,
    titleImage: `/images/background.svg`,
    ogImage: `/images/galaxy.jpg`,
    twoColumnWall: false,
    cookiePolicy: true,
    introTag: `An open platform for data lineage collection and analysis`,
    description: `Your data is an expanding and always-changing galaxy of interrelated jobs and datasets. But that doesn't mean you can't understand everything that's going on.`,
    about:
        "Cras accumsan a lectus at tincidunt. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Phasellus elementum dapibus dictum. Mauris auctor quam nec est tincidunt hendrerit. Donec pulvinar lobortis mauris. Cras vulputate ullamcorper ligula a rhoncus. Nunc venenatis elementum ligula in semper. Mauris malesuada purus nunc, et ultricies leo aliquam ac. Ut sit amet nunc id magna accumsan hendrerit in eget metus.",
    author: `@openlineage`,
    blogItemsPerPage: 10,
    integrationItemsPerPage: 10,
    darkmode: false,
    switchTheme: true,
    navLinks: [
        {
            name: "Home",
            url: "/",
        },
        {
            name: "Getting Started",
            url: "/getting-started",
        },

        {
            name: "Integrations",
            url: "/integration",
        },
        {
            name: "Blog",
            url: "/blog",
        },
        {
            name: "About",
            url: "/about",
        },

    ],
    footerLinks: [
        {
            name: "Twitter",
            url: "/privacy-policy",
        },
        {
            name: "Slack",
            url: "/privacy-policy",
        },
        {
            name: "GitHub",
            url: "/foo",
        },
    ],
    social: [
        {
            name: "Facebook",
            icon: "/images/Facebook.svg",
            url: "#",
        },
        {
            name: "Twitter",
            icon: "/images/Twitter.svg",
            url: "#",
        },
        {
            name: "Instagram",
            icon: "/images/Instagram.svg",
            url: "#",
        },
        {
            name: "Youtube",
            icon: "/images/Youtube.svg",
            url: "#",
        },
    ],
    contact: {
        // leave empty ('') or false to hide form
        api_url: "",
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet accumsan arcu. Proin ac consequat arcu.`,
        mail: "hi@akzhy.com",
        phone: "000-000-0000",
        address: "1234 \nLocation \nLocation",
    },
    disqus: "",
}

const beforeContactFormSubmit = data => {
    // Code 0 - success
    // Code 1 - Name
    // Code 2 - Email
    // Code 3 - Message
    // Code 4 - Other
    const errors = []

    if (data.name.trim().length < 2) {
        errors.push({
            code: 1,
            message: "Enter a name",
        })
    }

    if (!data.email.match(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/)) {
        errors.push({
            code: 2,
            message: "Enter a valid email address",
        })
    }

    if (data.message.trim().length < 15) {
        errors.push({
            code: 3,
            message: "Enter a message with atleast 15 characters",
        })
    }

    if (errors.length > 0)
        return {
            result: false,
            errors: errors,
        }

    return {
        data: {
            name: data.name,
            email: data.email,
            message: data.message,
        },
        result: true,
    }
}

const contactFormSubmit = async (api, data) => {
    let res: any = await fetch(api, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })

    res = await res.json()

    if (res.success) {
        return {
            result: true,
        }
    }
    return {
        result: false,
        ...res,
    }
}

const defaults = {
    disqus: null,
    twoColumnWall: true,
    darkmode: false,
    switchTheme: true,
    capitalizeTitleOnHome: true,
    cookiePolicy: false
}

Object.keys(defaults).forEach(item => {
    if (siteMetadata[item] === undefined) {
        siteMetadata[item] = defaults[item]
    }
})

export { siteMetadata, beforeContactFormSubmit, contactFormSubmit }
