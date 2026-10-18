# Greek Gods Family Tree — English + 中文

An interactive Greek mythology family tree based on [somlieng/Greek_gods_family_tree](https://github.com/somlieng/Greek_gods_family_tree). This fork adds bilingual English/Chinese deity information while preserving the existing family-tree interactions.

## Current bilingual implementation

- English descriptions and their existing source links remain visible.
- Chinese deity names, domains, and draft descriptions are shown in the same deity modal.
- Children are shown in English and, where a translation exists, Chinese.
- Chinese translation records live in `translations-zh.js`, separate from the family-tree logic.
- Each translated entry has a `status` field. Keep `"draft"` until a human reviewer checks terminology, historical nuance, and factual accuracy; change it to `"reviewed"` only after review.
- Deities without a Chinese description yet display an explicit translation-in-progress message.

## Translation workflow

1. Use the English text and its existing source link as the source of truth.
2. Draft the Chinese text with AI assistance.
3. Have a human reviewer check names, transliterations, relationships, myth variants, and wording.
4. Add or revise the entry in `translations-zh.js`, keeping its key identical to the deity key in `sketch.js`.
5. Change `status: "draft"` to `status: "reviewed"` only after review.

The current file contains an initial batch of Chinese drafts, not a complete translation of all deity descriptions. Please review these drafts before treating them as authoritative.

## Run locally

Open `index.html` in a browser, or serve this folder with a simple local web server. The project uses D3.js from its existing CDN link.

## Publish with GitHub Pages

After merging the feature branch into `main`:

1. Open this repository's **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Select `main` and the `/ (root)` folder, then save.
4. Wait for GitHub Pages to publish the site; the published URL will appear on the Pages settings screen.

## Attribution and rights

This project is a fork of [somlieng/Greek_gods_family_tree](https://github.com/somlieng/Greek_gods_family_tree). The upstream repository currently does not declare a license in its GitHub metadata. Before distributing a public derivative, confirm that you have permission to reuse and republish the original code and assets, and retain appropriate attribution. Descriptions link to their original external references where provided.
