#

## front end pages

### /logout
revoke any tokens, clear cookies

### /login 
Contains a link to take user to the atlassian auth page

### /login/oauth-redirect/+page.ts
Atlassian auth should redirect here. It's a back end handler page that the user shouldn't see in the url.

After we exchange the code for an access_token we should redirect them to:

### /projects
This should fetch all sites this user has access to, and all projects each of those sites contains. Each of which has a link to:

### /jira/{siteId}/{projectKey}.svelte
### /jira/{siteId}/{projectKey}.svelte




# Origional MD below ==========================================================

# SvelteKit Demo app

The official demo app for SvelteKit, hosted on Vercel.

## Deploy Your Own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fvercel%2Ftree%2Fmain%2Fexamples%2Fsveltekit-1&project-name=sveltekit-vercel&repository-name=sveltekit-vercel&demo-title=SvelteKit%20%2B%20Vercel&demo-url=https%3A%2F%2Fsveltekit-template.vercel.app%2F)

_Live Example: https://sveltekit-template.vercel.app_

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

## Speed Insights

Once deployed on Vercel, you can benefit from [Speed Insights](https://vercel.com/docs/concepts/speed-insights) simply by navigating to Vercel's dashboard, clicking on the 'Speed Insights' tab, and enabling the product.

You will get data once your application will be re-deployed and will receive visitors.
