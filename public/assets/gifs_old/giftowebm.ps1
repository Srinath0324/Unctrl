New-Item -ItemType Directory -Force ../webm_transparent | Out-Null
Get-ChildItem *.gif | ForEach-Object {
    $out = "../webm_transparent/$($_.BaseName).webm"
    Write-Host "Converting $($_.Name) → $out (transparent WebM)"
    ffmpeg -i $_.FullName -c:v libvpx-vp9 -pix_fmt yuva420p -b:v 0 -crf 3   0 -auto-alt-ref 0 $out
}
Write-Host "✅ All GIFs converted to transparent WebM (saved in /webm_transparent)"
