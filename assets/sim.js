// The Showwork delivery simulator: replays an illustrative delivery in a replica of the run page. The stage names and the three gates are the
// product's; the ticket, timings and costs are examples; the screenshots are rendered from the example app in assets/example-app/.
(function () {
  var root = document.getElementById("sim");
  if (!root) return;
  var $ = function (s, r) { return (r || root).querySelector(s); };
  // analytics events (site.js defines swTrack; it does nothing when analytics is blocked or not loaded)
  var track = function (name, data) { try { if (window.swTrack) window.swTrack(name, data); } catch (e) {} };

  var STAGES = [
    { id: "req", label: "Requirements", sum: "The PM reads the ticket and writes the acceptance criteria. You approve them." },
    { id: "repo", label: "Repository", sum: "Reads the repository and builds a brief of how it is built and run." },
    { id: "plan", label: "Plan", sum: "The EM and the engineer plan the change. You approve the plan." },
    { id: "build", label: "Build and review", sum: "The engineer writes the change and its tests; an independent reviewer checks it." },
    { id: "tests", label: "Tests", sum: "The pipeline runs the tests itself and lists the files that changed." },
    { id: "qa", label: "QA and browser evidence", sum: "QA runs its test cases in a real browser at three sizes; the pipeline records the evidence." },
    { id: "approve", label: "Your approval", sum: "You review the patch, the tests and the evidence, and decide whether a pull request is opened." },
    { id: "pr", label: "Pull request", sum: "The pull request is opened, the ticket updated and a second reviewer comments." },
    { id: "done", label: "Done", sum: "The result of the run." }
  ];
  var SHOT = "assets/shots/";
  var IMG = { before: SHOT + "build-look-before.png", after: SHOT + "build-look-after.png", fail: SHOT + "qa-failed-case.png", lap: SHOT + "evidence-laptop.png", tab: SHOT + "evidence-tablet.png", ph: SHOT + "evidence-phone.png" };

  // item: stage, ic (icon text), t (title), d (detail), m (meta), sec (clock advance, simulated seconds), cost (usd), kind: ok|bad|wait,
  //       gate: {title, text, items}, shot: [[key, caption, wide]], log: "tool line", quote
  function script(bug) {
    var s = [];
    var add = function (o) { s.push(o); };
    add({ st: "req", ic: "TK", t: "Read the ticket", d: "SCRUM-52 · Maker-checker approval for role changes", m: "Jira", sec: 6, log: "<b>get_ticket</b> SCRUM-52" });
    add({ st: "req", ic: "PM", t: "PM agent", d: "Writes 7 acceptance criteria and 3 user stories.", m: "0:09 · $0.01", sec: 9, cost: 0.01, quote: "3. A change to a role takes effect only after a different admin approves it.\n6. An admin can approve any pending request." });
    add({ st: "req", ic: "!", t: "Contradiction flagged", d: "Criteria 3 and 6 cannot both hold when the admin who submitted a change is the one approving it. The default is stated as an Assumption for you to overturn.", kind: "wait", sec: 2 });
    add({ st: "req", gate: { title: "Approve the requirements", text: "Nothing is planned until you confirm what is being built.", items: ["7 acceptance criteria, 3 user stories", "Assumption applied: nobody can approve their own request, even an admin", "No open questions"] }, ic: "G1", t: "Requirements approval", d: "Waiting for a person", kind: "wait" });
    add({ st: "repo", ic: "TL", t: "Read the repository tree", d: "212 files · stack: Node, Express, Postgres", m: "0:11", sec: 11, log: "<b>repo_tree</b> 212 files" });
    add({ st: "repo", ic: "BR", t: "Project brief", d: "Commands, conventions, key files and design tokens. Every agent starts from it.", m: "0:24 · $0.03", sec: 24, cost: 0.03, log: "<b>project_brief</b> cached for this commit" });
    add({ st: "plan", ic: "EM", t: "EM agent", d: "Plan: a requests table and migration, submit and decide endpoints, a status column, an Approvals page, tests. No new packages.", m: "0:10 · $0.01", sec: 10, cost: 0.01 });
    add({ st: "plan", ic: "EN", t: "Planning engineer", d: "Reads the real code to confirm the plan holds (13 tool calls).", m: "0:47 · $0.19", sec: 47, cost: 0.19, log: "<b>read_file</b> routes/roles.js · <b>search_code</b> \"requireAdmin\"" });
    add({ st: "plan", gate: { title: "Approve the plan", text: "No file is written before this approval. This is enforced in code, not by prompt.", items: ["Change 5 source files and add one migration", "No new dependencies (no dependency gate needed)", "Approval is bound to this exact plan"] }, ic: "G2", t: "Plan approval", d: "Waiting for a person", kind: "wait" });
    add({ st: "build", ic: "OR", t: "Orchestrator", d: "Starts the engineer and, in parallel, a blind test-case writer that sees only the criteria.", m: "$0.03", sec: 4, cost: 0.03 });
    add({ st: "build", ic: "TC", t: "Test-case writer", d: "Writes 18 cases from the criteria: normal, edge and sequence. Includes \"a maker cannot approve their own request\". No code access.", m: "0:38 · $0.09", sec: 38, cost: 0.09, log: "<b>get_ticket</b> (its only tool)" });
    add({ st: "build", ic: "EN", t: "Engineer · build", d: "Reads before it writes, edits precisely, runs the tests in a sandbox and checks its own change in a browser.", m: "3:41 · $0.61", sec: 221, cost: 0.61, log: "<b>read_file</b> routes/roles.js · <b>edit_file</b> routes/approvals.js · <b>run_tests</b> sandbox", shot: [["before", "Engineer's own look before: role setup saves directly"], ["after", "…and after: it now submits for approval"]] });
    add({ st: "build", ic: "RV", t: "Reviewer (separate agent)", d: "Reads the diff and runs the tests itself. Verdict: approve.", m: "0:34 · $0.10", sec: 34, cost: 0.1, kind: "ok", log: "<b>get_diff</b> · <b>run_tests</b> 29 passed" });
    add({ st: "tests", ic: "TS", t: "Tests run by the pipeline", d: "Run by code, not an agent's claim: 31 of 31 pass.", m: "0:12", sec: 12, kind: "ok", log: "<b>tests_final</b> 31 passed, 0 failed" });
    add({ st: "tests", ic: "DF", t: "Changed files", d: "6 files changed", m: "0:02", sec: 2, log: "<b>diff_final</b> 6 files" });
    if (bug) {
      add({ st: "qa", ic: "QA", t: "QA · round 1", d: "Runs 18 cases, each in a fresh browser, at laptop, tablet and phone sizes.", m: "3:52 · $0.37", sec: 232, cost: 0.37, log: "<b>try_in_browser</b> 18 cases × sizes" });
      add({ st: "qa", ic: "✕", t: "Case TC9 failed: a maker can approve their own request", d: "The check expected Approve to be disabled on a request the signed-in admin submitted. It is enabled. The failure is recorded with the step that failed and a screenshot.", kind: "bad", sec: 3, shot: [["fail", "Screenshot QA attached to the failing case TC9 · laptop"]] });
      add({ st: "qa", ic: "CL", t: "Failure classified", d: "A separate call reads the case, the steps and the criteria: verdict app bug, against the approved assumption. Raised as a bug, not argued away.", m: "$0.01", sec: 6, cost: 0.01, kind: "bad" });
      add({ st: "build", ic: "EN", t: "Engineer · fix", d: "Disables the buttons in the UI and, more importantly, rejects self-approval on the server.", m: "2:05 · $0.34", sec: 125, cost: 0.34, log: "<b>edit_file</b> routes/approvals.js · <b>run_tests</b> 31 passed" });
      add({ st: "qa", ic: "RP", t: "Replay of cases that passed before", d: "Run again by code, exactly as recorded, with no model call. All 17 still pass.", m: "1:20 · $0", sec: 80, kind: "ok", log: "<b>replay</b> 17 cases · no model call" });
      add({ st: "qa", ic: "QA", t: "QA · retest of the failed case", d: "Re-runs TC9 at every size, including a direct request to the endpoint. It is now refused.", m: "1:22 · $0.11", sec: 82, cost: 0.11, kind: "ok" });
    } else {
      add({ st: "qa", ic: "QA", t: "QA · round 1", d: "Runs 18 cases, each in a fresh browser, at laptop, tablet and phone sizes. All pass.", m: "3:52 · $0.37", sec: 232, cost: 0.37, kind: "ok", log: "<b>try_in_browser</b> 18 cases × sizes" });
    }
    add({ st: "qa", ic: "EV", t: "Browser evidence by the pipeline", d: "The final scenario runs in a sealed container at three sizes. Screenshots are kept.", m: "1:35", sec: 95, kind: "ok", shot: [["lap", "Laptop 1440 px", true], ["tab", "Tablet 820 px"], ["ph", "Phone 390 px"]] });
    add({ st: "qa", ic: "QS", t: "Quality score", d: "Matches the product's own colours, fonts and conventions. Shown on the gate; it never blocks.", m: "$0.02", sec: 3, cost: 0.02 });
    add({ st: "approve", gate: { title: "Approve the patch", text: "Everything you need to decide, in one place. The pull request opens only for this exact patch.", items: ["Tests: 31 of 31 passed (run by the pipeline)", "Review: approved · QA: 18 pass, 0 failed, 0 open bugs", "Evidence at 3 screen sizes · 6 files changed"] }, ic: "G3", t: "Patch approval", d: "Waiting for a person", kind: "wait" });
    add({ st: "pr", ic: "PR", t: "Pull request opened", d: "Branch showwork/scrum-52 · real unified diff · QA report and screenshots in the body. Never merged by Showwork.", m: "0:31", sec: 31, kind: "ok", diff: true, log: "<b>create_pull_request</b> showwork/scrum-52 → main" });
    add({ st: "pr", ic: "JI", t: "Ticket moved to In review", d: "A comment links the pull request. Your own workflow decides the status.", m: "0:03", sec: 3, log: "<b>comment_ticket</b> SCRUM-52" });
    add({ st: "pr", ic: "CR", t: "Code reviewer comments on the PR", d: "One minor note posted on the pull request.", m: "0:27 · $0.15", sec: 27, cost: 0.15 });
    add({ st: "done", ic: "✓", t: "Run completed", d: "A pull request is waiting for a human to review and merge.", kind: "ok", done: true });
    return s;
  }

  var st = { items: [], i: 0, timer: null, playing: false, waiting: false, sec: 0, cost: 0, sel: "req", follow: true, status: {}, shots: [], logs: [], bug: true };

  var elStepper = $("#s-stepper"), elFeed = $("#s-feed"), elTitle = $("#s-stagetitle"), elSum = $("#s-stagesum"), elGate = $("#s-gate"),
    elArt = $("#s-art"), elLog = $("#s-log"), elClock = $("#s-clock"), elCost = $("#s-cost"), elState = $("#s-state"), elBtnPlay = $("#sb-play"),
    elEnd = $("#sim-end"), elDiffBox = $("#s-diffbox");

  function fmt(sec) { var m = Math.floor(sec / 60), s = sec % 60; return m + ":" + (s < 10 ? "0" : "") + s; }

  function reset() {
    clearTimeout(st.timer);
    st.bug = $("#so-bug").checked; st.items = script(st.bug); st.i = 0; st.playing = false; st.waiting = false; st.sec = 0; st.cost = 0; st.sel = "req"; st.follow = true; st.shots = []; st.logs = []; st.started = false;
    st.status = {}; STAGES.forEach(function (s) { st.status[s.id] = "pending"; });
    elGate.hidden = true; elEnd.classList.remove("show"); elDiffBox.innerHTML = "";
    elArt.innerHTML = '<div class="s-empty">Screenshots and videos appear here as the run produces them.</div>';
    elLog.innerHTML = '<div class="s-empty">Tool calls appear here.</div>';
    renderAll(); setState("idle", "Ready"); elBtnPlay.textContent = "▶ Start the run"; $("#sb-next").disabled = false;
  }

  function setState(kind, text) { elState.className = "pill " + kind; elState.textContent = text; }

  function renderStepper() {
    elStepper.innerHTML = "";
    STAGES.forEach(function (s) {
      var b = document.createElement("button");
      b.className = "s-stage " + (st.status[s.id] === "done" ? "done" : st.status[s.id] === "active" ? "active" : st.status[s.id] === "waiting" ? "waiting" : "") + (st.sel === s.id ? " sel" : "");
      b.innerHTML = '<span class="d"></span>' + s.label;
      b.addEventListener("click", function () { st.sel = s.id; st.follow = false; renderStepper(); renderFeed(); });
      elStepper.appendChild(b);
    });
  }

  function renderFeed() {
    var def = STAGES.filter(function (x) { return x.id === st.sel; })[0];
    elTitle.textContent = def.label; elSum.textContent = def.sum;
    var rows = st.items.slice(0, st.i).filter(function (it) { return it.st === st.sel; });
    if (!rows.length) { elFeed.innerHTML = '<div class="s-empty">' + (st.status[st.sel] === "pending" ? "Not reached yet." : "Nothing in this stage yet.") + "</div>"; return; }
    elFeed.innerHTML = rows.map(function (it) {
      var q = it.quote ? '<div class="quote">' + it.quote.replace(/\n/g, "<br>") + "</div>" : "";
      return '<div class="s-row"><div class="ic ' + (it.kind || "") + '">' + it.ic + '</div><div><div class="t">' + it.t + '</div><div class="d">' + it.d + "</div>" + q + '</div><div class="m">' + (it.m || "") + "</div></div>";
    }).join("");
    elFeed.scrollTop = elFeed.scrollHeight;
  }

  function renderMeters() { elClock.textContent = "⏱ " + fmt(st.sec); elCost.textContent = "$" + st.cost.toFixed(2); }
  function renderAll() { renderStepper(); renderFeed(); renderMeters(); }

  function addShots(list) {
    if (st.shots.length === 0) elArt.innerHTML = '<div class="thumbs"></div>';
    var box = $(".thumbs", elArt);
    list.forEach(function (sh) {
      st.shots.push(sh);
      var f = document.createElement("figure"); if (sh[2]) f.className = "wide";
      f.innerHTML = '<img src="' + IMG[sh[0]] + '" alt="' + sh[1] + '" loading="lazy"><figcaption>' + sh[1] + "</figcaption>";
      f.querySelector("img").addEventListener("click", function () { window.openLightbox && window.openLightbox(IMG[sh[0]], sh[1]); });
      box.appendChild(f);
    });
  }
  function addLog(line) {
    if (st.logs.length === 0) elLog.innerHTML = '<div class="log"></div>';
    st.logs.push(line); var d = document.createElement("div"); d.innerHTML = fmt(st.sec) + " " + line; $(".log", elLog).appendChild(d);
  }
  function showDiff() {
    elDiffBox.innerHTML = '<div class="diff"><div class="h">@@ routes/approvals.js · illustrative excerpt</div><div class="r">- router.post("/:id/approve", requireAdmin, approve);</div><div class="a">+ router.post("/:id/approve", requireAdmin, forbidSelfApproval, approve);</div><div class="a">+ // maker-checker: whoever submitted a change can never be its checker</div></div>';
  }

  function stageStatuses(curStage, mode) {
    var idx = STAGES.map(function (s) { return s.id; }).indexOf(curStage);
    STAGES.forEach(function (s, k) {
      if (k < idx) { if (st.status[s.id] !== "pending") st.status[s.id] = "done"; else st.status[s.id] = "done"; }
    });
    st.status[curStage] = mode;
  }

  function tick() {
    if (st.waiting || st.i >= st.items.length) return;
    var it = st.items[st.i];
    if (!st.started) { st.started = true; track("simulator-start", { bug: st.bug }); }
    st.i++; st.sec += it.sec || 0; st.cost += it.cost || 0;
    if (it.done) { STAGES.forEach(function (s) { st.status[s.id] = "done"; }); }
    else stageStatuses(it.st, it.gate ? "waiting" : "active");
    if (st.follow) st.sel = it.st;
    if (it.shot) addShots(it.shot);
    if (it.log) addLog(it.log);
    if (it.diff) showDiff();
    renderAll();
    if (it.gate) {
      st.waiting = true; st.playing = false; setState("wait", "Waiting for you");
      $("#s-gate-kicker").textContent = "Gate " + it.ic.replace("G", "") + " of 3"; $("#s-gate-title").textContent = it.gate.title; $("#s-gate-text").textContent = it.gate.text;
      $("#s-gate-items").innerHTML = it.gate.items.map(function (x) { return "<li>" + x + "</li>"; }).join("");
      elGate.hidden = false; elBtnPlay.textContent = "▶ Resume"; $("#sb-next").disabled = true; return;
    }
    if (it.done) { track("simulator-complete", { bug: st.bug }); setState("good", "Completed"); st.playing = false; elBtnPlay.textContent = "↺ Replay"; $("#sb-next").disabled = true; elEnd.classList.add("show"); return; }
    setState(it.kind === "bad" ? "bad" : "busy", it.kind === "bad" ? "QA found a bug" : "Running");
    if (st.playing) schedule();
  }
  function speed() { return Number($("#so-speed").value); }
  function schedule() { clearTimeout(st.timer); st.timer = setTimeout(function () { tick(); }, 950 / speed()); }

  function approve() {
    var it = st.items[st.i - 1];
    track("simulator-gate-approved", { gate: it.gate ? it.gate.title : "" });
    elGate.hidden = true; st.waiting = false; st.status[it.st] = "done";
    var row = it; row.d = "Approved by you · bound to what you saw"; row.kind = "ok"; row.ic = "✓";
    renderAll(); $("#sb-next").disabled = false; setState("busy", "Running"); st.playing = true; elBtnPlay.textContent = "❚❚ Pause"; schedule();
  }

  // controls
  elBtnPlay.addEventListener("click", function () {
    if (st.i >= st.items.length) { reset(); st.playing = true; elBtnPlay.textContent = "❚❚ Pause"; setState("busy", "Running"); schedule(); return; }
    if (st.waiting) return;
    st.playing = !st.playing;
    if (st.playing) { elBtnPlay.textContent = "❚❚ Pause"; setState("busy", "Running"); schedule(); } else { clearTimeout(st.timer); elBtnPlay.textContent = "▶ Resume"; setState("idle", "Paused"); }
  });
  $("#sb-next").addEventListener("click", function () { if (st.waiting) return; st.playing = false; clearTimeout(st.timer); elBtnPlay.textContent = "▶ Resume"; tick(); if (!st.waiting && st.i < st.items.length) setState("idle", "Paused"); });
  $("#sb-restart").addEventListener("click", reset);
  $("#so-bug").addEventListener("change", reset);
  $("#sb-approve").addEventListener("click", approve);
  $("#sb-changes").addEventListener("click", function () {
    var note = $("#s-gate-note"); note.hidden = false; note.textContent = "In the product, \"request changes\" sends your note back to the agent and the stage runs again. For this demo, approve to continue.";
  });

  $("#s-tabs").addEventListener("click", function (e) {
    var b = e.target.closest(".s-tab"); if (!b) return;
    root.querySelectorAll(".s-tab").forEach(function (x) { x.setAttribute("aria-selected", String(x === b)); });
    root.querySelectorAll(".s-panel").forEach(function (p) { p.classList.toggle("show", p.id === b.getAttribute("data-p")); });
  });
  reset();
})();
