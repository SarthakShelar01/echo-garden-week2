# Echo Garden — Week 2 prototype

Prepared for Sarthak Shelar • 03 November 2026

A three-room, turn-based puzzle game about a maintenance robot and its recorded Echo restoring a rooftop garden.

## Run

1. Extract this ZIP completely.
2. Open `index.html` in a current desktop browser. Keep `core.js`, `game.js` and `style.css` beside it.
3. No installation, build, network connection, API keys or paid assets are required.

If your browser restricts local files, use any local static file server. With Python installed, run `python -m http.server 8000` in this directory and visit `http://localhost:8000`.

## Controls

- Arrow keys / WASD: one movement turn.
- Space: wait one turn.
- E: start or finish a recording (rooms 2–3).
- Enter: activate the terminal while standing on it.
- R / Backspace: reset the room.
- Buttons provide the same actions. Tab navigates controls; Enter activates a focused button.

Each player command advances one Echo command. Gates use the state at the beginning of a turn, and pressure plates update after movement. The Echo stays on its final tile. Eight recorded commands automatically finish and rewind. A blocked movement still consumes a turn. Reset clears the current attempt.

## Files

- `index.html`: page structure and controls.
- `style.css`: responsive presentation.
- `core.js`: pure movement, recording, replay, gates, completion and scoring.
- `game.js`: canvas rendering, input, local progress and completion dialog.
- `tests/`: Node built-in tests; no npm dependencies.
- `TEST_RESULTS.txt`: captured automated test output.
- `Echo_Garden_Week2_Report.docx`: implementation report.
- `SUBMISSION_DESCRIPTION.txt`: description for the internship form (over 200 words).

## Automated verification

With Node.js installed, run:

```
node --test tests/core.test.cjs tests/ui.test.cjs
```

17 tests passed during preparation: 13 game-rule checks and 4 UI integration checks with a DOM/canvas substitute. No actual browser rendering or cross-browser verification was completed in the preparation environment. The test file documents the UI substitute. No external player study was conducted.

## Quick review before submission

- Open all three rooms; check that the board, text and buttons are visible.
- Complete room 1, then use the hint to solve rooms 2 and 3.
- Check E recording, the trail strip, wait, reset and the completion dialog.
- Resize the window; confirm the board and controls remain usable.
- Refresh and see whether restored-room ticks remain. Local-file browser storage behavior can vary; play still works if storage is blocked.

## Solutions

Room 1: Down, Right ×6, Up, Enter.

Room 2: E, Up, Right, Right, E. Then Right ×6, Enter.

Room 3: E, Up ×3, Right ×3, E. Then wait ×6, Right ×4, Up, Right ×4, Down, Enter.

## Scope and design decisions

Week 1 proposed Godot. This implementation instead uses browser-native JavaScript with HTML Canvas to make the core mechanic easy to run and inspect. It is a functional browser prototype, not a Godot project or a native executable. Confirm acceptance with the mentor if an engine-specific submission is required.

There is no combat, inventory, pathfinding, audio or procedural generation. All visuals are drawn in code. A simple restoration score is `max(100, 1000 - 10*turns - 20*resets)` per room. Recording moves are excluded from the replay turn count. Browser storage remembers best scores; reset affects the current attempt, not stored completion. The three room buttons remain available for review.

The route drawn on the board is a planning aid under closed-gate conditions; the command strip and actual replay are authoritative if a route crosses a gate.

## Upload to GitHub and submit

1. Create your own repository, for example `echo-garden-week2`.
2. Upload the extracted project contents, including source, tests, report and README. Do not upload only the ZIP if the reviewer needs to inspect the code.
3. Check that your mentor can access it; use a public repository if required by the internship, or grant access to a private repository.
4. Copy the actual repository URL into the GitHub field. No remote repository has been created by this package.
5. Upload the DOCX report in the report field. Paste `SUBMISSION_DESCRIPTION.txt` into the description field.

Review the source and report, run the prototype yourself, and follow your internship's rules on development assistance before submitting.
