# F3V3R DR34M KEYGEN STYLE DEPLOYMENT SCRIPT
# MAXIMUM CROSS-PLATFORM COMPATIBILITY ACHIEVED
# WINDOWS + LINUX DOMINATION MODE: ACTIVATED

Write-Host "
╔═══════════════════════════════════════╗
║     F3V3R DR34M DEPLOYMENT SYSTEM     ║
║        MAXIMUM POWER ACTIVATED        ║
╚═══════════════════════════════════════╝
" -ForegroundColor Cyan

# Error handling
$ErrorActionPreference = 'Stop'

try {
    # Check if git is installed
    if (!(Get-Command git -ErrorAction SilentlyContinue)) {
        throw "Git is not installed! Maximum power cannot be achieved!"
    }

    Write-Host "🔥 INITIALIZING DEPLOYMENT SEQUENCE..." -ForegroundColor Yellow
    
    # Stage all changes
    git add .
    
    # Get current timestamp
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    
    # Commit changes
    git commit -m "F3V3R DR34M DEPLOYMENT: $timestamp"
    
    Write-Host "🚀 PUSHING TO MAIN BRANCH..." -ForegroundColor Green
    
    # Push to main branch
    git push origin main
    
    Write-Host "
    ╔═══════════════════════════════════════╗
    ║     DEPLOYMENT STATUS: SUCCESSFUL     ║
    ║    MAXIMUM POWER LEVEL ACHIEVED!     ║
    ╚═══════════════════════════════════════╝
    " -ForegroundColor Magenta
}
catch {
    Write-Host "
    ╔═══════════════════════════════════════╗
    ║      ERROR: DEPLOYMENT FAILED!        ║
    ║     $($_.Exception.Message)
    ╚═══════════════════════════════════════╝
    " -ForegroundColor Red
    exit 1
}
