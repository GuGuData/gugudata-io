# GuGuData.io Guides

The canonical English knowledge base for GuGuData.io API integration guides.

## Local development

```bash
npm install
npm run content:sync -- --source "/absolute/path/to/gugudata.io" --updated YYYY-MM-DD
npm run build
npm run dev
```

The source sync command copies and optimizes public Markdown into `src/content/guides`. Source files outside this repository are never modified.

## Publishing contract

1. Update and review the English guide in this repository first.
2. Run `npm run content:audit` and `npm run build`.
3. Push to `main` and verify the GitHub Pages deployment.
4. Cross-post only after the canonical Pages URL is public.
5. Set DEV Community and Medium canonical URLs to the matching Pages guide.

Do not publish credentials, internal addresses, deployment details, private architecture, or local filesystem paths.
