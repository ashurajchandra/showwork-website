<section class="hero"><div class="wrap">
  <span class="eyebrow">The orchestrator</span>
  <h1>One orchestrator for the whole delivery. Safety that does not depend on it behaving.</h1>
  <p class="lede">A fixed pipeline cannot loop, skip, retry or answer a person mid-run. A free-running agent can, but its order is a model's choice. Showwork gives one orchestrator control of the whole delivery and moves every safety rule into code that is checked at the moment of each call.</p>
  <div class="cta-row"><a class="btn btn-primary" href="demo.html">Book a demo</a></div>
</div></section>

<section class="alt"><div class="wrap">
  <div class="grid g2" style="align-items:center;gap:3rem">
    <div class="rv"><span class="eyebrow">What it does</span><h2>It decides what runs next.</h2>
      <p>From ticket to code review, 28 kinds of agent, tool and gate sit in its roster. It starts them in the background, keeps talking to people while they work, can pass a note to a running agent or stop one, and runs read-only agents in parallel.</p>
      <ul class="tick"><li>Re-runs a step that failed for a transient reason</li><li>Sends a real work failure back to the engineer</li><li>Skips what code says is not needed</li><li>Answers a person's message at any stage</li><li>Ends as "needs a person" with a clear account instead of failing silently</li></ul></div>
    <div class="rv card"><h4>What it can never do</h4><ul class="tick cross"><li>Decide an approval</li><li>Edit a guard or set limits</li><li>Write the text a person approves</li><li>Write the audit trail</li><li>Merge a pull request</li><li>Invent agents, tools or instructions</li></ul><p class="muted" style="font-size:.9rem">The roster is fixed in the definition. New capabilities are a reviewed change, not a model's idea.</p></div>
  </div>
</div></section>

<section id="guards"><div class="wrap">
  <div class="section-head rv"><span class="eyebrow">The guard layer</span><h2>Eight rules the orchestrator cannot break.</h2>
    <p class="lede">Each is checked in code when a delegation is accepted and again when it starts. A refused call returns the reason to the orchestrator as a normal result, so it learns, and nothing unsafe happens.</p></div>
  <div class="grid g2">
    <div class="card rv"><h4>1 · Approvals are bound to what was approved</h4><p>Each gate stores a fingerprint of its subject: the PM's result, the plan, the package files, or the exact patch together with the tests and review shown. A fix after approval cannot ride on a stale yes.</p></div>
    <div class="card rv"><h4>2 · No writes before the approvals they depend on</h4><p>An agent that can change files will not start until requirements and plan are approved, and dependencies too, if the plan asked for any.</p></div>
    <div class="card rv"><h4>3 · The PR opens only for the approved patch</h4><p>If anything changed since the patch gate, the pull request is refused: "the patch changed after you asked for approval; ask again".</p></div>
    <div class="card rv"><h4>4 · The patch gate needs passing checks</h4><p>It can be requested only when the latest review approves, the pipeline's own test run passes on the current patch, and QA has no blocker open.</p></div>
    <div class="card rv"><h4>5 · Ticket writes are bounded</h4><p>Comments come from code-built templates only, and status changes only to the statuses allowed in the current phase.</p></div>
    <div class="card rv"><h4>6 · Approval content is rendered by code</h4><p>The orchestrator chooses which gate and when. It never writes the text a person approves, so what you see is what runs.</p></div>
    <div class="card rv"><h4>7 · Only a person completes a gate</h4><p>A gate parks the run until a human decides. Even Auto mode never decides the pull request.</p></div>
    <div class="card rv"><h4>8 · Hard limits, in code</h4><p>Caps on delegations, rounds, turns, cost, time, and each person's daily budget, plus a cap on how many times a gate can be re-requested.</p></div>
  </div>
</div></section>

<section class="dark"><div class="wrap">
  <div class="section-head rv"><span class="eyebrow">Cost and context</span><h2>Control without a bill.</h2></div>
  <div class="grid g3">
    <div class="card rv"><h4>Digests, not dumps</h4><p>The orchestrator is shown a short digest of each result and a handle. Full data stays in the run and is passed to agents by reference. In our runs this cut the orchestrator's cost from $0.69 to $0.18.</p></div>
    <div class="card rv"><h4>About a tenth of the run</h4><p>The orchestrator's own turns were roughly 9 to 14% of a run's cost in our measured runs. The rest is the agents doing work.</p></div>
    <div class="card rv"><h4>Hand over, do not crash</h4><p>When a budget runs out, running agents are stopped and the orchestrator gets one last turn to finish with a clear account. The run ends "needs a person", not a one-line error.</p></div>
  </div>
</div></section>

<section><div class="wrap">
  <div class="section-head rv"><span class="eyebrow">Permission modes</span><h2>Choose how much it asks, per run.</h2></div>
  <div class="scroll rv"><table class="tbl"><thead><tr><th>Mode</th><th>Behaviour</th></tr></thead><tbody>
    <tr><td><strong>Manual</strong></td><td>Asks before risky tool calls and before an agent that writes files starts. "Allow for the rest of this run" is available.</td></tr>
    <tr><td><strong>Auto-edits</strong></td><td>File edits proceed; other risky actions still ask.</td></tr>
    <tr><td><strong>Auto</strong></td><td>Stops asking for routine actions. Gates may be approved by policy, but never while a question is open, and never the pull request.</td></tr>
  </tbody></table></div>
  <div class="callout ok rv"><p><strong>Why this design:</strong> the order is not the safety. In a fixed list, "no PR before the patch gate" holds because one step comes after another. With a free orchestrator the order is a model's choice, so every rule became a precondition on the tool itself.</p></div>
  <p class="muted rv" style="font-size:.92rem">Available today as an early-access option, completing real end-to-end deliveries. Next: measuring it against the fixed pipeline on golden tickets before it becomes the default. See the <a href="roadmap.html">roadmap</a>.</p>
</div></section>
