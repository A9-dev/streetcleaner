# backend/reporting/tests/conftest.py
import sys
from pathlib import Path
from dotenv import load_dotenv

ROOT = Path(__file__).resolve().parents[1]  # -> /backend/reporting
SRC = ROOT / "src"

if SRC.exists() and str(SRC) not in sys.path:
    sys.path.insert(0, str(SRC))

load_dotenv(dotenv_path=ROOT / ".env.local")
