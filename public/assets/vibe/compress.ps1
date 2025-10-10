Get-ChildItem -File -Include *.mp4, *.mov, *.avi, *.mkv | ForEach-Object {
    $input = $_.FullName
    $output = ".\temp_$($_.Name)"

    # Compress video (no audio, CRF 28)
    ffmpeg -y -i "$input" -vcodec libx264 -preset fast -crf 28 -an "$output"

    # Replace only if compression succeeded
    if (Test-Path "$output") {
        Move-Item -Force "$output" "$input"
        Write-Host "✅ Compressed and replaced: $($_.Name)"
    } else {
        Write-Host "❌ Failed: $($_.Name)"
    }
}

Write-Host "🎉 All videos in current folder processed."
