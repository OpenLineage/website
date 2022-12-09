# OpenLineage Website

This repository contains content and resources used to build and deploy the openlineage.io website.

The openlineage.io website is a statically-generated site containing the following:
* Blogs (`/blog`) and landing pages (`/`), which are powered by Gatsby
* OpenAPI documentation (`/apidocs/openapi`), which is generated automatically
* Java client documentation (`/apidocs/javadoc`)
* Documentation (`/docs`), which is powered by Docusaurus and can be found in the [docs repo](https://github.com/OpenLineage/docs)

The first three of these are deployed into the `gh-pages` branch of the [org domain repo](https://github.com/OpenLineage/OpenLineage.github.io), where they are served by GitHub Pages. The doc site is served from the `gh-pages` branch in its own repo. 

## Contributing content

Thanks! Seriously, we appreciate your interest in contributing to the site. The fact that you're reading this section means you’re pretty special to us.

There are two kinds of content you might contribute to this repository: blog posts and basepages. Blog posts are, well, blog posts with dates and authors and all the blogposty stuff you expect. Basepages are all of the other landing pages - Ecosystem, Getting Started, and Resources.

If you're looking to contribute to [docs](https://github.com/OpenLineage/docs) or the [spec](https://github.com/OpenLineage/OpenLineage), take a look at their corresponding repositories for more details. Otherwise, read on!

### New posts

We love new blog posts, and welcome content about OpenLineage! Topics include:
* experiences from users of all kinds
* supporting products and technologies
* proposals for discussion

If you are familiar with the GitHub pull request process, it is easy to propose a new blog post:

1. Fork this project.
2. Make a new directory in `content/blog`. The name of the directory will become part of the posts's URL, so choose something descriptive and unique.
2. Create an `index.mdx` file in the new directory containing your blog content. Use one of the other posts as a template. The `title`, `date`, `author`, `image`, `banner`, and `description` front matter fields are all required.
3. Create artwork! The `banner.svg` image will be shown at the top of the blog post, and should have dimensions of 670x160. The `image.svg` will be shown in the blog index, and should have dimensions of 670x480. These should both be SVG files.
4. Build the site locally if you want to see it in a browser and build confidence in your formatting choices.
5. Commit your changes and submit a pull request. 

To match the artwork on the rest of the site, you can use sketchbeast.com to create your images:

1. First, choose a source image to use as inspiration - perhaps something thematically related to your post, or an inside joke. It'll be our little secret.
2. Then, upload the image to sketchbeast.com, change "mixed shapes" to "rectangles", and click the button. Feel free to play with the other settings as you like, but stick with rectangles.
3. Download the resulting SVG using the button on the image in the film strip at the bottom of the screen, and crop to the proper size.
4. Delight in being the only person who knows what the source image was; resolve to choose something more subversive/clever next time.

(If you'd rather not go through all of this, feel free to submit your PR without artwork and we'll make something for you - we like doing it, it's fun!) 

### Changes to basepages

If you want to make a change to a basepage - e.g. to add a new member to the Ecosystem page - the best way is to submit a pull request.

These basepages can be found in `contents/basepages`, and are formatted in markdown.

## Building the site locally

To build the site locally, first install the latest version of Node 16. You can either do this manually, or you can use a tool like [nvm](https://github.com/nvm-sh/nvm):

```
% nvm install 16
```

Then, install Yarn if you haven't already:

```
% npm install -g yarn
```

Then, install all of the node dependencies:

```
% yarn
```

Finally, build the site:

```
% yarn run build
```

You should find the full site inside the `public/` directory.

### Building openapi docs

To build the openapi docs using `redoc-cli`, run:

```
% yarn run build:docs
```

You should find the generated HTML file inside the `static/apidocs/` directory.

## Deploying the site

The site is deployed using the [Gatsby Publish GitHub action](https://github.com/OpenLineage/website/blob/main/.github/workflows/deploy.yml) whenever a change is merged into `main`. 

This GitHub Action will:
* Execute `scripts/build-docs.sh`, which performs a build of the OpenAPI docs based on the latest version of the spec that has been published into `static/spec` by the [OpenLineage release script](https://github.com/OpenLineage/OpenLineage/blob/main/spec/release.sh). The resulting docs are placed into `static/apidocs/openapi`.
* Execute `yarn run build`, which performs a build of the Gatsby landing pages and places them into `public/`. The `static/` directory, containing the OpenAPI and Java client documentation, is copied into `public/` during this step.
* Replace the contents of the `gh-pages` branch of the [org domain repo](https://github.com/OpenLineage/OpenLineage.github.io) with the contents of `public/`. This will cause that repo's GitHub Action to deploy the new content.

## How specs are published
Our design principles are:
* Documentation about the spec should be published when new versions of the spec are released in the [main OpenLineage repo](https://github.com/OpenLineage/OpenLineage).
* Documentation about the Java client should be published when new versions of the [Java client](https://github.com/OpenLineage/OpenLineage/tree/main/client/java) are released.

The automatic mechanism that occurs when the OpenLineage spec is released is:
1. The [`new-version.sh`](https://github.com/OpenLineage/OpenLineage/blob/main/new-version.sh) script is manually run, causing the version number of the spec to be bumped.
2. CircleCI is triggered by the merge to `main`, calling the [`openlineage-integration-publish` workflow](https://github.com/OpenLineage/OpenLineage/blob/main/.circleci/workflows/openlineage-integration-publish.yml). This workflow executes the `publish-spec` job, which runs [`spec/release.sh`](https://github.com/OpenLineage/OpenLineage/blob/main/spec/release.sh).
3. This script reviews the Git history to determine which files in the spec changed, and publishes a new version of them into `static/spec` in this repository.
4. The [Gatsby Publish GitHub action](https://github.com/OpenLineage/website/blob/main/.github/workflows/deploy.yml) detects the commit to `main` and publishes the site.

The automatic mechanism that occurs when the Java client changes is:
1. CircleCI is triggered by a merge to `main`, calling the [`openlineage-java` workflow](https://github.com/OpenLineage/OpenLineage/blob/main/.circleci/workflows/openlineage-java.yml). 
2. This workflow invokes a collection of build tasks and tests, including a job that builds javadoc using `gradlew javadoc`.
3. This workflow then executes the `publish-javadoc` job, which runs [`release-javadoc.sh`](https://github.com/OpenLineage/OpenLineage/blob/main/client/java/release-javadoc.sh).
4. This script compares the built docs against the version of them already existing inside `static/spec/javadoc/` in this repository. If there are any changes, it replaces the versions in `static/spec/javadoc/` with the newly built documentation set.
5. The [Gatsby Publish GitHub action](https://github.com/OpenLineage/website/blob/main/.github/workflows/deploy.yml) detects the commit to `main` and publishes the site.

