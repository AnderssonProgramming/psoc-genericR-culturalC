#!/bin/bash

echo "===================================="
echo "  Python AI Service - GPT-OSS"
echo "===================================="
echo ""

# Verificar si existe el entorno virtual
if [ ! -d "venv" ]; then
    echo "[1/3] Creando entorno virtual..."
    python3 -m venv venv
    echo ""
fi

# Activar entorno virtual
echo "[2/3] Activando entorno virtual..."
source venv/bin/activate
echo ""

# Instalar dependencias
echo "[3/3] Instalando dependencias..."
pip install -r requirements.txt
echo ""

# Iniciar servicio
echo "===================================="
echo "  Iniciando servicio..."
echo "===================================="
echo ""
python app.py
