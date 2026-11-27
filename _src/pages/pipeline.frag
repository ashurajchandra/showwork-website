<section class="hero"><div class="wrap">
  <span class="eyebrow">The delivery pipeline</span>
  <h1>Every stage, from ticket to pull request.</h1>
  <p class="lede">This is the whole journey of one ticket. Each numbered step is a separate agent or a piece of code, with its own tools and limits. Orange stops are gates where nothing moves until a person decides.</p>
  <div class="cta-row"><a class="btn btn-primary" href="demo.html">See it live</a><a class="btn btn-ghost" href="qa.html">Jump to QA →</a></div>
</div></section>

<section class="alt tight"><div class="wrap">
  <div class="grid g4">
    <div class="stat"><b>6</b><p>kinds of agent: PM, EM, engineer, reviewer, QA, code reviewer</p></div>
    <div class="stat"><b>3</b><p>human gates: requirements, plan, patch</p></div>
    <div class="stat"><b>3</b><p>screen sizes tested in a real browser</p></div>
    <div class="stat"><b>0</b><p>merges by an agent. Ever.</p></div>
  </div>
</div></section>

<section><div class="wrap narrow" style="width:min(980px,92vw)">
<div class="tl">

<div class="st rv" data-n="1"><span class="who">Trigger · code</span><h3>A ticket starts the run</h3>
  <div class="st-body"><div>
    <p>A person presses <strong>Run delivery pipeline</strong> on a ticket, or the worker starts it for issues carrying a label such as <code>showwork</code>. The ticket is read from your real Jira through one narrow client: one project, the host pinned, keys validated before any request.</p>
    <p>Showwork comments on the ticket once per step and moves it through <em>your project's own workflow</em>, so the ticket tells the story without anyone opening Showwork.</p></div>
    <div class="kv"><h5>You see</h5><ul><li>Ticket status updated in Jira</li><li>A run page with a stepper of stages</li></ul><h5 style="margin-top:.8rem">Guarded by</h5><ul><li>Daily run quota and token budget</li><li>Ticket text treated as untrusted data</li></ul></div></div></div>

<div class="st rv" data-n="2"><span class="who">Product manager agent</span><h3>Requirements, stories and acceptance criteria</h3>
  <div class="st-body"><div>
    <p>The PM agent turns a vague ticket into requirements, user stories and testable acceptance criteria. It reads the ticket discussion and linked Confluence pages.</p>
    <ul class="tick"><li><strong>Asks before guessing.</strong> If the ticket is unclear, the run is <em>Blocked</em>, the PM's questions are posted on the Jira ticket, and the run <strong>continues by itself</strong> when the reporter replies.</li>
    <li><strong>Finds contradictions in code.</strong> Where two criteria cannot both be true (for example "a change needs a different admin to approve it" and "an admin can approve any request"), the conflict is named and shown at the gate.</li>
    <li><strong>Settles them with a stated default.</strong> A contradiction nobody answers becomes an explicit "Assumption:" criterion that a person can overturn, instead of every later agent guessing differently.</li></ul></div>
    <div class="kv"><h5>You see</h5><ul><li>Requirements, stories, criteria</li><li>Open questions and "Assumptions applied"</li></ul></div></div></div>

<div class="st gate rv" data-n="G1"><span class="who">Human gate 1</span><h3>Approve the requirements <span class="badge b-gate">Person decides</span></h3>
  <div class="st-body"><div><p>Nothing is planned or built until a person confirms what is being built. The gate's text is rendered by code from the PM's result, so what you read is exactly what the next stage receives.</p>
    <p>Approvers are notified when a gate opens, and an Approvals page lists everything waiting for you. An optional <strong>Auto</strong> mode can approve by policy, but it does not approve while an open question is attached, and it never decides the pull request.</p></div>
    <div class="kv"><h5>Why it matters</h5><ul><li>Agents have <em>no tool</em> to approve</li><li>The approval is bound to a fingerprint of the PM's answer, so a different second answer needs a new approval</li></ul></div></div></div>

<div class="st rv" data-n="3"><span class="who">Repository read · code + agent</span><h3>The project brief</h3>
  <div class="st-body"><div>
    <p>Before planning, Showwork builds a short <strong>brief of your repository</strong> from its own files: your <code>AGENTS.md</code> or <code>CLAUDE.md</code>, build and test commands, conventions, routes, the most important files and what they export, and design tokens such as colours and fonts. Every code agent starts from it, and it is cached per version of the repository.</p>
    <p>It can also remember what reviewers found in earlier changes, and show it to the agents of the next runs, so the same mistake is less likely to come back.</p></div>
    <div class="kv"><h5>You get</h5><ul><li>Agents that follow your conventions</li><li>Less wandering, lower cost</li><li>Lessons carried between runs</li></ul></div></div></div>

<div class="st rv" data-n="4"><span class="who">Engineering manager agent</span><h3>The plan</h3>
  <div class="st-body"><div>
    <p>The EM agent reads the repository tree and README and writes the plan: which files change, in what order, and whether the change needs <strong>new packages</strong>. The planning engineer then reads the real code to confirm the plan holds.</p>
    <p>If the repository's build profile or the plan asks for new dependencies, those get their own gate (next).</p></div>
    <div class="kv"><h5>You see</h5><ul><li>Files to change and why</li><li>New packages requested, if any</li></ul></div></div></div>

