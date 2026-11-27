<section class="hero"><div class="wrap hero-grid">
  <div>
    <span class="eyebrow">The AI delivery pipeline</span>
    <h1>A ticket goes in. A pull request that <em>proves it works</em> comes out.</h1>
    <p class="lede">Showwork runs a team of AI agents, a product manager, an engineering manager, an engineer, a reviewer and an independent QA, and tests the result in a real browser at laptop, tablet and phone size. People approve at three gates. The agents never merge.</p>
    <div class="cta-row"><a class="btn btn-primary" href="demo.html">Book a demo</a><a class="btn btn-ghost" href="simulator.html">Try the simulator →</a></div>
    <div class="proofbar"><span>Three human gates</span><span>Sealed Docker sandbox</span><span>Real browser evidence</span><span>Never merges</span></div>
  </div>
  <div class="flow-vis" aria-label="A ticket becomes a pull request with evidence">
    <div class="mini"><h5>Jira · SCRUM-52 · example</h5><div class="t">Maker-checker approval for role changes</div>
      <div class="chips"><span class="chip">7 acceptance criteria</span><span class="chip gate">⚠ 1 contradiction found</span></div></div>
    <div class="rail"><b></b> PM → EM → Engineer → Reviewer → QA <b></b></div>
    <div class="mini"><h5>Pull request · showwork/scrum-52</h5><div class="t">6 files changed · real unified diff</div>
      <div class="chips"><span class="chip ok">31 / 31 tests</span><span class="chip ok">QA: 18 pass, 0 failed</span><span class="chip ok">Code review done</span><span class="chip gate">Patch approved by a person</span></div>
      <div class="shots"><div class="shot a">laptop<i></i><i></i></div><div class="shot b">tablet<i></i><i></i></div><div class="shot c">phone<i></i><i></i></div></div></div>
  </div>
</div></section>

<section class="alt"><div class="wrap">
  <div class="grid g2" style="align-items:center;gap:3rem">
    <div class="rv"><span class="eyebrow">The problem</span><h2>AI-written code is cheap. Trusting it is not.</h2>
      <p class="lede">Every coding agent can open a pull request. The slow part is the human who must work out whether it is any good. If the agent claims "all tests pass", you still have to check.</p></div>
    <div class="rv"><div class="stat"><b>96%</b><p>of developers surveyed in Sonar's 2026 study say they do not fully trust AI-written code.</p></div>
      <div class="stat"><b>48%</b><p>say they always check it before committing. The gap is where bugs ship.</p></div></div>
  </div>
  <div class="callout rv"><p><strong>What we saw in our own runs:</strong> an engineer agent claimed checks it never made, and a QA agent designed a test it could not run. The two real bugs were caught only by the code review, after the PR was open. Showwork is built around that finding: a result counts only when it was <em>proved</em>.</p></div>
</div></section>

<section><div class="wrap">
  <div class="section-head rv"><span class="eyebrow">How it works</span><h2>Six phases, three human gates, one pull request.</h2>
    <p class="lede">Each phase is a separate agent with its own tools. Orange diamonds are gates: the pipeline stops there until a person decides.</p></div>
  <div class="pipe rv">
    <div class="pn"><div class="dot">1</div><h4>Understand</h4><p>PM agent reads the ticket and writes requirements and acceptance criteria. Asks questions if unclear.</p></div>
    <div class="pn gate"><div class="dot"><span>G1</span></div><h4>Approve requirements</h4><p>A person confirms what is being built.</p></div>
    <div class="pn"><div class="dot">2</div><h4>Plan</h4><p>EM agent reads the repo and writes the plan, files and any new packages.</p></div>
    <div class="pn gate"><div class="dot"><span>G2</span></div><h4>Approve plan</h4><p>A person approves the approach before any file changes.</p></div>
    <div class="pn"><div class="dot">3</div><h4>Build, review, test</h4><p>Engineer writes the patch, a separate reviewer and independent QA check it in sandboxes and a browser.</p></div>
    <div class="pn gate"><div class="dot"><span>G3</span></div><h4>Approve patch</h4><p>See diff, tests, review and QA evidence. Then the PR opens.</p></div>
  </div>
  <p class="center rv" style="margin-top:2.5rem"><a class="btn btn-ghost" href="pipeline.html">Walk through every stage →</a></p>
</div></section>

<section class="alt"><div class="wrap">
  <div class="grid g2" style="align-items:center;gap:3rem">
    <div class="rv"><span class="eyebrow">What lands in your pull request</span><h2>Evidence at three screen sizes, not a promise.</h2>
      <p class="lede">The pipeline drives the finished change in a real browser at laptop, tablet and phone size and keeps the screenshots and a video. The reviewer sees it next to the diff.</p>
      <p class="real-note">Example evidence from an access-admin app</p>
      <div class="cta-row"><a class="btn btn-primary" href="simulator.html">Try the simulator</a><a class="btn btn-ghost" href="pipeline.html#evidence">See every stage →</a></div></div>
    <div class="rv split"><div class="devices"><div><span class="tag">Laptop</span><div class="win "><div class="win-bar"><i></i><i></i><i></i><span>laptop · 1440 px</span></div><img class="zoomable" src="assets/shots/evidence-laptop.png" alt="Final evidence at laptop size" loading="lazy" width="1440" height="900"></div></div><div><span class="tag">Tablet</span><div class="win "><div class="win-bar"><i></i><i></i><i></i><span>tablet · 820 px</span></div><img class="zoomable" src="assets/shots/evidence-tablet.png" alt="Final evidence at tablet size" loading="lazy" width="820" height="1180"></div></div><div><span class="tag">Phone</span><div class="phone-frame"><img class="zoomable" src="assets/shots/evidence-phone.png" alt="Final evidence at phone size" loading="lazy" width="390" height="844"></div></div></div></div>
  </div>
