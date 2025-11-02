# Script de Verificación del Backend en Azure
# URL: https://sorokina-c2end0bphkcaf4ab.canadacentral-01.azurewebsites.net

Write-Host "🔍 Verificando Backend de Gender Quest en Azure..." -ForegroundColor Cyan
Write-Host ""

$baseUrl = "https://sorokina-c2end0bphkcaf4ab.canadacentral-01.azurewebsites.net"

# Función para hacer request y mostrar resultado
function Test-Endpoint {
    param(
        [string]$url,
        [string]$description
    )
    
    Write-Host "Testing: $description" -ForegroundColor Yellow
    Write-Host "URL: $url" -ForegroundColor Gray
    
    try {
        # Timeout más largo para Azure (60 segundos)
        $response = Invoke-WebRequest -Uri $url -Method Get -UseBasicParsing -TimeoutSec 60
        $statusCode = $response.StatusCode
        $content = $response.Content | ConvertFrom-Json
        
        Write-Host "✅ Status: $statusCode" -ForegroundColor Green
        Write-Host "Response:" -ForegroundColor Green
        $content | ConvertTo-Json -Depth 3
        Write-Host ""
        return $true
    }
    catch {
        Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
        Write-Host ""
        return $false
    }
}

Write-Host "═══════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  ENDPOINTS DE VERIFICACIÓN" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

Write-Host "⏳ Esperando a que Azure se despierte (cold start)..." -ForegroundColor Magenta
Write-Host "   Esto puede tomar hasta 60 segundos en el tier gratuito..." -ForegroundColor Gray
Write-Host ""

# Test 1: Health Check Root
$test1 = Test-Endpoint "$baseUrl/api" "Health Check (Root API)"

# Test 2: Health Check Endpoint
$test2 = Test-Endpoint "$baseUrl/api/health" "Health Check (Detailed)"

# Test 3: Quiz Endpoint
$test3 = Test-Endpoint "$baseUrl/api/quiz" "Quiz Endpoint"

# Test 4: Leaderboard Endpoint
$test4 = Test-Endpoint "$baseUrl/api/leaderboard" "Leaderboard Endpoint"

Write-Host "═══════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  RESUMEN" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

$totalTests = 4
$passedTests = @($test1, $test2, $test3, $test4) | Where-Object { $_ -eq $true } | Measure-Object | Select-Object -ExpandProperty Count

Write-Host "Tests Pasados: $passedTests / $totalTests" -ForegroundColor $(if ($passedTests -eq $totalTests) { "Green" } else { "Yellow" })

if ($passedTests -eq $totalTests) {
    Write-Host "🎉 ¡Todos los endpoints están funcionando correctamente!" -ForegroundColor Green
} else {
    Write-Host "⚠️  Algunos endpoints tienen problemas. Revisa los logs de Azure." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "📝 Endpoints principales para probar manualmente:" -ForegroundColor Cyan
Write-Host "   Health Check: $baseUrl/api" -ForegroundColor White
Write-Host "   Quiz:         $baseUrl/api/quiz" -ForegroundColor White
Write-Host "   Leaderboard:  $baseUrl/api/leaderboard" -ForegroundColor White
Write-Host "   Chat:         $baseUrl/api/chat" -ForegroundColor White
Write-Host ""
