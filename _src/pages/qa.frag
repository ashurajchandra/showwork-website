<section class="hero"><div class="wrap">
  <span class="eyebrow">QA verification</span>
  <h1>QA that says "passed" only when it was proved.</h1>
  <p class="lede">Most coding agents grade their own work, and agents grade themselves generously. Showwork separates the writer from the tester, runs every case in a real browser, and reads each result from the recorded run, not from the agent's report.</p>
  <div class="cta-row"><a class="btn btn-primary" href="demo.html">See a QA run live</a><a class="btn btn-ghost" href="pipeline.html">Back to the pipeline</a></div>
</div></section>

<section class="alt"><div class="wrap">
  <div class="section-head rv"><span class="eyebrow">Why it is built this way</span><h2>Four ways AI QA goes wrong, and what we do about each.</h2></div>
  <div class="grid g2">
    <div class="card rv"><h4>1 · It grades its own homework</h4><p>The same agent that wrote the code decides the code is fine.</p><p><strong>So:</strong> test cases are written by a separate agent from the acceptance criteria alone, with no access to the code, while the engineer builds.</p></div>
    <div class="card rv"><h4>2 · "Passed" means "nothing crashed"</h4><p>A case with five expectations passes when one holds.</p><p><strong>So:</strong> a case passes only when every step of its latest run passed and at least one was a real check. A pass must cite passing <em>expect</em> steps. An action alone proves nothing.</p></div>
    <div class="card rv"><h4>3 · A broken test is blamed on the app</h4><p>A selector that matches two buttons, a timeout in the test itself.</p><p><strong>So:</strong> the harness tags each failure (locate, action, assert, page), refuses ambiguous selectors, reruns a failed case, and classifies what is left.</p></div>
    <div class="card rv"><h4>4 · A failure gets rationalised away</h4><p>QA hits a bug, then makes an easier test that passes.</p><p><strong>So:</strong> a failure never closes itself. It stays open across fixes until the <em>same check</em> passes again, or it is accounted for as a bug, a stated explanation, or a question.</p></div>
  </div>
</div></section>

<section><div class="wrap">
  <div class="section-head rv"><span class="eyebrow">The life of a test case</span><h2>From criterion to evidence.</h2></div>
  <div class="tl">
    <div class="st rv" data-n="1"><h3>Written blind, from the criteria</h3><p>Each case has an id, the criterion it covers, the data it needs, steps and an expected result. Kinds are normal, edge and sequence. When the criteria say something "stays" or "persists", code requires a sequence case; when they also name a limit (first item, empty list), an edge case too. Where criteria do not decide the answer, the expected result is "not decided: ask".</p></div>
    <div class="st rv" data-n="2"><h3>Run in a fresh browser, at three sizes</h3><p>Each case gets its own clean browser at laptop, tablet or phone size, loaded with test data: the repository's own seed script, browser storage, or records added through the app's API, including broken saved data. Steps come from a <strong>closed vocabulary</strong> (go to, fill, click, press, wait, expect visible/text/value/focused/count/CSS). The model chooses data, never code.</p></div>
    <div class="st rv" data-n="3"><h3>Result read from the run</h3><p><strong>Pass</strong>: every step passed and one was a check. <strong>Fail</strong>: a step failed, and it stays failed until that case passes again. <strong>Not run</strong>: anything else. A pass from before a code change no longer counts.</p></div>
    <div class="st rv" data-n="4"><h3>Does the run test what the case says?</h3><p>A separate check judges whether a passing run actually tests its case. In an early benchmark QA passed a "broken saved data" case using a reorder test. A run that does not test the case settles nothing, and QA is told why.</p></div>
    <div class="st rv" data-n="5"><h3>A failure is classified, not guessed</h3><p>A failed case QA did not account for is looked at by a separate call that reads the case, the steps, the failing line, the criteria and the contradictions a person already saw. The verdict is one of three, and each has a path:</p>
      <div class="grid g3" style="margin-top:1rem"><div class="kv"><h5>App bug</h5><p style="margin:0">Raised as a bug. The engineer fixes it.</p></div><div class="kv"><h5>Broken test</h5><p style="margin:0">QA's own mistake. The case is run again with the reason.</p></div><div class="kv"><h5>Criteria unclear</h5><p style="margin:0">Becomes a question on the patch gate. The run is not stopped.</p></div></div></div>
    <div class="st rv" data-n="6"><h3>Fix, replay, retest</h3><p>The engineer fixes, then <strong>code replays every case that passed before, exactly as recorded, with no model call</strong>. QA only works on what failed or never ran. Passes carry over while the code is unchanged.</p></div>
    <div class="st rv" data-n="7"><h3>Reported on the gate and in the PR</h3><p>A results table, bugs with reproduction steps, open questions, and screenshots go to the person approving the patch and into the pull request. Blocker or major bugs left open refuse the patch gate altogether.</p></div>
  </div>
