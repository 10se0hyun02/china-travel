# 구글 드라이브(G:) 위에서는 npm이 node_modules를 설치할 수 없으므로 (가상 FS 제약),
# 소스를 로컬 디스크로 미러링해 설치/빌드한 뒤 dist만 드라이브로 되가져오는 스크립트.
# 사용법:  powershell -ExecutionPolicy Bypass -File scripts\build-local.ps1 [-Dev]
#   -Dev 스위치를 주면 빌드 대신 로컬 사본에서 개발 서버(npm run dev)를 실행한다.
param([switch]$Dev)

$ErrorActionPreference = 'Stop'
$src = Split-Path $PSScriptRoot -Parent
$work = Join-Path $env:LOCALAPPDATA 'china-travel-build'

Write-Host "[1/3] 소스 미러링: $src -> $work"
robocopy $src $work /MIR /NFL /NDL /NJH /NJS /XD node_modules dist dev-dist .claude .git /XF settings.local.json | Out-Null
if ($LASTEXITCODE -ge 8) { throw "robocopy 실패 (code $LASTEXITCODE)" }

Push-Location $work
try {
  if (-not (Test-Path (Join-Path $work 'node_modules'))) {
    Write-Host "[2/3] 의존성 설치 (npm install)"
    npm install --no-fund --no-audit
    if ($LASTEXITCODE -ne 0) { throw "npm install 실패" }
  } else {
    Write-Host "[2/3] node_modules 존재 — 설치 생략 (강제 재설치: $work 삭제 후 재실행)"
  }

  if ($Dev) {
    Write-Host "[3/3] 개발 서버 실행 (Ctrl+C로 종료)"
    npm run dev
  } else {
    Write-Host "[3/3] 프로덕션 빌드 (vite build + PWA)"
    npm run build
    if ($LASTEXITCODE -ne 0) { throw "npm run build 실패" }
    robocopy (Join-Path $work 'dist') (Join-Path $src 'dist') /MIR /NFL /NDL /NJH /NJS | Out-Null
    if ($LASTEXITCODE -ge 8) { throw "dist 복사 실패 (code $LASTEXITCODE)" }
    Write-Host "완료! 결과물: $src\dist"
  }
}
finally { Pop-Location }
exit 0
