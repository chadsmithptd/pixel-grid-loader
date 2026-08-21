<template>
  <div class="pgl-root" :class="{ 'pgl-root--surfer': isSurfer }" :style="rootStyle" role="status">
    <div class="pgl-row">
      <span v-if="showDots" class="pgl-grid" aria-hidden="true">
        <span
          v-for="(delay, index) in pattern.delays"
          :key="index"
          class="pgl-cell"
          :class="{ 'pgl-cell--round': pattern.round }"
          :style="cellStyle(delay)"
        />
      </span>
      <span class="pgl-label">{{ resolvedLabel }}</span>
      <span class="pgl-elapsed">{{ elapsedText }}</span>
    </div>

    <div v-if="isSurfer" class="pgl-card">
      <div class="pgl-card-media">
        <video
          v-if="videoOk && content?.videoSrc"
          :src="content.videoSrc"
          autoplay
          muted
          loop
          playsinline
          class="pgl-video"
          @error="videoOk = false"
        />
        <div v-else class="pgl-card-fallback">
          <span class="pgl-grid pgl-grid--mini" aria-hidden="true">
            <span
              v-for="(delay, index) in patterns.Drive.delays"
              :key="index"
              class="pgl-cell"
              :style="cellStyle(delay, patterns.Drive.dur)"
            />
          </span>
          <span class="pgl-card-fallback-text">Video unavailable</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
function buildChevron() {
  return Array.from({ length: 9 }, (_, i) => {
    const r = Math.floor(i / 3);
    const c = i % 3;
    return (c + Math.abs(r - 1)) * 90;
  });
}

function buildOrbit() {
  const order = [0, 1, 2, 5, 8, 7, 6, 3];
  return Array.from({ length: 9 }, (_, i) => {
    const k = order.indexOf(i);
    return k === -1 ? null : k * 110;
  });
}

const CHEVRON = buildChevron();
const ORBIT = buildOrbit();

const PATTERNS = {
  Drive: { delays: CHEVRON, dur: 650, round: false },
  Dots: { delays: CHEVRON, dur: 650, round: true },
  Orbit: { delays: ORBIT, dur: 950, round: false },
};

export default {
  props: {
    uid: { type: String, required: true },
    content: { type: Object, required: true },
    /* wwEditor:start */
    wwEditorState: { type: Object, required: true },
    /* wwEditor:end */
  },
  data() {
    return {
      patterns: PATTERNS,
      seconds: 0,
      timer: null,
      videoOk: true,
    };
  },
  computed: {
    isEditing() {
      /* wwEditor:start */
      return this.wwEditorState.isEditing;
      /* wwEditor:end */
      // eslint-disable-next-line no-unreachable
      return false;
    },
    variant() {
      return this.content?.variant || "Drive";
    },
    isSurfer() {
      return this.variant === "Surfer";
    },
    pattern() {
      return PATTERNS[this.variant] || PATTERNS.Drive;
    },
    resolvedLabel() {
      if (this.content?.label) return this.content.label;
      return this.isSurfer ? "Subway surfing" : "Churning";
    },
    elapsedText() {
      if (this.seconds < 60) return `${this.seconds}s`;
      const minutes = Math.floor(this.seconds / 60);
      const seconds = this.seconds % 60;
      return `${minutes}m ${seconds}s`;
    },
    showDots() {
      return this.content?.showDots !== false;
    },
    speed() {
      const value = Number(this.content?.speed);
      return value > 0 ? value : 1;
    },
    rootStyle() {
      return {
        "--pgl-dot": this.content?.dotColor || "#18181b",
        "--pgl-muted": this.content?.mutedColor || "#a1a1aa",
        "--pgl-speed": this.speed,
      };
    },
  },
  watch: {
    "content.videoSrc"() {
      this.videoOk = true;
    },
  },
  mounted() {
    if (this.content?.autoStart !== false) this.startTimer();
  },
  beforeUnmount() {
    this.stopTimer();
  },
  methods: {
    startTimer() {
      if (this.timer) return;
      this.timer = setInterval(() => {
        if (this.isEditing) return;
        this.seconds += 1;
      }, 1000);
    },
    stopTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    resetTimer() {
      this.seconds = 0;
    },
    cellStyle(delay, durationOverride) {
      const baseDur = durationOverride ?? this.pattern.dur;
      const dur = Math.round(baseDur / this.speed);
      const delayMs = delay === null ? null : Math.round(delay / this.speed);
      return {
        opacity: delay === null ? 0.07 : 0.15,
        animation: delay === null ? "none" : `pgl-pixel-on ${dur}ms ease-in-out ${delayMs}ms infinite`,
      };
    },
  },
};
</script>

<style lang="scss">
.pgl-root {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  width: fit-content;
  color: #18181b;
  font-family: inherit;
}

.pgl-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.pgl-grid {
  display: grid;
  grid-template-columns: repeat(3, 4px);
  gap: 1.5px;
  flex-shrink: 0;
}

.pgl-grid--mini {
  margin-bottom: 4px;
}

.pgl-cell {
  width: 4px;
  height: 4px;
  border-radius: 1px;
  background: var(--pgl-dot, #18181b);
}

.pgl-cell--round {
  border-radius: 999px;
}

.pgl-label {
  font-size: 13px;
  font-weight: 500;
  background-image: linear-gradient(
    90deg,
    var(--pgl-muted, #a1a1aa) 35%,
    var(--pgl-dot, #18181b) 50%,
    var(--pgl-muted, #a1a1aa) 65%
  );
  background-size: 200% 100%;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  animation: pgl-shimmer-text calc(1.4s / var(--pgl-speed, 1)) linear infinite;
}

.pgl-elapsed {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 12px;
  color: var(--pgl-muted, #a1a1aa);
  font-variant-numeric: tabular-nums;
}

.pgl-card {
  margin-top: 8px;
  width: 224px;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.16);
  animation: pgl-pop-in 200ms cubic-bezier(0.16, 1, 0.3, 1) both;
  transform-origin: top left;
}

.pgl-card-media {
  position: relative;
  aspect-ratio: 16 / 9;
  width: 100%;
  background: #27272a;
}

.pgl-video {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.pgl-card-fallback {
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  color: var(--pgl-muted, #a1a1aa);
}

.pgl-card-fallback-text {
  padding: 0 12px;
  text-align: center;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 10px;
}

@keyframes pgl-pixel-on {
  0%, 100% {
    opacity: 0.15;
  }
  50% {
    opacity: 1;
  }
}

@keyframes pgl-shimmer-text {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

@keyframes pgl-pop-in {
  0% {
    opacity: 0;
    transform: scale(0.92);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .pgl-cell,
  .pgl-label,
  .pgl-card {
    animation: none !important;
  }
  .pgl-cell {
    opacity: 0.15 !important;
  }
}
</style>
