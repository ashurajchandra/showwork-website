<section class="hero"><div class="wrap">
  <div class="grid g2" style="gap:3rem;align-items:start">
    <div>
      <span class="eyebrow">Book a demo</span>
      <h1>See a ticket become a proven pull request.</h1>
      <p class="lede">A twelve-minute walkthrough on a real Jira ticket and a real GitHub repository. Bring a ticket of your own and we will tell you whether it is a good fit.</p>
      <h4 style="margin-top:2rem">What you will see</h4>
      <ul class="tick">
        <li>A Jira ticket picked up, with the PM asking a clarifying question</li>
        <li>The three gates: requirements, plan, patch</li>
        <li>QA running test cases in a real browser at three screen sizes</li>
        <li>A bug found, fixed and retested</li>
        <li>The pull request, with the evidence inside</li>
      </ul>
      <div class="kv" style="max-width:420px"><h5>Good fit</h5><ul><li>Jira and GitHub today</li><li>Well-specified tickets on web apps</li><li>A team that wants proof before review</li></ul></div>
    </div>
    <div>
      <form class="lead" id="lead-form" novalidate>
        <div class="row"><label>Name<input name="name" required autocomplete="name"></label><label>Work email<input name="email" type="email" required autocomplete="email"></label></div>
        <div class="row"><label>Company<input name="company" required autocomplete="organization"></label><label>Your role<input name="role" autocomplete="organization-title"></label></div>
        <div class="row"><label>Team size<select name="team"><option>1 to 10</option><option>11 to 50</option><option>51 to 200</option><option>200+</option></select></label>
          <label>Stack <span>(optional)</span><input name="stack" placeholder="Node, Next.js, Postgres..."></label></div>
        <label>What would you like to ship faster? <span>(optional)</span><textarea name="message" rows="4"></textarea></label>
        <input class="hp" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">
        <button class="btn btn-primary" type="submit">Request a demo</button>
        <p class="form-note" id="lead-error" style="display:none;color:var(--accent-ink)">Something went wrong sending your request. Please try again in a moment.</p>
        <p class="form-note">We use these details only to arrange your demo. No spam, no sharing.</p>
      </form>
      <div class="card sent" id="lead-sent"><h3>Thanks, we have your request.</h3><p>We will reply to arrange a time. In the meantime, the <a href="pipeline.html">pipeline walkthrough</a> shows what the demo covers.</p></div>
    </div>
  </div>
</div></section>

<section class="alt"><div class="wrap narrow">
  <div class="section-head rv"><span class="eyebrow">FAQ</span><h2>Questions people ask first.</h2></div>
  <details class="faq rv"><summary>Will it merge code on its own?</summary><p>No. It opens a pull request on a <code>showwork/</code> branch and stops. It does not merge, approve, or write to your default branch. A person merges.</p></details>
  <details class="faq rv"><summary>Does AI-generated code run on our servers or laptops?</summary><p>Generated code runs only inside sealed Docker containers with no network, a read-only repository and a hard deadline. It never runs on the host.</p></details>
  <details class="faq rv"><summary>How is this different from other coding agents?</summary><p>Many agents open PRs. Showwork's focus is proof: independent test cases, real-browser runs at three sizes, results read from recorded runs rather than claimed, and gates that bind each approval to the exact thing approved.</p></details>
  <details class="faq rv"><summary>What does a run cost?</summary><p>On our sample benchmark tickets, between about $0.50 and $2, with model usage as the main cost. Your tickets and codebase will differ. Per-run and daily budgets cap spend in code.</p></details>
  <details class="faq rv"><summary>What if the ticket is vague?</summary><p>The PM agent asks. The run is marked Blocked, questions are posted on the Jira ticket, and it continues by itself when the reporter replies. Contradictions in the criteria are named at the first gate.</p></details>
  <details class="faq rv"><summary>Which models does it use?</summary><p>Gemini on Google Vertex AI by default, with a provider switch for Anthropic's Claude.</p></details>
  <details class="faq rv"><summary>Can we run it ourselves?</summary><p>Yes. It installs on one server with Docker Compose. See <a href="trust.html#deploy">Trust and platform</a> for what is and is not supported yet.</p></details>
  <details class="faq rv"><summary>What if a run cannot be finished safely?</summary><p>It hands over to a person with a clear account of what was done and what is left, instead of opening a doubtful pull request. Budgets, time limits and gates are enforced in code.</p></details>
  <details class="faq rv"><summary>What is on the roadmap?</summary><p>A designer agent and design gate, task splitting for large tickets, assertion-level QA and isolated agent environments. See the <a href="roadmap.html">roadmap</a>.</p></details>
</div></section>