<div class="st gate rv" data-n="G2"><span class="who">Human gate 2</span><h3>Approve the plan <span class="badge b-gate">Person decides</span></h3>
  <div class="st-body"><div><p>No file is written before this approval. This is enforced by a guard in code: an agent that can change files is refused until the requirements and the plan are both approved.</p>
    <p><strong>New packages get a supply-chain check first.</strong> Each is resolved in the sandbox with install scripts switched off, from the npm registry only, and checked for age, deprecation, licence, download counts and look-alike names. A person sees the result and approves the <em>exact</em> dependency change.</p></div>
    <div class="kv"><h5>Guarded by</h5><ul><li>Writes refused before approval</li><li>Dependency approval bound to the exact files</li></ul></div></div></div>

<div class="st rv" data-n="5"><span class="who">Engineer agent</span><h3>Build the patch</h3>
  <div class="st-body"><div>
    <p>The engineer reads before it writes: the engine refuses to overwrite a file the agent has not read in full. It edits precisely, runs the repository's tests in a sandbox, and can <strong>open its own change in a browser</strong> and look at screenshots before it reports done.</p>
    <p>Its report is checked. A claim like "I verified the dialog" must cite passing steps, and a UI change it never looked at is sent back once. A check that failed in its looks and never passed again must be named in its notes.</p></div>
    <div class="kv"><h5>Tools</h5><ul><li>list, read, search, edit and write files</li><li>run_tests (sandbox)</li><li>try_in_browser (max 3 looks)</li></ul><h5 style="margin-top:.8rem">Not available</h5><ul><li>Approving anything</li><li>Network, host shell, secrets</li></ul></div></div><div class="pair" style="margin-top:1.4rem"><figure class="fig"><div class="win "><div class="win-bar"><i></i><i></i><i></i><span>engineer · laptop · before</span></div><img class="zoomable" src="assets/shots/build-look-before.png" alt="Role setup before the change, as the engineer saw it" loading="lazy" width="1440" height="900"></div><figcaption><b>The engineer's own look, before.</b> Role setup saves directly. It opens the app in a browser while it works.</figcaption></figure><figure class="fig"><div class="win "><div class="win-bar"><i></i><i></i><i></i><span>engineer · laptop · after</span></div><img class="zoomable" src="assets/shots/build-look-after.png" alt="Role setup after the change: Submit for approval" loading="lazy" width="1440" height="900"></div><figcaption><b>…and after.</b> The same screen now submits for approval. Its report must cite what it actually saw.</figcaption></figure></div></div>

<div class="st rv" data-n="6"><span class="who">Test-case writer · runs beside the engineer</span><h3>QA writes test cases while the code is being written</h3>
  <div class="st-body"><div>
    <p>A separate agent writes test cases <strong>from the acceptance criteria alone</strong>, with no access to the code, so it cannot grade the engineer's homework against the engineer's own assumptions. Cases come in three kinds: <em>normal</em>, <em>edge</em> (the limit where a control is disabled or removed) and <em>sequence</em> (do something, do something unrelated, check it still holds). Code checks that the right kinds are present.</p></div>
    <div class="kv"><h5>Why blind</h5><ul><li>Agents "skew positive" grading their own work</li><li>Independent cases catch what the builder assumed away</li></ul></div></div></div>

<div class="st rv" data-n="7"><span class="who">Reviewer agent</span><h3>An independent code review, with one fix round</h3>
  <div class="st-body"><div>
    <p>A separate reviewer reads the diff and <strong>runs the tests itself</strong> rather than trusting the engineer's word. If it finds problems the engineer gets one fix round, then the pipeline's own code re-runs the tests. That final test run is authoritative, because it is made by code, not by an agent's claim.</p></div>
    <div class="kv"><h5>You see</h5><ul><li>Review verdict and issues</li><li>Test results from code, not an agent</li></ul></div></div></div>

<div class="st rv" data-n="8"><span class="who">QA agent + browser harness</span><h3>QA tests the running app like a user</h3>
  <div class="st-body"><div>
    <p>QA runs every test case in a <strong>fresh real browser</strong> at laptop, tablet and phone size, using realistic and deliberately broken test data. When a case fails, the bug becomes a record with steps to reproduce, expected and actual results, and a screenshot. The engineer fixes it, QA retests, and cases that already passed are <strong>replayed by code with no model call</strong>, so the loop stays cheap.</p>
    <p><a href="qa.html"><strong>The full QA design →</strong></a></p></div>
    <div class="kv"><h5>You see</h5><ul><li>Results per case, per screen size</li><li>Bugs with repro steps</li><li>Questions the criteria did not answer</li></ul></div></div><div style="margin-top:1.4rem;max-width:760px"><figure class="fig"><div class="win "><div class="win-bar"><i></i><i></i><i></i><span>QA · TC9 failed · laptop</span></div><img class="zoomable" src="assets/shots/qa-failed-case.png" alt="Screenshot QA attached to a failing test case" loading="lazy" width="1440" height="900"></div><figcaption><b>A screenshot QA attached to a failing case:</b> a maker could approve their own request. A failed case keeps its screenshot and the step that failed, then stays open until the same check passes.</figcaption></figure></div></div>

