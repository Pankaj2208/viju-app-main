const appendScript = (scriptToAppend, preload) => {
  const script = document.createElement('script');
  script.src = scriptToAppend;
  if (preload) {
    script.rel = 'preload';
  }
  script.async = false;
  script.onload = () => console.log(`${scriptToAppend} loaded successfully`);
  script.onerror = (e) => console.error(`Failed to load ${scriptToAppend}`, e);
  document.body.appendChild(script);
  console.log(`Appending script: ${scriptToAppend}`);
};

module.exports = { appendScript };
