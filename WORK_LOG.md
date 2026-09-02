# Shared work log

Canonical coordination rules: [AGENTS.md](AGENTS.md) and [COORDINATION.md](COORDINATION.md).

Agents must inspect current GitHub branches and PRs as well as this log. A branch appearing below is not proof that its state is unchanged.

## Active work

| Task ID | Agent | Status | Updated UTC | Branch | Base main | Scope / expected files | Excluded / overlap | Last progress | Commit / PR |
|---|---|---|---|---|---|---|---|---|---|
| COORD-2026-09-02-01 | CHATGPT-COORD | IN_PROGRESS | 2026-09-02 | `coordination/migration-workflow` | `512ac4e8e420d4515c604e462bd5341b0b2ea59f` | Repository-wide agent coordination: `AGENTS.md`, `COORDINATION.md`, `WORK_LOG.md` | Does not edit migration content, site code or Alexey's branches | Existing coordination draft retained and expanded; mandatory workflow and shared log added | `1a50776b`, `0960f2a2`; PR pending |
| MIGRATION-EVENTS-2026-09-02 | UNKNOWN / verify with branch owner | IN_PROGRESS | 2026-09-02 | `migration/events-archive-2026-09-02` | `512ac4e8e420d4515c604e462bd5341b0b2ea59f` | Event archive; observed change: `data/legacy-events.js` | Reserved pending owner confirmation; do not modify or duplicate | Branch observed 1 commit ahead of `main`; no open PR observed during coordination audit | Commit/PR must be recorded by owner |
| MIGRATION-MEDIA-72-2026-09-02 | UNKNOWN / verify with branch owner | IN_PROGRESS | 2026-09-02 | `migration/media-batch-72-2026-09-02` | `512ac4e8e420d4515c604e462bd5341b0b2ea59f` | Media batch; observed changes: `MIGRATION_INVENTORY.md`, `docs/LEGACY_MEDIA_INVENTORY.md`, `docs/MEDIA_CAPTURE_2026-09-02.md` | Reserved pending owner confirmation; do not modify or duplicate | Branch observed 3 commits ahead of `main`; no open PR observed during coordination audit | Commits/PR must be recorded by owner |

> The two migration rows above were reconstructed from factual branch diffs during the 2026-09-02 audit. Their agent identity was not inferable from GitHub data returned to this session, so it is intentionally marked `UNKNOWN`. They protect the work—including Alexey's possible work—from overwrite until the branch owner updates the entry.

## Progress entry format

Append a row or dated note when a milestone changes coordination-relevant state:

| Time UTC | Task ID | Agent | Status | What changed | Files/entities | Commit/PR | Next/blocker |
|---|---|---|---|---|---|---|---|

Do not log every minor edit. Log discoveries that change scope, handoffs, conflicts, test results, significant implementation milestones and completion.

## History

| Time UTC | Task ID | Agent | Status | What changed | Files/entities | Commit/PR | Next/blocker |
|---|---|---|---|---|---|---|---|
| 2026-09-02 | COORD-2026-09-02-01 | CHATGPT-COORD | IN_PROGRESS | Audited actual `main`, branches, commits and PRs; found and continued existing coordination branch instead of duplicating it | Repository metadata; coordination docs | Base `512ac4e8` | Create PR and update this row |

## Rules for editing this log

- Edit your own task row; append history rather than deleting useful records.
- Do not change another agent's status, scope or result except for an explicit handoff, verified merge, or owner decision; record the reason.
- Use UTC in ISO-like form (`YYYY-MM-DD HH:MM`) when the exact time is known.
- On overlap, keep both records and set the later claim to `BLOCKED` until resolved.
- After merge, move/mark the task `DONE` and retain the evidence.
