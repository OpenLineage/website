const siteMetadata = {
    title: `OpenLineage`,
    siteUrl: `https://openlineage.io`,
    capitalizeTitleOnHome: false,
    logo: `/images/ol-logo.svg`,
    icon: `/images/icon.svg`,
    titleImage: `/images/background.svg`,
    ogImage: `/images/galaxy.jpg`,
    twoColumnWall: false,
    cookiePolicy: false,
    introTag: `An open framework for data lineage collection and analysis`,
    description: `Data lineage is the foundation for a new generation of powerful, context-aware data tools and best practices. OpenLineage enables consistent collection of lineage metadata, creating a deeper understanding of how data is produced and used.`,
    about:
        "OpenLineage is an open platform for collection and analysis of data lineage. It tracks metadata about datasets, jobs, and runs, giving users the information required to identify the root cause of complex issues and understand the impact of changes. OpenLineage contains an open standard for lineage data collection, a metadata repository reference implementation (Marquez), libraries for common languages, and integrations with data pipeline tools.",
    author: `@openlineage`,
    blogItemsPerPage: 10,
    integrationItemsPerPage: 10,
    darkmode: false,
    switchTheme: false,
    navLinks: [
        {
            name: "Home",
            url: "/",
        },
        {
            name: "Getting Started",
            url: "/docs/getting-started",
        },
        {
            name: "Resources",
            url: "/resources",
        },
        {
            name: "Blog",
            url: "/blog",
        },
        {
            name: "Ecosystem",
            url: "/ecosystem",
        },
        {
            name: "Docs",
            url: "/docs"
        },
    ],
    footerLinks: [
        {
            name: "Mastodon",
            url: "https://fosstodon.org/@openlineage",
            rel: "me",
        },
        {
            name: "Twitter",
            url: "https://twitter.com/OpenLineage",
            rel: "",
        },
        {
            name: "Slack",
            url: "http://bit.ly/OpenLineageSlack",
            rel: "",
        },
        {
            name: "GitHub",
            url: "https://github.com/OpenLineage/OpenLineage",
            rel: "",
        },
        {
            name: "Wiki",
            url: "https://bit.ly/OLwiki",
            rel: ""
        },
        {
            name: "YouTube",
            url: "https://bit.ly/OLychannel",
            rel: ""
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
            name: "YouTube",
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
