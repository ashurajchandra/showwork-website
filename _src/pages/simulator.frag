<section class="hero" style="padding-bottom:1.5rem"><div class="wrap">
  <span class="eyebrow">Interactive simulator</span>
  <h1>Run a delivery yourself, end to end.</h1>
  <p class="lede">This is a replica of the Showwork run page replaying one delivery. You are the approver: the run stops at each of the three gates until you decide. Turn on "QA finds a bug" to watch the fix and retest loop.</p>
  <p class="real-note">Illustrative run on an example ticket. Timings and costs are examples.</p>
</div></section>

<section style="padding-top:0"><div class="wrap sim" id="sim">
  <div class="sim-controls">
    <button class="sbtn primary" id="sb-play">▶ Start the run</button>
    <button class="sbtn" id="sb-next" title="Advance one step">Next step →</button>
    <button class="sbtn" id="sb-restart">↺ Restart</button>
    <span class="grow"></span>
    <label class="sim-opt"><input type="checkbox" id="so-bug" checked> QA finds a bug</label>
    <label class="sim-opt">Speed <select id="so-speed"><option value="1">1×</option><option value="2" selected>2×</option><option value="4">4×</option></select></label>
  </div>

  <div class="sim-app">
    <div class="s-top">
      <span class="s-logo">✓</span><span class="s-brand">Showwork</span><span class="s-org">Acme Engineering</span>
      <span class="sp"></span>
      <div class="s-meter"><span id="s-clock">⏱ 0:00</span><span id="s-cost">$0.00</span></div>
      <span class="s-avatar">AR</span>
    </div>
    <div class="s-body">
      <aside class="s-side"><div class="s-nav">Chat</div><div class="s-nav on">Tickets</div><div class="s-nav">Approvals <b>3</b></div><div class="s-nav">Pull requests</div><div class="s-nav">Activity</div><div class="s-nav">Audit</div><div class="s-nav">Settings</div></aside>
      <div class="s-main">
        <div class="s-head">
          <div><h3>SCRUM-52 · Maker-checker approval for role changes</h3><div class="s-sub">Delivery pipeline · started by you · permission mode: manual</div></div>
          <span class="pill idle" id="s-state">Ready</span>
        </div>
        <div class="s-stepper" id="s-stepper" aria-label="Stages"></div>
        <div class="s-cols">
          <div class="s-card"><header><h4 id="s-stagetitle">Requirements</h4><p id="s-stagesum"></p></header><div class="feed" id="s-feed"></div><div id="s-diffbox" style="padding:0 16px 14px"></div></div>
          <div class="s-card">
            <div class="s-tabs" id="s-tabs" role="tablist"><button class="s-tab" role="tab" aria-selected="true" data-p="s-art">Artifacts</button><button class="s-tab" role="tab" aria-selected="false" data-p="s-log">Tool log</button></div>
            <div class="s-panel show" id="s-art"></div><div class="s-panel" id="s-log"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="gate-win" id="s-gate" hidden role="dialog" aria-live="polite">
      <span class="pill wait" id="s-gate-kicker">Gate 1 of 3</span>
      <h5 id="s-gate-title"></h5><p id="s-gate-text"></p><ul id="s-gate-items"></ul>
      <p id="s-gate-note" hidden style="font-size:12px;color:#8a5300"></p>
      <div class="acts"><button class="sbtn primary" id="sb-approve">Approve</button><button class="sbtn" id="sb-changes">Request changes</button></div>
    </div>
  </div>
  <p class="sim-legend">The example ticket builds an access-admin console with a roles table and a maker-checker approval flow. Pills, stepper and decision window follow the product's real interface. Amber always means a person has to decide. The simulator needs JavaScript.</p>

  <div class="sim-end" id="sim-end">
    <div class="band"><h2>That was one ticket. Imagine your backlog.</h2><div class="cta-row" style="margin:0"><a class="btn btn-primary" href="demo.html">Book a demo</a><a class="btn btn-ghost" href="pipeline.html">Read each stage</a></div></div>
  </div>
</div></section>

<section class="alt"><div class="wrap">
  <div class="section-head"><span class="eyebrow">What to look for</span><h2>Four things the simulator shows.</h2></div>
  <div class="grid g4">
    <div class="card"><h4>Gates stop the run</h4><p>Nothing continues until you decide. The approval is bound to the exact thing shown.</p></div>
    <div class="card"><h4>Blind test cases</h4><p>The test-case writer starts in parallel and never sees the code.</p></div>
    <div class="card"><h4>Failures stay open</h4><p>With the bug switch on, QA catches a maker approving their own request, the engineer fixes it, and the same case is re-run.</p></div>
    <div class="card"><h4>Replay is free</h4><p>Cases that passed before are replayed by code with no model call.</p></div>
  </div>
</div></section>