<div class="st rv" id="evidence" data-n="9"><span class="who">Evidence stage · code</span><h3>Browser evidence, sealed away from the code</h3>
  <div class="st-body"><div>
    <p>The pipeline itself drives the final scenario in a real browser at three sizes and keeps <strong>screenshots and a video</strong>. The app under test and the browser harness are <strong>separate containers</strong>, so generated code cannot tamper with the evidence. Everything the sandbox returns, file names, magic bytes, sizes, is treated as untrusted.</p>
    <p>A quality score of the change against your existing product (browser test, review, code conventions, your own colours and fonts) is shown alongside, without blocking.</p></div>
    <div class="kv"><h5>Sealed</h5><ul><li>No network</li><li>Read-only repo, non-root</li><li>Resource limits and a hard deadline</li></ul></div></div><div style="margin-top:1.4rem"><div class="devices"><div><span class="tag">Laptop</span><div class="win "><div class="win-bar"><i></i><i></i><i></i><span>evidence · laptop · 1440 px</span></div><img class="zoomable" src="assets/shots/evidence-laptop.png" alt="Final evidence at laptop size" loading="lazy" width="1440" height="900"></div></div><div><span class="tag">Tablet</span><div class="win "><div class="win-bar"><i></i><i></i><i></i><span>tablet · 820 px</span></div><img class="zoomable" src="assets/shots/evidence-tablet.png" alt="Final evidence at tablet size" loading="lazy" width="820" height="1180"></div></div><div><span class="tag">Phone</span><div class="phone-frame"><img class="zoomable" src="assets/shots/evidence-phone.png" alt="Final evidence at phone size" loading="lazy" width="390" height="844"></div></div></div><p class="muted" style="font-size:.86rem;margin-top:.8rem"><b>The pipeline's own evidence at three sizes.</b> Example renders from an access-admin app; the product also keeps a video of each size.</p></div></div>

<div class="st gate rv" data-n="G3"><span class="who">Human gate 3</span><h3>Approve the patch <span class="badge b-gate">Person decides</span></h3>
  <div class="st-body"><div>
    <p>The reviewer sees the diff, the test result, the review verdict, QA's report, open questions and the screenshots, all in one place. A patch can only be put to a person when the checks pass on <em>that exact patch</em>: the review approves, the tests pass, and QA has no blocker open.</p>
    <p>If anything changes after approval, the approval no longer applies and the gate must be asked again.</p></div>
    <div class="kv"><h5>Guarded by</h5><ul><li>Approval fingerprint = diff + tests + review shown</li><li>Open QA blocker refuses the gate</li></ul></div></div></div>

<div class="st rv" data-n="10"><span class="who">Pull request · code</span><h3>A real pull request with the proof inside</h3>
  <div class="st-body"><div>
    <p>The change lands on a <code>showwork/</code> branch and opens a <strong>real GitHub pull request</strong> with a real unified diff (<code>git apply</code> works on it), the QA report and the evidence. <strong>Showwork never merges, approves, or writes to your default branch.</strong> A person merges, as always.</p></div>
    <div class="kv"><h5>You get</h5><ul><li>PR body with results and screenshots</li><li>Ticket moved to "in review"</li></ul></div></div></div>

<div class="st rv" data-n="11"><span class="who">Code-review agent · after the PR exists</span><h3>A review on the pull request, and fixes when you ask</h3>
  <div class="st-body"><div>
    <p>A final code-review agent reads the open PR and posts its findings. If a check fails or a human reviewer leaves a comment, an optional <strong>PR-fix run</strong> can fix the branch, up to five rounds per pull request, and a person (or Auto mode) approves before one more commit is added.</p></div>
    <div class="kv"><h5>Bounded</h5><ul><li>Five rounds per PR</li><li>Each fix is approved first</li></ul></div></div></div>

</div></div></section>

<section class="alt"><div class="wrap">
  <div class="section-head rv"><span class="eyebrow">Across the whole run</span><h2>What runs underneath every stage.</h2></div>
  <div class="grid g3">
    <div class="card rv"><h4>Durable execution</h4><p>Every step is checkpointed. A separate worker recovers a crashed run, retries are idempotent, and a failed run can restart from the failed step.</p></div>
    <div class="card rv"><h4>Live messaging</h4><p>Message a running pipeline from the run page. The orchestrator answers at any stage, including at a gate, and can pass a note to a working agent.</p></div>
    <div class="card rv"><h4>Cost kept lean</h4><p>Agents stop re-sending old test output and old diffs to the model, and are handed only the part of another agent's result they act on.</p></div>
  </div>
  <p class="center rv" style="margin-top:2rem"><a class="btn btn-primary" href="orchestrator.html">How the orchestrator ties it together →</a></p>
</div></section>
