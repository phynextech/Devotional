// Web Audio API Spiritual Sound Suite
// Generates realistic Temple Bell, Sacred Om 432Hz Ambient Drone, and Japam Chimes

class SpiritualAudioEngine {
  constructor() {
    this.ctx = null;
    this.droneOsc1 = null;
    this.droneOsc2 = null;
    this.droneGain = null;
    this.isDronePlaying = false;
    this.droneVolume = 0.15;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Realistic Temple Brass Bell Toll (Ghanta)
  playTempleBell() {
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const strikeTime = 0.02;
    const decayTime = 3.5;

    // Harmonic frequencies typical of a temple brass bell
    const baseFreq = 587.33; // D5 tone
    const partials = [
      { ratio: 1.0, gain: 1.0, decay: decayTime },
      { ratio: 2.0, gain: 0.6, decay: decayTime * 0.8 },
      { ratio: 3.01, gain: 0.45, decay: decayTime * 0.6 },
      { ratio: 4.15, gain: 0.3, decay: decayTime * 0.4 },
      { ratio: 5.4, gain: 0.15, decay: decayTime * 0.3 }
    ];

    // Master bell gain
    const masterGain = this.ctx.createGain();
    masterGain.gain.setValueAtTime(0.6, now);
    masterGain.connect(this.ctx.destination);

    partials.forEach(p => {
      const osc = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq * p.ratio, now);

      gainNode.gain.setValueAtTime(0, now);
      // Instant strike
      gainNode.gain.linearRampToValueAtTime(p.gain, now + strikeTime);
      // Exponential metallic decay
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + p.decay);

      osc.connect(gainNode);
      gainNode.connect(masterGain);

      osc.start(now);
      osc.stop(now + p.decay + 0.1);
    });
  }

  // Singing Bowl / Conch Chime
  playSingingBowl() {
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(261.63, now); // C4 warm bowl

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.4, now + 0.5);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 4.5);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 4.6);
  }

  // Soft Bead Click for Japam Counter
  playJapamClick() {
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(440, now + 0.08);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.09);
  }

  // Toggle Sacred Om 432Hz Meditative Drone
  toggleOmDrone() {
    this.init();
    if (!this.ctx) return false;

    if (this.isDronePlaying) {
      this.stopOmDrone();
      return false;
    } else {
      this.startOmDrone();
      return true;
    }
  }

  startOmDrone() {
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    this.droneGain = this.ctx.createGain();
    this.droneGain.gain.setValueAtTime(0.001, now);
    this.droneGain.linearRampToValueAtTime(this.droneVolume, now + 2.0);
    this.droneGain.connect(this.ctx.destination);

    // 108 Hz base (Sacred 108 number)
    this.droneOsc1 = this.ctx.createOscillator();
    this.droneOsc1.type = 'sine';
    this.droneOsc1.frequency.setValueAtTime(108, now);

    // 216 Hz and 432 Hz harmonics (cosmic healing frequency)
    this.droneOsc2 = this.ctx.createOscillator();
    this.droneOsc2.type = 'sine';
    this.droneOsc2.frequency.setValueAtTime(216, now);

    this.droneOsc1.connect(this.droneGain);
    this.droneOsc2.connect(this.droneGain);

    this.droneOsc1.start(now);
    this.droneOsc2.start(now);

    this.isDronePlaying = true;
  }

  stopOmDrone() {
    if (!this.isDronePlaying) return;
    if (this.droneGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.droneGain.gain.linearRampToValueAtTime(0.0001, now + 1.0);
      setTimeout(() => {
        try {
          if (this.droneOsc1) this.droneOsc1.stop();
          if (this.droneOsc2) this.droneOsc2.stop();
        } catch (e) {}
        this.isDronePlaying = false;
      }, 1000);
    } else {
      this.isDronePlaying = false;
    }
  }
}

export const spiritualAudio = new SpiritualAudioEngine();
