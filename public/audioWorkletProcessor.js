// public/audioWorkletProcessor.js
class PCMProcessor extends AudioWorkletProcessor {
  process(inputs) {
    const input = inputs[0];
    if (input && input[0]) {
      const pcmFloat32 = input[0];
      this.port.postMessage(pcmFloat32);
    }
    return true;
  }
}
registerProcessor("pcm-processor", PCMProcessor);
