"""Generate a checkpoint-safe runtime logo while preserving an exact original copy outside the project."""

from pathlib import Path
from PIL import Image
import shutil


project = Path("/home/ubuntu/workbuddy-demo")
package = project / "WorkBuddy功能演示网页_交付资料包"
source = package / "assets/generated-images/workbuddy-logo.png"
external_vault = Path("/home/ubuntu/WorkBuddy功能演示网页_交付资料包_原始大媒体")
runtime_target = project / "client/public/assets/workbuddy-logo.png"
package_runtime = package / "assets/generated-images/workbuddy-logo-runtime-optimized.png"
source_code_runtime = package / "source-code/client/public/assets/workbuddy-logo.png"

external_vault.mkdir(parents=True, exist_ok=True)
shutil.copy2(source, external_vault / "workbuddy-logo-original.png")

with Image.open(source) as image:
    image = image.convert("RGBA")
    image.thumbnail((256, 256), Image.Resampling.LANCZOS)
    image.save(package_runtime, format="PNG", optimize=True, compress_level=9)

for target in (runtime_target, source_code_runtime):
    target.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(package_runtime, target)

# The raw PNG is preserved in the external vault and the full export ZIP;
# remove only the project-contained raw duplicate so checkpointing can proceed.
source.unlink()

print(f"runtime logo: {runtime_target}")
print(f"optimized copy: {package_runtime}")
print(f"external exact original: {external_vault / 'workbuddy-logo-original.png'}")
