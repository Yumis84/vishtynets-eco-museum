# Instructions for AI agents

These rules apply to every AI agent, automation and human-assisted coding session in this repository.

## Mandatory preflight

Before changing any file:

1. Fetch the remote state and identify the current `origin/main` SHA.
2. Inspect recent commits, all relevant branches and open pull requests.
3. Read this file, [COORDINATION.md](COORDINATION.md) and [WORK_LOG.md](WORK_LOG.md).
4. Read the task-specific source of truth, for example [MIGRATION_INVENTORY.md](MIGRATION_INVENTORY.md).
5. Check whether another agent has claimed the same files, page, URL, component or dependency.
6. Add or update your own claim in `WORK_LOG.md` before substantive work.
7. Create a dedicated branch from the verified current `main`.

If any preflight check cannot be completed, stop and mark the task `BLOCKED`. Never infer repository state from chat memory alone.

## Claim requirements

Every active claim must contain:

- stable task ID;
- agent/owner;
- status;
- UTC timestamps;
- branch;
- base `main` SHA;
- exact scope and excluded scope;
- expected files/entities/legacy URLs;
- dependencies or overlap;
- last progress;
- resulting commit and PR when available.

Claims are leases, not ownership of the repository. Update them at meaningful milestones. Release stale or abandoned claims explicitly; do not silently replace another agent's entry.

## Working rules

- Never push task work directly to `main`.
- Never force-push, delete, rename or rewrite another contributor's branch or work.
- Do not modify files outside the registered scope.
- Preserve unrelated user and agent changes.
- If scope grows or overlaps another claim, update the log and coordinate before editing.
- Re-check `origin/main`, open PRs and `WORK_LOG.md` before every push and PR.
- Keep commits focused and traceable.
- Do not change architecture, ACL, deployment/workflows, repositories or protected features without explicit YUMIS-OWNER approval.
- Do not expose credentials or secrets in commits, logs, issues or PRs.

## Completion

Before setting `READY_FOR_REVIEW` or `DONE`:

1. Sync and compare against current `main`.
2. Run relevant tests/validation.
3. Review the complete diff for unintended edits and collisions.
4. Update `WORK_LOG.md` with summary, verification, commit SHA and PR URL/number.
5. Describe remaining risks or follow-up work.

`DONE` means the PR has been merged or the owner-approved terminal result is recorded. An unmerged branch is `READY_FOR_REVIEW`, not `DONE`.

## Legacy migration

For legacy content, `MIGRATION_INVENTORY.md` and existing batch files are mandatory deduplication sources. Preserve provenance, source order, dates, media, captions, photo credits and document links. Never treat archival operational data as current without separate verification.

More detail: [COORDINATION.md](COORDINATION.md).
