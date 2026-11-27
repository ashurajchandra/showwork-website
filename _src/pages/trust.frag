<section class="hero"><div class="wrap">
  <span class="eyebrow">Trust, safety and platform</span>
  <h1>Built so a security team can say yes.</h1>
  <p class="lede">Agents propose. Code decides what is allowed. People approve what matters. Here is how each layer works, what plugs in, how you run it, and where the edges still are.</p>
</div></section>

<section class="alt"><div class="wrap">
  <div class="grid g4">
    <div class="stat rv"><b>0</b><p>agents with an approve tool</p></div>
    <div class="stat rv"><b>0</b><p>network access inside the test sandbox</p></div>
    <div class="stat rv"><b>1,600+</b><p>automated tests, with seven safety rules deliberately broken to prove the suite catches them</p></div>
    <div class="stat rv"><b>1</b><p>server is enough to self-host</p></div>
  </div>
</div></section>

<section id="sandbox"><div class="wrap">
  <div class="section-head rv"><span class="eyebrow">Safety model</span><h2>Seven rules the product is built on.</h2></div>
  <div class="grid g3">
    <div class="card rv"><h4>Agents never approve their own work</h4><p>Gates are workflow steps. The definition validator rejects any agent that is given the approval gate, and a test fails if that rule is removed.</p></div>
    <div class="card rv"><h4>A private workspace for every run</h4><p>Each run works on its own copy of your repository. Agents reach it only through one path checker, and never see the original repository or anything else on the machine. Two runs never share files.</p></div>
    <div class="card rv"><h4>Generated code never runs on your host</h4><p>Every test and every browser run starts in a fresh, throwaway Docker container: no network, read-only root, no capabilities, non-root, resource limits and a hard deadline. It is removed when it finishes.</p></div>
    <div class="card rv"><h4>The model chooses data, not code</h4><p>The test command is fixed. Browser tests are a validated list of steps from a closed vocabulary, so there is no model-written script to execute.</p></div>
    <div class="card rv"><h4>Sandbox output is untrusted</h4><p>File names, magic bytes and sizes are checked. The app under test and the browser harness are separate containers, so generated code cannot tamper with evidence. Everything served back is owner-scoped.</p></div>
    <div class="card rv"><h4>Prompt injection is handled structurally</h4><p>External text (tickets, pages, code comments) is marked as data, tool results are labelled, and risky actions need approval. We tested with hostile tickets, pages and code comments. Guards do not depend on the model behaving.</p></div>
    <div class="card rv"><h4>Dependencies are vetted</h4><p>New packages resolve in the sandbox with install scripts off, from the registry only, with age, deprecation, licence, download and look-alike checks, and a person approves the exact change.</p></div>
  </div>
</div></section>

<section class="alt" id="audit"><div class="wrap">
  <div class="section-head rv"><span class="eyebrow">Control and accountability</span><h2>Who can do what, and a record of it.</h2></div>
  <div class="grid g2">
    <div class="card rv"><h4>Roles</h4><p><strong>Owner, admin, approver, member, viewer.</strong> Only an approver, admin or owner can decide a gate. A viewer can read but cannot start or change work. Members can share the organization's runs and pull requests.</p>
      <h4 style="margin-top:1.2rem">Alerts</h4><p>Approvers are told when a gate opens, and an Approvals page lists what is waiting for them.</p></div>
    <div class="card rv"><h4>Tamper-evident audit trail</h4><p>An append-only, hash-chained log per organization records approvals, settings, roles, sign-ins, runs and pull requests, with a page and an export.</p>
      <h4 style="margin-top:1.2rem">Budgets</h4><p>Per-run limits on cost, time and steps, a daily token limit, and a runs-per-day cap per user. Sign-up is closed by default.</p></div>
    <div class="card rv"><h4>Secrets</h4><p>Credentials stay out of agents and sandboxes. Stored secrets are encrypted and run output is scrubbed. A server-side fetcher blocks SSRF, and every query checks ownership.</p></div>
    <div class="card rv"><h4>Durable by design</h4><p>Each step is checkpointed. A worker takes over crashed runs using leases and heartbeats, idempotency keys make retried side effects safe, a scheduler fires each slot exactly once, and failed runs can restart from the failed step.</p></div>
  </div>
