================================================================================
Swaad Smriti — Oral History Audio Recordings
================================================================================

This directory houses MP3 audio recordings of student oral history interviews.

Existing recordings:
- hyderabadi-biryani.mp3  (Interview with Bhukhya Lohitha Rathore)
- mysore-pak.mp3          (Interview with Himanshu Kumawat)
- dharwad-pedha.mp3       (Interview with Divyansh Verma)
- dal-baati-churma.mp3    (Interview with Rajan Choudhary)
- pongal.mp3              (Interview with Mohit)
- medu-vada.mp3           (Interview with Khushal)
- til-ke-laddu.mp3        (Interview with Sumer Singh)
- tekua.mp3               (Interview with Shubham Raj)
- ragi-mudde.mp3          (Interview with Arun Fakirappa Halyal)

Pending recordings:
- ghewar.mp3              (Placeholder in src/data/dishes.ts)

Instructions:
1. Drop new MP3 files directly into this directory (e.g. `public/audio/ragi-mudde.mp3`).
2. Update the `audioUrl` field for the corresponding dish in `src/data/dishes.ts`.
   You can provide either a relative path (e.g. `/audio/ragi-mudde.mp3`)
   or any external HTTPS audio stream URL.
3. If `audioUrl` is set to null, the player will cleanly show "Audio recording pending upload".
================================================================================
