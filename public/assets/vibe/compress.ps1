Get-ChildItem -File -Include *.mp4, *.mov, *.avi, *.mkv | ForEach-Object {
    $temp = "$($_.DirectoryName)\temp_$($_.Name)"
    ffmpeg -i $_.FullName -vcodec libx264 -preset fast -crf 28 -an $temp
    Move-Item -Force $temp $_.FullName
    Write-Host "✅ Compressed $($_.Name)"
}
Write-Host "✅ All videos compressed and replaced in place"
