# RioMates Ambient Asset Generation Prompts
# Use these prompts with your preferred AI image/video generator
# (Runway Gen-2, Midjourney, Stable Video Diffusion, etc.)

## HERO VIDEO — Cinematic Loop (.webm, 4-6 seconds, silent)

### Prompt 1: Water Pour
"Cinematic close-up slow motion, hot water being poured from a silver thermos into a traditional leather-wrapped Argentine mate gourd. Steam rises beautifully in golden morning light. Dark rustic wooden table surface. Shallow depth of field. 4K, photorealistic, warm color grading."

### Prompt 2: Yerba Preparation
"Cinematic macro shot, hands carefully placing yerba mate into a calabaza gourd. Fine green yerba particles falling softly. Warm natural lighting, artisanal feel. Dark wooden table. Shallow depth of field. 4K, photorealistic."

### Prompt 3: Alpaca Detail
"Cinematic close-up, artisan's hands polishing a silver alpaca bombilla (metal straw). Soft reflections on the metal surface. Warm workshop lighting. Leather and wood textures in background. 4K, photorealistic, artisanal craftsmanship."

### Prompt 4: River Atmosphere
"Cinematic wide shot, slow pan across the Paraná River at golden hour. Sunbeams through light mist over the water. Silhouette of mate gourd on a wooden railing in foreground. Peaceful, contemplative mood. 4K, photorealistic."

---

## BACKGROUND TEXTURES — Seamless, 2K resolution

### Prompt 5: Leather Texture
"Seamless texture, natural leather surface with subtle grain and stitching details. Warm brown tones, soft lighting. Flat lay, top-down view. High resolution, seamless pattern. No text, no objects."

### Prompt 6: Wood Texture
"Seamless texture, dark walnut wood surface with natural grain patterns. Warm brown tones, matte finish. Top-down flat lay. High resolution, seamless pattern. No text, no objects."

### Prompt 7: Alpaca Metal Texture
"Seamless texture, brushed silver alpaca metal surface with subtle horizontal grain. Cool metallic tones, soft diffused lighting. Flat lay, top-down. High resolution, seamless. No text, no objects."

### Prompt 8: Calabaza Gourd Texture
"Seamless texture, natural calabaza gourd surface with organic patterns. Warm amber-brown tones, subtle variations. Top-down view. High resolution, seamless. No text, no objects."

---

## LIFESTYLE IMAGES — For social proof and gallery

### Prompt 9: Morning Ritual
"Photorealistic lifestyle shot, a traditional Argentine mate gourd with alpaca bombilla on a rustic wooden table. Morning sunlight streaming through a window. Laptop and notebook in soft focus background. Warm golden hour lighting. No text, no people."

### Prompt 10: River Setting
"Photorealistic, a mate gourd resting on a wooden dock by the Paraná River. Golden sunset lighting, calm water in background. Leather-wrapped mate with silver bombilla. Peaceful, contemplative atmosphere. No text, no people."

### Prompt 11: Workshop
"Photorealistic artisan workshop interior. Hands working on a calabaza gourd. Natural light from windows. Tools and materials organized around. Warm, authentic atmosphere. Shallow depth of field. No text."

---

## VIDEO CONVERSION INSTRUCTIONS
# After generating hero video:
# 1. Use ffmpeg to convert to optimized .webm:
#    ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 -an -vf "scale=1920:-1,fps=24" public/assets/hero-loop.webm
# 2. Create .mp4 fallback:
#    ffmpeg -i input.mp4 -c:v libx264 -crf 28 -an -vf "scale=1920:-1,fps=24" public/assets/hero-loop.mp4
# 3. Target size: under 3MB for .webm
