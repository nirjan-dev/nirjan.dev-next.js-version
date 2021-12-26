  import Banner from './Banner.svelte';
  import NewsletterForm from './NewsletterForm.svelte';
  import Container from './Container.svelte';
  import { DateFormatter } from '../utils/dateFormatter';
  import RichTextResolver from 'storyblok-js-client/dist/rich-text-resolver.es';
  import Image from './Image.svelte';
  import richTextSchema from '../utils/richTextSchema';
  import { getImages, getJPEGSrcset, getWebPSrcset, sizes } from '../utils/responsiveImageHelpers';
  import { onMount, tick } from 'svelte';
  import type { Post } from '../types/post';
  import type { SEOProps } from '../types/seoProps';
  import Seo from './SEO.svelte';
  import IoLogoTwitter from 'svelte-icons/io/IoLogoTwitter.svelte';
  import IoLogoFacebook from 'svelte-icons/io/IoLogoFacebook.svelte';
  import slugify from 'slugify';

  const resolver = new RichTextResolver(richTextSchema);

  const componentsToLoad = [];
  const componentResolver = (component, blok) => {
    switch (component) {
      case 'quiz':
        componentsToLoad.push('quiz');
        return `<nk-quiz options='${JSON.stringify(blok.questions).replace(/[\/\(\)\']/g, '&apos;')}'></nk-quiz>
       
        `;
        break;
    }
  };

  resolver.addNode('blok', (node) => {
    let html = '';
    node.attrs.body.forEach((blok) => {
      html += componentResolver(blok.component, blok);
    });
    return {
      html: html,
    };
  });

  const generateTOC = (html) => {
    const content = (<any>post.content.body).content;

    let outputHTML = `<ul>`;

    content.forEach((node) => {
      if (node.type === 'heading' && node.attrs.level === 2) {
        outputHTML += `
          <li>
            <a href="#${slugify(node.content[0].text)}">${node.content[0].text}</a>  
          </li>
        `;
      }
    });

    outputHTML += `</ul>`;

    return outputHTML;
  };

  const loadScripts = () => {
    if (componentsToLoad.length > 0) {
      const scripts = [];
      componentsToLoad.forEach((component) => {
        scripts.push(`
        <script type="module" src="/web-components/${component}/dist/index.mjs" > <\/script>
          <script nomodule src="/web-components/${component}/dist/index.js" > <\/script>
        `);
      });
      return scripts.join(' ');
    } else {
      return '';
    }
  };

  export let preview = false;
  export let post: Post;
  // cover image stuff
  let coverImage:
    | undefined
    | {
        originalLink?: string;
        JPEGSrcset?: string;
        WebPSrcset?: string;
        src?: string;
        alt?: string;
        placeholder?: string;
      };
  if (post.content.cover.filename) {
    coverImage = {};
    coverImage.originalLink = post.content.cover.filename;
    const { JPEGImages, webPImages, placeholder } = getImages(coverImage.originalLink, sizes);
    coverImage.JPEGSrcset = getJPEGSrcset(JPEGImages, sizes);
    coverImage.WebPSrcset = getWebPSrcset(webPImages, sizes);
    coverImage.src = JPEGImages[JPEGImages.length - 1];
    coverImage.alt = post.content.cover.alt;
    coverImage.placeholder = placeholder;
  }

  // live preview stuff
  onMount(() => {
    if (preview === true) {
      Prism.highlightAll();

      const storyblokBridge = document.createElement('script');
      const token = 'IOjlPrsDjUHGJbuooR5TQQtt';
      storyblokBridge.src = `//app.storyblok.com/f/storyblok-latest.js?t=${token}`;
      storyblokBridge.onload = () => {
        window.storyblok.init({
          accessToken: token,
        });
        window.storyblok.pingEditor(() => {
          if (window.storyblok.isInEditor) {
            window.storyblok.enterEditmode();
          }
        });
        window.storyblok.on(['input'], (payload) => {
          post = payload.story;
          tick().then(() => Prism.highlightAll());
        });
      };
      document.head.append(storyblokBridge);
    }
  });

  const { seo } = post.content;
  const seoProps: SEOProps = {
    title: seo.title || post.name,
    description: seo.description || post.content.excerpt,
    pathname: `/${post.slug}`,
    image: post.content.cover.filename,

    ogTitle: seo.og_title || post.name,
    ogImage: seo.og_image || post.content.cover.filename,
    ogDescription: seo.og_description || post.content.excerpt,
    ogType: 'article',

    twitterTitle: seo.twitter_title || post.name,
    twitterDescription: seo.twitter_description || post.content.excerpt,
    twitterImage: seo.twitter_image || post.content.cover.filename,

    disableIndex: preview,
    dateModified: post.published_at,
    datePublished: post.first_published_at,
    keywords: post.tag_list.join(','),
  };
  let postBody;
  $: postBody = resolver.render(post.content.body);






<aside class="toc">
  <button class="toc-button">Toggle Table of Contents</button>
  <h2 class="toc-header">Table of Contents</h2>
  {@html generateTOC(postBody)}
</aside>

<Container>
  <div class="post__wrapper">
    <p class="post__excerpt">{post.content.excerpt}</p>

    <article class="post">
      {@html postBody}
    </article>
    <section class="share-links">
      <a
        class="social-btn social-btn--twitter"
        href={`https://twitter.com/intent/tweet?url=https://nirjan.dev/${post.slug}&text=${post.name} by @nirjan_dev`}
        aria-label="share on twitter"
        target="_blank"
        rel="noopener noreferrer">
        Share
        <span aria-hidden="true" class="icon"><IoLogoTwitter /></span>
      </a>
      <a
        class="social-btn social-btn--twitter"
        href={`https://twitter.com/search?q=${encodeURIComponent('https://nirjan.dev/' + post.slug)}`}
        target="_blank"
        aria-label="discuss on twitter"
        rel="noopener noreferrer">
        Discuss
        <span class="icon" aria-hidden="true"><IoLogoTwitter /></span>
      </a>
      <a
        class="social-btn social-btn--facebook"
        href={`https://facebook.com/sharer/sharer.php?u=https://nirjan.dev/${post.name}`}
        target="_blank"
        aria-label="share on facebook"
        rel="noopener noreferrer">
        Share
        <span aria-hidden="true" class="icon"><IoLogoFacebook /></span>
      </a>
    </section>

    {#if !preview}
      <!-- content here -->
      <NewsletterForm hydrate-client={{}} />
    {/if}
    <script
      src="https://utteranc.es/client.js"
      repo="nirjan-dev/site-comments"
      issue-term="pathname"
      crossorigin="anonymous"
      theme="preferred-color-scheme"
      async>
    </script>
  </div>
</Container>
