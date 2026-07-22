$files = Get-ChildItem -Path "c:\Users\Sandra\Downloads\hooplink-20260720T084346Z-1-001\hooplink" -Recurse -Include "*.ts", "*.tsx" -File | Where-Object { $_.FullName -notmatch "node_modules" -and $_.FullName -notmatch "\.next" }

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName | Out-String
    if ($content -match "HoopLink") {
        $newContent = $content -replace "HoopLink", "Kinet"
        Set-Content -Path $file.FullName -Value $newContent
        Write-Host "Updated: $($file.FullName)"
    }
}

Write-Host "Done!"