</div></section>

<section id="integrations"><div class="wrap">
  <div class="section-head rv"><span class="eyebrow">Integrations</span><h2>Plugs into the tools you already use.</h2></div>
  <div class="scroll rv"><table class="tbl"><thead><tr><th>System</th><th>What Showwork does</th><th>Status</th></tr></thead><tbody>
    <tr><td><strong>Jira</strong></td><td>Reads tickets and discussion, comments once per step, moves tickets through your own workflow, resumes a blocked run when the reporter answers, optionally starts runs for issues labelled <code>showwork</code>.</td><td><span class="badge b-live">Available</span></td></tr>
    <tr><td><strong>GitHub</strong></td><td>Reads the repository, pushes a <code>showwork/</code> branch, opens a real pull request, reacts to failed checks and review comments. Uses a fine-grained token scoped to one repository. Never merges or approves.</td><td><span class="badge b-live">Available</span></td></tr>
    <tr><td><strong>Confluence</strong></td><td>Pages linked from a ticket are read as context for the PM.</td><td><span class="badge b-live">Available</span></td></tr>
    <tr><td><strong>MCP connectors</strong></td><td>Connect tools such as Atlassian with each person's own OAuth sign-in. An admin approves each tool before an agent can use it.</td><td><span class="badge b-live">Available</span></td></tr>
    <tr><td><strong>Email (SMTP)</strong></td><td>Real notification email, simulated until configured.</td><td><span class="badge b-live">Available</span></td></tr>
    <tr><td><strong>Slack, GitLab, more trackers</strong></td><td>Planned.</td><td><span class="badge b-road">Roadmap</span></td></tr>
  </tbody></table></div>
  <div class="grid g2" style="margin-top:2rem">
    <div class="card rv"><h4>Stacks supported today</h4><ul class="tick"><li>Dependency-free Node apps</li><li>Node and Express APIs with a throwaway Postgres per run</li><li>Next.js and React apps, built in the sandbox and shown in a real browser at three sizes</li><li>An empty repository can get its first commit from a verified template</li></ul></div>
    <div class="card rv"><h4>Models</h4><p>Runs on Google Vertex AI (Gemini) by default, with a provider switch for Anthropic's Claude. Model retries, deadlines and backoff are built in, so a provider that hangs does not hang your run.</p></div>
  </div>
</div></section>

<section class="alt" id="deploy"><div class="wrap">
  <div class="grid g2" style="align-items:center;gap:3rem">
    <div class="rv"><span class="eyebrow">Run it in your cloud</span><h2>One server. Your data stays yours.</h2>
      <p>Showwork installs on a single server with Docker Compose. A built-in doctor command checks an installation, and a health endpoint plugs into your monitoring. Settings for Jira, GitHub and the model can live per organization.</p>
      <p class="muted">Stronger isolation than plain Docker (per-agent environments, agents in containers behind a model proxy) is planned for regulated and self-hosted customers. See the <a href="roadmap.html">roadmap</a>.</p></div>
    <div class="card rv"><h4>Install in four moves</h4><ol style="padding-left:1.2rem;margin:0"><li>Provision one server with Docker</li><li>Run the install script and Compose stack</li><li>Connect Jira, GitHub and your model</li><li>Run <code>doctor</code>, then your first ticket</li></ol></div>
  </div>
</div></section>

<section class="alt"><div class="wrap"><div class="band rv"><h2>Questions from your security team? Bring them.</h2><div class="cta-row" style="margin:0"><a class="btn btn-primary" href="demo.html">Book a demo</a></div></div></div></section>