</div></section>

<section class="alt"><div class="wrap">
  <div class="section-head rv"><span class="eyebrow">Evidence you can open</span><h2>What QA leaves behind.</h2><p class="lede">Every case runs in a fresh browser and keeps its screenshots. These are example renders from an access-admin app built for this site.</p></div>
  <div class="pair rv"><figure class="fig"><div class="win "><div class="win-bar"><i></i><i></i><i></i><span>QA · TC9 failed · laptop</span></div><img class="zoomable" src="assets/shots/qa-failed-case.png" alt="Screenshot QA attached to a failing test case" loading="lazy" width="1440" height="900"></div><figcaption><b>A failing case keeps its screenshot</b>, here a maker able to approve their own request, and the exact step that failed. It stays open until the same check passes.</figcaption></figure><figure class="fig"><div class="win "><div class="win-bar"><i></i><i></i><i></i><span>evidence · laptop</span></div><img class="zoomable" src="assets/shots/evidence-laptop.png" alt="Final evidence at laptop size" loading="lazy" width="1440" height="900"></div><figcaption><b>The final evidence</b>, recorded by the pipeline itself in a sealed container, not by QA.</figcaption></figure></div>
  <p class="center rv" style="margin-top:2rem"><a class="btn btn-primary" href="simulator.html">Watch a QA loop in the simulator →</a></p>
</div></section>

<section class="dark"><div class="wrap">
  <div class="section-head rv"><span class="eyebrow">Caught for real</span><h2>Examples from our own runs.</h2></div>
  <div class="grid g3">
    <div class="card rv"><h4>The edge a requirement missed</h4><p>A reorder feature lost keyboard focus at the first or last item, because the criteria said both "focus stays on the button" and "the button is disabled at the edge". The same pattern appears in maker-checker: "any admin can approve" versus "nobody approves their own change". The pipeline names the contradiction at gate 1 and settles it with a stated default.</p></div>
    <div class="card rv"><h4>The pass that cited nothing</h4><p>"Corrupt settings fall back to defaults" once passed although no test loaded any data. Now a broken-data case must cite a run that actually started from test data.</p></div>
    <div class="card rv"><h4>The scenario that proved nothing</h4><p>QA's final scenario once contained a step it never ran, and failed at every size. Now the final scenario must match a look that passed, with the same steps in order and the same data.</p></div>
  </div>
</div></section>

<section><div class="wrap">
  <div class="section-head rv"><span class="eyebrow">What is live</span><h2>What is available and what is next.</h2></div>
  <div class="scroll rv"><table class="tbl"><thead><tr><th>Capability</th><th>Status</th></tr></thead><tbody>
    <tr><td>Blind test cases, real-browser runs at 3 sizes, results read from runs, replay without a model</td><td><span class="badge b-live">Available</span></td></tr>
    <tr><td>Check that a pass tests what its case says; classification of unaccounted failures; QA loop in code</td><td><span class="badge b-live">Available</span></td></tr>
    <tr><td>Failure kinds, flake guard (a failed case is rerun twice by code), "test issue" state</td><td><span class="badge b-val">In validation</span></td></tr>
    <tr><td>Per-assertion verification: every assertion proved by a tagged passing check</td><td><span class="badge b-val">In validation</span></td></tr>
    <tr><td>Evidence per assertion (screenshots for passes, not only failures), layout checks</td><td><span class="badge b-road">Roadmap</span></td></tr>
  </tbody></table></div>
</div></section>

<section class="alt"><div class="wrap"><div class="band rv"><h2>Want to watch QA break something?</h2><div class="cta-row" style="margin:0"><a class="btn btn-primary" href="demo.html">Book a demo</a></div></div></div></section>
