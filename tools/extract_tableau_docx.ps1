$ErrorActionPreference = 'Stop'

# Base paths (derive portfolio root from script location)
$scriptDir = $PSScriptRoot
$portfolio = Split-Path -Parent $scriptDir

# Try to locate the DOCX dynamically to avoid accent issues in hardcoded paths
$docx = Get-ChildItem -LiteralPath $portfolio -Recurse -File -Filter '*.docx' |
  Where-Object { $_.FullName -match 'Tableau' -and $_.FullName -match 'comp' } |
  Select-Object -First 1 -ExpandProperty FullName

if (-not $docx) {
    throw 'Fichier DOCX du tableau non trouvé sous le dossier portfolio.'
}

# Output path next to the DOCX
$out = [System.IO.Path]::Combine([System.IO.Path]::GetDirectoryName($docx), 'Tableau_competence_extrait.txt')

# Create temp folder
$temp = Join-Path $env:TEMP ("docx_" + [guid]::NewGuid().ToString())
New-Item -ItemType Directory -Path $temp | Out-Null

try {
    Add-Type -AssemblyName System.IO.Compression.FileSystem
    # Copy DOCX to an ASCII-only temp file to avoid Unicode path issues during extraction
    $tempDocx = Join-Path $temp 'docx.zip'
    Copy-Item -LiteralPath $docx -Destination $tempDocx -Force
    [System.IO.Compression.ZipFile]::ExtractToDirectory($tempDocx, $temp)

    $xmlPath = Join-Path $temp 'word\document.xml'
    if (-not (Test-Path -LiteralPath $xmlPath)) {
        throw "document.xml non trouvé dans l'archive."
    }

    $raw = Get-Content -LiteralPath $xmlPath -Raw -Encoding UTF8

    # Basic cleanup: replace paragraph ends and tabs, strip tags
    $raw = $raw -replace '<w:tab[^>]*/>', "`t"
    $raw = $raw -replace '</w:p>', "`n"

    $text = [regex]::Replace($raw, '<[^>]+>', '')

    # Normalize newlines
    $text = $text -replace "\r\n?", "`n"

    Set-Content -LiteralPath $out -Value $text -Encoding UTF8
    Write-Output "EXTRACTED: $out"
}
finally {
    if (Test-Path -LiteralPath $temp) { Remove-Item -LiteralPath $temp -Recurse -Force }
}