</div></section>

<section class="dark"><div class="wrap">
  <div class="section-head rv"><span class="eyebrow">What makes it different</span><h2>Built for teams that need to trust the output.</h2></div>
  <div class="grid g3">
    <div class="card rv"><div class="ico">✓</div><h3>Proof, not claims</h3><p>QA results are read from recorded browser runs. An agent saying "passed" counts for nothing unless a passing check backs it.</p><p><a href="qa.html">How QA proves it →</a></p></div>
    <div class="card rv"><div class="ico">✋</div><h3>People decide</h3><p>Agents have no approve tool. Three gates are workflow steps only a person can complete, and the pull request opens only for the exact patch approved.</p><p><a href="orchestrator.html#guards">The guard rules →</a></p></div>
    <div class="card rv"><div class="ico">◎</div><h3>An orchestrator with limits</h3><p>One orchestrator decides what runs next, retries and re-tests, inside hard limits for cost, time and rounds, enforced in code.</p><p><a href="orchestrator.html">Meet the orchestrator →</a></p></div>
    <div class="card rv"><div class="ico">▣</div><h3>Sealed by construction</h3><p>Generated code never runs on your host. Tests and browsers run in Docker with no network, a read-only repo, no capabilities and a hard deadline.</p><p><a href="trust.html#sandbox">Sandbox details →</a></p></div>
    <div class="card rv"><div class="ico">⇄</div><h3>Fits your tools</h3><p>Reads real Jira tickets, comments and moves them through your workflow, and opens real GitHub pull requests on a <code>showwork/</code> branch.</p><p><a href="trust.html#integrations">Integrations →</a></p></div>
    <div class="card rv"><div class="ico">⌁</div><h3>Durable and auditable</h3><p>Every step is checkpointed, crashed runs are recovered, and a hash-chained audit trail records approvals, settings and runs.</p><p><a href="trust.html#audit">Audit and recovery →</a></p></div>
  </div>
</div></section>

<section><div class="wrap">
  <div class="section-head rv"><span class="eyebrow">Real runs</span><h2>What a run looks like, with the receipts.</h2>
    <p class="lede">Numbers from our own runs on a small sample web application, real model, real browser. One run is one run, so read these as examples, not averages.</p></div>
  <div class="scroll rv"><table class="tbl"><thead><tr><th>Ticket</th><th>Outcome</th><th>Cost</th><th>Time</th><th>Proof attached</th></tr></thead><tbody>
    <tr><td><strong>Jira SCRUM-1</strong><br><span class="muted">first end-to-end real run</span></td><td>Reviewed GitHub PR</td><td>$0.52</td><td>~12 min</td><td>7 of 7 tests; browser evidence at 3 sizes; 3 recordings</td></tr>
    <tr><td><strong>Bulk action on a list</strong><br><span class="muted">benchmark ticket</span></td><td>Completed, PR with 5 files</td><td>$1.40</td><td>9.5 min</td><td>9 QA cases pass, 0 failed; QA found a problem in round 1, the loop fixed and re-tested it</td></tr>
    <tr><td><strong>SCRUM-34</strong><br><span class="muted">import, export and reorder</span></td><td>Completed, PR with 4 files</td><td>$1.88</td><td>17 min</td><td>26 of 26 tests; 16 QA cases pass; contradiction in the criteria surfaced at the gate</td></tr>
  </tbody></table></div>
  <p class="muted rv" style="margin-top:1rem;font-size:.92rem">The orchestrator itself was about 9 to 14% of a run's cost. <a href="roadmap.html">See what is live today and what is next →</a></p>
</div></section>

<section class="alt"><div class="wrap">
  <div class="section-head rv"><span class="eyebrow">Who it is for</span><h2>The people who ship, and the people who sign off.</h2></div>
  <div class="grid g3">
    <div class="card rv"><h3>Engineering leaders</h3><p>Hand off well-specified tickets and get a PR that arrives with test results, a code review and screenshots, so review time goes into judgement, not detective work.</p></div>
    <div class="card rv"><h3>QA and test leads</h3><p>Test cases derived from the acceptance criteria, edge and sequence cases included, run at three screen sizes, with failures classified as app bug, broken test, or unclear requirement.</p></div>
    <div class="card rv"><h3>Security and platform</h3><p>Approvals bound to what was approved, sealed sandboxes, roles, a tamper-evident audit trail, per-run and daily budgets, and self-hosting on one server.</p></div>
  </div>
</div></section>

<section><div class="wrap"><div class="band rv"><h2>See a ticket become a proven pull request.</h2><div class="cta-row" style="margin:0"><a class="btn btn-primary" href="demo.html">Book a demo</a><a class="btn btn-ghost" href="trust.html">Read the safety model</a></div></div></div></section>
