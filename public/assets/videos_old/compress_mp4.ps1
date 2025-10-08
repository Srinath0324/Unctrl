    New-Item -ItemType Directory -Force ../videos_optimized
Get-ChildItem *.mp4, *.mov, *.avi, *.mkv | ForEach-Object {
    $out = "../videos_optimized/$($_.BaseName).mp4"
    ffmpeg -i $_.FullName -vcodec libx264 -preset fast -crf 28 -an $out
}
Write-Host "✅ All MP4s compressed and saved in /videos_optimized"
