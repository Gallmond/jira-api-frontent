<h1>This is the projects page</h1>


<p>
    When logged in, this page should list all projects this user has access
    to by iterating over all the cloud entities (ie, sites) and then getting
    all the projects on that site
</p>
<p>
    Each link should have an href like:
</p>
<code>
    {@html '/jira/{siteId}/{projectKey}'}<br>
    // eg /jira/7455bb41-f054-4970-83a9-dd9b48846ec6/GC-API
</code>
<p>
    Which is handled by:
</p>
<code>
    /routes/jira/[siteId]/[projectKey].svelte
</code>