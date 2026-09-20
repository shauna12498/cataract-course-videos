#!/usr/bin/env python3
import asyncio, subprocess, sys, time
from pathlib import Path
from playwright.async_api import async_playwright

W, H = 1920, 1080
FPS = 30
ROOT = Path(__file__).parent.resolve()
FRAMES = ROOT / 'frames'
OUT = ROOT / 'out'
FRAMES.mkdir(parents=True, exist_ok=True)
OUT.mkdir(parents=True, exist_ok=True)
WANTED = set(sys.argv[1:]) if len(sys.argv) > 1 else None

async def render_unit(page, unit_id, duration, canvas):
    total = int(round(duration * FPS))
    unit_dir = FRAMES / unit_id
    unit_dir.mkdir(parents=True, exist_ok=True)
    mp4 = OUT / f'{unit_id}.mp4'
    if mp4.exists():
        print(f'== skip {unit_id}'); return mp4
    await page.evaluate(f'window.setUnit("{unit_id}")')
    await page.wait_for_timeout(200)
    t0 = time.time()
    for i in range(total):
        t = i / FPS
        await page.evaluate(f'window.renderFrame({t:.4f})')
        await canvas.screenshot(path=str(unit_dir / f'frame_{i:05d}.png'), animations='disabled')
        if i % 60 == 0:
            el = time.time() - t0
            eta = (el / max(i,1)) * (total - i)
            print(f'  [{unit_id}] {i:5d}/{total}  t={t:6.1f}s  wall={el:5.0f}s  eta={eta:5.0f}s', flush=True)
    subprocess.run(['ffmpeg','-y','-loglevel','error','-framerate',str(FPS),
        '-i', str(unit_dir / 'frame_%05d.png'),
        '-c:v','libx264','-pix_fmt','yuv420p','-crf','18','-preset','medium',
        str(mp4)], check=True)
    for f in unit_dir.glob('frame_*.png'): f.unlink()
    unit_dir.rmdir()
    print(f'== DONE {unit_id}  ({time.time()-t0:.0f}s)  ->  {mp4}', flush=True)
    return mp4

async def main():
    async with async_playwright() as pw:
        browser = await pw.chromium.launch(args=['--no-sandbox','--disable-gpu','--disable-dev-shm-usage'])
        page = await browser.new_page(viewport={'width': W, 'height': H}, device_scale_factor=1)
        await page.goto(f'file://{ROOT}/render_mode.html')
        override = ROOT / 's0_02_quality.js'
        if override.exists():
            await page.add_script_tag(path=str(override))
        await page.wait_for_timeout(400)
        units = await page.evaluate('Object.entries(window.COURSE).map(([id,u]) => [id, u.duration])')
        if WANTED:
            units = [u for u in units if u[0] in WANTED]
        canvas = page.locator('canvas')
        for unit_id, duration in units:
            await render_unit(page, unit_id, duration, canvas)
        await browser.close()

if __name__ == '__main__':
    asyncio.run(main())
