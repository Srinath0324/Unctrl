Get-ChildItem -Recurse -Include *.png,*.jpg,*.jpeg | ForEach-Object {
    $new = "$($_.DirectoryName)\$($_.BaseName).webp"
    cwebp -q 75 $_.FullName -o $new
    if (Test-Path $new) { Remove-Item $_.FullName }
    Write-Host "Converted: $($_.Name) → $($_.BaseName).webp"
}
