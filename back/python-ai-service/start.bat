@echo off
echo ====================================
echo   Python AI Service - GPT-OSS
echo ====================================
echo.

REM Verificar si existe el entorno virtual
if not exist "venv\" (
    echo [1/3] Creando entorno virtual...
    python -m venv venv
    echo.
)

REM Activar entorno virtual
echo [2/3] Activando entorno virtual...
call venv\Scripts\activate
echo.

REM Instalar dependencias
echo [3/3] Instalando dependencias...
pip install -r requirements.txt
echo.

REM Iniciar servicio
echo ====================================
echo   Iniciando servicio...
echo ====================================
echo.
python app.py

pause
